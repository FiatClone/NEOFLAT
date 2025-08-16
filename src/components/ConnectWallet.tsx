import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "91e2d2d514dd899aa83f2f028742a060",
});

const wallets = [createWallet("walletConnect")];

function ConnectWallet() {
  return (
    <ConnectButton
      client={client}
      connectModal={{ showThirdwebBranding: false, size: "wide" }}
      theme={darkTheme({
        colors: {
          modalBg: "hsl(228, 64%, 53%)",
          borderColor: "hsl(0, 100%, 3%)",
          selectedTextBg: "hsl(240, 85%, 58%)",
          primaryButtonBg: "hsl(240, 70%, 49%)",
          secondaryIconColor: "hsl(251, 100%, 99%)",
          selectedTextColor: "hsl(234, 33%, 94%)",
          primaryButtonText: "hsl(228, 100%, 97%)",
        },
      })}
      wallets={wallets}
    />
  );
}

export default ConnectWallet;
        
