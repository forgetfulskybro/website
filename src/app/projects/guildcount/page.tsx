import UserProfile from "@/components/UserProfile";
import FilterBar from "@/components/FilterBar";
import styles from "./guildcount.module.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Metadata } from "next";
import Image from "next/image"

export type Guild = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  features: string[];
  permissions: string | number;
  permissions_new?: string;
  badges?: string[];
  member_count?: number;
  ownerId?: string;
  permissionsObj?: any;
};

export const metadata: Metadata = {
  title: "Guild Count",
  description: "A simple tool to check how many Discord servers you're in.",
  keywords: ["Guild Count", "Discord Guilds Counter", "guildcount"],
  openGraph: {
    images: [{ url: "/guildcount.png" }],
  },
};

async function fetchGuilds(accessToken: string): Promise<Guild[]> {
  const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch guilds");
  const guilds: Guild[] = await res.json();
  return guilds;
}

async function fetchUser(accessToken: string) {
  const res = await fetch("https://discord.com/api/v10/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  const user = await res.json();
  return user;
}

export default async function GuildCount() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/discord`;
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("discord_access_token")?.value;

  if (!accessToken) {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20guilds`;
    redirect(discordAuthUrl);
  }

  let guilds: Guild[] = [];
  let user = null;
  try {
    guilds = await fetchGuilds(accessToken);
    user = await fetchUser(accessToken);
  } catch (error) {
    console.error("Error in fetch:", error);
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.error}>
          <p>Error fetching data. Please try again.</p>
          <a href="/">Go back</a>
        </div>
      </div>
    );
  }

  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : "/default-avatar.png";

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={styles.icon}>
              <Image
                className={styles.userAvatar}
                src="/guildcount.png"
                alt="Guild Count"
                height={40}
                width={40}
                draggable={false}
              />
              <h2>
                <strong>Guild Count</strong>
              </h2>
            </div>
            <p>Total Guilds: {guilds.length}</p>
          </div>
          <UserProfile username={user.username} avatarUrl={avatarUrl} />
        </div>
        <FilterBar guilds={guilds} />
      </div>
    </div>
  );
}
