function createCategorie(req, res) {
    let Categorie = require('../models/Categorie');
    let newCategorie = Categorie ({
        nom: req.body.nom,
        description : req.body.description
    });
  
    newCategorie.save()
    .then((newCategorie) => {
        boutique = require('../models/Boutique')
        boutique.findById({_id:req.params.id})
        .then((boutique) => {
            boutique.categories.push(newCategorie._id)
            boutique.save()
        })

        //send back the created Categorie
        res.json(newCategorie);
            
    }, (err) => {
        res.status(400).json(err)
    });

}

function readCategories(req, res) {

    let Categorie = require("../models/Categorie");

    Categorie.find({})
    .then((Categories) => {
        res.status(200).json(Categories);
    }, (err) => {
        res.status(500).json(err);
    });
}

function readCategorie(req, res) {

    let Categorie = require("../models/Categorie");

    Categorie.findById({_id : req.params.id})
    .then((categorie) => {
        res.status(200).json(categorie);
    }, (err) => {
        res.status(500).json(err);
    });
}

function updateCategorie(req, res) {

    let Categorie = require("../models/Categorie");

    Categorie.findByIdAndUpdate({_id: req.params.id}, 
        {nom : req.body.nom, 
        description : req.body.description
    }, 
        {new : true})
    .then((updatedCategorie) => {
        res.status(200).json(updatedCategorie);
    }, (err) => {
        res.status(500).json(err);
    });
}

function deleteCategorie(req, res) {

    let Categorie = require("../models/Categorie");

    deletedCategorie = Categorie.findOneAndRemove({_id : req.params.id})
    .then((deletedCategorie) => {
        res.status(200).json(deletedCategorie);
    }, (err) => {
        res.status(500).json(err);
    });
}

function done(req, res) {

    let Categorie = require("../models/Categorie");

    Categorie.findByIdAndUpdate({_id: req.params.id}, 
        {done : true}, 
        {new : true})
    .then((updatedCategorie) => {
        res.status(200).json(updatedCategorie);
    }, (err) => {
        res.status(500).json(err);
    });

}

function undone(req, res) {

    let Categorie = require("../models/Categorie");

    Categorie.findByIdAndUpdate({_id: req.params.id}, 
        {done : false}, 
        {new : true})
    .then((updatedCategorie) => {
        res.status(200).json(updatedCategorie);
    }, (err) => {
        res.status(500).json(err);
    });

}

module.exports.create = createCategorie;
module.exports.reads = readCategories;
module.exports.read = readCategorie;
module.exports.delete = deleteCategorie;
module.exports.update = updateCategorie;
module.exports.done = done;
module.exports.undone = undone;
