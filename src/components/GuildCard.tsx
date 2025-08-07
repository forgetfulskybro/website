"use client";
import styles from "../app/projects/guildcount/guildcount.module.css";
import type { Guild } from "../app/projects/guildcount/page";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function GuildCard({ guild, permissions }: { guild: Guild, permissions: any }) {
  const [showDetails, setShowDetails] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isAdmin = !guild.owner && (parseInt(guild.permissions.toString()) & 0x8) === 0x8;

  // Decode guild ID to creation date
  const getCreationDate = (guildId: string): string => {
    try {
      const timestamp = (BigInt(guildId) >> BigInt(22)) + BigInt(1420070400000);
      const date = new Date(Number(timestamp));
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    } catch {
      return "Unknown";
    }
  };

  const creationDate = getCreationDate(guild.id);

  const badges = [];
  if (guild.owner) badges.push("owner");
  if (guild.features.includes("VERIFIED")) badges.push("verified");
  if (guild.features.includes("PARTNERED")) badges.push("partnered");
  if (isAdmin) badges.push("admin");

  const toggleModal = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowDetails(false);
      }
    };

    if (showDetails) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDetails]);

  return (
    <>
      <div className={styles.guildCard}>
        <div className={styles.guildInfo}>
          {guild.icon ? (
            <Image
              className={styles.guildIcon}
              width={64}
              height={64}
              src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
              alt={`${guild.name} icon`}
            />
          ) : (
            <div className={styles.noIcon}>
              {guild.name ? guild.name[0].toUpperCase() : "?"}
            </div>
          )}
          <span className={styles.guildName} title={guild.name}>
            {guild.name}
          </span>
          <div className={styles.guildMeta}>
            <span><strong>ID</strong>: {guild.id}</span>
            <br />
            <span>
              <strong>Created</strong>: {creationDate}
            </span>
            {badges.length > 0 && (
              <>
                <br />
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`${styles.badge} ${styles[badge]}`}
                  >
                    {badge.charAt(0).toUpperCase() + badge.slice(1)}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
        <button onClick={toggleModal} className={styles.toggleButton}>
          View Details
        </button>
      </div>
      {showDetails && (
        <div className={`${styles.modal} ${showDetails ? styles.visible : ""}`}>
          <div className={styles.modalContent} ref={modalRef}>
            <span className={styles.close} onClick={toggleModal}>
              &times;
            </span>
            <h2>{guild.name}</h2>
            <div className={styles.modalBody}>
              <div className={styles.featuresSection}>
                <strong>Features:</strong>
                {guild.features.length > 0 ? (
                  <ul className={styles.featuresList}>
                    {guild.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No special features</p>
                )}
              </div>
              <div className={styles.permissionsSection}>
                <strong>Permissions:</strong>
                {Object.keys(permissions).some(
                  (group) => permissions[group].length > 0
                ) ? (
                  <div className={styles.permissionsGrouped}>
                    {["general", "text", "voice"].map((group) =>
                      permissions[group].length > 0 ? (
                        <div key={group} className={styles.permissionGroup}>
                          <h3 className={styles.groupTitle}>
                            {group.charAt(0).toUpperCase() + group.slice(1)}
                          </h3>
                          <ul className={styles.permissionsList}>
                            {permissions[group].map(
                              (perm: string, index: number) => (
                                <li key={index}>{perm}</li>
                              )
                            )}
                          </ul>
                        </div>
                      ) : null
                    )}
                  </div>
                ) : (
                  <p>No permissions</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}