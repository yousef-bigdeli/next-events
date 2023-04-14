function handler(req, res) {
  const { eventId } = req.query;
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    const newComment = {
      id: new Date().toISOString(),
      name,
      email,
      text,
    };

    if (
      !email.includes("@") ||
      !name ||
      !name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // create
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [];
    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
