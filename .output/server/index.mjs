globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon-16x16.png": {
		"type": "image/png",
		"etag": "\"1c9-fnFmcxq0Es6Pnh8QsHGuchTYXjE\"",
		"mtime": "2026-07-05T20:11:06.587Z",
		"size": 457,
		"path": "../public/favicon-16x16.png"
	},
	"/favicon-32x32.png": {
		"type": "image/png",
		"etag": "\"4dc-IujJMcQNpMidaLSn3Mve87LKNFc\"",
		"mtime": "2026-07-05T20:11:06.587Z",
		"size": 1244,
		"path": "../public/favicon-32x32.png"
	},
	"/favicon-48x48.png": {
		"type": "image/png",
		"etag": "\"9f9-QV9FxHkVws/xMVKbisP5UTWwke8\"",
		"mtime": "2026-07-05T20:11:06.584Z",
		"size": 2553,
		"path": "../public/favicon-48x48.png"
	},
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"77f7-BIEMY1fUKQApmvZwFv0wi/mKHZs\"",
		"mtime": "2026-07-05T20:11:06.579Z",
		"size": 30711,
		"path": "../public/apple-touch-icon.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"10d4-MS5Yf3yxbdlElZyZAcr3anfFIHc\"",
		"mtime": "2026-07-05T20:11:06.723Z",
		"size": 4308,
		"path": "../public/favicon.ico"
	},
	"/logo-dark.svg": {
		"type": "image/svg+xml",
		"etag": "\"33a-hOGkAk57Td3rMvnD0VbFmgBM8lU\"",
		"mtime": "2026-07-05T18:27:17.814Z",
		"size": 826,
		"path": "../public/logo-dark.svg"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"133-4uZKn5JAhd70hkDNFeiZ1RozIlk\"",
		"mtime": "2026-07-05T18:25:18.338Z",
		"size": 307,
		"path": "../public/favicon.svg"
	},
	"/logo-light.svg": {
		"type": "image/svg+xml",
		"etag": "\"33b-KtI0e8hNMp1kQjWdc0wuh2gAc80\"",
		"mtime": "2026-07-05T18:27:18.979Z",
		"size": 827,
		"path": "../public/logo-light.svg"
	},
	"/logo-icon.svg": {
		"type": "image/svg+xml",
		"etag": "\"230-lbC0kwxKolwAYPL6DI60p4Tqif8\"",
		"mtime": "2026-07-05T18:25:17.805Z",
		"size": 560,
		"path": "../public/logo-icon.svg"
	},
	"/og-image.svg": {
		"type": "image/svg+xml",
		"etag": "\"699-IpTjREDaiL8bOyXSvJ1h4x1umUI\"",
		"mtime": "2026-07-05T18:25:25.739Z",
		"size": 1689,
		"path": "../public/og-image.svg"
	},
	"/logo-icon.png": {
		"type": "image/png",
		"etag": "\"1b15a-Zu62egZlDI+u5nkffrXxZx4JMbI\"",
		"mtime": "2026-07-05T20:11:06.571Z",
		"size": 110938,
		"path": "../public/logo-icon.png"
	},
	"/logo-full.svg": {
		"type": "image/svg+xml",
		"etag": "\"3b4-glP9Bmlotvw80Zbz5ZB/EMWoirM\"",
		"mtime": "2026-07-05T18:25:16.681Z",
		"size": 948,
		"path": "../public/logo-full.svg"
	},
	"/logo-wordmark.svg": {
		"type": "image/svg+xml",
		"etag": "\"1b6-n1pTt4RPkNtqodipI1+CL72N7bg\"",
		"mtime": "2026-07-05T18:27:16.701Z",
		"size": 438,
		"path": "../public/logo-wordmark.svg"
	},
	"/logo-full.png": {
		"type": "image/png",
		"etag": "\"530e2-Lrd/7ysqtQT4PTVrBXxHsDonioA\"",
		"mtime": "2026-07-05T20:09:14.965Z",
		"size": 340194,
		"path": "../public/logo-full.png"
	},
	"/team/aditya.jpg": {
		"type": "image/jpeg",
		"etag": "\"2060b-y+zgm5UbI9kB5hsQ+Ruzk4IuLLo\"",
		"mtime": "2026-07-05T20:02:34.909Z",
		"size": 132619,
		"path": "../public/team/aditya.jpg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"46-3AI3rosUZ2StCL0PRjWEIwIRthY\"",
		"mtime": "2026-07-05T18:25:25.751Z",
		"size": 70,
		"path": "../public/robots.txt"
	},
	"/team/arnav.jpg": {
		"type": "image/jpeg",
		"etag": "\"108e7-QONtxqTIsRqvo5JGDKtOC+yB9+0\"",
		"mtime": "2026-07-05T20:02:34.918Z",
		"size": 67815,
		"path": "../public/team/arnav.jpg"
	},
	"/assets/arrow-left-DBuL1d22.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-z1hkb6V88zHCpdVGZGEwvENwQp4\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 154,
		"path": "../public/assets/arrow-left-DBuL1d22.js"
	},
	"/assets/about-CGkXbDxY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1455-fvEou7pLxFqFtYZJfEogXrZKuCk\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 5205,
		"path": "../public/assets/about-CGkXbDxY.js"
	},
	"/team/pragalbh.jpg": {
		"type": "image/jpeg",
		"etag": "\"fd5e-AdtEdReu/O3jvJIZ7c92ER1t2hw\"",
		"mtime": "2026-07-05T20:02:34.889Z",
		"size": 64862,
		"path": "../public/team/pragalbh.jpg"
	},
	"/team/sanskriti.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a264-CZlLCUXN3lfDSq14AXdFCCP73yk\"",
		"mtime": "2026-07-05T20:02:34.895Z",
		"size": 107108,
		"path": "../public/team/sanskriti.jpg"
	},
	"/assets/arrow-right-D1-WdWkq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-s0zGAzlO8OYc97thswq2i/iiqqQ\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 154,
		"path": "../public/assets/arrow-right-D1-WdWkq.js"
	},
	"/assets/chatbot-BdOxWa1G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2589-iiZ4qgy1IgiiL0md3KpKCON5Hns\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 9609,
		"path": "../public/assets/chatbot-BdOxWa1G.js"
	},
	"/team/siddhi.jpg": {
		"type": "image/jpeg",
		"etag": "\"2d1e5-3jxrQaStAgoq5T3ngRYyG1GjIfM\"",
		"mtime": "2026-07-05T20:02:34.892Z",
		"size": 184805,
		"path": "../public/team/siddhi.jpg"
	},
	"/assets/contact-jsJRTn-h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110a6-LSQmCG2B/nENyjbakc0gueL3rKE\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 69798,
		"path": "../public/assets/contact-jsJRTn-h.js"
	},
	"/assets/mail-BshskZkQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-jOWwZe3e+EbGeGrv9ssRmQ9yTzc\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 202,
		"path": "../public/assets/mail-BshskZkQ.js"
	},
	"/assets/react-Ca03aNmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209c-USFuEbwY5iMmvZ/V4vj+KOHLghg\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 8348,
		"path": "../public/assets/react-Ca03aNmg.js"
	},
	"/assets/reveal-BgVUd8Px.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17c-yJy+5FkDyd45Dh4+caBzTiQo88k\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 380,
		"path": "../public/assets/reveal-BgVUd8Px.js"
	},
	"/assets/portrait-Ds6PtVhb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"375-y1UuySQWNSRrWFu7NVHmMFvRvkY\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 885,
		"path": "../public/assets/portrait-Ds6PtVhb.js"
	},
	"/assets/services-DDlNvsv1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6f-GAvnuwMd49P0Euk6Kr2RjAUZf4s\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 3439,
		"path": "../public/assets/services-DDlNvsv1.js"
	},
	"/assets/routes-CDNoHF1v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3258-+1KQAWr48KzAqPy3XTQJ1YXxgvI\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 12888,
		"path": "../public/assets/routes-CDNoHF1v.js"
	},
	"/assets/team-p90XGGJn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66-hljVXdnQKG3Fq++RGkiMObFS1rE\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 102,
		"path": "../public/assets/team-p90XGGJn.js"
	},
	"/assets/team.index-BkyIEgIJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35f5-3xzGXM1cu7lUbuhQwF7B+slXv00\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 13813,
		"path": "../public/assets/team.index-BkyIEgIJ.js"
	},
	"/assets/styles-BjIFEstH.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1b8f9-i2E8IGTcuvR7ULLE6TOV26MRYAo\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 112889,
		"path": "../public/assets/styles-BjIFEstH.css"
	},
	"/assets/team._slug-Cd7RIlW4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d3-OD54Mto8Vhc37PZAFWy3Gk9bWkk\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 723,
		"path": "../public/assets/team._slug-Cd7RIlW4.js"
	},
	"/assets/team._slug-BacApDrw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bf8-UsaCmAncXm8v69ktJryvjOJtc0Y\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 7160,
		"path": "../public/assets/team._slug-BacApDrw.js"
	},
	"/assets/team._slug-C6E6WWzB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2-j5t/ppIeVdCfAXw/vqKED3YvL4Q\"",
		"mtime": "2026-07-05T21:13:50.612Z",
		"size": 418,
		"path": "../public/assets/team._slug-C6E6WWzB.js"
	},
	"/assets/index-DYYt4jMA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80d12-bdy6fBik0dfiM4reLY0WCdZj7FQ\"",
		"mtime": "2026-07-05T21:13:50.611Z",
		"size": 527634,
		"path": "../public/assets/index-DYYt4jMA.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_f6cpbo = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_f6cpbo
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
