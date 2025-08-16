import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function HomePage() {
  const [activePage, setActivePage] = useState("home");
    return (
        <div>
              <Sidebar activePage={activePage} setActivePage={setActivePage} />
                    {/* Tambah konten lain di sini */}
                        </div>
                          );
                          }
                          