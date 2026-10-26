## Installation

1. Clone repo
2. run `npm install`
3. Copy `.env.example` to `.env` and fill in your own values (see below)

## Usage

1. run `npm start` (or `node server.js`)
2. Navigate to `localhost:8080`

Requires Node.js 20.19 or newer (Mongoose 9).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | yes | MongoDB connection string. The database name in its path is the database used. |
| `SESSION_SECRET` | yes | Long random string used to sign session cookies. |
| `PORT` | no | Port to listen on. Defaults to 8080; Render sets it automatically. |

The server exits with an error if `MONGODB_URI` or `SESSION_SECRET` is missing, or if it can't connect to MongoDB. `.env` is ignored by Git; never commit real credentials.

## Deploying to Render

1. Create a **Web Service** from this repo.
2. Build command: `npm install`
3. Start command: `npm start`
4. Under **Environment**, add `MONGODB_URI` and `SESSION_SECRET` (and `NODE_VERSION` = `22` if the service uses an older Node version).
5. In MongoDB Atlas, allow connections from Render under **Network Access** (Render's outbound IPs, or `0.0.0.0/0` for a class project) and create a database user for the app.

## Credit

Modified from Scotch.io's auth tutorial
