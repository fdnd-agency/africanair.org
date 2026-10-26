<script>
  import API from "$lib/assets/images/API.svg";
  import Cloud from "$lib/assets/images/Cloud.svg";
  import Disclaimer from "$lib/assets/images/Disclaimer.svg";
  import Document from "$lib/assets/images/Document.svg";

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
        {
          name: "&page=X",
          text: "Page number (default: 1)",
          name: "&limit=X",
          text: "Points per page (default: 50 max: 200)",
        },
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
    // TODO ADDING THE REST OF THE DATA. (filtering by point number)
  ];
</script>

<main>
  <h1>Share data</h1>
  <section></section>
</main>

<style>
</style>
