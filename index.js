export default {
  async fetch(request, env, ctx) {
    try {
      const nzUrl = "https://raw.githubusercontent.com/cricstreamz745/Web-Iptv/refs/heads/main/output.json";

      const nzRes = await fetch(nzUrl);
      const nzData = await nzRes.json();

      const result = [];

      // Correct loop
      for (const item of nzData.channels) {
        const name = item.name;
        const thumb = item.thumb;
        const fetch_url = item.fetch_url;
        const kid = item.kid;
        const key = item.key;

        const mpdRes = await fetch(fetch_url, {
          headers: {
            "Referer": "https://webiptv.site/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "Origin": "https://webiptv.site",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
          }
        });

        const mpd = await mpdRes.text();

        result.push({
          name,
          thumb,
          mpd,
          kid,
          key
        });
      }

      return new Response(JSON.stringify(result, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }
};
