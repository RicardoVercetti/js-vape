console.log("runs...");
import express from "express";
import https from "https";
import type { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;

// define the expected JSON request body
type UrlBody = {
  requestType: "get" | "post";
  requestUrl: string;
};

// allow requests from your React app (localhost:5173)
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); // enable JSON body parsing

// POST endpoint to accept JSON body
app.post("/scrape", async (req: Request<{}, {}, UrlBody>, res: Response) => {
  const { requestType, requestUrl } = req.body;

  if (!requestUrl) {
    return res.status(400).json({ error: "Missing requestUrl in body" });
  }

  try {
    let response;

    if (requestType === "get") {
      response = await axios.get(requestUrl, {
        headers: { "User-Agent": "Mozilla/5.0" },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // ignore SSL errors for dev/testing
        }),
      });
    } else if (requestType === "post") {
      // optional: you can pass a dummy body if needed, here sending empty
      response = await axios.post(requestUrl, {}, {
        headers: { "User-Agent": "Mozilla/5.0" },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // ignore SSL errors for dev/testing
        }),
      });
    } else {
      return res.status(400).json({ error: "Invalid requestType, must be 'get' or 'post'" });
    }

    res.json({ requestType, requestUrl, data: response.data });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Scrape error:", err.message);
      console.error("response: "+ err.cause)

      res.status(500).json({ error: err.message });
    } else {
      console.error("Unexpected scrape error:", err);
      res.status(500).json({ error: "Unknown error" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
