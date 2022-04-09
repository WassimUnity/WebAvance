var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Categorie = new Schema({
  nom : String,
  description : String,
  produits : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit'
  }]
});

module.exports = mongoose.model('Categorie', Categorie);
