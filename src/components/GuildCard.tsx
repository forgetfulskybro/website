"use client";
import styles from "../app/projects/guildcount/guildcount.module.css";
import type { Guild } from "../app/projects/guildcount/page";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { extractColors } from "./colorExtractor";
import ToolTip from "./ToolTip";

export default function GuildCard({
  guild,
  permissions,
}: {
  guild: Guild;
  permissions: any;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [colors, setColors] = useState<string[]>(["#5b65f04e"]);
  const modalRef = useRef<HTMLDivElement>(null);
  const isAdmin =
    !guild.owner && (parseInt(guild.permissions.toString()) & 0x8) === 0x8;

  useEffect(() => {
    const fetchColors = async () => {
      if (guild.icon && !guild.banner) {
        const iconUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
        const extractedColors = await extractColors(iconUrl);
        setColors(extractedColors);
      }
    };

    fetchColors();
  }, [guild.icon, guild.banner, guild.id]);

  const getCreationDate = (guildId: string): string => {
    try {
      const timestamp = (BigInt(guildId) >> BigInt(22)) + BigInt(1420070400000);
      const date = new Date(Number(timestamp));
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
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
  if (
    guild.features.includes("INTERNAL_EMPLOYEE_ONLY") ||
    guild.features.includes("STAFF_LEVEL_RESTRICTED_COLLABORATOR_REQUIRED")
  )
    badges.push("staff");

  const toggleModal = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
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

  const gradientStyle =
    colors.length > 1
      ? {
          background: `linear-gradient(130deg, ${colors[0]}, ${
            colors[1] || colors[0]
          }, ${colors[1] || colors[0]})`,
        }
      : { backgroundColor: colors[0] };

  return (
    <>
      <div className={styles.guildCard}>
        {guild.banner ? (
          <Image
            className={styles.guildBanner}
            width={300}
            height={120}
            src={`https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png?size=1024`}
            alt={`${guild.name} banner`}
          />
        ) : (
          <div className={styles.guildBanner} style={gradientStyle} />
        )}
        <div className={styles.guildInfo}>
          {guild.icon ? (
            <Image
              className={styles.guildIcon}
              width={64}
              height={64}
              src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=1024`}
              alt={`${guild.name} icon`}
            />
          ) : (
            <div className={styles.noIcon}>
              {guild.name ? guild.name[0].toUpperCase() : "?"}
            </div>
          )}
          <div className={styles.guildNameWrapper}>
            {badges.length > 0 && (
              <div className={styles.badgeContainer}>
                {badges.map((badge, index) => (
                  <ToolTip
                    key={index}
                    content={badge.replace(/(^|\s)[a-z]/gi, (l) =>
                      l.toUpperCase()
                    )}
                    placement="top"
                  >
                    <span className={`${styles.badge} ${styles[badge]}`} />
                  </ToolTip>
                ))}
              </div>
            )}
            <ToolTip content={guild.name} placement="top">
              <span className={styles.guildName}>{guild.name}</span>
            </ToolTip>
          </div>
          <div className={styles.guildMeta}>
            <span>
              <strong>ID</strong>: {guild.id}
            </span>
            <br />
            <span>
              <strong>Created</strong>: {creationDate}
            </span>
          </div>
        </div>
        <button onClick={toggleModal} className={styles.toggleButton}>
          View Details
        </button>
      </div>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={styles.modalContent}
              ref={modalRef}
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
