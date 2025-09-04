import { type Db, MongoClient } from "mongodb";

const uri =
	process.env.MONGODB_URI ?? "probleme de connexion a la base de donnees";
const DB_NAME = process.env.MONGODB_DB ?? "a2pied";

let client: MongoClient | null = null;

export async function connectMongo(): Promise<Db> {
	const t0 = Date.now();
	try {
		console.log(`connecting database…`);
		client = new MongoClient(uri);
		await client.connect();
		const db = client.db(DB_NAME);
		await db.command({ ping: 1 });
		console.log(`[mongo] connected ✔ (${Date.now() - t0}ms), db="${DB_NAME}"`);
		return db;
	} catch (err) {
		console.error("[mongo] connection error :", err);
		throw err;
	}
}

export function getDb(): Db {
	if (!client)
		throw new Error("Mongo not connected. Call connectMongo() first.");
	return client.db(DB_NAME);
}
