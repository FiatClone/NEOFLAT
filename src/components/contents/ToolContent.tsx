import React from "react";
// Use thirdweb hooks for staking if available
const ToolContent: React.FC = () => (
  <div style={{ textAlign: "center" }}>
    <h2 style={{ color: "#e0e7ff" }}>Staking / Lab</h2>
    <p style={{ color: "#cbd4ff" }}>
      Stake your NFTs to earn rewards. (Integrate thirdweb staking contract
      here.)
    </p>
    {/* Example: <Web3Button contractAddress="0x..." action={...}>Stake NFT</Web3Button> */}
  </div>
);
export default ToolContent;
