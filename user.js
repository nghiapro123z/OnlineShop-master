const express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('login');
})

router.post("/", async (req, res) => {
    let un = req.body.un;
    let pass = req.body.pass;
    if (un == "admin" && pass == "admin") {
        let client = await MongoClient.connect(url);
        let dbo = client.db("asm");

        let result = await dbo.collection("products").find({}).toArray();
        //res.render("allProduct", { product: result });
        var fullUrl = req.protocol + "://" + req.get("host") + "/product";
        res.redirect(fullUrl);
    } else {
        res.end("Login failed");
    }
});


module.exports = router;