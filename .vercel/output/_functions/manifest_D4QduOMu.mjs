import { n as decodeKey } from './chunks/astro/server_xzqXscmh.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C32Sd7Cw.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/cris/Desktop/jajaja/finance/","cacheDir":"file:///C:/Users/cris/Desktop/jajaja/finance/node_modules/.astro/","outDir":"file:///C:/Users/cris/Desktop/jajaja/finance/dist/","srcDir":"file:///C:/Users/cris/Desktop/jajaja/finance/src/","publicDir":"file:///C:/Users/cris/Desktop/jajaja/finance/public/","buildClientDir":"file:///C:/Users/cris/Desktop/jajaja/finance/dist/client/","buildServerDir":"file:///C:/Users/cris/Desktop/jajaja/finance/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.14.5_@types+node@24_01fc4faff8f46247f8d1322977403965/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_accountId_.ICGU12vp.css"}],"routeData":{"route":"/accounts/[accountid]","isIndex":false,"type":"page","pattern":"^\\/accounts\\/([^/]+?)\\/?$","segments":[[{"content":"accounts","dynamic":false,"spread":false}],[{"content":"accountId","dynamic":true,"spread":false}]],"params":["accountId"],"component":"src/pages/accounts/[accountId].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/accounts","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/accounts\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"accounts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/accounts.js","pathname":"/api/accounts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/fixed-expenses/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/fixed-expenses\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"fixed-expenses","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/fixed-expenses/[id].js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/fixed-expenses","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/fixed-expenses\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"fixed-expenses","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/fixed-expenses.js","pathname":"/api/fixed-expenses","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/login.js","pathname":"/api/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/register.js","pathname":"/api/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/tags","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/tags\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/tags.js","pathname":"/api/tags","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/transactions","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/transactions\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"transactions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/transactions.js","pathname":"/api/transactions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_accountId_.ICGU12vp.css"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_accountId_.ICGU12vp.css"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_accountId_.ICGU12vp.css"}],"routeData":{"route":"/tags/[tagid]","isIndex":false,"type":"page","pattern":"^\\/tags\\/([^/]+?)\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}],[{"content":"tagId","dynamic":true,"spread":false}]],"params":["tagId"],"component":"src/pages/tags/[tagId].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_accountId_.ICGU12vp.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/cris/Desktop/jajaja/finance/src/pages/accounts/[accountId].astro",{"propagation":"none","containsHead":true}],["C:/Users/cris/Desktop/jajaja/finance/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/cris/Desktop/jajaja/finance/src/pages/register.astro",{"propagation":"none","containsHead":true}],["C:/Users/cris/Desktop/jajaja/finance/src/pages/tags/[tagId].astro",{"propagation":"none","containsHead":true}],["C:/Users/cris/Desktop/jajaja/finance/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/accounts/[accountId]@_@astro":"pages/accounts/_accountid_.astro.mjs","\u0000@astro-page:src/pages/api/accounts@_@js":"pages/api/accounts.astro.mjs","\u0000@astro-page:src/pages/api/fixed-expenses/[id]@_@js":"pages/api/fixed-expenses/_id_.astro.mjs","\u0000@astro-page:src/pages/api/fixed-expenses@_@js":"pages/api/fixed-expenses.astro.mjs","\u0000@astro-page:src/pages/api/login@_@js":"pages/api/login.astro.mjs","\u0000@astro-page:src/pages/api/register@_@js":"pages/api/register.astro.mjs","\u0000@astro-page:src/pages/api/tags@_@js":"pages/api/tags.astro.mjs","\u0000@astro-page:src/pages/api/transactions@_@js":"pages/api/transactions.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/tags/[tagId]@_@astro":"pages/tags/_tagid_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.14.5_@types+node@24_01fc4faff8f46247f8d1322977403965/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D4QduOMu.mjs","C:/Users/cris/Desktop/jajaja/finance/node_modules/.pnpm/astro@5.14.5_@types+node@24_01fc4faff8f46247f8d1322977403965/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Bzubn-xC.mjs","C:/Users/cris/Desktop/jajaja/finance/src/components/AccountPage.jsx":"_astro/AccountPage.DTzEOfcM.js","C:/Users/cris/Desktop/jajaja/finance/src/components/DashboardWrapper.jsx":"_astro/DashboardWrapper.Yd24PA0s.js","C:/Users/cris/Desktop/jajaja/finance/src/components/RegisterWrapper.jsx":"_astro/RegisterWrapper.DlgYB3Uz.js","C:/Users/cris/Desktop/jajaja/finance/src/components/TagDetailWrapper.jsx":"_astro/TagDetailWrapper.CI1I1HhI.js","C:/Users/cris/Desktop/jajaja/finance/src/components/LoginWrapper.jsx":"_astro/LoginWrapper.DTH1pP04.js","@astrojs/react/client.js":"_astro/client.BfPWZUkF.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_accountId_.ICGU12vp.css","/favicon.svg","/_astro/AccountPage.DTzEOfcM.js","/_astro/client.BfPWZUkF.js","/_astro/createLucideIcon.ClAPqpDn.js","/_astro/DashboardWrapper.Yd24PA0s.js","/_astro/index.Cd_vQiNd.js","/_astro/LoginWrapper.DTH1pP04.js","/_astro/piggy-bank.CXGFvx4a.js","/_astro/RegisterWrapper.DlgYB3Uz.js","/_astro/TagDetailWrapper.CI1I1HhI.js","/_astro/TransactionItem.D_EuIu2l.js","/_astro/useSwipe.n3usG_jg.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"kqNF0YToIoCKK2KorkPugqbIlZs+aIMv2b0ubpFdp/Q="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
