"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../style/modules/topbar.module.css";
import {
  ConnectButton,
  useActiveAccount,
  useWalletBalance,
} from "thirdweb/react";
import { allChains } from "thirdweb/chains";
import Image from "next/image";

export default function Topbar({ onChainSelect }) {
  const [chainMenu, setChainMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const account = useActiveAccount();
  const { data: balances } = useWalletBalance(account?.address);

  const profileRef = useRef();
  const chainRef = useRef();
  useEffect(() => {
    function handle(e) {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (chainRef.current && !chainRef.current.contains(e.target))
        setChainMenu(false);
    }
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, []);

  const chainChoices = allChains.filter((ch) => !ch.testnet);

  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>
        <Image src="/icon.svg" width={38} height={38} alt="logo" />
        <span>NeoFlat</span>
      </div>
      <div className={styles.center}></div>
      <div className={styles.right}>
        <div ref={profileRef} className={styles.iconWrap}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className={styles.iconBtn}
          >
            <Image src="/profile.svg" width={30} height={30} alt="profile" />
          </button>
          {profileOpen && (
            <div className={styles.profileMenu}>
              {!account ? (
                <ConnectButton
                  clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""}
                />
              ) : (
                <>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {account.address.slice(0, 8)}…{account.address.slice(-4)}
                  </div>
                  <div className={styles.assets}>
                    <span style={{ fontWeight: 500, color: "#3accff" }}>
                      Tokens:
                    </span>
                    {balances?.tokens?.map((tk) => (
                      <div key={tk.address}>
                        {tk.symbol}: {tk.displayValue}
                      </div>
                    ))}
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#6cdaff",
                        marginTop: 5,
                      }}
                    >
                      NFTs:
                    </span>
                    {(balances?.nfts || []).slice(0, 6).map((nft) => (
                      <div key={nft.tokenId}>
                        {nft.name || `NFT #${nft.tokenId}`}
                      </div>
                    ))}
                  </div>
                  <ConnectButton
                    clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""}
                    showDisconnect={true}
                  />
                </>
              )}
            </div>
          )}
        </div>
        <div ref={chainRef} className={styles.iconWrap}>
          <button
            onClick={() => setChainMenu((v) => !v)}
            className={styles.iconBtn}
          >
            <Image src="/chain.svg" width={28} height={28} alt="chain" />
          </button>
          {chainMenu && (
            <div className={styles.chainMenu}>
              {chainChoices.map((ch) => (
                <button
                  key={ch.id}
                  className={styles.chainItem}
                  onClick={() => {
                    setChainMenu(false);
                    onChainSelect?.(ch);
                  }}
                >
                  <span>
                    {ch.icon && (
                      <Image
                        src={ch.icon}
                        width={20}
                        height={20}
                        alt={ch.name}
                      />
                    )}
                  </span>
                  <span>{ch.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
