import { Request, Response } from "express";
import axios from "axios";


async function getDiscordToken(code: string) {

    const redirectUri = process.env.DISCORD_CALLBACK_URL;
    console.log("Redirect URI:", redirectUri);
    const data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirectUri,
    }

    console.log(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token`);
    const responseToken = await axios.post(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token`, data, {
    
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      auth: {
        username: process.env.DISCORD_CLIENT_ID as string,
        password: process.env.DISCORD_CLIENT_SECRET as string,
      }
    });
    console.log("Discord token response:", responseToken.data);
    if (responseToken.status !== 200) {
      console.log("Discord token data:", responseToken);
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
    console.log("Discord user info response:", responseUserInfo.data);
    if (responseUserInfo.status !== 200) {
      throw new Error('Failed to get Discord user info');
    }
    return responseUserInfo.data;
}

export async function authDiscordController(req: Request, res: Response) {
  try {
    console.log("Received Discord auth request:", req.body);
    const { code } = req.body;
    const tokenData = await getDiscordToken(code);
    console.log("Discord token data:", tokenData);
    const userInfo = await getDiscordUserInfo(tokenData.access_token);
    console.log("Discord user info:", userInfo);
    res.status(200).json({ message: "Discord authentication successful", userInfo });
    return tokenData;
  } catch (error) {
    console.error("Error during Discord authentication:", error);
    res.status(500).json({ message: "Error occurred during Discord authentication", error });
  }
}