import React from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/modules/neoflat.module.css";

function TopBar() {
  return (
    <div className={styles.topBar}>
      <div style={{ flex: 1 }} />
      <button
        className={styles.profileBtn}
        title="Profile"
        style={{ marginLeft: 14 }}
      >
        <Icon icon="tabler:user-circle" fontSize={28} />
      </button>
    </div>
  );
}

export default TopBar;
