import FilterBar from "@/components/FilterBar";
import styles from "./guildcount.module.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type Guild = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  features: string[];
  permissions: string;
  badges?: string[];
  member_count?: number;
  ownerId?: string;
  permissionsObj?: any;
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
  try {
    guilds = await fetchGuilds(accessToken);
  } catch (error) {
    console.error("Error in fetchGuilds:", error);
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.error}>
          <p>Error fetching guilds. Please try again.</p>
          <a href="/">Go back</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>Your Discord Guilds</h1>
            <p>Total Guilds: {guilds.length}</p>
          </div>
          <form action="/api/discord/logout" method="POST">
            <button type="submit" className={styles.logoutButton}>
              Logout
            </button>
          </form>
        </div>
        <FilterBar guilds={guilds} />
      </div>
    </div>
  );
}
