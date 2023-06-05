import { Client } from "pg";

export default async function connectToDb() {
  "use server";
  const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

  await client.connect();

  return client;
}
