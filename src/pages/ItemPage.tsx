import { Link, useNavigate, useParams } from "react-router-dom";
import { getMenu, withLunaEstimates } from "../tools/menuFilterTool";
import { useGuest } from "../state/GuestContext";

const dietIcons: Record<string, string> = {
  Egg: "🥚",
  Dairy: "🥛",
  Vegetarian: "🌿",
  Gluten: "🌾"
};

export function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeKitchenOrders, addToCart, cart } = useGuest();
  const raw = getMenu().find((item) => item.id === id);
  const item = raw ? withLunaEstimates(raw, activeKitchenOrders) : undefined;
  const cartCount = cart.reduce((n, line) => n + line.qty, 0);

  if (!item) {
    return (
      <div className="page">
        <p>Dish not found.</p>
        <Link to="/dining">Back to menu</Link>
      </div>
    );
  }

  return (
    <div className="page page--item">
      <div className="hero" style={{ backgroundImage: `url(${item.image})` }}>
        <header className="dining-header dining-header--overlay">
          <button className="icon-btn" type="button" onClick={() => navigate(-1)} aria-label="Back">
            ←
          </button>
          <div className="segmented">
            <Link to="/orders" className="seg">
              Orders
            </Link>
            <Link to="/dining" className="seg seg--active">
              Menu
            </Link>
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
      </div>

      <div className="sheet">
        <div className="sheet-card">
          <div className="sheet-title-row">
            <h1>{item.name}</h1>
            <div className="price-add">
              <span>{item.price} $</span>
              <button
                type="button"
                className="add-btn"
                onClick={() => addToCart(item)}
              >
                ADD
              </button>
            </div>
          </div>
          <p className="sheet-desc">{item.description}</p>
        </div>

        <div className="dietary-card">
          <h2>Dietary information</h2>
          <ul>
            {item.dietary.map((tag) => (
              <li key={tag}>
                <span>{dietIcons[tag] ?? "•"}</span>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <p className="eta-line">Luna estimate · ready by {item.delivery_window}</p>
      </div>
    </div>
  );
}
