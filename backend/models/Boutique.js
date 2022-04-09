var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Boutique = new Schema({
  nom : String,
  departement : Number,
  categories: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Categorie'
  }]
});

module.exports = mongoose.model('Boutique', Boutique);