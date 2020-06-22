const express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://asm:12345@cluster0-9snej.mongodb.net/test';


router.get('/',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("asm");
   
    let results = await dbo.collection("products").find({}).toArray();
    res.render('allProducts',{products:results});
})

router.get('/add',(req,res)=>{
    res.render('addproduct');
})

router.post('/doAdd',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("asm");
    let nameValue = req.body.txtName;
    let categoryValue = req.body.txtCategory;
    let descriptionValue = req.body.txtDescription;
    let priceValue = req.body.txtPrice;
    let newProduct = {name : nameValue, category : categoryValue, description : descriptionValue, price : priceValue};
    await dbo.collection("products").insertOne(newProduct);
   
    let results = await dbo.collection("products").find({}).toArray();
    res.render('allProducts',{products:results});
})

router.get('/delete',async (req,res)=>{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    let client= await MongoClient.connect(url);
    let dbo = client.db("asm");
    await dbo.collection("products").deleteOne(condition);
    //
    let results = await dbo.collection("products").find({}).toArray();
    res.render('allProducts',{customers:results});
})

module.exports = router;