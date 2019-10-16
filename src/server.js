const express = require('express');             // Import express framework
const cookieParser = require('cookie-parser');  // Middeware for parsing cookies
const routes = require('./routes');             // Import routes our app uses

const port = 3000;          // Port the server listens on
const app = express();      // Create new app using the express middleware
                            // Factory function

app.use(express.json());    // Middleware for parsing HTTP body (json only)
app.use(cookieParser())     // Middleware for parsing cookies

app.use(routes);            // Mount application routes

// Start the server, expose it on port 'port'
app.listen(port, () => console.log(`Server listening on port ${port}`));
