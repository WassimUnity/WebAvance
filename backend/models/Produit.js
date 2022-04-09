var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Produit = new Schema({
  nom : String,
  prix : Number
});

module.exports = mongoose.model('Produit', Produit);
