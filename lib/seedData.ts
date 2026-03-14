import type { ImportedDeck } from './importDeck';

export const nodejsDeck: ImportedDeck = {
  name: "Top 100 Node.js Interview Questions",
  description: "Comprehensive Node.js interview preparation deck covering core concepts, async patterns, performance, security, and ecosystem.",
  cards: [
  {
    "question": "What is Node.js and how does it differ from browser JavaScript?",
    "answer": "Node.js is a server-side JavaScript runtime built on Chrome's V8 engine that executes JS outside the browser. It provides APIs for file system, networking, and OS access that browsers don't expose.",
    "difficulty": "easy",
    "why_important": "Foundational knowledge expected in every Node.js interview.",
    "simple_example": "// Browser only: window.alert('hi')\n// Node.js only: require('fs').readFileSync('file.txt')",
    "use_cases": [
      "Building HTTP servers and REST APIs",
      "Running scripts and automation tasks",
      "Creating CLI tools"
    ]
  },
  {
    "question": "Explain the Node.js event loop.",
    "answer": "The event loop allows Node.js to perform non-blocking I/O by offloading operations to the OS and processing callbacks when they complete. It cycles through phases: timers, pending callbacks, idle/prepare, poll, check, and close callbacks.",
    "difficulty": "medium",
    "why_important": "Core concept that explains Node's performance model and is asked in almost every interview.",
    "simple_example": "setTimeout(() => console.log('timer'), 0);\nconsole.log('sync');\n// Output: sync, then timer",
    "use_cases": [
      "Understanding async execution order",
      "Debugging callback timing issues",
      "Writing efficient server code"
    ]
  },
  {
    "question": "What is the difference between setTimeout and setImmediate?",
    "answer": "setTimeout schedules a callback after a minimum delay (even 0ms waits for the timer phase), while setImmediate executes in the check phase after I/O events. Inside an I/O callback, setImmediate always runs before setTimeout(fn,0).",
    "difficulty": "medium",
    "why_important": "Tests deep event loop understanding and is a common gotcha question.",
    "simple_example": "setImmediate(() => console.log('immediate'));\nsetTimeout(() => console.log('timeout'), 0);\n// Inside I/O: immediate always first",
    "use_cases": [
      "Ensuring a callback runs after I/O",
      "Avoiding timer drift in benchmarks",
      "Controlling callback execution order"
    ]
  },
  {
    "question": "What is process.nextTick()?",
    "answer": "process.nextTick() queues a callback to run at the end of the current operation, before the event loop moves to its next phase. It fires before any I/O events or timers, making it higher priority than Promises.",
    "difficulty": "medium",
    "why_important": "Frequently tested because developers confuse it with setImmediate and Promise microtasks.",
    "simple_example": "process.nextTick(() => console.log('nextTick'));\nPromise.resolve().then(() => console.log('promise'));\n// Output: nextTick, then promise",
    "use_cases": [
      "Emitting events after object construction",
      "Error-first async callback patterns",
      "Deferring work within the same event loop phase"
    ]
  },
  {
    "question": "What are streams in Node.js and what are their types?",
    "answer": "Streams are objects that let you read or write data in chunks rather than all at once, enabling memory-efficient handling of large data. The four types are Readable, Writable, Duplex (both read and write), and Transform (duplex that transforms data).",
    "difficulty": "medium",
    "why_important": "Essential for building performant file and network applications.",
    "simple_example": "const readable = fs.createReadStream('bigfile.csv');\nreadable.pipe(process.stdout);",
    "use_cases": [
      "Streaming video or audio files to clients",
      "Processing large CSV or JSON uploads",
      "Piping HTTP request bodies to files"
    ]
  },
  {
    "question": "Explain the concept of middleware in Express.js.",
    "answer": "Middleware are functions that execute during the request-response lifecycle, receiving (req, res, next) and either responding or passing control to the next middleware via next(). They can modify req/res objects, end the cycle, or call next.",
    "difficulty": "easy",
    "why_important": "Central to building any Express application and heavily tested.",
    "simple_example": "app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});",
    "use_cases": [
      "Authentication and authorization checks",
      "Request logging and metrics",
      "Body parsing and CORS header injection"
    ]
  },
  {
    "question": "What is the difference between require() and ES module import?",
    "answer": "require() is Node's CommonJS module system — synchronous and dynamic. ES module import/export is the modern standard — statically analyzed, supports tree-shaking, and uses .mjs or type:module in package.json.",
    "difficulty": "easy",
    "why_important": "Module systems are asked frequently, especially as ESM adoption grows in the Node ecosystem.",
    "simple_example": "// CJS\nconst fs = require('fs');\n// ESM\nimport fs from 'fs';",
    "use_cases": [
      "Building modern npm packages with tree-shaking",
      "Interoperating CJS and ESM libraries",
      "Configuring bundlers like webpack or rollup"
    ]
  },
  {
    "question": "What is the Node.js cluster module?",
    "answer": "The cluster module allows you to create child processes (workers) that share the same server port, enabling Node.js to utilize multiple CPU cores. The primary process manages workers and distributes incoming connections.",
    "difficulty": "medium",
    "why_important": "Critical for scaling Node.js servers in production on multi-core machines.",
    "simple_example": "if (cluster.isPrimary) {\n  cluster.fork();\n} else {\n  app.listen(3000);\n}",
    "use_cases": [
      "Scaling HTTP servers across all CPU cores",
      "Improving throughput under high load",
      "Implementing graceful worker restarts"
    ]
  },
  {
    "question": "What is the difference between synchronous and asynchronous code in Node.js?",
    "answer": "Synchronous code blocks the event loop until completion, while asynchronous code offloads work and resumes via callbacks or Promises when done. Blocking the event loop prevents handling other requests.",
    "difficulty": "easy",
    "why_important": "Foundational to understanding Node.js concurrency and performance.",
    "simple_example": "// Blocking (avoid in servers)\nconst data = fs.readFileSync('file.txt');\n// Non-blocking\nfs.readFile('file.txt', (err, data) => {});",
    "use_cases": [
      "Building responsive HTTP servers",
      "File and database I/O operations",
      "Preventing server-wide freezes"
    ]
  },
  {
    "question": "Explain Promises and how they improve over callbacks.",
    "answer": "A Promise represents an eventual value that is either fulfilled or rejected. Promises allow chaining with .then()/.catch() instead of nested callbacks (callback hell), improving readability and enabling cleaner error propagation.",
    "difficulty": "easy",
    "why_important": "Modern async patterns are essential Node.js knowledge for any role.",
    "simple_example": "fetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));",
    "use_cases": [
      "Chaining sequential HTTP requests",
      "Running parallel operations with Promise.all",
      "Converting callback-based APIs to Promise-based"
    ]
  },
  {
    "question": "What is async/await and how does it work under the hood?",
    "answer": "async/await is syntactic sugar over Promises that lets you write asynchronous code in a synchronous style. An async function always returns a Promise, and await pauses execution within that function until the awaited Promise resolves.",
    "difficulty": "easy",
    "why_important": "The dominant modern async pattern in Node.js codebases today.",
    "simple_example": "async function getData(url) {\n  const res = await fetch(url);\n  return res.json();\n}",
    "use_cases": [
      "Readable sequential async control flow",
      "Try/catch error handling in async code",
      "Simplifying complex Promise chains"
    ]
  },
  {
    "question": "What is the EventEmitter class?",
    "answer": "EventEmitter is a Node.js core class that implements the publish-subscribe pattern. Objects can emit named events with emit() and register listeners with on() or once(), enabling decoupled event-driven architecture.",
    "difficulty": "medium",
    "why_important": "Foundation for streams, HTTP, and many Node.js core modules.",
    "simple_example": "const ee = new EventEmitter();\nee.on('data', d => console.log(d));\nee.emit('data', 'hello');",
    "use_cases": [
      "Building custom event-driven systems",
      "Decoupling application modules",
      "Implementing stream interfaces"
    ]
  },
  {
    "question": "What is the purpose of package.json?",
    "answer": "package.json is the manifest file for a Node.js project. It stores metadata (name, version), lists dependencies, defines scripts (start, test, build), and configures tools. npm and yarn use it to install and manage packages.",
    "difficulty": "easy",
    "why_important": "Every Node.js project has one; developers must know its structure inside out.",
    "simple_example": "{\n  \"name\": \"my-app\",\n  \"scripts\": { \"start\": \"node index.js\" },\n  \"dependencies\": { \"express\": \"^4.18.0\" }\n}",
    "use_cases": [
      "Defining project entry point and metadata",
      "Managing dependency versions",
      "Running custom build and test scripts"
    ]
  },
  {
    "question": "What is the difference between dependencies and devDependencies?",
    "answer": "dependencies are packages required at runtime in production, while devDependencies are only needed during development and testing such as linters, test frameworks, and bundlers. npm install --omit=dev skips devDependencies.",
    "difficulty": "easy",
    "why_important": "Affects deployment image size, build times, and security audit scope.",
    "simple_example": "npm install lodash            # dependency\nnpm install jest --save-dev   # devDependency",
    "use_cases": [
      "Keeping production Docker images lean",
      "Optimizing CI/CD install time",
      "Scoping security vulnerability scans"
    ]
  },
  {
    "question": "How does Node.js module caching work?",
    "answer": "When you require() a module for the first time, Node executes it and caches the exported object. Subsequent requires return the cached version without re-executing the file, making modules act as singletons by default.",
    "difficulty": "medium",
    "why_important": "Caching behavior affects shared state management and test isolation strategies.",
    "simple_example": "// counter.js\nlet count = 0;\nmodule.exports = { inc: () => ++count };\n// All files requiring this share the same count",
    "use_cases": [
      "Singleton services like DB connection pools",
      "Shared configuration objects",
      "Understanding why mocking requires cache busting"
    ]
  },
  {
    "question": "What are __dirname and __filename in Node.js?",
    "answer": "__dirname is the absolute path of the directory containing the current module file. __filename is the absolute path of the current module file itself. Both exist in CJS but not in ESM — use import.meta.url instead.",
    "difficulty": "easy",
    "why_important": "Essential for building correct file paths that work across operating systems.",
    "simple_example": "const config = require(path.join(__dirname, 'config.json'));\n// Works regardless of where the script is run from",
    "use_cases": [
      "Loading config files relative to the module",
      "Building cross-platform file paths",
      "Referencing static assets in servers"
    ]
  },
  {
    "question": "What is the Buffer class in Node.js?",
    "answer": "Buffer is a Node.js global class for working with raw binary data, stored outside the V8 heap. It is used for reading files, network data, and cryptographic operations where raw bytes need to be manipulated directly.",
    "difficulty": "medium",
    "why_important": "Necessary for binary protocols, file I/O, and cryptography in Node.",
    "simple_example": "const buf = Buffer.from('hello');\nconsole.log(buf.toString('hex')); // 68656c6c6f",
    "use_cases": [
      "Reading binary files like images",
      "Encoding data as base64",
      "Network protocol message parsing"
    ]
  },
  {
    "question": "How does error handling work in async Node.js code?",
    "answer": "In callbacks, errors are passed as the first argument (error-first pattern). In Promises, use .catch(). In async/await, wrap in try/catch. Unhandled rejections should be caught with process.on('unhandledRejection').",
    "difficulty": "easy",
    "why_important": "Improper error handling is the top cause of Node.js server crashes in production.",
    "simple_example": "async function run() {\n  try {\n    await riskyOperation();\n  } catch (err) {\n    console.error(err);\n  }\n}",
    "use_cases": [
      "Preventing unhandled rejection crashes",
      "Logging errors to monitoring services",
      "Implementing graceful error responses"
    ]
  },
  {
    "question": "What is the child_process module?",
    "answer": "The child_process module allows Node.js to spawn new OS processes, execute shell commands, and communicate with them via stdin/stdout. Key methods are spawn (streaming), exec (buffered output), and fork (Node-to-Node with IPC).",
    "difficulty": "medium",
    "why_important": "Needed for system scripting, CPU-intensive tasks, and process management.",
    "simple_example": "const { exec } = require('child_process');\nexec('ls -la', (err, stdout) => console.log(stdout));",
    "use_cases": [
      "Running shell scripts from Node",
      "Spawning CPU-bound workers",
      "Executing system commands like ffmpeg"
    ]
  },
  {
    "question": "What is the difference between spawn, exec, and fork?",
    "answer": "spawn streams output and is best for large data or long-running processes. exec buffers all output, ideal for short commands. fork is a spawn variant for Node.js child processes with a built-in IPC channel for messaging between processes.",
    "difficulty": "medium",
    "why_important": "Choosing the wrong method causes memory issues or missing IPC communication.",
    "simple_example": "const worker = fork('./worker.js');\nworker.send({ task: 'compute' });\nworker.on('message', result => console.log(result));",
    "use_cases": [
      "CPU-bound work in a separate process",
      "Running shell utilities with output capture",
      "Inter-process communication between Node apps"
    ]
  },
  {
    "question": "What is libuv and its role in Node.js?",
    "answer": "libuv is the C library that powers Node's event loop and asynchronous I/O. It provides the thread pool for operations the OS can't do asynchronously (like file I/O and DNS lookups) and abstracts event notification across platforms.",
    "difficulty": "hard",
    "why_important": "Understanding libuv explains the thread pool, blocking I/O behavior, and true concurrency limits.",
    "simple_example": "// DNS lookup uses libuv thread pool, not the event loop\ndns.lookup('example.com', (err, address) => console.log(address));",
    "use_cases": [
      "Understanding performance bottlenecks",
      "Tuning UV_THREADPOOL_SIZE for I/O workloads",
      "Diagnosing blocking synchronous operations"
    ]
  },
  {
    "question": "What is UV_THREADPOOL_SIZE and when would you increase it?",
    "answer": "UV_THREADPOOL_SIZE controls the number of threads in libuv's thread pool, defaulting to 4. When many concurrent crypto, file I/O, or DNS operations queue up and wait, increasing this value reduces latency.",
    "difficulty": "hard",
    "why_important": "A common and impactful production performance tuning lever.",
    "simple_example": "UV_THREADPOOL_SIZE=16 node app.js",
    "use_cases": [
      "High-concurrency file system operations",
      "Many parallel bcrypt/crypto hash operations",
      "Large-scale concurrent DNS resolutions"
    ]
  },
  {
    "question": "What causes memory leaks in Node.js and how do you detect them?",
    "answer": "Memory leaks occur when objects are unintentionally retained, causing the heap to grow until the process crashes. Common causes include unbounded event listener registration, global variable accumulation, and closures holding large scopes.",
    "difficulty": "hard",
    "why_important": "Memory leaks are a leading cause of Node.js production outages.",
    "simple_example": "// Leak: listener added every request but never removed\napp.get('/', (req, res) => {\n  emitter.on('event', handler);\n  res.send('ok');\n});",
    "use_cases": [
      "Diagnosing steadily growing heap size",
      "Production server stability analysis",
      "Using clinic.js or Chrome DevTools heap snapshots"
    ]
  },
  {
    "question": "What is the difference between process.exit() and throwing an error?",
    "answer": "process.exit() immediately terminates the Node process with an exit code, skipping all pending async operations and finally blocks. Throwing an error propagates up the call stack and can be caught; if uncaught it fires the uncaughtException event.",
    "difficulty": "medium",
    "why_important": "Misusing process.exit() can cause data loss or incomplete DB writes.",
    "simple_example": "process.on('uncaughtException', (err) => {\n  logger.error(err);\n  process.exit(1); // exit AFTER logging\n});",
    "use_cases": [
      "Graceful shutdown with cleanup handlers",
      "Sending non-zero exit codes to CI pipelines",
      "Distinguishing fatal vs recoverable errors"
    ]
  },
  {
    "question": "What is express.Router() and why use it?",
    "answer": "express.Router() creates a modular, mountable route handler that acts as mini middleware. It lets you split routes across multiple files and mount them at specific path prefixes, keeping large applications organized.",
    "difficulty": "easy",
    "why_important": "Essential for structuring routes in any non-trivial Express application.",
    "simple_example": "const router = express.Router();\nrouter.get('/users', getUsers);\napp.use('/api/v1', router);",
    "use_cases": [
      "Splitting routes by feature or domain",
      "Applying auth middleware per route group",
      "Building modular REST API endpoints"
    ]
  },
  {
    "question": "How does JWT authentication work in Node.js?",
    "answer": "On login the server signs a token with a secret or private key containing a user payload and returns it to the client. The client sends it in the Authorization header on each request and the server verifies the signature without needing a session store.",
    "difficulty": "medium",
    "why_important": "JWTs are the dominant stateless authentication mechanism for REST APIs.",
    "simple_example": "const token = jwt.sign({ userId }, SECRET, { expiresIn: '1h' });\njwt.verify(token, SECRET, (err, decoded) => {});",
    "use_cases": [
      "Stateless REST API authentication",
      "Propagating auth between microservices",
      "OAuth2 access token implementation"
    ]
  },
  {
    "question": "What is CORS and how do you handle it in Express?",
    "answer": "CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests from different origins. In Express, set the appropriate Access-Control-Allow-Origin headers, most easily using the cors npm middleware package.",
    "difficulty": "easy",
    "why_important": "Almost every REST API serving a frontend requires CORS configuration.",
    "simple_example": "const cors = require('cors');\napp.use(cors({ origin: 'https://myapp.com' }));",
    "use_cases": [
      "Allowing a React SPA to call a Node API",
      "Restricting API access to trusted origins",
      "Handling browser preflight OPTIONS requests"
    ]
  },
  {
    "question": "What is rate limiting and how do you implement it in Node.js?",
    "answer": "Rate limiting restricts the number of requests a client can make in a given time window to prevent abuse and overload. In Express, use the express-rate-limit middleware which tracks requests in memory or Redis.",
    "difficulty": "medium",
    "why_important": "A baseline security requirement for any public-facing API.",
    "simple_example": "const limiter = rateLimit({ windowMs: 60000, max: 100 });\napp.use('/api/', limiter);",
    "use_cases": [
      "Preventing brute-force login attacks",
      "Protecting public endpoints from abuse",
      "Reducing server load from misbehaving clients"
    ]
  },
  {
    "question": "How do you manage environment variables in Node.js?",
    "answer": "Environment variables are accessed via process.env. In development, load them from a .env file using the dotenv package. In production, set them via the platform — Heroku config vars, Docker environment, or Kubernetes secrets.",
    "difficulty": "easy",
    "why_important": "Keeps credentials out of source code and supports multiple deployment environments.",
    "simple_example": "require('dotenv').config();\nconst DB_URL = process.env.DATABASE_URL;",
    "use_cases": [
      "Storing API keys and database credentials",
      "Switching between dev, staging, and prod configs",
      "12-factor app compliance"
    ]
  },
  {
    "question": "What is the crypto module?",
    "answer": "The built-in crypto module provides cryptographic functionality including hashing (SHA-256, MD5), HMAC, symmetric ciphers, key generation, and secure random bytes. It wraps OpenSSL and is used for security-sensitive operations.",
    "difficulty": "medium",
    "why_important": "Essential for building secure authentication and data integrity systems.",
    "simple_example": "const hash = crypto\n  .createHash('sha256')\n  .update('password123')\n  .digest('hex');",
    "use_cases": [
      "Hashing passwords before storage",
      "Generating cryptographically secure tokens",
      "Creating HMAC signatures for webhooks"
    ]
  },
  {
    "question": "What is WebSocket and how do you implement it in Node.js?",
    "answer": "WebSocket provides a persistent, full-duplex communication channel between client and server over a single TCP connection. In Node.js, use the ws library or Socket.io for real-time bidirectional messaging.",
    "difficulty": "medium",
    "why_important": "Required knowledge for building any real-time application feature.",
    "simple_example": "const wss = new WebSocket.Server({ port: 8080 });\nwss.on('connection', ws => {\n  ws.send('connected!');\n});",
    "use_cases": [
      "Live chat applications",
      "Real-time dashboards and notifications",
      "Multiplayer game communication"
    ]
  },
  {
    "question": "What is GraphQL and how does it differ from REST?",
    "answer": "GraphQL is a query language where the client specifies exactly what fields it needs in a single request. REST uses multiple fixed endpoints returning predetermined shapes; GraphQL uses one endpoint and eliminates over-fetching and under-fetching.",
    "difficulty": "medium",
    "why_important": "Increasingly common in modern Node.js backends alongside or replacing REST.",
    "simple_example": "query {\n  user(id: 1) {\n    name\n    email\n  }\n}",
    "use_cases": [
      "Mobile apps needing minimal payloads",
      "Complex nested relational data fetching",
      "Aggregating multiple microservice responses"
    ]
  },
  {
    "question": "What is the purpose of the helmet package in Express?",
    "answer": "Helmet is a collection of middleware that sets security-related HTTP response headers like Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security, protecting against common web vulnerabilities with minimal configuration.",
    "difficulty": "easy",
    "why_important": "A best-practice security layer for every production Express application.",
    "simple_example": "const helmet = require('helmet');\napp.use(helmet());",
    "use_cases": [
      "Preventing clickjacking with X-Frame-Options",
      "Enforcing HTTPS with HSTS header",
      "Blocking XSS via Content-Security-Policy"
    ]
  },
  {
    "question": "What is the difference between monolithic and microservices architecture in Node.js?",
    "answer": "A monolith is a single deployable unit where all features share one process and codebase. Microservices split features into independent services communicating over HTTP or messaging queues, enabling independent scaling and deployment.",
    "difficulty": "medium",
    "why_important": "Architecture decision that fundamentally shapes Node.js project structure.",
    "simple_example": "// Monolith: one app.js with all routes\n// Microservice: separate user-service, order-service each on own port",
    "use_cases": [
      "Scaling high-traffic features independently",
      "Enabling independent team deployments",
      "Isolating failure domains in production"
    ]
  },
  {
    "question": "What is PM2 and why is it used in production?",
    "answer": "PM2 is a production process manager for Node.js that provides automatic restarts on crash, cluster mode for multi-core utilization, log management, and monitoring. It keeps Node.js apps alive without manual intervention.",
    "difficulty": "easy",
    "why_important": "Industry-standard tool for running Node.js apps in production VMs.",
    "simple_example": "pm2 start app.js -i max  # cluster mode using all cores\npm2 save && pm2 startup # survive reboots",
    "use_cases": [
      "Auto-restarting crashed Node processes",
      "Multi-core process clustering",
      "Zero-downtime deployments with pm2 reload"
    ]
  },
  {
    "question": "How do you perform input validation in Node.js?",
    "answer": "Use validation libraries like Joi, Yup, or Zod to define schemas and validate incoming request data. Validate before processing to prevent bad data from reaching business logic or the database.",
    "difficulty": "easy",
    "why_important": "Missing validation is a top cause of bugs and security vulnerabilities.",
    "simple_example": "const schema = Joi.object({ email: Joi.string().email().required() });\nconst { error } = schema.validate(req.body);",
    "use_cases": [
      "Validating REST API request bodies",
      "Type-safe form submission handling",
      "Preventing SQL injection and malformed input"
    ]
  },
  {
    "question": "What is the difference between SQL and NoSQL databases in Node.js context?",
    "answer": "SQL databases (PostgreSQL, MySQL) use structured schemas and relational tables with ACID transactions. NoSQL databases (MongoDB, Redis) offer flexible schemas and horizontal scaling. Node.js works well with both via respective drivers.",
    "difficulty": "easy",
    "why_important": "Database choice is a fundamental design decision in every Node.js project.",
    "simple_example": "// SQL: SELECT * FROM users WHERE id = 1\n// NoSQL: db.users.findOne({ _id: ObjectId('...') })",
    "use_cases": [
      "Relational data with complex joins (SQL)",
      "Flexible document storage (MongoDB)",
      "Caching and session storage (Redis)"
    ]
  },
  {
    "question": "What is an ORM and what are popular choices for Node.js?",
    "answer": "An ORM (Object-Relational Mapper) maps database tables to JavaScript classes, allowing you to query the database using code instead of raw SQL. Popular Node.js ORMs include Sequelize, TypeORM, Prisma, and Knex.",
    "difficulty": "easy",
    "why_important": "Most Node.js backend projects use an ORM to reduce boilerplate and bugs.",
    "simple_example": "const user = await User.findOne({ where: { email: 'a@b.com' } });\n// Prisma: await prisma.user.findUnique({ where: { email } });",
    "use_cases": [
      "Type-safe database queries",
      "Database migration management",
      "Model-based data validation"
    ]
  },
  {
    "question": "What is connection pooling in databases?",
    "answer": "Connection pooling maintains a set of open database connections that are reused across requests rather than opening and closing a new connection for every query. This dramatically reduces latency and resource usage.",
    "difficulty": "medium",
    "why_important": "Without pooling, Node.js apps exhaust database connections under load.",
    "simple_example": "const pool = new Pool({ max: 10, connectionString: DB_URL });\nconst res = await pool.query('SELECT * FROM users');",
    "use_cases": [
      "High-throughput REST APIs with DB queries",
      "Preventing database connection exhaustion",
      "Reducing query latency by reusing connections"
    ]
  },
  {
    "question": "What is Redis and how is it commonly used with Node.js?",
    "answer": "Redis is an in-memory key-value store used for caching, session storage, pub/sub messaging, and rate limiting. The ioredis or redis npm packages are used to interact with it from Node.js.",
    "difficulty": "medium",
    "why_important": "Redis is the most common caching and session store in Node.js production stacks.",
    "simple_example": "await redis.set('user:1', JSON.stringify(user), 'EX', 3600);\nconst cached = await redis.get('user:1');",
    "use_cases": [
      "API response caching",
      "Session token storage",
      "Real-time pub/sub messaging"
    ]
  },
  {
    "question": "What is the purpose of morgan middleware in Express?",
    "answer": "Morgan is an HTTP request logger middleware for Express that logs details like method, URL, status code, and response time. It supports multiple formats (tiny, combined, dev) and can write to files or streams.",
    "difficulty": "easy",
    "why_important": "Logging every request is a baseline observability requirement in production.",
    "simple_example": "const morgan = require('morgan');\napp.use(morgan('combined'));",
    "use_cases": [
      "Access log generation for ops teams",
      "Debugging slow or failing requests",
      "Writing logs to files with rotating streams"
    ]
  },
  {
    "question": "How do you write unit tests in Node.js?",
    "answer": "Use a test framework like Jest or Mocha with an assertion library. Unit tests isolate individual functions by mocking dependencies, test edge cases, and run fast without real network or database calls.",
    "difficulty": "easy",
    "why_important": "Testing is expected in every professional Node.js role.",
    "simple_example": "test('adds two numbers', () => {\n  expect(add(2, 3)).toBe(5);\n});",
    "use_cases": [
      "Validating business logic in isolation",
      "Catching regressions during refactoring",
      "CI pipeline automated test gates"
    ]
  },
  {
    "question": "What is the difference between unit, integration, and end-to-end tests?",
    "answer": "Unit tests test a single function in isolation with mocked dependencies. Integration tests test how multiple modules work together with real or in-memory dependencies. End-to-end tests simulate a real user flow through the entire system.",
    "difficulty": "easy",
    "why_important": "Understanding the testing pyramid guides where to invest testing effort.",
    "simple_example": "// Unit: test(add(1,2) === 3)\n// Integration: test DB + service layer\n// E2E: HTTP request → DB → response assertion",
    "use_cases": [
      "Choosing the right test for a bug",
      "Optimizing CI pipeline speed",
      "Defining test coverage strategy"
    ]
  },
  {
    "question": "What is mocking in Node.js tests and why is it needed?",
    "answer": "Mocking replaces real dependencies (databases, APIs, file system) with fake versions that return controlled values. This makes tests fast, deterministic, and runnable without external services.",
    "difficulty": "medium",
    "why_important": "Mocking is fundamental to writing fast, reliable unit tests.",
    "simple_example": "jest.mock('./db');\ndb.findUser.mockResolvedValue({ id: 1, name: 'Alice' });",
    "use_cases": [
      "Simulating database query results",
      "Faking third-party API responses",
      "Testing error paths that are hard to trigger"
    ]
  },
  {
    "question": "What is supertest and how is it used?",
    "answer": "Supertest is a library for testing HTTP servers in Node.js. It allows you to make HTTP requests to your Express app in tests without starting a real server, asserting on status codes, headers, and response bodies.",
    "difficulty": "medium",
    "why_important": "The standard tool for integration-testing Express APIs.",
    "simple_example": "const res = await request(app).get('/users').expect(200);\nexpect(res.body).toHaveLength(3);",
    "use_cases": [
      "Testing REST API endpoint responses",
      "Verifying auth middleware behavior",
      "Checking error response formats"
    ]
  },
  {
    "question": "What are worker threads in Node.js?",
    "answer": "Worker threads (worker_threads module) allow running JavaScript in parallel OS threads, sharing memory via SharedArrayBuffer. Unlike child_process, workers share the same process memory and are suitable for CPU-intensive tasks.",
    "difficulty": "hard",
    "why_important": "The modern solution for CPU-intensive work in Node.js without separate processes.",
    "simple_example": "const { Worker } = require('worker_threads');\nconst worker = new Worker('./cpu-task.js');\nworker.on('message', result => console.log(result));",
    "use_cases": [
      "Image processing and compression",
      "Heavy mathematical computations",
      "Machine learning inference in Node"
    ]
  },
  {
    "question": "What is the difference between worker threads and child processes?",
    "answer": "Worker threads run in the same process and can share memory via SharedArrayBuffer with lower overhead. Child processes are separate OS processes with their own memory, offering better isolation but higher overhead and IPC communication cost.",
    "difficulty": "hard",
    "why_important": "Choosing between them affects performance and architecture design.",
    "simple_example": "// worker_threads: shared memory, same process\n// child_process: separate memory, OS process",
    "use_cases": [
      "CPU-bound work needing shared memory (workers)",
      "Sandboxed untrusted code (child process)",
      "Long-running background services (child process)"
    ]
  },
  {
    "question": "What is graceful shutdown in Node.js?",
    "answer": "Graceful shutdown means cleanly stopping the server by stopping new incoming connections, waiting for in-flight requests to complete, closing database connections, and then exiting the process — avoiding data loss or dropped requests.",
    "difficulty": "medium",
    "why_important": "Required for zero-downtime deployments and Kubernetes pod lifecycle management.",
    "simple_example": "process.on('SIGTERM', async () => {\n  await server.close();\n  await db.disconnect();\n  process.exit(0);\n});",
    "use_cases": [
      "Kubernetes rolling deployments",
      "Zero-downtime server restarts",
      "Clean database connection closure"
    ]
  },
  {
    "question": "What is the purpose of the .npmrc file?",
    "answer": ".npmrc is npm's configuration file that sets options like registry URL, authentication tokens, proxy settings, and default install flags. It can be placed per-project or globally in the home directory.",
    "difficulty": "easy",
    "why_important": "Used in enterprise environments with private registries or specific npm configs.",
    "simple_example": "registry=https://my-private-registry.com\n//my-private-registry.com/:_authToken=${NPM_TOKEN}",
    "use_cases": [
      "Configuring a private npm registry",
      "Storing auth tokens for CI environments",
      "Setting default save exact flag"
    ]
  },
  {
    "question": "What is npx and how does it differ from npm?",
    "answer": "npx is a tool that executes npm packages without installing them globally. It downloads the package, runs it once, then cleans up. npm installs packages; npx runs them.",
    "difficulty": "easy",
    "why_important": "Common in tooling workflows like create-react-app and running one-off scripts.",
    "simple_example": "npx create-react-app my-app\n# vs: npm install -g create-react-app && create-react-app my-app",
    "use_cases": [
      "Running scaffolding tools without global install",
      "Trying CLI tools without polluting global scope",
      "Running specific package versions in CI"
    ]
  },
  {
    "question": "What is semantic versioning (semver) in npm?",
    "answer": "Semver uses MAJOR.MINOR.PATCH versioning. PATCH is backward-compatible bug fixes, MINOR adds features without breaking changes, MAJOR introduces breaking changes. The ^ prefix in package.json allows minor and patch updates; ~ allows only patches.",
    "difficulty": "easy",
    "why_important": "Understanding semver prevents unexpected breaking changes from dependency updates.",
    "simple_example": "\"express\": \"^4.18.0\"  // allows 4.x.x updates\n\"express\": \"~4.18.0\"  // allows 4.18.x patches only",
    "use_cases": [
      "Safely updating dependencies",
      "Publishing packages with proper versioning",
      "Auditing for breaking change risk"
    ]
  },
  {
    "question": "What is package-lock.json and why should you commit it?",
    "answer": "package-lock.json locks the exact versions of all installed packages and their transitive dependencies. Committing it ensures reproducible installs across developers, CI, and production environments.",
    "difficulty": "easy",
    "why_important": "Without it, different installs can pull different package versions, causing 'works on my machine' bugs.",
    "simple_example": "// package.json: \"express\": \"^4.18.0\"\n// package-lock.json: \"express\": \"4.18.2\" (exact)",
    "use_cases": [
      "Reproducible CI/CD builds",
      "Preventing surprise version updates",
      "Auditing exact dependency tree"
    ]
  },
  {
    "question": "What is TypeScript and how does it work with Node.js?",
    "answer": "TypeScript is a statically typed superset of JavaScript that compiles to plain JS. With ts-node or tsc, you can write typed Node.js code that catches type errors at build time rather than runtime.",
    "difficulty": "easy",
    "why_important": "TypeScript adoption in Node.js projects is now the industry standard.",
    "simple_example": "function greet(name: string): string {\n  return 'Hello, ${name}';\n}\n// Compiled to JS before running",
    "use_cases": [
      "Catching type errors during development",
      "Self-documenting function signatures",
      "Large codebase refactoring safety"
    ]
  },
  {
    "question": "What is tsconfig.json?",
    "answer": "tsconfig.json is TypeScript's configuration file defining compiler options like target JS version, module system, strict mode, output directory, and which files to include or exclude from compilation.",
    "difficulty": "easy",
    "why_important": "Every TypeScript Node.js project requires it for correct compilation behavior.",
    "simple_example": "{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"module\": \"commonjs\",\n    \"strict\": true,\n    \"outDir\": \"./dist\"\n  }\n}",
    "use_cases": [
      "Targeting the right Node.js ES version",
      "Enabling strict null checks",
      "Configuring path aliases"
    ]
  },
  {
    "question": "What is dependency injection and how is it used in NestJS?",
    "answer": "Dependency injection (DI) automatically provides class instances to constructors based on type declarations. NestJS has a built-in DI container — declare a provider with @Injectable() and inject it via constructor typing.",
    "difficulty": "medium",
    "why_important": "NestJS is a major enterprise Node.js framework and DI is its core pattern.",
    "simple_example": "@Injectable()\nclass UserService { constructor(private db: DatabaseService) {} }",
    "use_cases": [
      "Injecting database services into controllers",
      "Swapping implementations in tests",
      "Managing application-wide singleton services"
    ]
  },
  {
    "question": "What is the purpose of the .env file and how do you secure it?",
    "answer": "The .env file stores environment-specific configuration like API keys and DB URLs outside source code. Secure it by adding it to .gitignore so it's never committed to version control, and provide a .env.example template instead.",
    "difficulty": "easy",
    "why_important": "Committing .env files is one of the most common security mistakes in Node.js projects.",
    "simple_example": "# .env (never commit)\nDB_PASSWORD=secret123\n# .env.example (commit this)\nDB_PASSWORD=your_password_here",
    "use_cases": [
      "Keeping credentials out of Git history",
      "Onboarding new developers with .env.example",
      "Separating config per environment"
    ]
  },
  {
    "question": "What is API versioning and how do you implement it in Express?",
    "answer": "API versioning allows you to introduce breaking changes without breaking existing clients. Common strategies include URL path versioning (/api/v1/), header-based versioning, and query parameter versioning.",
    "difficulty": "medium",
    "why_important": "Essential for maintaining backward compatibility in long-lived APIs.",
    "simple_example": "app.use('/api/v1', v1Router);\napp.use('/api/v2', v2Router);",
    "use_cases": [
      "Releasing breaking API changes safely",
      "Supporting multiple client app versions",
      "Deprecating old endpoints gradually"
    ]
  },
  {
    "question": "What is Swagger / OpenAPI and how do you integrate it with Node.js?",
    "answer": "OpenAPI is a specification for describing REST APIs. Swagger UI generates interactive documentation from it. In Express, use swagger-jsdoc to generate specs from JSDoc comments and swagger-ui-express to serve the UI.",
    "difficulty": "medium",
    "why_important": "API documentation is expected in professional Node.js backend development.",
    "simple_example": "app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));",
    "use_cases": [
      "Auto-generating API documentation",
      "Frontend team API contract reference",
      "API testing via Swagger UI"
    ]
  },
  {
    "question": "What is the purpose of the body-parser middleware?",
    "answer": "body-parser parses incoming request bodies — JSON, URL-encoded, or raw text — and attaches the result to req.body. In Express 4.16+, it is included as express.json() and express.urlencoded().",
    "difficulty": "easy",
    "why_important": "Without it, req.body is undefined and you cannot access POST request data.",
    "simple_example": "app.use(express.json());\napp.use(express.urlencoded({ extended: true }));\n// Now req.body is populated",
    "use_cases": [
      "Parsing JSON POST request bodies",
      "Handling HTML form submissions",
      "Processing webhook payloads"
    ]
  },
  {
    "question": "What is multer and when would you use it?",
    "answer": "Multer is a middleware for handling multipart/form-data — primarily file uploads. It stores uploaded files in memory or on disk and attaches file info to req.file or req.files.",
    "difficulty": "medium",
    "why_important": "File upload handling is a common backend requirement.",
    "simple_example": "const upload = multer({ dest: 'uploads/' });\napp.post('/photo', upload.single('avatar'), (req, res) => {\n  console.log(req.file);\n});",
    "use_cases": [
      "User profile photo uploads",
      "Document upload endpoints",
      "CSV file import features"
    ]
  },
  {
    "question": "What is a singleton pattern and when is it used in Node.js?",
    "answer": "A singleton ensures only one instance of a class or object exists. In Node.js, module caching naturally creates singletons — the same exported object is returned on every require(), making database connections and config modules natural singletons.",
    "difficulty": "medium",
    "why_important": "Database pool and config objects must be singletons to avoid duplicate connections.",
    "simple_example": "// db.js\nconst pool = new Pool(config);\nmodule.exports = pool; // Same pool reused everywhere",
    "use_cases": [
      "Database connection pool sharing",
      "Application-wide config object",
      "Shared logger instance"
    ]
  },
  {
    "question": "What is the purpose of the os.cpus() function?",
    "answer": "os.cpus() returns an array of CPU core objects with model, speed, and time information. Its length tells you how many logical CPU cores are available, commonly used to determine how many cluster workers or worker threads to spawn.",
    "difficulty": "easy",
    "why_important": "Scaling workers to match available CPU cores is a common production pattern.",
    "simple_example": "const numCPUs = require('os').cpus().length;\nfor (let i = 0; i < numCPUs; i++) cluster.fork();",
    "use_cases": [
      "Cluster worker count configuration",
      "Worker thread pool sizing",
      "System resource monitoring"
    ]
  },
  {
    "question": "What is the http module and how do you create a basic server without Express?",
    "answer": "The http module is Node's built-in HTTP library. You create a server with http.createServer(), passing a callback that receives IncomingMessage (req) and ServerResponse (res). It's lower-level than Express but has no dependencies.",
    "difficulty": "easy",
    "why_important": "Understanding the underlying http module shows you know what Express is built on.",
    "simple_example": "http.createServer((req, res) => {\n  res.writeHead(200);\n  res.end('Hello World');\n}).listen(3000);",
    "use_cases": [
      "Minimal microservices with no framework",
      "Understanding how Express works internally",
      "Building custom HTTP frameworks"
    ]
  },
  {
    "question": "What is the net module in Node.js?",
    "answer": "The net module provides a way to create TCP servers and clients in Node.js, working at a lower level than HTTP. It's used for building custom binary protocols, TCP proxy servers, and inter-process socket communication.",
    "difficulty": "hard",
    "why_important": "Shows deep Node.js knowledge beyond HTTP-level web development.",
    "simple_example": "const server = net.createServer(socket => {\n  socket.write('Hello TCP client!');\n});\nserver.listen(9000);",
    "use_cases": [
      "Building a custom TCP server",
      "Creating a Redis-like in-memory server",
      "TCP proxy or load balancer"
    ]
  },
  {
    "question": "What is the tls module?",
    "answer": "The tls module provides an implementation of TLS/SSL protocols for encrypted socket communication. It's used to create secure TCP servers (HTTPS uses it under the hood via the https module).",
    "difficulty": "hard",
    "why_important": "Understanding TLS in Node.js is needed for building secure custom protocols.",
    "simple_example": "const server = tls.createServer({ cert, key }, socket => {\n  socket.write('Secure connection!');\n});",
    "use_cases": [
      "Mutual TLS client authentication",
      "Custom secure TCP protocols",
      "Certificate pinning implementations"
    ]
  },
  {
    "question": "What is the difference between http and https modules?",
    "answer": "The http module creates unencrypted HTTP servers. The https module wraps http with TLS encryption, requiring SSL certificate and key options. In production, HTTPS is usually handled by a reverse proxy like nginx rather than Node directly.",
    "difficulty": "easy",
    "why_important": "Understanding the TLS layer in Node.js applications is important for security design.",
    "simple_example": "const https = require('https');\nhttps.createServer({ key, cert }, app).listen(443);",
    "use_cases": [
      "Serving HTTPS directly from Node",
      "Local development with self-signed certs",
      "Understanding TLS termination in production"
    ]
  },
  {
    "question": "What is the dns module in Node.js?",
    "answer": "The dns module provides DNS resolution functions. dns.lookup() uses the OS resolver (uses libuv thread pool), while dns.resolve() queries the DNS server directly (uses the event loop). They can return different results.",
    "difficulty": "medium",
    "why_important": "DNS resolution is a hidden performance bottleneck that affects Node.js connection speed.",
    "simple_example": "dns.resolve4('example.com', (err, addresses) => {\n  console.log(addresses); // ['93.184.216.34']\n});",
    "use_cases": [
      "Custom DNS resolution logic",
      "DNS-based service discovery",
      "Understanding lookup vs resolve differences"
    ]
  },
  {
    "question": "What is middleware chaining in Express?",
    "answer": "Middleware chaining is the sequential execution of multiple middleware functions for a route. Each middleware calls next() to pass control to the next one. If next() is not called, the chain stops and no response is sent.",
    "difficulty": "easy",
    "why_important": "Core Express pattern for composing request processing pipelines.",
    "simple_example": "app.get('/protected', authenticate, authorize, (req, res) => {\n  res.json({ data: 'secret' });\n});",
    "use_cases": [
      "Auth + authorization + handler pipelines",
      "Request validation before processing",
      "Caching layer before database queries"
    ]
  },
  {
    "question": "What is error-handling middleware in Express?",
    "answer": "Error-handling middleware has four parameters (err, req, res, next) instead of three. It must be defined after all routes and regular middleware. You trigger it by calling next(err) from any middleware.",
    "difficulty": "medium",
    "why_important": "Centralizes error handling instead of duplicating error logic in every route.",
    "simple_example": "app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: err.message });\n});",
    "use_cases": [
      "Centralized error response formatting",
      "Logging all application errors",
      "Sending different error formats per environment"
    ]
  },
  {
    "question": "What is request validation with Zod?",
    "answer": "Zod is a TypeScript-first schema validation library. You define a schema using z.object() and call schema.parse() or schema.safeParse() to validate and type-infer request data simultaneously.",
    "difficulty": "medium",
    "why_important": "Zod has become the most popular validation library in modern TypeScript Node.js stacks.",
    "simple_example": "const schema = z.object({ email: z.string().email() });\nconst result = schema.safeParse(req.body);\nif (!result.success) return res.status(400).json(result.error);",
    "use_cases": [
      "Type-safe API request validation",
      "Inferring TypeScript types from schemas",
      "Validating environment variable schemas"
    ]
  },
  {
    "question": "What is a deadlock in Node.js context?",
    "answer": "In Node.js, a deadlock typically occurs in database transactions where two operations each hold a lock and wait for the other to release it, causing both to hang indefinitely. This can also occur with Worker threads sharing SharedArrayBuffer with Atomics.wait.",
    "difficulty": "hard",
    "why_important": "Deadlocks cause silent hangs that are difficult to debug in production.",
    "simple_example": "// Transaction A locks row 1, waits for row 2\n// Transaction B locks row 2, waits for row 1\n// Both wait forever",
    "use_cases": [
      "Designing safe database transaction order",
      "Debugging hung database queries",
      "Shared memory synchronization in workers"
    ]
  },
  {
    "question": "What is the Observer pattern in Node.js?",
    "answer": "The Observer pattern defines a one-to-many relationship where when one object changes state, all its observers are notified automatically. In Node.js, EventEmitter implements this pattern with emit() and on().",
    "difficulty": "medium",
    "why_important": "Understanding design patterns shows software engineering depth.",
    "simple_example": "class Store extends EventEmitter {\n  update(data) { this.emit('change', data); }\n}\nstore.on('change', d => renderUI(d));",
    "use_cases": [
      "State management in backend services",
      "Event-driven module communication",
      "Building reactive data pipelines"
    ]
  },
  {
    "question": "What is pub/sub messaging and how does Node.js implement it?",
    "answer": "Pub/sub (publish-subscribe) decouples producers from consumers via a message broker. Publishers emit messages on topics; subscribers receive them independently. Node.js uses Redis pub/sub, RabbitMQ, or Kafka for distributed pub/sub.",
    "difficulty": "medium",
    "why_important": "Pub/sub is fundamental to microservice communication and event-driven systems.",
    "simple_example": "// Publisher\nredis.publish('orders', JSON.stringify(order));\n// Subscriber\nredis.subscribe('orders', (msg) => process(JSON.parse(msg)));",
    "use_cases": [
      "Real-time notifications across servers",
      "Decoupled microservice event communication",
      "Background job triggering"
    ]
  },
  {
    "question": "What is a message queue and why use it with Node.js?",
    "answer": "A message queue (RabbitMQ, SQS, BullMQ) stores messages between producers and consumers, enabling async task processing, load leveling, and reliability through retries. Node.js services push jobs to the queue and workers process them independently.",
    "difficulty": "medium",
    "why_important": "Message queues are essential for scalable, resilient backend architectures.",
    "simple_example": "// Producer\nawait queue.add('sendEmail', { to: user.email });\n// Worker\nqueue.process('sendEmail', async job => sendEmail(job.data));",
    "use_cases": [
      "Async email and notification sending",
      "Video processing background jobs",
      "Decoupling peak traffic from processing capacity"
    ]
  },
  {
    "question": "What is BullMQ and how is it used in Node.js?",
    "answer": "BullMQ is a Redis-based job and message queue library for Node.js. It supports job scheduling, retries, priorities, concurrency, and rate limiting. Workers process queued jobs in the background.",
    "difficulty": "medium",
    "why_important": "BullMQ is the most popular job queue library in the Node.js ecosystem.",
    "simple_example": "const queue = new Queue('emails', { connection });\nconst worker = new Worker('emails', async job => sendEmail(job.data));",
    "use_cases": [
      "Email sending queues with retry logic",
      "Scheduled cron-like background jobs",
      "Rate-limited API call workers"
    ]
  },
  {
    "question": "What is server-sent events (SSE) and how do you implement them in Node.js?",
    "answer": "SSE is a one-way protocol where the server pushes updates to the browser over a persistent HTTP connection. The server sends text/event-stream content-type and writes event data, which the browser's EventSource API receives.",
    "difficulty": "medium",
    "why_important": "SSE is simpler than WebSocket for unidirectional real-time updates.",
    "simple_example": "res.setHeader('Content-Type', 'text/event-stream');\nsetInterval(() => res.write('data: ${Date.now()}\\n\\n'), 1000);",
    "use_cases": [
      "Live progress bars for long operations",
      "Real-time log streaming to a browser",
      "Live score or stock price updates"
    ]
  },
  {
    "question": "What is the http2 module in Node.js?",
    "answer": "The http2 module implements the HTTP/2 protocol which supports multiplexing multiple requests over a single connection, header compression (HPACK), and server push. It can dramatically improve performance for web applications.",
    "difficulty": "hard",
    "why_important": "HTTP/2 knowledge is relevant for high-performance Node.js server design.",
    "simple_example": "const server = http2.createSecureServer({ key, cert });\nserver.on('stream', (stream) => stream.respond({ ':status': 200 }));",
    "use_cases": [
      "Multiplexing API calls from browsers",
      "Server push for pre-loading assets",
      "Reducing latency for many small requests"
    ]
  },
  {
    "question": "What is gzip compression and how do you enable it in Express?",
    "answer": "Gzip compression reduces the size of HTTP response bodies. In Express, the compression middleware compresses responses before sending, significantly reducing bandwidth for JSON, HTML, and text responses.",
    "difficulty": "easy",
    "why_important": "Response compression is a quick win for API and web application performance.",
    "simple_example": "const compression = require('compression');\napp.use(compression({ level: 6 }));",
    "use_cases": [
      "Reducing JSON API payload size",
      "Faster page load times",
      "Reducing bandwidth costs"
    ]
  },
  {
    "question": "What is SQL injection and how do you prevent it in Node.js?",
    "answer": "SQL injection is an attack where malicious SQL code is inserted into query strings to manipulate the database. Prevent it by always using parameterized queries or prepared statements and never concatenating user input into SQL strings.",
    "difficulty": "easy",
    "why_important": "SQL injection is OWASP's top web application security risk.",
    "simple_example": "// Vulnerable: 'SELECT * FROM users WHERE id = ${req.params.id}'\n// Safe:\nawait pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);",
    "use_cases": [
      "Safe user search queries",
      "Secure login authentication queries",
      "Any database query with user input"
    ]
  },
  {
    "question": "What is XSS and how do you prevent it in Node.js?",
    "answer": "XSS (Cross-Site Scripting) attacks inject malicious scripts into web pages served to users. Prevent it in Node.js by escaping HTML output, setting a Content-Security-Policy header (via helmet), and never trusting user input rendered as HTML.",
    "difficulty": "medium",
    "why_important": "XSS is a top web security vulnerability that affects user sessions and data.",
    "simple_example": "// Dangerous:\nres.send('<h1>${req.query.name}</h1>');\n// Safe: use a template engine that escapes by default",
    "use_cases": [
      "Safe rendering of user-generated content",
      "Protecting admin dashboards from hijacking",
      "Content Security Policy implementation"
    ]
  },
  {
    "question": "What is CSRF and how do you prevent it in Node.js?",
    "answer": "CSRF (Cross-Site Request Forgery) tricks authenticated users into making unwanted requests to a server. Prevent it using CSRF tokens (csurf package), SameSite cookie attributes, and verifying the Origin or Referer header.",
    "difficulty": "medium",
    "why_important": "CSRF attacks can perform unauthorized actions on behalf of authenticated users.",
    "simple_example": "// Set SameSite cookie attribute\nres.cookie('session', token, { sameSite: 'strict', httpOnly: true });",
    "use_cases": [
      "Protecting form submission endpoints",
      "Preventing unauthorized fund transfers",
      "Securing state-changing API endpoints"
    ]
  },
  {
    "question": "What is the principle of least privilege in Node.js applications?",
    "answer": "The principle of least privilege means each component — database user, process, API key — should have only the minimum permissions needed to perform its function. A read-only API should connect with a read-only DB user.",
    "difficulty": "medium",
    "why_important": "Limits blast radius when credentials are compromised.",
    "simple_example": "// DB user for read API has only SELECT grants\n// DB user for write API has INSERT/UPDATE grants",
    "use_cases": [
      "Database user permission design",
      "IAM role assignment in cloud",
      "API key scope restriction"
    ]
  },
  {
    "question": "What is bcrypt and why should you use it for passwords?",
    "answer": "bcrypt is a password hashing algorithm designed to be slow and computationally expensive, making brute-force attacks impractical. Unlike MD5 or SHA-256, bcrypt includes a salt and a configurable work factor to adapt to future hardware.",
    "difficulty": "easy",
    "why_important": "Storing plain or weakly hashed passwords is a critical security failure.",
    "simple_example": "const hash = await bcrypt.hash(password, 12);\nconst isValid = await bcrypt.compare(inputPassword, hash);",
    "use_cases": [
      "User account password storage",
      "Admin credential hashing",
      "API secret key storage"
    ]
  },
  {
    "question": "What is the difference between hashing and encryption?",
    "answer": "Hashing is a one-way function that produces a fixed-length digest — you cannot reverse it. Encryption is two-way — you can decrypt ciphertext back to plaintext with the correct key. Use hashing for passwords; use encryption for data that must be retrieved.",
    "difficulty": "easy",
    "why_important": "Confusing the two leads to critical security design mistakes.",
    "simple_example": "// Hash: sha256('hello') → 2cf24dba... (irreversible)\n// Encrypt: AES.encrypt('hello', key) → decrypt possible",
    "use_cases": [
      "Choosing the right method for passwords vs tokens",
      "Encrypting PII in databases",
      "Verifying data integrity with hashes"
    ]
  },
  {
    "question": "What is OpenTelemetry and how is it used in Node.js?",
    "answer": "OpenTelemetry is a vendor-neutral observability framework for collecting traces, metrics, and logs. In Node.js, auto-instrumentation packages can trace HTTP requests, database queries, and more, exporting data to tools like Jaeger or Datadog.",
    "difficulty": "hard",
    "why_important": "Distributed tracing is essential for debugging microservice performance issues.",
    "simple_example": "const { NodeSDK } = require('@opentelemetry/sdk-node');\nconst sdk = new NodeSDK({ traceExporter });\nsdk.start();",
    "use_cases": [
      "Tracing request paths through microservices",
      "Identifying performance bottlenecks",
      "Exporting metrics to monitoring dashboards"
    ]
  },
  {
    "question": "What is pino and why is it preferred over console.log?",
    "answer": "Pino is an extremely fast JSON structured logger for Node.js. It logs in machine-readable JSON format, supports log levels, is significantly faster than Winston or console.log, and integrates well with log aggregation tools like ELK and Datadog.",
    "difficulty": "medium",
    "why_important": "Structured logging is a production requirement for any serious Node.js application.",
    "simple_example": "const logger = pino({ level: 'info' });\nlogger.info({ userId: 123 }, 'User logged in');",
    "use_cases": [
      "Structured log shipping to ELK stack",
      "Request correlation ID logging",
      "Performance-sensitive high-throughput logging"
    ]
  },
  {
    "question": "What is a reverse proxy and why is Node.js usually behind one?",
    "answer": "A reverse proxy (nginx, Caddy) sits in front of Node.js, handling SSL termination, static file serving, load balancing, and connection management. Node.js is not optimized for these tasks, and running it behind a proxy improves security and performance.",
    "difficulty": "medium",
    "why_important": "Production Node.js is almost always deployed behind a reverse proxy.",
    "simple_example": "# nginx forwards HTTPS to Node on port 3000\nproxy_pass http://localhost:3000;",
    "use_cases": [
      "SSL/TLS termination",
      "Load balancing across Node instances",
      "Serving static files efficiently"
    ]
  },
  {
    "question": "What is Docker and how do you containerize a Node.js application?",
    "answer": "Docker packages an application and its dependencies into a portable container. A Dockerfile specifies the base image, copies application files, installs npm packages, and defines the startup command.",
    "difficulty": "medium",
    "why_important": "Containerization is the standard deployment method for Node.js applications today.",
    "simple_example": "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nCMD [\"node\", \"index.js\"]",
    "use_cases": [
      "Consistent environments across dev and prod",
      "Kubernetes pod deployment",
      "Microservice container isolation"
    ]
  },
  {
    "question": "What is a multi-stage Docker build for Node.js?",
    "answer": "A multi-stage build uses multiple FROM stages — typically one for building (compiling TypeScript, installing all deps) and a smaller one for production (copying only built artifacts and prod deps). This produces significantly smaller final images.",
    "difficulty": "medium",
    "why_important": "Production Docker images should be as small as possible for security and speed.",
    "simple_example": "FROM node:20 AS builder\nRUN npm ci && npm run build\n\nFROM node:20-alpine\nCOPY --from=builder /app/dist ./dist\nCMD [\"node\", \"dist/index.js\"]",
    "use_cases": [
      "Reducing production image size",
      "Keeping build tools out of prod images",
      "Separating TypeScript compilation from runtime"
    ]
  },
  {
    "question": "What is Kubernetes and how does Node.js scale in it?",
    "answer": "Kubernetes (K8s) is a container orchestration platform that automates deployment, scaling, and management of containerized apps. Node.js scales horizontally by running multiple pod replicas, with K8s routing traffic between them via Services.",
    "difficulty": "medium",
    "why_important": "Kubernetes is the dominant production platform for Node.js microservices.",
    "simple_example": "# Scale to 5 replicas\nkubectl scale deployment my-node-app --replicas=5",
    "use_cases": [
      "Auto-scaling Node pods under load",
      "Rolling updates with zero downtime",
      "Service discovery between microservices"
    ]
  },
  {
    "question": "What is the NODE_ENV variable and how is it used?",
    "answer": "NODE_ENV is a conventional environment variable (development, production, test) that Node.js apps and many libraries check to change behavior. Express disables detailed error stacks in production; many libraries skip dev-only features.",
    "difficulty": "easy",
    "why_important": "Failing to set NODE_ENV=production in production is a common performance and security mistake.",
    "simple_example": "if (process.env.NODE_ENV === 'production') {\n  app.use(errorHandler());\n} else {\n  app.use(devErrorHandler());\n}",
    "use_cases": [
      "Toggling development vs production configs",
      "Enabling source maps only in development",
      "Express performance optimization"
    ]
  },
  {
    "question": "What is a circuit breaker pattern in Node.js microservices?",
    "answer": "A circuit breaker monitors calls to a downstream service and trips open when failures exceed a threshold, immediately returning an error rather than waiting for timeouts. After a recovery window, it tests if the service is healthy before closing again.",
    "difficulty": "hard",
    "why_important": "Prevents cascading failures when a downstream service is unavailable.",
    "simple_example": "const breaker = new CircuitBreaker(fetchUser, {\n  timeout: 3000, errorThresholdPercentage: 50\n});",
    "use_cases": [
      "Protecting against slow downstream APIs",
      "Failing fast in microservice chains",
      "Self-healing service communication"
    ]
  },
  {
    "question": "What is the Strangler Fig pattern for migrating to Node.js?",
    "answer": "The Strangler Fig pattern incrementally replaces a legacy system by routing specific requests to new Node.js services while the old system handles the rest. Over time, new code strangles the old system until it can be removed.",
    "difficulty": "hard",
    "why_important": "Common pattern for migrating enterprise applications to Node.js microservices.",
    "simple_example": "// nginx routes /api/orders to new Node.js service\n// all other routes still go to legacy app",
    "use_cases": [
      "Migrating monoliths to microservices",
      "Gradual Node.js adoption in legacy systems",
      "Risk-free incremental rewrites"
    ]
  },
  {
    "question": "What is the difference between vertical and horizontal scaling for Node.js?",
    "answer": "Vertical scaling adds more CPU/RAM to a single server. Horizontal scaling adds more server instances. Node.js is inherently designed for horizontal scaling — stateless services behind a load balancer handle more traffic cheaply.",
    "difficulty": "medium",
    "why_important": "Scaling strategy is a core backend architecture interview topic.",
    "simple_example": "// Horizontal: 10 Node pods behind a load balancer\n// Vertical: 1 Node server on a 64-core machine",
    "use_cases": [
      "Choosing the right AWS instance type",
      "Kubernetes auto-scaling policies",
      "Cost optimization for high-traffic APIs"
    ]
  },
  {
    "question": "What is the difference between cold start and warm start in serverless Node.js?",
    "answer": "A cold start occurs when a serverless function (AWS Lambda) initializes a new container — loading the Node.js runtime and your code bundle, adding latency. A warm start reuses an existing container with the runtime already initialized, responding much faster.",
    "difficulty": "medium",
    "why_important": "Cold starts are a critical performance consideration for serverless Node.js APIs.",
    "simple_example": "// Minimize cold start by reducing bundle size:\nbundle only needed code, avoid heavy dependencies like moment.js",
    "use_cases": [
      "Optimizing Lambda response times",
      "Choosing between EC2 and Lambda for latency-sensitive APIs",
      "Provisioned concurrency configuration"
    ]
  },
  {
    "question": "What is lazy loading in Node.js?",
    "answer": "Lazy loading defers loading a module or resource until it is actually needed rather than at startup. This reduces startup time and memory usage for rarely used code paths.",
    "difficulty": "medium",
    "why_important": "Important for optimizing cold start time in serverless and large applications.",
    "simple_example": "// Eager: const pdf = require('pdfmake'); // loaded at startup\n// Lazy:\nrouter.get('/pdf', async (req, res) => {\n  const pdf = require('pdfmake');\n});",
    "use_cases": [
      "Reducing Lambda cold start time",
      "Loading heavy parsing libraries on demand",
      "Startup performance optimization"
    ]
  },
  {
    "question": "What is the ALS (AsyncLocalStorage) in Node.js?",
    "answer": "AsyncLocalStorage provides a way to store data that is accessible throughout an asynchronous call chain without passing it through every function. It's used for request-scoped data like request IDs and user context in logging.",
    "difficulty": "hard",
    "why_important": "Eliminates the need to thread context through every function call in request handling.",
    "simple_example": "const als = new AsyncLocalStorage();\napp.use((req, res, next) => als.run({ reqId: uuid() }, next));\nlogger.info(als.getStore().reqId); // available anywhere in the chain",
    "use_cases": [
      "Correlation ID propagation through async code",
      "Request-scoped user context",
      "Distributed tracing context propagation"
    ]
  },
  {
    "question": "What is the inspect flag and how do you debug Node.js applications?",
    "answer": "The --inspect flag starts a Node.js debug server on port 9229, allowing Chrome DevTools or VS Code to attach for breakpoint debugging, step execution, call stack inspection, and memory profiling.",
    "difficulty": "easy",
    "why_important": "Debugging with breakpoints is far more effective than console.log for complex bugs.",
    "simple_example": "node --inspect app.js\n# Open chrome://inspect in Chrome\n# Or use VS Code launch.json with 'attach'",
    "use_cases": [
      "Setting breakpoints in async code",
      "Inspecting variable state at runtime",
      "Profiling CPU-bound code"
    ]
  },
  {
    "question": "What is Prisma and how does it differ from Sequelize?",
    "answer": "Prisma is a modern type-safe ORM with a declarative schema file (schema.prisma) and auto-generated TypeScript types. Sequelize is a mature ORM using model class definitions with less TypeScript integration. Prisma's generated types catch DB mismatches at compile time.",
    "difficulty": "medium",
    "why_important": "Prisma has become the preferred ORM in modern TypeScript Node.js stacks.",
    "simple_example": "// Prisma: fully typed\nconst user = await prisma.user.findUnique({ where: { id: 1 } });",
    "use_cases": [
      "Type-safe database access in TypeScript",
      "Schema migration management with prisma migrate",
      "Auto-completing database queries in editors"
    ]
  },
  {
    "question": "What is the difference between TCP and UDP and when would Node.js use UDP?",
    "answer": "TCP provides reliable, ordered, connection-based delivery with handshaking and retransmission. UDP is connectionless, faster, with no delivery guarantee. Node.js uses UDP (via the dgram module) for real-time applications where speed trumps reliability.",
    "difficulty": "hard",
    "why_important": "Choosing the right transport protocol is fundamental for network application design.",
    "simple_example": "const socket = dgram.createSocket('udp4');\nsocket.send(msg, 0, msg.length, 41234, 'localhost');",
    "use_cases": [
      "Real-time game state broadcasting",
      "Live video/audio streaming",
      "DNS lookups and syslog"
    ]
  },
  {
    "question": "What is the difference between monorepo and polyrepo for Node.js projects?",
    "answer": "A monorepo stores multiple packages or services in a single repository, enabling code sharing and atomic commits across packages. A polyrepo uses separate repositories per service, offering isolation but making cross-service changes harder.",
    "difficulty": "medium",
    "why_important": "Repository structure choice affects developer workflow and tooling significantly.",
    "simple_example": "# Monorepo with nx or turborepo:\n/packages/api\n/packages/web\n/packages/shared-utils",
    "use_cases": [
      "Sharing TypeScript types across frontend and backend",
      "Atomic cross-service refactoring",
      "Unified CI pipeline for related services"
    ]
  },
  {
    "question": "What is tRPC and how does it work with Node.js?",
    "answer": "tRPC enables end-to-end type-safe APIs without code generation by sharing TypeScript types between Node.js server and client. The server defines procedures; the client calls them with full type inference — no REST or GraphQL schema needed.",
    "difficulty": "hard",
    "why_important": "tRPC is gaining rapid adoption in TypeScript full-stack Node.js projects.",
    "simple_example": "// Server defines\ngetUser: t.procedure.query(() => db.user.findMany())\n// Client uses with full types\nconst users = await trpc.getUser.query();",
    "use_cases": [
      "Type-safe internal API between Next.js frontend and Node backend",
      "Eliminating OpenAPI schema maintenance",
      "Rapid full-stack TypeScript development"
    ]
  },
  {
    "question": "What is the Node.js profiler and how do you identify CPU bottlenecks?",
    "answer": "Run node --prof to generate a V8 profiler tick file, then use node --prof-process to convert it to a human-readable flame graph showing where CPU time is spent. clinic.js flame also provides visual flame graphs.",
    "difficulty": "hard",
    "why_important": "Profiling is the correct way to identify and fix CPU performance issues.",
    "simple_example": "node --prof app.js\n# generate load...\nnode --prof-process isolate-*.log > processed.txt",
    "use_cases": [
      "Finding hot functions that consume CPU",
      "Identifying inefficient algorithms",
      "Diagnosing event loop lag causes"
    ]
  },
  {
    "question": "What is the difference between process.env and config modules?",
    "answer": "process.env gives raw string access to environment variables with no validation or defaults. Config modules like convict or a custom config.ts layer add type coercion, default values, validation, and named access — reducing runtime config errors.",
    "difficulty": "medium",
    "why_important": "Direct process.env access causes silent bugs when variables are missing or mistyped.",
    "simple_example": "// Raw: const port = Number(process.env.PORT) || 3000;\n// Config module: const { port } = config; // validated and typed",
    "use_cases": [
      "Centralizing configuration access",
      "Validating required env vars on startup",
      "Providing sensible defaults"
    ]
  },
  {
    "question": "What is the purpose of health check endpoints in Node.js services?",
    "answer": "Health check endpoints (typically GET /health or /healthz) return the service's status so load balancers, Kubernetes liveness probes, and monitoring tools can detect unhealthy instances and route traffic away from or restart them.",
    "difficulty": "easy",
    "why_important": "Required for reliable Kubernetes deployments and zero-downtime operations.",
    "simple_example": "app.get('/healthz', async (req, res) => {\n  await db.query('SELECT 1');\n  res.json({ status: 'ok' });\n});",
    "use_cases": [
      "Kubernetes liveness and readiness probes",
      "Load balancer health monitoring",
      "Detecting DB connectivity issues"
    ]
  },
  {
    "question": "What is the node:test module (built-in test runner)?",
    "answer": "Since Node.js 18, there is a built-in test runner via node:test that supports describe/it/test blocks, assertions, mocking, and TAP/spec reporters. It provides Jest-like testing without any third-party dependencies.",
    "difficulty": "medium",
    "why_important": "Reduces dependency footprint for testing and simplifies small project setups.",
    "simple_example": "import { test } from 'node:test';\nimport assert from 'node:assert';\ntest('adds correctly', () => assert.equal(1+1, 2));",
    "use_cases": [
      "Testing small packages with no external deps",
      "CI pipelines with minimal installs",
      "Learning Node.js testing fundamentals"
    ]
  }
],
};
