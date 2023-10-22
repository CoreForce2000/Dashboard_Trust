import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
    let collection = await db.collection("Research");
    let results = await collection.find({})
      .limit(50)
      .toArray();
    res.send(results).status(200);
});

// Get top 100 words for a wordnet
router.get("/wordnet", async (req, res) => {
    let collection = await db.collection("Research");
    let results = await collection.aggregate([
      {"$project": {"words": { "$split": ["$WORD_association", ","]}, "_id": 1}},
      {"$unwind": "$words"},
      {"$group": {
        "_id": "$words",
        "count": { $sum: 1 }
        }
      },
      {"$sort": {"count": -1}},
      {"$limit": 100},
      {
        $project: {
            label: "$_id",
            value: "$count",
            _id: 0
        }
    }
    ]).toArray();

    
    results.forEach((item, index) => {
        item.id = index+1;
    });
        
    res.send(results).status(200);
  });

// Get top 100 words for a wordcloud
router.get("/wordcloud", async (req, res) => {
    let collection = await db.collection("Research");
    let results = await collection.aggregate([
        {"$project": {"words": { "$split": [`$${req.query.field}`, ","]}, "_id": 1}},
        {"$unwind": "$words"},
        {"$group": {
        "_id": "$words",
        "count": { $sum: 1 }
        }
        },
        {"$sort": {"count": -1}},
        {"$limit": 100},
        {
        $project: {
            text: "$_id",
            value: "$count",
            _id: 0
        }
    }
    ]).toArray();

    res.send(results).status(200);
});


export default router;