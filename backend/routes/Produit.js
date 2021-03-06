//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/Produit');

//CREATE
router.post("/Produit/:id", (req, res) => {

    controller.create(req, res);

});

//READ
router.get("/Produits", (req, res) => {
    
    controller.reads(req, res);

});

router.get("/Produit/:id", (req, res) => {
    
    controller.read(req, res);

});

//UPDATE
router.put("/Produit/:id", (req, res) => {
    
    controller.update(req, res);

});

//DELETE
router.delete("/Produit/:id", (req, res) => {
    
    controller.delete(req, res);

});

//COMPLETED
router.post("/Produit/:id/done", (req, res) => {

    controller.done(req, res);

});

router.post("/Produit/:id/undone", (req, res) => {

    controller.undone(req, res);

});

module.exports = router;