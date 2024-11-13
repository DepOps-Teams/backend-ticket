const express = require("express");
const rute = express.Router();
const historySchema = require("../models/history");


//1. Get Data 
rute.get("/getHistory", async(req,res) => {
    try{
        const produk = await historySchema.find();
        res.status(200).json(produk)
    }catch(err){
        res.status(400).json({message : "Data tidak ditemukan"})
    }
})



//2. Post Produk
rute.post("/getHistory",async(req,res) => {
    try{
        const produk = new historySchema(req.body);
        const saveData = await produk.save();
        res.status(201).json(saveData);
    }catch(err){
        res.status(400).json({message : err})
    }
})


//3. Delete Produk
rute.delete("/getHistory/:id",async(req,res) => {
    try{
        const id = req.params.id
        const delData = await historySchema.findByIdAndDelete(id);
        if(!delData){
            res.status(404).json({message : "Data tidak ditemukan"})
        }
        res.status(200).json({message : "Data berhasil dihapus"})
    }catch(err){
        res.status(400).json({message : "Data tidak ditemukan"})
    }
})



module.exports = rute