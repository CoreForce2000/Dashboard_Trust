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
      {
          "$project": {
              "words": { "$split": [`$${req.query.column}`, ","]},
              "age": 1,
              "sex": 1,
              "_id": 1
          }
      },
      {
          "$unwind": "$words"
      },
      {
          "$group": {
              "_id": "$words",
              "count": { "$sum": 1 },
              "averageAge": { "$avg": "$age" },
              "MaleCount": {
                  "$sum": {
                      "$cond": {
                          "if": { "$eq": ["$sex", "Male"] },
                          "then": 1,
                          "else": 0
                      }
                  }
              },
              "FemaleCount": {
                  "$sum": {
                      "$cond": {
                          "if": { "$eq": ["$sex", "Female"] },
                          "then": 1,
                          "else": 0
                      }
                  }
              }
          }
      },
      {
          "$match": {"count": { "$gte": 30 }} 
      },
      {
          "$sort": {"count": -1}
      },
      {
          "$project": {
              "text": "$_id",
              "value": "$count",
              "averageAge": 1,
              "MaleCount": 1,
              "FemaleCount": 1,
              "_id": 0
          }
      }
  ]
  ).toArray();

  res.send(results).status(200);
});



// Demographics
router.get('/demographics', async (req, res) => {
    let collection = await db.collection("Research");  
    let results = await collection.aggregate([
        {
            "$group": { 
                "_id": `$${req.query.column}`, 
                "count": { "$sum": 1 }
            }
        },
        {
            "$sort": {"count": -1}
        },
        {
            "$limit": 20
        },
        {
            "$group": {
                "_id": null,
                "data": {
                    "$push": {
                        "k": "$_id",
                        "v": "$count"
                    }
                }
            }
        },
        {
            "$project": {
                "result": {"$arrayToObject": "$data"},
                "_id": 0
            }
        }
    ]
    ).limit(20).toArray()
    
    // Sending the result as a response
    res.send(results).status(200);
});

// Demographics
router.get('/valuecount', async (req, res) => {
    let collection = await db.collection("Research");  
    let results = await collection.aggregate([
        {
            "$group": { 
                "_id": `$${req.query.column}`, 
                "count": { "$sum": 1 }
            }
        },
        {
            "$sort": {"count": -1}
        },
        {
            "$limit": 15
        },
        {
            "$project": {
                "value": "$count",
                "name": "$_id",
                "_id": 0
            }
        }
    ]
    ).limit(20).toArray()
    
    // Sending the result as a response
    res.send(results).status(200);
});

router.get('/valuecountSex', async (req, res) => {
    let collection = await db.collection("Research");  
    let results = await collection.aggregate([
        {
            "$group": { 
                "_id": {
                    "column": `$${req.query.column}`,
                    "sex": "$sex"
                }, 
                "count": { "$sum": 1 }
            }
        },
        {
            "$group": {
                "_id": "$_id.column",
                "counts": {
                    "$push": {
                        "sex": "$_id.sex",
                        "count": "$count"
                    }
                }
            }
        },
        {
            "$project": {
                "_id": 0,
                "name": "$_id",
                "male": {
                    "$sum": {
                        "$map": {
                            "input": "$counts",
                            "as": "count",
                            "in": {
                                "$cond": [
                                    { "$eq": ["$$count.sex", "Male"] },
                                    "$$count.count",
                                    0
                                ]
                            }
                        }
                    }
                },
                "female": {
                    "$sum": {
                        "$map": {
                            "input": "$counts",
                            "as": "count",
                            "in": {
                                "$cond": [
                                    { "$eq": ["$$count.sex", "Female"] },
                                    "$$count.count",
                                    0
                                ]
                            }
                        }
                    }
                },
                "value": {
                    "$sum": {
                        "$map": {
                            "input": "$counts",
                            "as": "count",
                            "in": "$$count.count"
                        }
                    }
                }
            }
        },
        {
            "$sort": {"value": -1}
        },
        {
            "$limit": 15
        }
    ]).toArray()
    
    // Sending the result as a response
    res.send(results).status(200);
});


router.get('/valuecountAge', async (req, res) => {
    let collection = await db.collection("Research");
    let results = await collection.aggregate([
        {
            "$group": {
                "_id": `$${req.query.column}`,
                "18-37": {
                    "$sum": {
                        "$cond": [{ "$and": [{ "$gte": ["$age", 18] }, { "$lte": ["$age", 37] }] }, 1, 0]
                    }
                },
                "38-55": {
                    "$sum": {
                        "$cond": [{ "$and": [{ "$gte": ["$age", 38] }, { "$lte": ["$age", 55] }] }, 1, 0]
                    }
                },
                "56-88": {
                    "$sum": {
                        "$cond": [{ "$and": [{ "$gte": ["$age", 56] }, { "$lte": ["$age", 88] }] }, 1, 0]
                    }
                },
                "value": {
                    "$sum": 1
                }
            }
        },
        {
            "$project": {
                "_id": 0,
                "name": "$_id",
                "18-37": 1,
                "38-55": 1,
                "56-88": 1,
                "value": 1
            }
        },
        {
            "$sort": { "value": -1 }
        },
        {
            "$limit": 15
        }
    ]).toArray();
    
    // Sending the result as a response
    res.send(results).status(200);
});




router.get('/avgAge', async (req, res) => {
    let collection = await db.collection("Research");

    // You can pass the column name as a query parameter
    let columnName = req.query.column ? `$${req.query.column}` : null;

    let pipeline = [
        {
            "$group": {
                "_id": columnName,
                "averageAge": { "$avg": "$age" } // assuming the age field is named "age"
            }
        }
    ];

    let results = await collection.aggregate(pipeline).toArray();

    // Sending the result as a response
    res.send(results).status(200);
});




export default router;