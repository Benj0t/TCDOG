export interface PublicProfile {
  id: string;
  username: string;
  avatar: string | null;
}

export interface PrivateProfile extends PublicProfile {
  email: string;
  provider: "google" | "discord" | "local";
  createdAt: Date;
}