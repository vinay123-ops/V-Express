class Router {
    constructor() {
        this.routes = [];
        this.middlewares = [];
    }

    // Register middleware
    use(middleware) {
        this.middlewares.push(middleware);
    }

    // Add routes
    addRoute(method, path, handler) {
        this.routes.push({ method, path, handler });
    }

    get(path, handler) {
        this.addRoute("GET", path, handler);
    }

    post(path, handler) {
        this.addRoute("POST", path, handler);
    }

    put(path, handler) {
        this.addRoute("PUT", path, handler);
    }

    delete(path, handler) {
        this.addRoute("DELETE", path, handler);
    }

    // Match routes (including dynamic params like "/user/:id")
    matchRoute(reqMethod, reqUrl) {
        for (let route of this.routes) {
            const { method, path, handler } = route;
            const pathRegex = new RegExp("^" + path.replace(/:\w+/g, "([^/]+)") + "$");
            const match = reqUrl.match(pathRegex);

            if (match && method === reqMethod) {
                return { handler, params: match.slice(1) };
            }
        }
        return null;
    }

    // Process middlewares before reaching the route
    async processMiddlewares(req, res) {
        for (let middleware of this.middlewares) {
            await new Promise((resolve) => middleware(req, res, resolve));
        }
    }
}

module.exports = Router;
