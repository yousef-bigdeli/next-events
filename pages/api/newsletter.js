import { connectDatabase, insertDocument } from "@/helpers/db-utils";

async function handler(req, res) {
  let client;

  // connect to the database
  try {
    client = await connectDatabase();
  } catch (error) {
    console.log("Connecting to the database failed!", error);
    res.status(500).json({ message: "server error.", status: 500 });
    return;
  }

  if (req.method === "POST") {
    const { email } = req.body;

    // Validation of sent email
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address.", status: 422 });
      client.close();
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email });
      res.status(201).json({
        message: "Signed up!",
        status: 201,
      });
    } catch (error) {
      console.error("Error insert new email. ", error);
      res.status(500).json({
        message: "Server Error.",
        status: 500,
      });
    }
  }

  client.close();
}

export default handler;
