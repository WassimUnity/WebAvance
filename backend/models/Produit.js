var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Produit = new Schema({
  id : String,
  nom : String,
  prix : Number
});

module.exports = mongoose.model('Produit', Produit);
