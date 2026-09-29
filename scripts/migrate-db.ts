import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import pg from 'pg';

const { Pool } = pg;

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set in .env');
    process.exit(1);
  }

  console.log('Connecting to PostgreSQL database...');
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }, // Required for Supabase cloud PostgreSQL
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL successfully!');

    // Read schema.sql
    const schemaPath = path.resolve(process.cwd(), 'database/schema.sql');
    if (fs.existsSync(schemaPath)) {
      console.log('Executing database/schema.sql...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(schemaSql);
      console.log('✅ schema.sql executed successfully!');
    }

    // Read seed.sql
    const seedPath = path.resolve(process.cwd(), 'database/seed.sql');
    if (fs.existsSync(seedPath)) {
      console.log('Executing database/seed.sql...');
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      try {
        await client.query(seedSql);
        console.log('✅ seed.sql executed successfully!');
      } catch (seedErr: any) {
        console.log('ℹ️ Seed notes:', seedErr.message);
      }
    }

    // Verify projects table
    const result = await client.query('SELECT count(*) FROM projects');
    console.log(`✅ Projects count in PostgreSQL: ${result.rows[0].count}`);

    client.release();
  } catch (err: any) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    await pool.end();
  }
}

runMigration();
