import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { useState } from "react";
import { DefaultDeserializer } from "v8";

export default function HomePage() {
  const [activePage, setActivePage] = useState("home");
    return (
        <div>
          <Header />
              <Sidebar activePage={activePage} setActivePage={setActivePage} />
                    {/* Tambah konten lain di sini */}
                        </div>
                          );
                          }
                          