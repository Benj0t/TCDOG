export interface User{
    user_id: string;
    username: string;
    email: string;
    password?: string;
    oauth_id?: string | null;
    provider: 'local' | 'discord' | 'google';
    avatar?: string | null;
    created_at: Date;
}

export interface OAuthUserPayload {
    username: string;
    email: string;
    oauth_id: string;
    provider: 'discord' | 'google';
    avatar: string | null;
}