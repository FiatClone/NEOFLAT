import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar"; // ganti Header → Topbar

export default function HomePage() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div>
      <Topbar />
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}