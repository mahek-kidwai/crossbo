import { Link, useNavigate } from "react-router-dom";
import { useGuest } from "../state/GuestContext";
import { withLunaEstimates } from "../tools/menuFilterTool";

export function OrdersPage() {
  const { cart, lastOrder, placeOrder, activeKitchenOrders } = useGuest();
  const navigate = useNavigate();

  const liveCart = cart.map((line) => ({
    ...line,
    item: withLunaEstimates(line.item, activeKitchenOrders)
  }));

  const total = liveCart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  return (
    <div className="page">
      <header className="dining-header">
        <Link to="/dining" className="icon-btn" aria-label="Back">
          ←
        </Link>
        <div className="segmented">
          <span className="seg seg--active">Orders</span>
          <Link to="/dining" className="seg">
            Menu
          </Link>
        </div>
        <span className="icon-btn icon-btn--cart" />
      </header>

      <h1 className="serif-title serif-title--sm">Your tray</h1>

      {liveCart.length === 0 && (
        <p className="empty">Your cart is empty. Add something from the menu.</p>
      )}

      <ul className="order-list">
        {liveCart.map((line) => (
          <li key={line.item.id}>
            <img src={line.item.image} alt="" />
            <div>
              <strong>
                {line.qty}× {line.item.name}
              </strong>
              <small>Ready by {line.item.delivery_window}</small>
            </div>
            <span>${line.item.price * line.qty}</span>
          </li>
        ))}
      </ul>

      {liveCart.length > 0 && (
        <>
          <div className="total-row">
            <span>Total</span>
            <strong>${total}</strong>
          </div>
          <button
            className="cta"
            type="button"
            onClick={() => {
              placeOrder();
              navigate("/order-placed");
            }}
          >
            Place order
          </button>
        </>
      )}

      {lastOrder && (
        <section className="past-order">
          <h2>Last order</h2>
          <p>Fulfilled by {lastOrder.fulfilledBy}</p>
        </section>
      )}
    </div>
  );
}
