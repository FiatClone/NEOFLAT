// src/app/swap/Swap.tsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./swap.module.css";
import { useActiveAccount, useBuyWithCryptoQuote } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export default function Swap() {
  const account = useActiveAccount();
  const [chainlist, setChainlist] = useState([]);
  const [tokenlist, setTokenlist] = useState([]);
  const [fromChain, setFromChain] = useState(null);
  const [toChain, setToChain] = useState(null);
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);
  const [quoteParams, setQuoteParams] = useState();
  const [txHash, setTxHash] = useState();
  const [swapStatus, setSwapStatus] = useState(null);

  useEffect(() => {
    fetch("/api/chainlist")
      .then((r) => r.json())
      .then(setChainlist);
    fetch("/api/tokenlist")
      .then((r) => r.json())
      .then(setTokenlist);
  }, []);

  // Auto-pick chain/token
  useEffect(() => {
    if (chainlist.length && !fromChain && !toChain) {
      setFromChain(chainlist[0]);
      setToChain(chainlist[1] || chainlist[0]);
    }
  }, [chainlist]);
  useEffect(() => {
    if (fromChain && !fromToken) {
      setFromToken(tokenlist.find((t) => t.chainId === fromChain.id));
    }
  }, [fromChain, tokenlist]);
  useEffect(() => {
    if (toChain && !toToken) {
      setToToken(tokenlist.find((t) => t.chainId === toChain.id));
    }
  }, [toChain, tokenlist]);

  const buyQuote = useBuyWithCryptoQuote(quoteParams);

  async function handleSwap() {
    if (!account) return alert("Connect wallet!");
    if (!amount) return alert("Enter amount!");
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
    const res = await fetch("/api/swap", {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    });
    const post = await res.json();
    // [handle approval & exec on frontend where needed, per SDK]
    if (post.transactionRequest && window.thirdweb?.sendTransaction) {
      const swapTx = await window.thirdweb.sendTransaction(
        post.transactionRequest,
      );
      setTxHash(swapTx.transactionHash);
      setSwapStatus("pending");
    }
  }
  // Live tx status polling
  useEffect(() => {
    let poll;
    if (txHash) {
      poll = setInterval(async () => {
        const resp = await fetch(
          `/api/livetransaksi?txHash=${txHash}&chainId=${fromChain?.id}`,
        );
        const d = await resp.json();
        setSwapStatus(d.status);
        if (["success", "failed"].includes(d.status)) clearInterval(poll);
      }, 4000);
    }
    return () => clearInterval(poll);
  }, [txHash, fromChain?.id]);

  return (
    <div className={styles.card}>
      <h2>Swap & Bridge (Superchains)</h2>
      <div className={styles.row}>
        <label>From Chain:</label>
        <select
          value={fromChain?.id || ""}
          onChange={(e) => {
            setFromChain(chainlist.find((c) => c.id == +e.target.value));
            setFromToken(null);
          }}
        >
          {chainlist.map((c) => (
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label>From Token:</label>
        <select
          value={fromToken?.address || ""}
          onChange={(e) =>
            setFromToken(
              tokenlist.find(
                (t) =>
                  t.address === e.target.value && t.chainId === fromChain?.id,
              ),
            )
          }
        >
          {tokenlist
            .filter((t) => t.chainId === fromChain?.id)
            .map((tok) => (
              <option key={tok.address} value={tok.address}>
                {tok.symbol}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.row}>
        <label>To Chain:</label>
        <select
          value={toChain?.id || ""}
          onChange={(e) => {
            setToChain(chainlist.find((c) => c.id == +e.target.value));
            setToToken(null);
          }}
        >
          {chainlist.map((c) => (
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label>To Token:</label>
        <select
          value={toToken?.address || ""}
          onChange={(e) =>
            setToToken(
              tokenlist.find(
                (t) =>
                  t.address === e.target.value && t.chainId === toChain?.id,
              ),
            )
          }
        >
          {tokenlist
            .filter((t) => t.chainId === toChain?.id)
            .map((tok) => (
              <option key={tok.address} value={tok.address}>
                {tok.symbol}
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
          type="number"
          step="0.1"
          onChange={(e) => setSlippage(Number(e.target.value))}
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
          Min Received: {buyQuote.data?.swapDetails?.toAmountMin}(
          {buyQuote.data?.swapDetails?.toToken?.symbol})<br />
          Fee: $
          {Number(buyQuote.data?.swapDetails?.estimated?.feesUSDCents || 0) /
            100}
        </div>
      )}
      {txHash && (
        <div className={styles.txstatus}>
          Tx Hash:{" "}
          <a href={`${fromChain?.explorer}/tx/${txHash}`} target="_blank">
            {txHash.slice(0, 12)}…
          </a>
          <br />
          Status: {swapStatus || "Pending..."}
        </div>
      )}
    </div>
  );
}
