import { CheckoutWidget, getDefaultToken } from "thirdweb/react";
import { base } from "thirdweb/chains";

function App() {
  return (
    <CheckoutWidget
      client={THIRDWEB_CLIENT}
      theme="light"
      chain={base}
      amount={"2"}
      tokenAddress="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
      seller="0xEb0effdFB4dC5b3d5d3aC6ce29F3ED213E95d675"
      feePayer="seller"
      name="Concert Ticket"
      image="https://example.com/concert-ticket.jpg"
      description="Concert ticket for the upcoming show"
    />
  );
}
