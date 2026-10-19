import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { filterAndSortMenu } from "../tools/menuFilterTool";
import type { MenuSortBy } from "../types";
import { useGuest } from "../state/GuestContext";

export function DiningPage() {
  const { activeKitchenOrders, cart } = useGuest();
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [maxPrepTime, setMaxPrepTime] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<MenuSortBy>("recommended");

  const items = useMemo(
    () => filterAndSortMenu({ maxPrice, maxPrepTime, sortBy, activeKitchenOrders }),
    [maxPrice, maxPrepTime, sortBy, activeKitchenOrders]
  );

  const cartCount = cart.reduce((n, line) => n + line.qty, 0);

  return (
    <div className="page page--dining">
      <header className="dining-header">
        <Link to="/" className="icon-btn" aria-label="Back">
          ←
        </Link>
        <div className="segmented">
          <Link to="/orders" className="seg">
            Orders
          </Link>
          <span className="seg seg--active">Menu</span>
        </div>
        <Link to="/orders" className="icon-btn icon-btn--cart" aria-label="Cart">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M3 4h2l2.4 11h11L21 8H7" />
          </svg>
          {cartCount > 0 && <em>{cartCount}</em>}
        </Link>
      </header>

      <div className="filter-row">
        <button
          type="button"
          className={!maxPrice && !maxPrepTime ? "chip chip--on" : "chip"}
          onClick={() => {
            setMaxPrice(undefined);
            setMaxPrepTime(undefined);
            setSortBy("recommended");
          }}
        >
          All
        </button>
        <button
          type="button"
          className={maxPrice === 20 ? "chip chip--on" : "chip"}
          onClick={() => setMaxPrice(maxPrice === 20 ? undefined : 20)}
        >
          Under $20
        </button>
        <button
          type="button"
          className={maxPrepTime === 20 ? "chip chip--on" : "chip"}
          onClick={() => setMaxPrepTime(maxPrepTime === 20 ? undefined : 20)}
        >
          Under 20 min
        </button>
        <button
          type="button"
          className={sortBy === "price_asc" ? "chip chip--on" : "chip"}
          onClick={() => setSortBy("price_asc")}
        >
          Price ↑
        </button>
        <button
          type="button"
          className={sortBy === "prep_time_asc" ? "chip chip--on" : "chip"}
          onClick={() => setSortBy("prep_time_asc")}
        >
          Fastest
        </button>
      </div>

      <p className="luna-note">
        Times include Luna kitchen load ({activeKitchenOrders} tickets).
      </p>

      <ul className="menu-list">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`} className="menu-card">
              <img src={item.image} alt="" />
              <div>
                <div className="menu-card-top">
                  <strong>{item.name}</strong>
                  <span>${item.price}</span>
                </div>
                <p>{item.description}</p>
                <small>
                  Ready by {item.delivery_window} · {item.effective_prep_time_mins} min
                </small>
              </div>
            </Link>
          </li>
        ))}
        {items.length === 0 && (
          <li className="empty">No dishes match those filters with the current kitchen load.</li>
        )}
      </ul>
    </div>
  );
}
