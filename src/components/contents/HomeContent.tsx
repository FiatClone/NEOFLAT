import React from "react";
import { Icon } from "@iconify/react";

export default function HomeContent() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #e6f1ff 0%, #cfe0ff 100%)",
        borderRadius: 38,
        boxShadow: "8px 8px 32px #bed1ea, -8px -8px 30px #fafdffcc",
        padding: "40px 16px 24px 16px",
        margin: "2vw auto",
        maxWidth: 600,
      }}
    >
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "2.7rem",
          letterSpacing: 1,
          marginBottom: 16,
          color: "#174a8f",
          textShadow:
            "2px 2px 8px #b2caf690, -2px -2px 4px #ffffff99, 0 4px 14px #92bffc78",
        }}
      >
        NEOPLAT
      </h1>
      <div
        style={{
          color: "#246bbd",
          fontSize: 21,
          marginBottom: 10,
          fontWeight: 600,
          letterSpacing: ".1em",
          textShadow: "1.5px 1.5px 4px #e0ebff, -2px -2px 4px #87aef7a2",
        }}
      >
        DeFi browser &bull; Modular NFT tools
      </div>
      <span
        style={{
          color: "#558bf5",
          fontSize: 14.5,
          marginBottom: 18,
          fontWeight: 400,
          letterSpacing: ".05em",
          textShadow: "0 3px 8px #b1d5ff99",
        }}
      >
        Modern. Secure. Simple.
        <br />
        Explore, swap, bridge, or mint NFTs—all in one place.
      </span>

      {/* ICON SECTION */}
      <div
        style={{
          display: "flex",
          gap: 42,
          margin: "28px 0 18px 0",
        }}
      >
        {/* Swap Icon */}
        <div
          className="icon-neom"
          style={{ animation: "bounce 1.6s infinite" }}
        >
          <Icon icon="tabler:arrows-exchange" width="48" height="48" />
          <div className="icon-label">Swap</div>
        </div>
        {/* Bridge Icon */}
        <div
          className="icon-neom"
          style={{ animation: "floatAnim 2.7s infinite" }}
        >
          <Icon icon="tabler:arrows-double-ne-sw" width="48" height="48" />
          <div className="icon-label">Bridge</div>
        </div>
        {/* Stake NFT Icon */}
        <div
          className="icon-neom"
          style={{ animation: "spinAnim 6s linear infinite" }}
        >
          <Icon icon="lucide:badge-percent" width="48" height="48" />
          <div className="icon-label">Stake NFT</div>
        </div>
        {/* Mint NFT Icon */}
        <div
          className="icon-neom"
          style={{ animation: "bounce 2.1s 0.5s infinite" }}
        >
          <Icon icon="tabler:photo-plus" width="48" height="48" />
          <div className="icon-label">Mint NFT</div>
        </div>
      </div>
      {/* End icon section */}

      <div
        style={{
          color: "#5777cc",
          fontSize: 12.7,
          opacity: 0.83,
          marginTop: 12,
        }}
      >
        Neoplat mengusung modularitas, UI neomorphism, serta fitur DeFi NFT yang
        mudah dipakai siapa saja.
        <br />
        Seluruh proses, swap & bridge didukung thirdweb. Aman dan stylish.
      </div>

      <div style={{ opacity: 0.8, fontSize: 13, marginTop: 26 }}>
        Powered by{" "}
        <a
          href="https://thirdweb.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#3183ff",
            textDecoration: "underline",
            fontWeight: 600,
          }}
        >
          thirdweb
        </a>
      </div>

      {/* Neomorphism animated style (Inline for convenience, can move to CSS file) */}
      <style>{`
        .icon-neom {
          background: linear-gradient(145deg, #e9f2ff 0%, #bfd6ff 90%);
          border-radius: 17px;
          box-shadow:  8px 8px 24px #bed1ea, -8px -8px 24px #ffffff;
          padding: 24px 16px 8px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.23s, transform 0.18s;
          cursor: pointer;
          min-width: 84px;
        }
        .icon-neom:hover {
          box-shadow: 0 4px 18px #6c95e880, 0 0 10px #bcd4ff88;
          background: linear-gradient(145deg, #a7c8fb 0%, #d0e6fd 100%);
          transform: scale(1.08) translateY(-4px);
        }
        .icon-label {
          font-size: 14.9px;
          margin-top: 14px;
          color: #215be0;
          font-weight: 600;
          letter-spacing: .02em;
          text-shadow: 0 2px 6px #abcfff85;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          35% { transform: translateY(-10px);}
          55% { transform: translateY(-20px);}
          70% { transform: translateY(-8px);}
        }
        @keyframes spinAnim {
          0% { transform: rotate(0deg);}
          100%{ transform: rotate(360deg);}
        }
        @keyframes floatAnim {
          0%, 100%{ transform:translateY(0);}
          50%{ transform:translateY(-13px);}
        }
        @media (max-width: 600px) {
          .icon-neom { min-width: 64px; padding:16px 6px 6px 6px;}
        }
      `}</style>
    </div>
  );
}
