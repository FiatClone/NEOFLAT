import React from "react";

function MintContent() {
  const account = useActiveAccount();
  const [minted, setMinted] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function doMint() {
    setLoading(true);
    setErr("");
    try {
      setTimeout(() => {
        setMinted(true);
        setLoading(false);
      }, 1200);
    } catch (e) {
      setErr("Mint gagal: " + e.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Mint NFT</h2>
      <p style={{ color: "#bafcff", lineHeight: 1.5 }}>
        Mint NFT (demo). Untuk real mint, hubungkan ke koleksi NFT milik sendiri
        via thirdweb.
      </p>
      {account ? (
        <button
          onClick={doMint}
          style={{
            background: "#2956e7",
            color: "#ecf5ff",
            borderRadius: 8,
            padding: "0.7em 2.1em",
            border: "none",
            fontWeight: 600,
            margin: "18px 0",
          }}
          disabled={loading || minted}
        >
          {loading ? "Minting..." : minted ? "Minted!" : "Mint NFT"}
        </button>
      ) : (
        <span style={{ color: "#e2ecfd" }}>
          Connect wallet dulu untuk mint NFT
        </span>
      )}
      {minted && (
        <div style={{ marginTop: 13, color: "#98f3bb" }}>
          Mint sukses! NFT kamu sudah dikirim.
        </div>
      )}
      {err && <div style={{ marginTop: 13, color: "#ffabb4" }}>{err}</div>}
    </div>
  );
}

export default MintContent;                                                                                                                                                                          color: "#ecf5ff",
                                                                                                                                                                                      borderRadius: 8,
                                                                                                                                                                                                  padding: "0.7em 2.1em",
                                                                                                                                                                                                              border: "none",
                                                                                                                                                                                                                          fontWeight: 600,
                                                                                                                                                                                                                                      margin: "18px 0",
                                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                                          disabled={loading || minted}
                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                            {loading ? "Minting..." : minted ? "Minted!" : "Mint NFT"}
                                                                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                                                                          ) : (
                                                                                                                                                                                                                                                                                                  <span style={{ color: "#e2ecfd" }}>
                                                                                                                                                                                                                                                                                                            Connect wallet dulu untuk mint NFT
                                                                                                                                                                                                                                                                                                                    </span>
                                                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                                                                {minted && (
                                                                                                                                                                                                                                                                                                                                        <div style={{ marginTop: 13, color: "#98f3bb" }}>
                                                                                                                                                                                                                                                                                                                                                  Mint sukses! NFT kamu sudah dikirim.
                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                                                                      {err && <div style={{ marginTop: 13, color: "#ffabb4" }}>{err}</div>}
                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                            
