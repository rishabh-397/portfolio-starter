import clientPromise from "./mongodb";

const DB_NAME = "portfolio";
const COLLECTION = "messages";

export async function readMessages() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const messages = await db
    .collection(COLLECTION)
    .find({})
    .sort({ receivedAt: -1 })
    .toArray();

  return messages.map((m) => ({
    id: m._id.toString(),
    name: m.name,
    email: m.email,
    message: m.message,
    receivedAt: m.receivedAt,
  }));
}

export async function addMessage(msg) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db.collection(COLLECTION).insertOne({
    ...msg,
    receivedAt: new Date().toISOString(),
  });
  return readMessages();
}