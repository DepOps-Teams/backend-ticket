const express = require("express");
const rute = express.Router();
const productSchema = require("../models/produk");


//1. Get Data 
rute.get("/getProduk", async(req,res) => {
    try{
        const produk = await productSchema.find();
        res.status(200).json(produk)
    }catch(err){
        res.status(400).json({message : "Data tidak ditemukan"})
    }
})



//2. Post Produk
rute.post("/getProduk",async(req,res) => {
    try{
        const produk = new productSchema(req.body);
        const saveData = await produk.save();
        res.status(201).json(saveData);
    }catch(err){
        res.status(400).json({message : "Data tidak ditemukan"})
    }
})


module.exports = rute