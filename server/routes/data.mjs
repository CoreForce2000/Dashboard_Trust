import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get raw data
router.get("/", async (req, res) => {
    let collection = await db.collection("Research");
    let results = await collection.find({})
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
        {"$project": {"words": { "$split": [`$${req.query.column}`, ","]}, "_id": 1}},
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


// Demographics
router.get('/demographics', async (req, res) => {
  let collection = await db.collection("Research");  

  try {
    // Aggregate counts for each demographic variable
    let result = await collection.aggregate([
      {$group: { 
        _id: `$${req.query.column}`, 
        count: { $sum: 1 } }},

      {$sort: {count: -1}},
      
      {
        $project: {
            name: "$_id",
            count: "$count",
            _id: 0
        }
      }

    ]).toArray()

    
    // Sending the result as a response
    res.json(result);

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
  } finally {
      await client.close();
  }
});







export default router;