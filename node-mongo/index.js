const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations')

// const url = 'mongodb://localhost:27017/'
const url = 'mongodb://127.0.0.1:27017'
const dbname = 'newtestdatabase'

MongoClient.connect(url , (err, client)=>{
    assert.equal(err,null);
    console.log("Connected Correctly to Server");

    const db = client.db(dbname);

    dboper.insertDocuments(db,{ name:"fsdqc" , description : "from fsd city"},'dishes',(result)=>{
        console.log("Insert Document:\n",result);

        dboper.findDocuments(db,'dishes',(docs) => {
            console.log("Found Documents:\n",docs);

            dboper.updateDocuments(db, { name: "fsdqc" },{ description: "Updated Test" },"dishes",(result) =>{
                console.log("Updated Document:\n",result);
                
                dboper.findDocuments(db,'dishes',(docs) => {
                    console.log("Found Documents:\n",docs);

                    db.dropCollection('dishes',(result)=>{
                        console.log("Dropped Collection", result);
                        client.close();
                    })
                })
                
            })

        })


    })
    // const collection = db.collection('dishes');
    // collection.insertOne({"name":"Ithapitas","description":"test"}, (err, result)=>{
    //     assert.equal(err, null);
    //     console.log("After Insert:\n");
    //     console.log(result);


    //     collection.find({}).toArray((err,docs)=>{
    //         assert.equal(err,null);
    //         console.log('Found:\n');
    //         console.log(docs);

    //         db.dropCollection('dishes',(err,result)=>{
    //             assert.equal(err,null);
    //             client.close();
    //         })
    //     })
    // })
    MongoClient.connect

    

})