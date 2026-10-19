/**
 * Luna — staff SLA engine.
 * Inflates kitchen prep estimates from live queue load.
 *
 * effective_prep_time = base_prep_time + Math.floor(active_kitchen_orders / 5) * 5
 */
export function getKitchenLoadDelayMins(activeKitchenOrders: number): number {
  const load = Math.max(0, Math.floor(activeKitchenOrders));
  return Math.floor(load / 5) * 5;
}

export function getEffectivePrepTime(
  basePrepTimeMins: number,
  activeKitchenOrders: number
): number {
  return basePrepTimeMins + getKitchenLoadDelayMins(activeKitchenOrders);
}

export function formatDeliveryWindow(
  effectivePrepTimeMins: number,
  from: Date = new Date()
): string {
  const eta = new Date(from.getTime() + effectivePrepTimeMins * 60 * 1000);
  return eta.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
}

export function buildDeliveryLabel(effectivePrepTimeMins: number, from?: Date): string {
  return `Your order will be fulfilled by ${formatDeliveryWindow(effectivePrepTimeMins, from)}`;
}
