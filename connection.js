const postgres = require('postgres');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set. Please set it in your .env file or environment.');
  console.error('Expected something like: postgres://user:password@host:5432/dbname');
  // Export a function that will throw when used so failures are obvious
  module.exports = () => {
    throw new Error('DATABASE_URL not configured');
  };
  return;
}

// Choose a safe SSL option: disable for localhost, enable (but permissive) otherwise.
let sslOption = { rejectUnauthorized: false };
if (/localhost|127\.0\.0\.1/.test(connectionString)) {
  sslOption = false;
}

const sql = postgres(connectionString, {
  ssl: sslOption,
  max: 5,
});

// Log parsed connection parts (mask password) to help debug credential/host issues
try {
  const parsed = new URL(connectionString);
  const user = parsed.username || '<missing>';
  const host = parsed.hostname || '<missing>';
  const port = parsed.port || '<default>';
  const db = parsed.pathname ? parsed.pathname.replace('/', '') : '<missing>';
  console.log(`Using DB connection: ${user}@${host}:${port}/${db}`);
} catch (e) {
  // ignore parse errors
}

async function checkConnection() {
  try {
    await sql`SELECT 1`;
    console.log('✅ Database connection successful');
  } catch (err) {
    // Provide a clearer, actionable error message for the user
    console.error('❌ Database connection failed:');
    if (err && err.message) console.error('Message:', err.message);
    if (err && err.code) console.error('Code:', err.code);
    if (err && err.severity) console.error('Severity:', err.severity);
    console.error('Check that `DATABASE_URL` is correct and the database accepts connections from this host.');
  }
}

checkConnection();

module.exports = sql;
