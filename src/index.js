const { server, router } = require("./server");

// Middleware 1: Logger (Logs each request)
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware 2: JSON Parser (For POST requests)
router.use(async (req, res, next) => {
    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            req.body = body ? JSON.parse(body) : {};
            next();
        });
    } else {
        next();
    }
});

// Define routes
router.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to our custom server with middleware!");
});

router.get("/about", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the about page.");
});

router.get("/user/:id", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`User ID: ${req.params[0]}`);
});

// Handle POST request
router.post("/data", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Data received", data: req.body }));
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
