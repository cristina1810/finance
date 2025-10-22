import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DcNrn0E0.mjs';
import { manifest } from './manifest_D4QduOMu.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/accounts/_accountid_.astro.mjs');
const _page2 = () => import('./pages/api/accounts.astro.mjs');
const _page3 = () => import('./pages/api/fixed-expenses/_id_.astro.mjs');
const _page4 = () => import('./pages/api/fixed-expenses.astro.mjs');
const _page5 = () => import('./pages/api/login.astro.mjs');
const _page6 = () => import('./pages/api/register.astro.mjs');
const _page7 = () => import('./pages/api/tags.astro.mjs');
const _page8 = () => import('./pages/api/transactions.astro.mjs');
const _page9 = () => import('./pages/dashboard.astro.mjs');
const _page10 = () => import('./pages/register.astro.mjs');
const _page11 = () => import('./pages/tags/_tagid_.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.14.5_@types+node@24_01fc4faff8f46247f8d1322977403965/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/accounts/[accountId].astro", _page1],
    ["src/pages/api/accounts.js", _page2],
    ["src/pages/api/fixed-expenses/[id].js", _page3],
    ["src/pages/api/fixed-expenses.js", _page4],
    ["src/pages/api/login.js", _page5],
    ["src/pages/api/register.js", _page6],
    ["src/pages/api/tags.js", _page7],
    ["src/pages/api/transactions.js", _page8],
    ["src/pages/dashboard.astro", _page9],
    ["src/pages/register.astro", _page10],
    ["src/pages/tags/[tagId].astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "13b308c9-3587-4bc5-80e1-1ce9454b2907",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
