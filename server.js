const http = require("http");
const client = require("prom-client");

const PORT = 3000;

// Prometheus metrics registry
const register = new client.Registry();

// Collect default Node.js metrics
client.collectDefaultMetrics({ register });

// Count HTTP requests
const httpRequestsTotal = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
    registers: [register]
});

// Measure HTTP response duration
const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "HTTP request duration in seconds",
    labelNames: ["method", "route"],
    buckets: [0.005, 0.01, 0.05, 0.1, 0.5, 1, 2],
    registers: [register]
});

const server = http.createServer(async (req, res) => {
    const start = Date.now();
    const timestamp = new Date().toISOString();

    // Prometheus metrics endpoint
    if (req.url === "/metrics") {
        res.setHeader("Content-Type", register.contentType);
        res.end(await register.metrics());
        return;
    }

    // Dedicated health endpoint
    if (req.url === "/health") {
        const healthy = process.env.HEALTH_FAIL !== "true";
        const statusCode = healthy ? 200 : 503;

        res.writeHead(statusCode, {
            "Content-Type": "text/plain"
        });

        res.end(healthy ? "OK" : "Service unavailable");

        httpRequestsTotal.inc({
            method: req.method,
            route: "/health",
            status_code: String(statusCode)
        });

        httpRequestDuration.observe(
            { method: req.method, route: "/health" },
            (Date.now() - start) / 1000
        );

        console.log(
            `[${timestamp}] ${req.method} /health status=${statusCode}`
        );

        return;
    }

    // Normal application response
    const route = req.url === "/" ? "/" : "/other";

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end(
        "Hello from my Docker Node.js server version 4.1(testing for self-hosted runner for deployment)!!"
    );

    httpRequestsTotal.inc({
        method: req.method,
        route,
        status_code: "200"
    });

    httpRequestDuration.observe(
        { method: req.method, route },
        (Date.now() - start) / 1000
    );

    console.log(
        `[${timestamp}] ${req.method} ${route} status=200`
    );
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});