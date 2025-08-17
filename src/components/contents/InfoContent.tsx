import React from "react";
import { Icon } from "@iconify/react";
import styles from "../../styles/modules/sidebar.module.css";

const CHAINS = [
  {
    name: "Ethereum",
    icon: "logos:ethereum",
    url: "https://ethereum.org/",
    color: "#627eea",
  },
  {
    name: "Polygon",
    icon: "logos:polygon",
    url: "https://polygon.technology/",
    color: "#7b3fe4",
  },
  {
    name: "Base",
    icon: "logos:base",
    url: "https://base.org/",
    color: "#0052ff",
  },
  {
    name: "Optimism",
    icon: "logos:optimism-icon",
    url: "https://optimism.io/",
    color: "#ff0420",
  },
  {
    name: "Arbitrum",
    icon: "logos:arbitrum",
    url: "https://arbitrum.io/",
    color: "#28a0f0",
  },
  {
    name: "thirdweb",
    icon: "logos:thirdweb-icon",
    url: "https://thirdweb.com/",
    color: "#6366f1",
  },
];

const SOCIALS = [
  {
    name: "X",
    icon: "ri:twitter-x-fill",
    url: "https://x.com/yourproject",
    color: "#16181c",
  },
  {
    name: "Discord",
    icon: "ic:baseline-discord",
    url: "https://discord.gg/yourproject",
    color: "#5562ea",
  },
  {
    name: "GitHub",
    icon: "mdi:github",
    url: "https://github.com/yourproject",
    color: "#171b24",
  },
  {
    name: "Telegram",
    icon: "fa6-brands:telegram",
    url: "https://t.me/yourproject",
    color: "#229ed9",
  },
];

const InfoContent: React.FC = () => (
  <div className={styles.infoContentRoot}>
    <h2>Situs dan Chain Support</h2>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 24,
        marginTop: 18,
        marginBottom: 36,
        justifyContent: "flex-start",
      }}
    >
      {CHAINS.map(({ name, icon, url, color }) => (
        <a
          href={url}
          key={name}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardBlueNeo}
          style={{
            width: 116,
            height: 128,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Icon
            icon={icon}
            width={44}
            height={44}
            style={{
              marginTop: 12,
              marginBottom: 12,
              color: color,
              filter: "drop-shadow(0 1px 5px #1c223080)",
            }}
          />
          <span
            style={{
              fontWeight: 700,
              color: "#fff",
              letterSpacing: 0.5,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {name}
          </span>
        </a>
      ))}
    </div>

    <h3 style={{ color: "#93b1ff", margin: "28px 0 9px 0" }}>Sosial Media</h3>
    <div
      style={{
        display: "flex",
        gap: 14,
        marginBottom: 10,
        flexWrap: "wrap",
      }}
    >
      {SOCIALS.map(({ name, icon, url, color }) => (
        <a
          href={url}
          key={name}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardSocialNeo}
          style={{
            width: 70,
            height: 70,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <Icon icon={icon} width={33} height={33} style={{ color }} />
        </a>
      ))}
    </div>
  </div>
);

export default InfoContent;
        
