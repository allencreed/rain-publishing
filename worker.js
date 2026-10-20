// Serve static assets; fall back to index.html for unknown paths
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetRequest = new Request(url.origin + url.pathname, request);
    const asset = await env.ASSETS.fetch(assetRequest);
    if (asset.status !== 404) return asset;
    return env.ASSETS.fetch(new Request(url.origin + '/index.html', { method: 'GET' }));
  },
};
