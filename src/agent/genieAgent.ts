import { filterAndSortMenu } from "../tools/menuFilterTool";
import type { GenieResponse, MenuSortBy } from "../types";

const PRICE_PATTERNS = [
  /(?:under|below|less than|cheaper than|max(?:imum)?)\s*\$?\s*(\d+(?:\.\d+)?)/i,
  /\$\s*(\d+(?:\.\d+)?)\s*(?:or less|and under)?/i,
  /(?:budget|spend)\s*(?:of|is)?\s*\$?\s*(\d+(?:\.\d+)?)/i
];

const TIME_PATTERNS = [
  /(?:under|below|in under|less than|within|in)\s*(\d+)\s*(?:min|mins|minutes?)/i,
  /(\d+)\s*(?:min|mins|minutes?)\s*(?:or less|and under)?/i,
  /(?:quick|fast|asap|soon|right now|hungry now)/i
];

function parseMaxPrice(query: string): number | undefined {
  for (const pattern of PRICE_PATTERNS) {
    const match = query.match(pattern);
    if (match?.[1]) return Number(match[1]);
  }
  return undefined;
}

function parseMaxPrepTime(query: string): number | undefined {
  for (const pattern of TIME_PATTERNS) {
    const match = query.match(pattern);
    if (match?.[1]) return Number(match[1]);
    if (pattern.source.includes("quick") && pattern.test(query)) return 20;
  }
  return undefined;
}

function parseSortBy(query: string): MenuSortBy {
  if (/cheap|lowest price|price|budget|affordable/i.test(query)) return "price_asc";
  if (/fast|quick|soonest|prep|wait|asap/i.test(query)) return "prep_time_asc";
  return "recommended";
}

function buildMessage(
  query: string,
  maxPrice: number | undefined,
  maxPrepTime: number | undefined,
  count: number
): string {
  const constraints: string[] = [];
  if (maxPrice !== undefined) constraints.push(`under $${maxPrice}`);
  if (maxPrepTime !== undefined) constraints.push(`ready in under ${maxPrepTime} mins`);

  if (count === 0) {
    return constraints.length
      ? `I couldn't find dishes ${constraints.join(" and ")}. Try relaxing the price or wait time.`
      : `I couldn't find matching dishes for “${query}”.`;
  }

  const intro = constraints.length
    ? `Here are ${count} option${count === 1 ? "" : "s"} ${constraints.join(" and ")}, with live kitchen times from Luna.`
    : `Here are ${count} dishes I recommend, with live kitchen times from Luna.`;

  return intro;
}

export function processGuestRequest(
  guestQuery: string,
  activeKitchenOrders: number
): GenieResponse {
  const maxPrice = parseMaxPrice(guestQuery);
  const maxPrepTime = parseMaxPrepTime(guestQuery);
  const sortBy = parseSortBy(guestQuery);

  const items = filterAndSortMenu({
    maxPrice,
    maxPrepTime,
    sortBy,
    activeKitchenOrders
  });

  return {
    guestQuery,
    interpretation: { maxPrice, maxPrepTime, sortBy },
    message: buildMessage(guestQuery, maxPrice, maxPrepTime, items.length),
    items
  };
}
