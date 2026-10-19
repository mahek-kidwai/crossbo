import { Link } from "react-router-dom";
import { useGuest } from "../state/GuestContext";

export function OrderPlacedPage() {
  const { lastOrder } = useGuest();
  const when = lastOrder?.fulfilledBy ?? "soon";

  return (
    <div className="page page--success">
      <header className="dining-header">
        <Link to="/" className="icon-btn" aria-label="Back">
          ←
        </Link>
        <Link to="/orders" className="orders-pill">
          Orders
        </Link>
      </header>

      <div className="success-body">
        <div className="success-check" aria-hidden>
          ✓
        </div>
        <h1 className="serif-title">Order Placed</h1>
        <p className="success-sub">
          Your order will be fulfilled by <strong>{when}</strong>
        </p>
      </div>

      <Link to="/" className="cta cta--bottom">
        GO TO HOME
      </Link>
    </div>
  );
}
