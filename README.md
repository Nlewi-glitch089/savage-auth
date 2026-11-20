# Savage Auth

Savage Auth is an Express application that demonstrates user authentication and session-based access to a protected profile and message board. Visitors can create an account with an email address and password, sign in, and access the profile area after authentication.

## How it works

- **Registration:** Passport's local strategy checks whether an email is already registered. New passwords are hashed before the user record is saved in MongoDB.
- **Login and sessions:** Passport verifies the submitted email and password, then maintains the authenticated user through an Express session.
- **Protected profile:** The profile route checks that a user is signed in before displaying their account information and the message board.
- **Message board:** Signed-in users can post messages, add thumbs-up or thumbs-down votes, and delete messages. MongoDB stores the messages and vote counts; vote updates use atomic increments so concurrent or stale pages do not overwrite the stored count.
- **Logout:** Users can end their session and return to the home page.

The application uses Express, EJS templates, Passport Local, Mongoose/MongoDB, and server-side sessions. The current authentication flow is email-and-password based.

## Installation

1. Clone the repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in your own values (see below).

## Usage

1. Run `npm start` (or `node server.js`).
2. Navigate to `localhost:8080`.

Requires Node.js 20.19 or newer (Mongoose 9).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string. The database name in its path is the database used. |
| `SESSION_SECRET` | Yes | Long random string used to sign session cookies. |
| `PORT` | No | Port to listen on. Defaults to 8080; Render sets it automatically. |

The server exits with an error if `MONGODB_URI` or `SESSION_SECRET` is missing, or if it can't connect to MongoDB. `.env` is ignored by Git; never commit real credentials.

## Deploying to Render

1. Create a **Web Service** from this repo.
2. Build command: `npm install`
3. Start command: `npm start`
4. Under **Environment**, add `MONGODB_URI` and `SESSION_SECRET` (and `NODE_VERSION` = `22` if the service uses an older Node version).
5. In MongoDB Atlas, allow connections from Render under **Network Access** and create a database user for the app.

## Credit

Modified from Scotch.io's auth tutorial.

## Live Demo

[Open Savage Auth](https://savage-auth-xwwz.onrender.com/)

The application is deployed on Render. Sign-in, registration, and message-board data depend on the configured MongoDB connection and session environment variables.
