import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { PhoneShell } from "./components/PhoneShell";
import { DiningPage } from "./pages/DiningPage";
import { GeniePage } from "./pages/GeniePage";
import { HomePage } from "./pages/HomePage";
import { ItemPage } from "./pages/ItemPage";
import { OrderPlacedPage } from "./pages/OrderPlacedPage";
import { OrdersPage } from "./pages/OrdersPage";

export function App() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/item") || location.pathname === "/order-placed";

  return (
    <PhoneShell>
      <div className={`app-screen ${hideNav ? "app-screen--flush" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/genie" element={<GeniePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order-placed" element={<OrderPlacedPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {!hideNav && <BottomNav />}
      </div>
    </PhoneShell>
  );
}
