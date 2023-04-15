import { MongoClient } from "mongodb";

const client = new MongoClient(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gcoji.mongodb.net/?retryWrites=true&w=majority`
);

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address.", status: 422 });
      return;
    }

    try {
      await client.connect();
      const db = client.db("next-events");
      await db.collection("newsletter").insertOne({
        email: userEmail,
      });

      res.status(201).json({
        message: "Signed up!",
        status: 201,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error.",
        status: 500,
      });
    } finally {
      client.close();
    }
  }
}

export default handler;
