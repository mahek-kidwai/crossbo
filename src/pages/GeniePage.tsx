import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { processGuestRequest } from "../agent/genieAgent";
import { useGuest } from "../state/GuestContext";
import type { GenieResponse } from "../types";

const SUGGESTIONS = [
  "I'm hungry, show me options under $20 in under 20 mins",
  "What's the cheapest thing on the menu?",
  "Fast vegetarian dishes"
];

export function GeniePage() {
  const { activeKitchenOrders } = useGuest();
  const [query, setQuery] = useState(SUGGESTIONS[0]);
  const [result, setResult] = useState<GenieResponse | null>(null);

  function run(q: string) {
    setResult(processGuestRequest(q, activeKitchenOrders));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(query);
  }

  return (
    <div className="page page--genie">
      <header className="dining-header">
        <Link to="/" className="icon-btn" aria-label="Back">
          ←
        </Link>
        <h1 className="header-name">Genie</h1>
        <span />
      </header>

      <p className="genie-intro">
        Ask me for dishes by price or wait time. I’ll check Luna’s live kitchen queue.
      </p>

      <div className="suggestions">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setQuery(s);
              run(s);
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <form className="genie-form" onSubmit={onSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you in the mood for?"
        />
        <button type="submit">Ask</button>
      </form>

      {result && (
        <div className="genie-result">
          <p>{result.message}</p>
          <ul className="menu-list">
            {result.items.map((item) => (
              <li key={item.id}>
                <Link to={`/item/${item.id}`} className="menu-card">
                  <img src={item.image} alt="" />
                  <div>
                    <div className="menu-card-top">
                      <strong>{item.name}</strong>
                      <span>${item.price}</span>
                    </div>
                    <small>
                      {item.effective_prep_time_mins} min · {item.delivery_window}
                    </small>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
