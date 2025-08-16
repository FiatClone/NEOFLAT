
import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  const [activePage, setActivePage] = useState("home");
    return (
        <div>
              <Sidebar activePage={activePage} setActivePage={setActivePage} />
                  </div>
                    );
                    }
                    