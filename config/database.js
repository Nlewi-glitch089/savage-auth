// config/database.js
// The connection string comes from the MONGODB_URI environment variable
// (a local .env file in development, the Render dashboard in production).
// Never hardcode it here: this repo is public.
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env for local development, or add it under Environment in the Render dashboard.');
}

module.exports = {

    'url' : process.env.MONGODB_URI,
    'dbName': 'demo'
};
