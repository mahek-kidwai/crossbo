export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  base_prep_time_mins: number;
  description: string;
  dietary: string[];
  image: string;
}

export type MenuSortBy = "price_asc" | "prep_time_asc" | "recommended";

export interface FilterMenuOptions {
  maxPrice?: number;
  maxPrepTime?: number;
  sortBy?: MenuSortBy;
  activeKitchenOrders: number;
}

export interface MenuItemWithEstimate extends MenuItem {
  effective_prep_time_mins: number;
  delivery_window: string;
  delivery_label: string;
}

export interface GenieResponse {
  guestQuery: string;
  interpretation: {
    maxPrice?: number;
    maxPrepTime?: number;
    sortBy: MenuSortBy;
  };
  message: string;
  items: MenuItemWithEstimate[];
}
