//server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database')
const port = 3000;
const path = require('path');

app.use(bodyParser.json());
app.use('/listing/:listingID',express.static(path.resolve(__dirname,"../../Listing/public")))

app.get('/listing/desc/:listingID',(req,res)=>{
    var id = req.params.listingID
    db.findDesc(id,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        res.json(data[0])
    })
})
app.get('/listing/amenity/:listingID',(req,res)=>{
    var id = req.params.listingID
    db.findAmen(id,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        res.json(data[0])
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports = app;