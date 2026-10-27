const base = "https://africanair.org/kumasi/api/public";

const documentation = [
  {
    title: "Base endpoints",
    text: "Root url for all API requests",
    examples: [{ request: `GET ${base}/` }],
  },
  {
    title: "Authentication",
    text: "All requests require an API key",
    code: ["?apikey=YOUR_KEY"],
    examples: [{ request: `GET ${base}/data?apiKey=YOUR_KEY` }],
  },
  {
    title: "Pagination",
    text: "Controls results per page",
    code: ["&page=2&limit=5"],
    params: [
      { name: "&page=X", text: "Page number (default: 1)" },
      { name: "&limit=X", text: "Points per page (default: 50 max: 200)" },
    ],
    examples: [
      {
        label: "For page 2 with a max of 5 points per page",
        request: `GET ${base}/data?apiKey=YOUR_KEY&page=2&limit=5`,
      },
    ],
  },
  {
    title: "Filtering by activity status",
    text: "Filters by activity, point, mont, etc.",
    description: "Filter points by whether they are active.",
    code: "&active=true",
    params: [
      { name: "&active=true", text: "Only active points" },
      { name: "&active=false", text: "Only inactive points" },
      { name: "&active=all", text: "All points (default)" },
    ],
    examples: [
      {
        label: "For only the active points",
        request: `GET ${base}/data?apiKey=YOUR_KEY&active=true`,
      },
    ],
  },
  {
    title: "Filtering by point numbers",
    text: "Retrieve specific measurement points",
    description: "Retrieve one or more specific measurement points.",
    code: ["&point=14", "&pointMin=5&pointMax=10"],
    params: [
      { name: "&point=X", text: "For an exact point number." },
      { name: "&pointMin=X", text: "Minimum point number." },
      { name: "&pointMax=X", text: "Maximum point number." },
    ],
    examples: [
      {
        label: "For point 14",
        request: `GET ${base}/data?apiKey=YOUR_KEY&point=14`,
      },
      {
        label: "For the points 5, 6, 7, 8, 9 and 10",
        request: `GET ${base}/data?apiKey=YOUR_KEY&pointMin=5&pointMax=10`,
      },
    ],
  },
  {
    title: "Including measurements",
    text: "Add measurement data to the response",
    description:
      "by default, measurement data is not included to save data traffic.",
    code: "&includeMeasurements=true",
    examples: [
      {
        label: "To include measurements",
        request: `GET ${base}/data?apiKey=YOUR_KEY&includeMeasurements=true`,
      },
    ],
  },
  {
    title: "Filtering measurements by month",
    text: "Filter measurements with a month range",
    description: "Filter measurements using a month range (YYYY-MM).",
    code: ["&mFrom=2025-9&mTo=2025-11"],
    params: [
      { name: "&mFrom=YYYY-MM", text: "first month" },
      { name: "&mTo=YYYY-MM", text: "Last month" },
    ],
    examples: [
      {
        label: "For the measurements from 9-2025 till 11-2025",
        request: `GET ${base}/data?apiKey=YOUR_KEY&includeMeasurements=true&mFrom=2025-9&mTo=2025-11`,
      },
      {
        label: "For the measurements from 11-2025",
        request: `GET ${base}/data?apiKey=YOUR_KEY&includeMeasurements=true&mFrom=2025-11&mTo=2025-11`,
      },
    ],
  },
  {
    title: "Latest measurement only",
    text: "Only the most recent measurement per point.",
    description: "Return only the most recent measurement per point.",
    code: ["&latestOnly=true"],
    examples: [
      {
        label: "To only return the latest measurements",
        request: `GET ${base}/data?apiKey=YOUR_KEY&includeMeasurements=true&latestOnly=true`,
      },
    ],
  },
  {
    title: "Limit measurements per point",
    text: "Restrict the number of measurements",
    description:
      "Restrict the number of measurements returned per point. It always picks the latest X measurements.",
    code: ["&mLimit=6"],
    params: [{ name: "&mLimit=X", text: "Number of measurements per point" }],
    examples: [
      {
        label: "To only get 6 measurements per point",
        request: `GET ${base}/data?apiKey=YOUR_KEY&includeMeasurements=true&mLimit=6`,
      },
    ],
  },
];

export function load() {
  return { documentation };
}
