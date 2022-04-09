function createProduit(req, res) {
    let Produit = require('../models/Produit');
    let newProduit = Produit ({
        nom: req.body.nom,
        prix : req.body.prix
    });
  
    newProduit.save()
    .then((newProduit) => {
        categorie = require('../models/Categorie')
        categorie.findById({_id:req.params.id})
        .then((categorie) => {
            categorie.produits.push(newProduit._id);
            categorie.save()
        })
        //send back the created produit
        res.json(newProduit);
            
    }, (err) => {
        res.status(400).json(err)
    });
}

function readProduits(req, res) {

    let Produit = require("../models/Produit");

    Produit.find({})
    .then((produits) => {
        res.status(200).json(produits);
    }, (err) => {
        res.status(500).json(err);
    });
 }

function readProduit(req, res) {

    let Produit = require("../models/Produit");

    Produit.findById({_id : req.params.id})
    .then((produit) => {
        res.status(200).json(produit);
    }, (err) => {
        res.status(500).json(err);
    });
 }

function updateProduit(req, res) {

    let Produit = require("../models/Produit");

    Produit.findByIdAndUpdate({_id: req.params.id}, 
        {nom : req.body.nom, 
        prix : req.body.prix
    }, 
        {new : true})
    .then((updatedProduit) => {
        res.status(200).json(updatedProduit);
    }, (err) => {
        res.status(500).json(err);
    });
}

function deleteProduit(req, res) {

    let Produit = require("../models/Produit");

    Produit.findOneAndRemove({_id : req.params.id})
    .then((deletedProduit) => {

        res.status(200).json(deletedProduit);
    }, (err) => {
        res.status(500).json(err);
    });
 }

function done(req, res) {

    let Produit = require("../models/Produit");

    Produit.findByIdAndUpdate({_id: req.params.id}, 
        {done : true}, 
        {new : true})
    .then((updatedProduit) => {
        res.status(200).json(updatedProduit);
    }, (err) => {
        res.status(500).json(err);
    });

}

function undone(req, res) {

    let Produit = require("../models/Produit");

    Produit.findByIdAndUpdate({_id: req.params.id}, 
        {done : false}, 
        {new : true})
    .then((updatedProduit) => {
        res.status(200).json(updatedProduit);
    }, (err) => {
        res.status(500).json(err);
    });

}

module.exports.create = createProduit;
module.exports.reads = readProduits;
module.exports.read = readProduit;
module.exports.delete = deleteProduit;
module.exports.update = updateProduit;
module.exports.done = done;
module.exports.undone = undone;
