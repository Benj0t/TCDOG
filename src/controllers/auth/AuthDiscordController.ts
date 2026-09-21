import { Request, Response } from "express";
import axios from "axios";
import { UserService } from "../../services/UserService.js";
import jwt from "jsonwebtoken";

async function getDiscordToken(code: string) {

    const redirectUri = process.env.DISCORD_CALLBACK_URL;
    const data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirectUri,
    }
    const responseToken = await axios.post(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token`, data, {
    
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      auth: {
        username: process.env.DISCORD_CLIENT_ID as string,
        password: process.env.DISCORD_CLIENT_SECRET as string,
      }
    });
    if (responseToken.status !== 200) {
      throw new Error('Failed to get Discord token');
    }
    return responseToken.data;
}

async function getDiscordUserInfo(accessToken: string) {
    const responseUserInfo = await axios.get(`${process.env.DISCORD_API_ENDPOINT}/users/@me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (responseUserInfo.status !== 200) {
      throw new Error('Failed to get Discord user info');
    }
    return responseUserInfo.data;
}

export async function authDiscordController(req: Request, res: Response) {
  try {
    const { code } = req.body;
    const tokenData = await getDiscordToken(code);
    const userInfo = await getDiscordUserInfo(tokenData.access_token);

    const { username, email, id, avatar } = userInfo;
    const avatarUrl = avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : null;
    const userPayload = {
        username,
        email,
        oauth_id: id, // Using Discord ID as a placeholder for password
        provider : 'discord' as const,
        avatar: avatarUrl,
    };
    const user = await UserService.findOrCreateOAuthUser(userPayload);
    console.log("User created or found:", user);

    const token = jwt.sign(
      { userId: user.user_id }, 
      process.env.JWT_SECRET_KEY as string, 
      { expiresIn: '30d' }
    );
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: "Discord authentication successful", user: {id: user.user_id, username: user.username, avatar: user.avatar} });
} catch (error) {
    console.error("Error during Discord authentication:", error);
    res.status(500).json({ message: "Error occurred during Discord authentication", error });
  }
}