import { processGuestRequest } from "../src/agent/genieAgent";
import { getEffectivePrepTime } from "../src/services/lunaQueueService";
import { filterAndSortMenu, getMenu } from "../src/tools/menuFilterTool";

describe("menuFilterTool", () => {
  test("price filtering and low-to-high sorting work correctly", () => {
    const results = filterAndSortMenu({
      maxPrice: 20,
      sortBy: "price_asc",
      activeKitchenOrders: 0
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.price <= 20)).toBe(true);

    const prices = results.map((item) => item.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));

    expect(results[0].name).toBe("Tomato Bisque");
    expect(results.some((item) => item.name === "Lamb Shank")).toBe(false);
    expect(results.some((item) => item.name === "Butter Chicken")).toBe(true);
  });

  test("items exceeding max price or prep time are properly filtered out", () => {
    const results = filterAndSortMenu({
      maxPrice: 16,
      maxPrepTime: 18,
      sortBy: "price_asc",
      activeKitchenOrders: 0
    });

    expect(results.every((item) => item.price <= 16)).toBe(true);
    expect(results.every((item) => item.effective_prep_time_mins <= 18)).toBe(true);
    expect(results.some((item) => item.name === "Lamb Shank")).toBe(false);
    expect(results.some((item) => item.name === "Grilled Salmon")).toBe(false);
    expect(results.some((item) => item.name === "Caesar Salad")).toBe(true);
    expect(results.some((item) => item.name === "Club Sandwich")).toBe(true);
  });
});

describe("Luna kitchen load via Genie", () => {
  test("kitchen load in Luna dynamically inflates returned prep times in Genie", () => {
    const idle = processGuestRequest(
      "I'm hungry, show me options under $20 in under 20 mins",
      0
    );
    const busy = processGuestRequest(
      "I'm hungry, show me options under $20 in under 20 mins",
      12
    );

    expect(idle.interpretation.maxPrice).toBe(20);
    expect(idle.interpretation.maxPrepTime).toBe(20);
    expect(getEffectivePrepTime(20, 12)).toBe(30);

    const idleClub = idle.items.find((item) => item.name === "Club Sandwich");
    const busyClubLookup = filterAndSortMenu({
      sortBy: "price_asc",
      activeKitchenOrders: 12
    }).find((item) => item.name === "Club Sandwich");

    expect(idleClub).toBeDefined();
    expect(idleClub!.effective_prep_time_mins).toBe(15);
    expect(busyClubLookup!.effective_prep_time_mins).toBe(15 + Math.floor(12 / 5) * 5);
    expect(busyClubLookup!.effective_prep_time_mins).toBeGreaterThan(
      idleClub!.effective_prep_time_mins
    );

    const inflatedOut = busy.items.find((item) => item.name === "Club Sandwich");
    expect(inflatedOut).toBeUndefined();

    const menu = getMenu();
    const butter = menu.find((item) => item.name === "Butter Chicken")!;
    expect(getEffectivePrepTime(butter.base_prep_time_mins, 9)).toBe(25);
  });
});
