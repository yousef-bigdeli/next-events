import {
  connectDatabase,
  insertDocument,
  getDocument,
} from "@/helpers/db-utils";

async function handler(req, res) {
  const { eventId } = req.query;
  let client;

  // connect to the database
  try {
    client = await connectDatabase();
  } catch (error) {
    console.log("Connecting to the database failed!", error);
    res.status(500).json({ message: "server error.", status: 500 });
    return;
  }

  // *********** Add new comment ***********
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    const newComment = {
      name,
      email,
      text,
      eventId,
    };

    // Validation of sent values
    if (
      !email.includes("@") ||
      !name ||
      !name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input.", status: 422 });
      client.close();
      return;
    }

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Added comment.", comment: newComment, status: 201 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error.", status: 500 });
    }
  }

  // *********** Get comment ***********
  if (req.method === "GET") {
    try {
      const results = await getDocument(
        client,
        "comments",
        { eventId },
        { _id: -1 }
      );

      res.status(200).json({ comments: results, status: 200 });
    } catch (error) {
      console.log("Cannot get comments from database.", error);
      res.status(500).json({ message: "Server error.", status: 500 });
    }
  }

  client.close();
}

export default handler;