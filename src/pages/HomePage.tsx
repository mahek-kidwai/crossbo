import { Link } from "react-router-dom";
import { useGuest } from "../state/GuestContext";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function HomePage() {
  const { guestName, activeKitchenOrders, setActiveKitchenOrders } = useGuest();

  return (
    <div className="page page--home">
      <header className="home-top">
        <button className="pill-ghost" type="button">
          Requests
        </button>
      </header>

      <h1 className="serif-title">
        {greeting()}, {guestName}
      </h1>

      <div className="alert-card">
        <div>
          <p>Your Spa appointment in 30 mins. Get ready!</p>
          <span className="muted">2 mins ago</span>
        </div>
      </div>

      <div className="service-row">
        <Link to="/dining" className="service-btn">
          <span className="service-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M4 18h16M6 18V9l6-4 6 4v9" />
              <path d="M9 18v-5h6v5" />
            </svg>
          </span>
          IN-ROOM DINING
        </Link>
        <button className="service-btn" type="button">
          <span className="service-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M14 4l6 6" />
              <path d="M13 7l4 4-8 8H5v-4l8-8z" />
            </svg>
          </span>
          HOUSEKEEPING
        </button>
      </div>

      <section>
        <h2 className="section-label">
          <span className="spark">✦</span> In the spotlight
        </h2>
        <div className="spotlight-row">
          <article className="spotlight-card" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80)" }}>
            <div className="spotlight-body">
              <h3>Wellness</h3>
              <p>Enjoy from massage therapies to Hammam & spa – packages</p>
              <div className="spotlight-actions">
                <button type="button">EXPLORE</button>
                <span className="promo">15% OFF ON MASSAGE THERAPY</span>
              </div>
            </div>
          </article>
          <article className="spotlight-card" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80)" }}>
            <div className="spotlight-body">
              <h3>Gourmet</h3>
              <p>Enjoy some of our best restaurant plates, now in-room.</p>
              <div className="spotlight-actions">
                <Link to="/dining">EXPLORE</Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section>
        <h2 className="section-label">
          <span className="spark">✦</span> Quick actions
        </h2>
        <div className="chips">
          <button type="button">Explore El Gouna</button>
          <Link to="/dining">Order lunch</Link>
          <button type="button">Order hand towels</button>
          <button type="button">Get water bottles</button>
          <button type="button">Order pillows</button>
          <button type="button">Order hand towels</button>
        </div>
      </section>

      <label className="kitchen-slider">
        <span>
          Luna kitchen load · <strong>{activeKitchenOrders}</strong> active orders
        </span>
        <input
          type="range"
          min={0}
          max={20}
          value={activeKitchenOrders}
          onChange={(e) => setActiveKitchenOrders(Number(e.target.value))}
        />
      </label>
    </div>
  );
}
