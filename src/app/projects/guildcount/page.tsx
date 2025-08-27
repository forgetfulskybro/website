import UserProfile from "@/components/GuildCount/UserProfile";
import FilterBar from "@/components/GuildCount/FilterBar";
import { OfflineGuilds, Guild } from "./guilds";
import styles from "./guildcount.module.css";
import { cookies } from "next/headers";
import Image from "next/image";

async function fetchGuilds(accessToken: string | null): Promise<Guild[]> {
  if (!accessToken)
    return OfflineGuilds;
  const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch guilds");
  const guilds: Guild[] = await res.json();
  return guilds;
}

async function fetchUser(accessToken: string | null) {
  if (!accessToken) return null;
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
  const cookieStore = cookies();
  const accessToken =
    (await cookieStore).get("discord_access_token")?.value || null;

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

  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`
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
            {!user && (
              <>
                <strong>Login to view your servers</strong>
              </>
            )}
          </div>
          <UserProfile
            username={user?.username || null}
            avatarUrl={avatarUrl}
          />
        </div>
        <FilterBar guilds={guilds} />
      </div>
    </div>
  );
}
