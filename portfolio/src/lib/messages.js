import clientPromise from "./mongodb";

const DB_NAME = "portfolio";
const COLLECTION = "messages";
const STATS_COLLECTION = "stats";

export async function incrementStat(key) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db
    .collection(STATS_COLLECTION)
    .updateOne({ _id: key }, { $inc: { count: 1 } }, { upsert: true });
}

export async function getStat(key) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const doc = await db.collection(STATS_COLLECTION).findOne({ _id: key });
  return doc?.count || 0;
}

export async function getStatsWithPrefix(prefix) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const docs = await db
    .collection(STATS_COLLECTION)
    .find({ _id: { $regex: `^${prefix}` } })
    .toArray();
  return docs.map((d) => ({ key: d._id, count: d.count || 0 }));
}

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

export async function addSubscriber(email) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db
    .collection("subscribers")
    .updateOne(
      { _id: email },
      { $set: { subscribedAt: new Date().toISOString() } },
      { upsert: true }
    );
}