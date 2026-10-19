import menuData from "../data/menu.json";
import {
  buildDeliveryLabel,
  formatDeliveryWindow,
  getEffectivePrepTime
} from "../services/lunaQueueService";
import type {
  FilterMenuOptions,
  MenuItem,
  MenuItemWithEstimate,
  MenuSortBy
} from "../types";

const menu = menuData as MenuItem[];

export function getMenu(): MenuItem[] {
  return menu;
}

export function withLunaEstimates(
  item: MenuItem,
  activeKitchenOrders: number,
  from?: Date
): MenuItemWithEstimate {
  const effective_prep_time_mins = getEffectivePrepTime(
    item.base_prep_time_mins,
    activeKitchenOrders
  );
  return {
    ...item,
    effective_prep_time_mins,
    delivery_window: formatDeliveryWindow(effective_prep_time_mins, from),
    delivery_label: buildDeliveryLabel(effective_prep_time_mins, from)
  };
}

function recommendedScore(item: MenuItemWithEstimate): number {
  return item.effective_prep_time_mins + item.price * 0.5;
}

function sortItems(items: MenuItemWithEstimate[], sortBy: MenuSortBy): MenuItemWithEstimate[] {
  const copy = [...items];
  switch (sortBy) {
    case "price_asc":
      return copy.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
    case "prep_time_asc":
      return copy.sort(
        (a, b) =>
          a.effective_prep_time_mins - b.effective_prep_time_mins || a.price - b.price
      );
    case "recommended":
    default:
      return copy.sort((a, b) => recommendedScore(a) - recommendedScore(b));
  }
}

export function filterAndSortMenu(options: FilterMenuOptions): MenuItemWithEstimate[] {
  const {
    maxPrice,
    maxPrepTime,
    sortBy = "recommended",
    activeKitchenOrders
  } = options;

  const estimated = menu.map((item) => withLunaEstimates(item, activeKitchenOrders));

  const filtered = estimated.filter((item) => {
    if (maxPrice !== undefined && item.price > maxPrice) return false;
    if (maxPrepTime !== undefined && item.effective_prep_time_mins > maxPrepTime) {
      return false;
    }
    return true;
  });

  return sortItems(filtered, sortBy);
}
