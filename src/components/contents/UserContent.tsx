import React from "react";

import ConnectWallet from "../ConnectWallet";

const User = () => {
  return (
    <>

      <div style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
        <ConnectWallet />
      </div>
    </>
  );
};

export default User;
