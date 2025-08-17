import React from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/modules/sidebar.module.css";

import HomeContent from "./contents/HomeContent";
import SwapContent from "./contents/SwapContent";
import BridgeContent from "./contents/BridgeContent";
import PoolContent from "./contents/PoolContent";
import MintContent from "./contents/MintContent";
import MarketContent from "./contents/MarketContent";
import ToolContent from "./contents/ToolContent";
import InfoContent from "./contents/InfoContent";
import UserContent from "./contents/UserContent";

// Mapping halaman
const PAGES = {
  home: HomeContent,
  swap: SwapContent,
  bridge: BridgeContent,
  pool: PoolContent,
  mint: MintContent,
  market: MarketContent,
  lab: ToolContent,
  about: InfoContent,
  profile: UserContent,
};

// Mapping icon
const ICONS = {
  home: "tabler:home",
  swap: "tabler:arrows-exchange",
  bridge: "tabler:arrows-double-ne-sw",
  pool: "tabler:database",
  mint: "tabler:photo-plus",
  market: "tabler:chart-candle",
  lab: "tabler:flask-2",
  about: "tabler:info-circle",
  profile: "tabler:user-circle",
};

const Sidebar = ({ setActivePage, activePage }) => {
  const ActiveComponent = PAGES[activePage];

  return (
    <div className={styles.appContainer}>
      {/* Sidebar */}
      <div className={styles.sidebarContainer}>
        <aside className={styles.sidebarFrame}>
          {Object.keys(PAGES).map((key) => (
            <button
              key={key}
              className={`${styles.cButton} ${
                activePage === key ? styles.cButtonActive : ""
              }`}
              onClick={() => setActivePage(key)}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
            >
              <Icon
                icon={ICONS[key] || "tabler:circle"}
                className={styles.cIcon}
              />
            </button>
          ))}
        </aside>
      </div>

      {/* Content */}
      <main className={styles.contentFrame}>
        <ActiveComponent />
      </main>
    </div>
  );
};

export default Sidebar;