"use client";
import React, { useState, useEffect } from "react";
import styles from "./swap.module.css";
import {
  useActiveAccount,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
  useBuyWithCryptoQuote,
} from "thirdweb/react";
import {
  ethereum,
  base,
  optimism,
  polygon,
  arbitrum,
  allChains,
} from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

// Boleh query tokenlist secara dinamis, atau dari file json yang sudah sesuai format token ERC20
const TOKENLIST = [
  {
    chainId: 1,
    symbol: "ETH",
    decimals: 18,
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  },
  {
    chainId: 1,
    symbol: "USDC",
    decimals: 6,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    chainId: 8453,
    symbol: "ETH",
    decimals: 18,
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  },
  {
    chainId: 8453,
    symbol: "USDC",
    decimals: 6,
    address: "0xd9AAEC86B65d86f6A7B5ba80a857B394d08A28eE",
  },
  // dst. sesuai support chain.
];

const SUPPORTED_CHAINS = [ethereum, base, optimism, polygon, arbitrum];

export default function Swap() {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [fromChain, setFromChain] = useState(ethereum);
  const [toChain, setToChain] = useState(base);
  const [fromToken, setFromToken] = useState(TOKENLIST[0]);
  const [toToken, setToToken] = useState(TOKENLIST[1]);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);
  const [quoteParams, setQuoteParams] = useState<any>();
  const [txHash, setTxHash] = useState<string>();
  const buyQuote = useBuyWithCryptoQuote(quoteParams);

  useEffect(() => {
    if (fromToken.chainId !== fromChain.id) {
      setFromToken(TOKENLIST.find((t) => t.chainId === fromChain.id));
    }
    if (toToken.chainId !== toChain.id) {
      setToToken(TOKENLIST.find((t) => t.chainId === toChain.id));
    }
  }, [fromChain, toChain]);

  const handleSwap = async () => {
    if (!account) return alert("Connect wallet!");
    if (!amount) return alert("Enter amount!");
    if (activeChain?.id !== fromChain.id) await switchChain(fromChain);
    const params = {
      fromAddress: account.address,
      fromChainId: fromChain.id,
      fromTokenAddress: fromToken.address,
      toChainId: toChain.id,
      toTokenAddress: toToken.address,
      toAddress: account.address,
      fromAmount: amount,
      maxSlippageBPS: Math.round(slippage * 100),
      client,
    };
    setQuoteParams(params);
    // Approval dan transaksi eksekusi handled di hooks/manual (lantas sendTransaction jika perlu)
  };

  return (
    <div className={styles.card}>
      <h2>Swap & Bridge Superchains (thirdweb v5)</h2>
      <div className={styles.row}>
        <label>From Chain:</label>
        <select
          value={fromChain.id}
          onChange={(e) =>
            setFromChain(SUPPORTED_CHAINS.find((c) => c.id == +e.target.value))
          }
        >
          {SUPPORTED_CHAINS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label>From Token:</label>
        <select
          value={fromToken.address}
          onChange={(e) =>
            setFromToken(
              TOKENLIST.find(
                (t) =>
                  t.address === e.target.value && t.chainId === fromChain.id,
              ),
            )
          }
        >
          {TOKENLIST.filter((t) => t.chainId === fromChain.id).map((t) => (
            <option key={t.address} value={t.address}>
              {t.symbol}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label>To Chain:</label>
        <select
          value={toChain.id}
          onChange={(e) =>
            setToChain(SUPPORTED_CHAINS.find((c) => c.id == +e.target.value))
          }
        >
          {SUPPORTED_CHAINS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label>To Token:</label>
        <select
          value={toToken.address}
          onChange={(e) =>
            setToToken(
              TOKENLIST.find(
                (t) => t.address === e.target.value && t.chainId === toChain.id,
              ),
            )
          }
        >
          {TOKENLIST.filter((t) => t.chainId === toChain.id).map((t) => (
            <option key={t.address} value={t.address}>
              {t.symbol}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label>Amount:</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min="0"
        />
      </div>
      <div className={styles.row}>
        <label>Slippage %:</label>
        <input
          value={slippage}
          onChange={(e) => setSlippage(Number(e.target.value))}
          type="number"
          min="0"
          max="10"
          step="0.1"
        />
      </div>
      <button
        className={styles.btn}
        onClick={handleSwap}
        disabled={buyQuote.isLoading}
      >
        Swap
      </button>
      {buyQuote.isLoading && <div>Loading quote…</div>}
      {buyQuote.data && (
        <div className={styles.info}>
          Min Received: {buyQuote.data?.swapDetails?.toAmountMin} (
          {buyQuote.data?.swapDetails?.toToken?.symbol})<br />
          Fee: $
          {Number(buyQuote.data?.swapDetails?.estimated?.feesUSDCents || 0) /
            100}
        </div>
      )}
      {txHash && <div className={styles.txstatus}>Tx Hash: {txHash}</div>}
    </div>
  );
}
