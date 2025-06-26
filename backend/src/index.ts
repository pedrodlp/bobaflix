import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

import { Request, Response } from "express";

dotenv.config();

const app = express();
const PORT = 3000;

const SORTING_OPTIONS = ["best_match", "rating", "review_count", "distance"];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello Netflix! 🍿");
});

app.get("/api/boba", async (req: Request, res: Response) => {
	try {
		const { location, limit = "20", offset = "0", sort_by } = req.query;
		const apiKey = process.env.YELP_API_KEY ? process.env.YELP_API_KEY : "";

		// console.log("location ", location);

		const parsedLimit = Number(limit);
		// console.log("parsedLimit ", parsedLimit);
		const parsedOffset = Number(offset);
		// console.log("parsedOffset ", parsedOffset);

		if (!apiKey) {
			return res.status(500).json({
				error:
					"Yelp API key missing, you have to add it to the .env file in the /backend ;)",
			});
		}
		if (!location) {
			return res
				.status(400)
				.json({ error: "Too much boba in the world, I need your location ;)" });
		}

		const sort =
			typeof sort_by === "string" && SORTING_OPTIONS.includes(sort_by)
				? sort_by
				: "best_match";

		const options = {
			method: "GET",
			url: "https://api.yelp.com/v3/businesses/search",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				accept: "application/json",
			},
			params: {
				term: "boba",
				sort_by: sort,
				location,
				parsedLimit,
				parsedOffset,
			},
		};

		const yelpResponse = await axios(options);

		res.json(yelpResponse.data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}/`);
});
