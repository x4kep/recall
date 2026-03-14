import type { ImportedDeck } from './importDeck';

export const nodejsDeck: ImportedDeck = {
  name: "Top 100 Node.js Interview Questions",
  description: "Comprehensive Node.js interview preparation deck covering core concepts, async patterns, performance, security, and ecosystem.",
  cards: [
  {
    "question": "What is Node.js and how does it differ from browser JavaScript?",
    "answer": "Node.js is a server-side JavaScript runtime built on Chrome's V8 engine that executes JS outside the browser. It provides APIs for file system, networking, and OS access that browsers don't expose.",
    "difficulty": "easy"
  },
  {
    "question": "Explain the Node.js event loop.",
    "answer": "The event loop allows Node.js to perform non-blocking I/O by offloading operations to the OS and processing callbacks when they complete. It cycles through phases: timers, pending callbacks, idle/prepare, poll, check, and close callbacks.",
    "difficulty": "medium"
  },
  {
    "question": "What is the difference between setTimeout and setImmediate?",
    "answer": "setTimeout schedules a callback after a minimum delay (even 0ms waits for the timer phase), while setImmediate executes in the check phase after I/O events. Inside an I/O callback, setImmediate always runs before setTimeout(fn,0).",
    "difficulty": "medium"
  },
  {
    "question": "What is process.nextTick()?",
    "answer": "process.nextTick() queues a callback to run at the end of the current operation, before the event loop moves to its next phase. It fires before any I/O events or timers, making it higher priority than Promises.",
    "difficulty": "medium"
  },
  {
    "question": "What are streams in Node.js and what are their types?",
    "answer": "Streams are objects that let you read or write data in chunks rather than all at once, enabling memory-efficient handling of large data. The four types are Readable, Writable, Duplex (both read and write), and Transform (duplex that transforms data).",
    "difficulty": "medium"
  },
  {
    "question": "Explain the concept of middleware in Express.js.",
    "answer": "Middleware are functions that execute during the request-response lifecycle, receiving (req, res, next) and either responding or passing control to the next middleware via next(). They can modify req/res objects, end the cycle, or call next.",
    "difficulty": "easy"
  },
  {
    "question": "What is the difference between require() and ES module import?",
    "answer": "require() is Node's CommonJS module system — synchronous and dynamic. ES module import/export is the modern standard — statically analyzed, supports tree-shaking, and uses .mjs or type:module in package.json.",
    "difficulty": "easy"
  },
  {
    "question": "What is the Node.js cluster module?",
    "answer": "The cluster module allows you to create child processes (workers) that share the same server port, enabling Node.js to utilize multiple CPU cores. The primary process manages workers and distributes incoming connections.",
    "difficulty": "medium"
  },
  {
    "question": "What is the difference between synchronous and asynchronous code in Node.js?",
    "answer": "Synchronous code blocks the event loop until completion, while asynchronous code offloads work and resumes via callbacks or Promises when done. Blocking the event loop prevents handling other requests.",
    "difficulty": "easy"
  },
  {
    "question": "Explain Promises and how they improve over callbacks.",
    "answer": "A Promise represents an eventual value that is either fulfilled or rejected. Promises allow chaining with .then()/.catch() instead of nested callbacks (callback hell), improving readability and enabling cleaner error propagation.",
    "difficulty": "easy"
  },
  {
    "question": "What is async/await and how does it work under the hood?",
    "answer": "async/await is syntactic sugar over Promises that lets you write asynchronous code in a synchronous style. An async function always returns a Promise, and await pauses execution within that function until the awaited Promise resolves.",
    "difficulty": "easy"
  },
  {
    "question": "What is the EventEmitter class?",
    "answer": "EventEmitter is a Node.js core class that implements the publish-subscribe pattern. Objects can emit named events with emit() and register listeners with on() or once(), enabling decoupled event-driven architecture.",
    "difficulty": "medium"
  },
  {
    "question": "What is the purpose of package.json?",
    "answer": "package.json is the manifest file for a Node.js project. It stores metadata (name, version), lists dependencies, defines scripts (start, test, build), and configures tools. npm and yarn use it to install and manage packages.",
    "difficulty": "easy"
  },
  {
    "question": "What is the difference between dependencies and devDependencies?",
    "answer": "dependencies are packages required at runtime in production, while devDependencies are only needed during development and testing such as linters, test frameworks, and bundlers. npm install --omit=dev skips devDependencies.",
    "difficulty": "easy"
  },
  {
    "question": "How does Node.js module caching work?",
    "answer": "When you require() a module for the first time, Node executes it and caches the exported object. Subsequent requires return the cached version without re-executing the file, making modules act as singletons by default.",
    "difficulty": "medium"
  },
  {
    "question": "What are __dirname and __filename in Node.js?",
    "answer": "__dirname is the absolute path of the directory containing the current module file. __filename is the absolute path of the current module file itself. Both exist in CJS but not in ESM — use import.meta.url instead.",
    "difficulty": "easy"
  },
  {
    "question": "What is the Buffer class in Node.js?",
    "answer": "Buffer is a Node.js global class for working with raw binary data, stored outside the V8 heap. It is used for reading files, network data, and cryptographic operations where raw bytes need to be manipulated directly.",
    "difficulty": "medium"
  },
  {
    "question": "How does error handling work in async Node.js code?",
    "answer": "In callbacks, errors are passed as the first argument (error-first pattern). In Promises, use .catch(). In async/await, wrap in try/catch. Unhandled rejections should be caught with process.on('unhandledRejection').",
    "difficulty": "easy"
  },
  {
    "question": "What is the child_process module?",
    "answer": "The child_process module allows Node.js to spawn new OS processes, execute shell commands, and communicate with them via stdin/stdout. Key methods are spawn (streaming), exec (buffered output), and fork (Node-to-Node with IPC).",
    "difficulty": "medium"
  },
  {
    "question": "What is the difference between spawn, exec, and fork?",
    "answer": "spawn streams output and is best for large data or long-running processes. exec buffers all output, ideal for short commands. fork is a spawn variant for Node.js child processes with a built-in IPC channel for messaging between processes.",
    "difficulty": "medium"
  },
  {
    "question": "What is libuv and its role in Node.js?",
    "answer": "libuv is the C library that powers Node's event loop and asynchronous I/O. It provides the thread pool for operations the OS can't do asynchronously (like file I/O and DNS lookups) and abstracts event notification across platforms.",
    "difficulty": "hard"
  },
  {
    "question": "What is UV_THREADPOOL_SIZE and when would you increase it?",
    "answer": "UV_THREADPOOL_SIZE controls the number of threads in libuv's thread pool, defaulting to 4. When many concurrent crypto, file I/O, or DNS operations queue up and wait, increasing this value reduces latency.",
    "difficulty": "hard"
  },
  {
    "question": "What causes memory leaks in Node.js and how do you detect them?",
    "answer": "Memory leaks occur when objects are unintentionally retained, causing the heap to grow until the process crashes. Common causes include unbounded event listener registration, global variable accumulation, and closures holding large scopes.",
    "difficulty": "hard"
  },
  {
    "question": "What is the difference between process.exit() and throwing an error?",
    "answer": "process.exit() immediately terminates the Node process with an exit code, skipping all pending async operations and finally blocks. Throwing an error propagates up the call stack and can be caught; if uncaught it fires the uncaughtException event.",
    "difficulty": "medium"
  },
  {
    "question": "What is express.Router() and why use it?",
    "answer": "express.Router() creates a modular, mountable route handler that acts as mini middleware. It lets you split routes across multiple files and mount them at specific path prefixes, keeping large applications organized.",
    "difficulty": "easy"
  },
  {
    "question": "How does JWT authentication work in Node.js?",
    "answer": "On login the server signs a token with a secret or private key containing a user payload and returns it to the client. The client sends it in the Authorization header on each request and the server verifies the signature without needing a session store.",
    "difficulty": "medium"
  },
  {
    "question": "What is CORS and how do you handle it in Express?",
    "answer": "CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests from different origins. In Express, set the appropriate Access-Control-Allow-Origin headers, most easily using the cors npm middleware package.",
    "difficulty": "easy"
  },
  {
    "question": "What is rate limiting and how do you implement it in Node.js?",
    "answer": "Rate limiting restricts the number of requests a client can make in a given time window to prevent abuse and overload. In Express, use the express-rate-limit middleware which tracks requests in memory or Redis.",
    "difficulty": "medium"
  },
  {
    "question": "How do you manage environment variables in Node.js?",
    "answer": "Environment variables are accessed via process.env. In development, load them from a .env file using the dotenv package. In production, set them via the platform — Heroku config vars, Docker environment, or Kubernetes secrets.",
    "difficulty": "easy"
  },
  {
    "question": "What is the crypto module?",
    "answer": "The built-in crypto module provides cryptographic functionality including hashing (SHA-256, MD5), HMAC, symmetric ciphers, key generation, and secure random bytes. It wraps OpenSSL and is used for security-sensitive operations.",
    "difficulty": "medium"
  },
  {
    "question": "What is WebSocket and how do you implement it in Node.js?",
    "answer": "WebSocket provides a persistent, full-duplex communication channel between client and server over a single TCP connection. In Node.js, use the ws library or Socket.io for real-time bidirectional messaging.",
    "difficulty": "medium"
  },
  {
    "question": "What is GraphQL and how does it differ from REST?",
    "answer": "GraphQL is a query language where the client specifies exactly what fields it needs in a single request. REST uses multiple fixed endpoints returning predetermined shapes; GraphQL uses one endpoint and eliminates over-fetching and under-fetching.",
    "difficulty": "medium"
  },
  {
    "question": "What is the purpose of the helmet package in Express?",
    "answer": "Helmet is a collection of middleware that sets security-related HTTP response headers like Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security, protecting against common web vulnerabilities with minimal configuration.",
    "difficulty": "easy"
  },
  {
    "question": "What is the difference between monolithic and microservices architecture in Node.js?",
    "answer": "A monolith is a single deployable unit where all features share one process and codebase. Microservices split features into independent services communicating over HTTP or messaging queues, enabling independent scaling and deployment.",
    "difficulty": "medium"
  },
  {
    "question": "What is PM2 and why is it used in production?",
    "answer": "PM2 is a production process manager for Node.js that provides automatic restarts on crash, cluster mode for multi-core utilization, log management, and monitoring. It keeps Node.js apps alive without manual intervention.",
    "difficulty": "easy"
  },
  {
    "question": "How do you perform input validation in Node.js?",
    "answer": "Use validation libraries like Joi, Yup, or Zod to define schemas and validate incoming request data. Validate before processing to prevent bad data from reaching business logic or the database.",
    "difficulty": "easy"
  },
  {
    "question": "What is the difference between SQL and NoSQL databases in Node.js context?",
    "answer": "SQL databases (PostgreSQL, MySQL) use structured schemas and relational tables with ACID transactions. NoSQL databases (MongoDB, Redis) offer flexible schemas and horizontal scaling. Node.js works well with both via respective drivers.",
    "difficulty": "easy"
  },
  {
    "question": "What is an ORM and what are popular choices for Node.js?",
    "answer": "An ORM (Object-Relational Mapper) maps database tables to JavaScript classes, allowing you to query the database using code instead of raw SQL. Popular Node.js ORMs include Sequelize, TypeORM, Prisma, and Knex.",
    "difficulty": "easy"
  },
  {
    "question": "What is connection pooling in databases?",
    "answer": "Connection pooling maintains a set of open database connections that are reused across requests rather than opening and closing a new connection for every query. This dramatically reduces latency and resource usage.",
    "difficulty": "medium"
  },
  {
    "question": "What is Redis and how is it commonly used with Node.js?",
    "answer": "Redis is an in-memory key-value store used for caching, session storage, pub/sub messaging, and rate limiting. The ioredis or redis npm packages are used to interact with it from Node.js.",
    "difficulty": "medium"
  },
  {
    "question": "What is the purpose of morgan middleware in Express?",
    "answer": "Morgan is an HTTP request logger middleware for Express that logs details like method, URL, status code, and response time. It supports multiple formats (tiny, combined, dev) and can write to files or streams.",
    "difficulty": "easy"
  },
  {
    "question": "How do you write unit tests in Node.js?",
    "answer": "Use a test framework like Jest or Mocha with an assertion library. Unit tests isolate individual functions by mocking dependencies, test edge cases, and run fast without real network or database calls.",
    "difficulty": "easy"
  },
  {
    "question": "What is the difference between unit, integration, and end-to-end tests?",
    "answer": "Unit tests test a single function in isolation with mocked dependencies. Integration tests test how multiple modules work together with real or in-memory dependencies. End-to-end tests simulate a real user flow through the entire system.",
    "difficulty": "easy"
  },
  {
    "question": "What is mocking in Node.js tests and why is it needed?",
    "answer": "Mocking replaces real dependencies (databases, APIs, file system) with fake versions that return controlled values. This makes tests fast, deterministic, and runnable without external services.",
    "difficulty": "medium"
  },
  {
    "question": "What is supertest and how is it used?",
    "answer": "Supertest is a library for testing HTTP servers in Node.js. It allows you to make HTTP requests to your Express app in tests without starting a real server, asserting on status codes, headers, and response bodies.",
    "difficulty": "medium"
  },
  {
    "question": "What are worker threads in Node.js?",
    "answer": "Worker threads (worker_threads module) allow running JavaScript in parallel OS threads, sharing memory via SharedArrayBuffer. Unlike child_process, workers share the same process memory and are suitable for CPU-intensive tasks.",
    "difficulty": "hard"
  },
  {
    "question": "What is the difference between worker threads and child processes?",
    "answer": "Worker threads run in the same process and can share memory via SharedArrayBuffer with lower overhead. Child processes are separate OS processes with their own memory, offering better isolation but higher overhead and IPC communication cost.",
    "difficulty": "hard"
  },
  {
    "question": "What is graceful shutdown in Node.js?",
    "answer": "Graceful shutdown means cleanly stopping the server by stopping new incoming connections, waiting for in-flight requests to complete, closing database connections, and then exiting the process — avoiding data loss or dropped requests.",
    "difficulty": "medium"
  },
  {
    "question": "What is the purpose of the .npmrc file?",
    "answer": ".npmrc is npm's configuration file that sets options like registry URL, authentication tokens, proxy settings, and default install flags. It can be placed per-project or globally in the home directory.",
    "difficulty": "easy"
  },
  {
    "question": "What is npx and how does it differ from npm?",
    "answer": "npx is a tool that executes npm packages without installing them globally. It downloads the package, runs it once, then cleans up. npm installs packages; npx runs them.",
    "difficulty": "easy"
  },
  {
    "question": "What is semantic versioning (semver) in npm?",
    "answer": "Semver uses MAJOR.MINOR.PATCH versioning. PATCH is backward-compatible bug fixes, MINOR adds features without breaking changes, MAJOR introduces breaking changes. The ^ prefix in package.json allows minor and patch updates; ~ allows only patches.",
    "difficulty": "easy"
  },
  {
    "question": "What is package-lock.json and why should you commit it?",
    "answer": "package-lock.json locks the exact versions of all installed packages and their transitive dependencies. Committing it ensures reproducible installs across developers, CI, and production environments.",
    "difficulty": "easy"
  },
  {
    "question": "What is TypeScript and how does it work with Node.js?",
    "answer": "TypeScript is a statically typed superset of JavaScript that compiles to plain JS. With ts-node or tsc, you can write typed Node.js code that catches type errors at build time rather than runtime.",
    "difficulty": "easy"
  },
  {
    "question": "What is tsconfig.json?",
    "answer": "tsconfig.json is TypeScript's configuration file defining compiler options like target JS version, module system, strict mode, output directory, and which files to include or exclude from compilation.",
    "difficulty": "easy"
  },
  {
    "question": "What is dependency injection and how is it used in NestJS?",
    "answer": "Dependency injection (DI) automatically provides class instances to constructors based on type declarations. NestJS has a built-in DI container — declare a provider with @Injectable() and inject it via constructor typing.",
    "difficulty": "medium"
  },
  {
    "question": "What is the purpose of the .env file and how do you secure it?",
    "answer": "The .env file stores environment-specific configuration like API keys and DB URLs outside source code. Secure it by adding it to .gitignore so it's never committed to version control, and provide a .env.example template instead.",
    "difficulty": "easy"
  },
  {
    "question": "What is API versioning and how do you implement it in Express?",
    "answer": "API versioning allows you to introduce breaking changes without breaking existing clients. Common strategies include URL path versioning (/api/v1/), header-based versioning, and query parameter versioning.",
    "difficulty": "medium"
  },
  {
    "question": "What is Swagger / OpenAPI and how do you integrate it with Node.js?",
    "answer": "OpenAPI is a specification for describing REST APIs. Swagger UI generates interactive documentation from it. In Express, use swagger-jsdoc to generate specs from JSDoc comments and swagger-ui-express to serve the UI.",
    "difficulty": "medium"
  },
  {
    "question": "What is the purpose of the body-parser middleware?",
    "answer": "body-parser parses incoming request bodies — JSON, URL-encoded, or raw text — and attaches the result to req.body. In Express 4.16+, it is included as express.json() and express.urlencoded().",
    "difficulty": "easy"
  },
  {
    "question": "What is multer and when would you use it?",
    "answer": "Multer is a middleware for handling multipart/form-data — primarily file uploads. It stores uploaded files in memory or on disk and attaches file info to req.file or req.files.",
    "difficulty": "medium"
  },
  {
    "question": "What is a singleton pattern and when is it used in Node.js?",
    "answer": "A singleton ensures only one instance of a class or object exists. In Node.js, module caching naturally creates singletons — the same exported object is returned on every require(), making database connections and config modules natural singletons.",
    "difficulty": "medium"
  },
  {
    "question": "What is the purpose of the os.cpus() function?",
    "answer": "os.cpus() returns an array of CPU core objects with model, speed, and time information. Its length tells you how many logical CPU cores are available, commonly used to determine how many cluster workers or worker threads to spawn.",
    "difficulty": "easy"
  },
  {
    "question": "What is the http module and how do you create a basic server without Express?",
    "answer": "The http module is Node's built-in HTTP library. You create a server with http.createServer(), passing a callback that receives IncomingMessage (req) and ServerResponse (res). It's lower-level than Express but has no dependencies.",
    "difficulty": "easy"
  },
  {
    "question": "What is the net module in Node.js?",
    "answer": "The net module provides a way to create TCP servers and clients in Node.js, working at a lower level than HTTP. It's used for building custom binary protocols, TCP proxy servers, and inter-process socket communication.",
    "difficulty": "hard"
  },
  {
    "question": "What is the tls module?",
    "answer": "The tls module provides an implementation of TLS/SSL protocols for encrypted socket communication. It's used to create secure TCP servers (HTTPS uses it under the hood via the https module).",
    "difficulty": "hard"
  },
  {
    "question": "What is the difference between http and https modules?",
    "answer": "The http module creates unencrypted HTTP servers. The https module wraps http with TLS encryption, requiring SSL certificate and key options. In production, HTTPS is usually handled by a reverse proxy like nginx rather than Node directly.",
    "difficulty": "easy"
  },
  {
    "question": "What is the dns module in Node.js?",
    "answer": "The dns module provides DNS resolution functions. dns.lookup() uses the OS resolver (uses libuv thread pool), while dns.resolve() queries the DNS server directly (uses the event loop). They can return different results.",
    "difficulty": "medium"
  },
  {
    "question": "What is middleware chaining in Express?",
    "answer": "Middleware chaining is the sequential execution of multiple middleware functions for a route. Each middleware calls next() to pass control to the next one. If next() is not called, the chain stops and no response is sent.",
    "difficulty": "easy"
  },
  {
    "question": "What is error-handling middleware in Express?",
    "answer": "Error-handling middleware has four parameters (err, req, res, next) instead of three. It must be defined after all routes and regular middleware. You trigger it by calling next(err) from any middleware.",
    "difficulty": "medium"
  },
  {
    "question": "What is request validation with Zod?",
    "answer": "Zod is a TypeScript-first schema validation library. You define a schema using z.object() and call schema.parse() or schema.safeParse() to validate and type-infer request data simultaneously.",
    "difficulty": "medium"
  },
  {
    "question": "What is a deadlock in Node.js context?",
    "answer": "In Node.js, a deadlock typically occurs in database transactions where two operations each hold a lock and wait for the other to release it, causing both to hang indefinitely. This can also occur with Worker threads sharing SharedArrayBuffer with Atomics.wait.",
    "difficulty": "hard"
  },
  {
    "question": "What is the Observer pattern in Node.js?",
    "answer": "The Observer pattern defines a one-to-many relationship where when one object changes state, all its observers are notified automatically. In Node.js, EventEmitter implements this pattern with emit() and on().",
    "difficulty": "medium"
  },
  {
    "question": "What is pub/sub messaging and how does Node.js implement it?",
    "answer": "Pub/sub (publish-subscribe) decouples producers from consumers via a message broker. Publishers emit messages on topics; subscribers receive them independently. Node.js uses Redis pub/sub, RabbitMQ, or Kafka for distributed pub/sub.",
    "difficulty": "medium"
  },
  {
    "question": "What is a message queue and why use it with Node.js?",
    "answer": "A message queue (RabbitMQ, SQS, BullMQ) stores messages between producers and consumers, enabling async task processing, load leveling, and reliability through retries. Node.js services push jobs to the queue and workers process them independently.",
    "difficulty": "medium"
  },
  {
    "question": "What is BullMQ and how is it used in Node.js?",
    "answer": "BullMQ is a Redis-based job and message queue library for Node.js. It supports job scheduling, retries, priorities, concurrency, and rate limiting. Workers process queued jobs in the background.",
    "difficulty": "medium"
  },
  {
    "question": "What is server-sent events (SSE) and how do you implement them in Node.js?",
    "answer": "SSE is a one-way protocol where the server pushes updates to the browser over a persistent HTTP connection. The server sends text/event-stream content-type and writes event data, which the browser's EventSource API receives.",
    "difficulty": "medium"
  },
  {
    "question": "What is the http2 module in Node.js?",
    "answer": "The http2 module implements the HTTP/2 protocol which supports multiplexing multiple requests over a single connection, header compression (HPACK), and server push. It can dramatically improve performance for web applications.",
    "difficulty": "hard"
  },
  {
    "question": "What is gzip compression and how do you enable it in Express?",
    "answer": "Gzip compression reduces the size of HTTP response bodies. In Express, the compression middleware compresses responses before sending, significantly reducing bandwidth for JSON, HTML, and text responses.",
    "difficulty": "easy"
  },
  {
    "question": "What is SQL injection and how do you prevent it in Node.js?",
    "answer": "SQL injection is an attack where malicious SQL code is inserted into query strings to manipulate the database. Prevent it by always using parameterized queries or prepared statements and never concatenating user input into SQL strings.",
    "difficulty": "easy"
  },
  {
    "question": "What is XSS and how do you prevent it in Node.js?",
    "answer": "XSS (Cross-Site Scripting) attacks inject malicious scripts into web pages served to users. Prevent it in Node.js by escaping HTML output, setting a Content-Security-Policy header (via helmet), and never trusting user input rendered as HTML.",
    "difficulty": "medium"
  },
  {
    "question": "What is CSRF and how do you prevent it in Node.js?",
    "answer": "CSRF (Cross-Site Request Forgery) tricks authenticated users into making unwanted requests to a server. Prevent it using CSRF tokens (csurf package), SameSite cookie attributes, and verifying the Origin or Referer header.",
    "difficulty": "medium"
  },
  {
    "question": "What is the principle of least privilege in Node.js applications?",
    "answer": "The principle of least privilege means each component — database user, process, API key — should have only the minimum permissions needed to perform its function. A read-only API should connect with a read-only DB user.",
    "difficulty": "medium"
  },
  {
    "question": "What is bcrypt and why should you use it for passwords?",
    "answer": "bcrypt is a password hashing algorithm designed to be slow and computationally expensive, making brute-force attacks impractical. Unlike MD5 or SHA-256, bcrypt includes a salt and a configurable work factor to adapt to future hardware.",
    "difficulty": "easy"
  },
  {
    "question": "What is the difference between hashing and encryption?",
    "answer": "Hashing is a one-way function that produces a fixed-length digest — you cannot reverse it. Encryption is two-way — you can decrypt ciphertext back to plaintext with the correct key. Use hashing for passwords; use encryption for data that must be retrieved.",
    "difficulty": "easy"
  },
  {
    "question": "What is OpenTelemetry and how is it used in Node.js?",
    "answer": "OpenTelemetry is a vendor-neutral observability framework for collecting traces, metrics, and logs. In Node.js, auto-instrumentation packages can trace HTTP requests, database queries, and more, exporting data to tools like Jaeger or Datadog.",
    "difficulty": "hard"
  },
  {
    "question": "What is pino and why is it preferred over console.log?",
    "answer": "Pino is an extremely fast JSON structured logger for Node.js. It logs in machine-readable JSON format, supports log levels, is significantly faster than Winston or console.log, and integrates well with log aggregation tools like ELK and Datadog.",
    "difficulty": "medium"
  },
  {
    "question": "What is a reverse proxy and why is Node.js usually behind one?",
    "answer": "A reverse proxy (nginx, Caddy) sits in front of Node.js, handling SSL termination, static file serving, load balancing, and connection management. Node.js is not optimized for these tasks, and running it behind a proxy improves security and performance.",
    "difficulty": "medium"
  },
  {
    "question": "What is Docker and how do you containerize a Node.js application?",
    "answer": "Docker packages an application and its dependencies into a portable container. A Dockerfile specifies the base image, copies application files, installs npm packages, and defines the startup command.",
    "difficulty": "medium"
  },
  {
    "question": "What is a multi-stage Docker build for Node.js?",
    "answer": "A multi-stage build uses multiple FROM stages — typically one for building (compiling TypeScript, installing all deps) and a smaller one for production (copying only built artifacts and prod deps). This produces significantly smaller final images.",
    "difficulty": "medium"
  },
  {
    "question": "What is Kubernetes and how does Node.js scale in it?",
    "answer": "Kubernetes (K8s) is a container orchestration platform that automates deployment, scaling, and management of containerized apps. Node.js scales horizontally by running multiple pod replicas, with K8s routing traffic between them via Services.",
    "difficulty": "medium"
  },
  {
    "question": "What is the NODE_ENV variable and how is it used?",
    "answer": "NODE_ENV is a conventional environment variable (development, production, test) that Node.js apps and many libraries check to change behavior. Express disables detailed error stacks in production; many libraries skip dev-only features.",
    "difficulty": "easy"
  },
  {
    "question": "What is a circuit breaker pattern in Node.js microservices?",
    "answer": "A circuit breaker monitors calls to a downstream service and trips open when failures exceed a threshold, immediately returning an error rather than waiting for timeouts. After a recovery window, it tests if the service is healthy before closing again.",
    "difficulty": "hard"
  },
  {
    "question": "What is the Strangler Fig pattern for migrating to Node.js?",
    "answer": "The Strangler Fig pattern incrementally replaces a legacy system by routing specific requests to new Node.js services while the old system handles the rest. Over time, new code strangles the old system until it can be removed.",
    "difficulty": "hard"
  },
  {
    "question": "What is the difference between vertical and horizontal scaling for Node.js?",
    "answer": "Vertical scaling adds more CPU/RAM to a single server. Horizontal scaling adds more server instances. Node.js is inherently designed for horizontal scaling — stateless services behind a load balancer handle more traffic cheaply.",
    "difficulty": "medium"
  },
  {
    "question": "What is the difference between cold start and warm start in serverless Node.js?",
    "answer": "A cold start occurs when a serverless function (AWS Lambda) initializes a new container — loading the Node.js runtime and your code bundle, adding latency. A warm start reuses an existing container with the runtime already initialized, responding much faster.",
    "difficulty": "medium"
  },
  {
    "question": "What is lazy loading in Node.js?",
    "answer": "Lazy loading defers loading a module or resource until it is actually needed rather than at startup. This reduces startup time and memory usage for rarely used code paths.",
    "difficulty": "medium"
  },
  {
    "question": "What is the ALS (AsyncLocalStorage) in Node.js?",
    "answer": "AsyncLocalStorage provides a way to store data that is accessible throughout an asynchronous call chain without passing it through every function. It's used for request-scoped data like request IDs and user context in logging.",
    "difficulty": "hard"
  },
  {
    "question": "What is the inspect flag and how do you debug Node.js applications?",
    "answer": "The --inspect flag starts a Node.js debug server on port 9229, allowing Chrome DevTools or VS Code to attach for breakpoint debugging, step execution, call stack inspection, and memory profiling.",
    "difficulty": "easy"
  },
  {
    "question": "What is Prisma and how does it differ from Sequelize?",
    "answer": "Prisma is a modern type-safe ORM with a declarative schema file (schema.prisma) and auto-generated TypeScript types. Sequelize is a mature ORM using model class definitions with less TypeScript integration. Prisma's generated types catch DB mismatches at compile time.",
    "difficulty": "medium"
  },
  {
    "question": "What is the difference between TCP and UDP and when would Node.js use UDP?",
    "answer": "TCP provides reliable, ordered, connection-based delivery with handshaking and retransmission. UDP is connectionless, faster, with no delivery guarantee. Node.js uses UDP (via the dgram module) for real-time applications where speed trumps reliability.",
    "difficulty": "hard"
  },
  {
    "question": "What is the difference between monorepo and polyrepo for Node.js projects?",
    "answer": "A monorepo stores multiple packages or services in a single repository, enabling code sharing and atomic commits across packages. A polyrepo uses separate repositories per service, offering isolation but making cross-service changes harder.",
    "difficulty": "medium"
  },
  {
    "question": "What is tRPC and how does it work with Node.js?",
    "answer": "tRPC enables end-to-end type-safe APIs without code generation by sharing TypeScript types between Node.js server and client. The server defines procedures; the client calls them with full type inference — no REST or GraphQL schema needed.",
    "difficulty": "hard"
  },
  {
    "question": "What is the Node.js profiler and how do you identify CPU bottlenecks?",
    "answer": "Run node --prof to generate a V8 profiler tick file, then use node --prof-process to convert it to a human-readable flame graph showing where CPU time is spent. clinic.js flame also provides visual flame graphs.",
    "difficulty": "hard"
  },
  {
    "question": "What is the difference between process.env and config modules?",
    "answer": "process.env gives raw string access to environment variables with no validation or defaults. Config modules like convict or a custom config.ts layer add type coercion, default values, validation, and named access — reducing runtime config errors.",
    "difficulty": "medium"
  },
  {
    "question": "What is the purpose of health check endpoints in Node.js services?",
    "answer": "Health check endpoints (typically GET /health or /healthz) return the service's status so load balancers, Kubernetes liveness probes, and monitoring tools can detect unhealthy instances and route traffic away from or restart them.",
    "difficulty": "easy"
  },
  {
    "question": "What is the node:test module (built-in test runner)?",
    "answer": "Since Node.js 18, there is a built-in test runner via node:test that supports describe/it/test blocks, assertions, mocking, and TAP/spec reporters. It provides Jest-like testing without any third-party dependencies.",
    "difficulty": "medium"
  }
],
};
