const http = require("http");
const Router = require("./router");

const router = new Router();

const server = http.createServer(async (req, res) => {
    await router.processMiddlewares(req, res); // Run all middlewares

    const matchedRoute = router.matchRoute(req.method, req.url);

    if (matchedRoute) {
        const { handler, params } = matchedRoute;
        req.params = params; // Attach params to request
        handler(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

module.exports = { server, router };
