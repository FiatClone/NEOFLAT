import React from "react";
import { useAddress, useBalance, useOwnedNFTs } from "@thirdweb/react";
import styles from "../../styles/modules/neoflat.module.css";

const InfoContent: React.FC = () => {
  const address = useAddress();
  const { data: balance, isLoading: loadingBal } = useBalance();
  const { data: nfts, isLoading: loadingNFTs } = useOwnedNFTs(address);

  return (
    <div className={styles.infoContentRoot}>
      <h2>Profil Akun</h2>
      <div className={styles.cardBlueNeo}>
        <div>
          <strong>Alamat Wallet:</strong>
          <br />
          {address ? (
            <span style={{ fontSize: 15, color: "#e0e7ff" }}>{address}</span>
          ) : (
            <span style={{ color: "#f88" }}>Belum terhubung</span>
          )}
        </div>
        <div style={{ marginTop: 18 }}>
          <strong>Saldo ETH:</strong>
          <br />
          {loadingBal ? (
            <span>Memuat...</span>
          ) : balance ? (
            <span style={{ color: "#bdf" }}>
              {balance.displayValue} {balance.symbol}
            </span>
          ) : (
            <span>-</span>
          )}
        </div>
        <div style={{ marginTop: 18 }}>
          <strong>NFT Koleksi:</strong>
          <br />
          {loadingNFTs ? (
            <span>Memuat NFT ...</span>
          ) : nfts && nfts.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {nfts.slice(0, 6).map((nft) => (
                <li key={nft.metadata.id}>
                  <span>{nft.metadata.name || "NFT #" + nft.metadata.id}</span>
                </li>
              ))}
              {nfts.length > 6 && (
                <li style={{ color: "#a6bfff", fontSize: 13 }}>
                  +{nfts.length - 6} NFT lainnya
                </li>
              )}
            </ul>
          ) : (
            <span>Tidak ada NFT</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default InfoContent;
                
