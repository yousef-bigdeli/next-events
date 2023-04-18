import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db(process.env.DBNAME);
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getDocument(client, collection, filter = {}, sort = {}) {
  const db = client.db(process.env.DBNAME);

  const results = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return results;
}
