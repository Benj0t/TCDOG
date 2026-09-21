import { Request, Response } from "express";
import axios from "axios";
import { UserService } from "../../services/UserService.js";
import jwt from "jsonwebtoken";

async function getGoogleToken(code: string) {
  const data = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
  };

  const responseToken = await axios.post('https://oauth2.googleapis.com/token', data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return responseToken.data;
}

async function getGoogleUserInfo(accessToken: string) {
  const responseUserInfo = await axios.get(`${process.env.GOOGLE_API_ENDPOINT}/userinfo`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });

  return responseUserInfo.data;
}

export async function authGoogleController(req: Request, res: Response) {
  try {
    const { code } = req.body;
    const tokenData = await getGoogleToken(code);
    const userInfo = await getGoogleUserInfo(tokenData.access_token);

    const { id, email, name, picture } = userInfo;

    const userPayload = {
        username: name,
        email: email,
        oauth_id: id,
        provider: 'google' as const,
        avatar: picture, // Pas besoin de reconstruire l'URL comme sur Discord
    };

    const user = await UserService.findOrCreateOAuthUser(userPayload);
    console.log("User created or found:", user);

    const token = jwt.sign(
      { userId: user.user_id }, 
      process.env.JWT_SECRET_KEY as string, 
      { expiresIn: '7d' }
    );

    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ 
      message: "Google authentication successful", 
      user: { id: user.user_id, username: user.username, avatar: user.avatar } 
    });

  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.status(500).json({ message: "Error occurred during Google authentication", error });
  }
}