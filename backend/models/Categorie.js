var mongoose = require('mongoose');
const Boutique = require('./Boutique');
const Produit = require('./Produit');

var Schema = mongoose.Schema;

var Categorie = new Schema({
  id : String,
  nom : String,
  description : String,
  produits : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit'
  }]
});

module.exports = mongoose.model('Categorie', Categorie);
