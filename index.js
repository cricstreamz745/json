export default {
  async fetch(request) {
    const SOURCE_URL = "https://raw.githubusercontent.com/cricstreamz745/Web-Iptv/refs/heads/main/output.json";

    try {
      const res = await fetch(SOURCE_URL);
      const data = await res.json();

      const filtered = data.map(item => ({
        name: item.name,
        mpd: item.mpd,
        kid: item.kid,
        key: item.key
      }));

      return new Response(JSON.stringify(filtered, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.toString() }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
