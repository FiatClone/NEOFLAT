import React from "react";
import { CheckoutWidget, getDefaultToken } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

// ✅ Buat Thirdweb Client
const client = createThirdwebClient({
  clientId: "91e2d2d514dd899aa83f2f028742a060", // masukkan dari env
});

export default function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-xl font-bold mb-4 text-center">🎫 Concert Ticket</h1>

        <CheckoutWidget
          client={client}
          theme="light"
          chain={base}
          amount=1 // gunakan number bukan string
          token={getDefaultToken(base)} // token default di Base chain
          tokenAddress="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
          seller="0xEb0effdFB4dC5b3d5d3aC6ce29F3ED213E95d675"
          feePayer="seller"
          name="Concert Ticket"
          image="https://example.com/concert-ticket.jpg"
          description="Concert ticket for the upcoming show"
        />
      </div>
    </div>
  );
}
