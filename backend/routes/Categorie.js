//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/Categorie');

//CREATE
router.post("/Categorie/:id", (req, res) => {

    controller.create(req, res);

});

//READ
router.get("/Categories", (req, res) => {
    
    controller.reads(req, res);

});

router.get("/Categorie/:id", (req, res) => {
    
    controller.read(req, res);

});

//UPDATE
router.put("/Categorie/:id", (req, res) => {
    
    controller.update(req, res);

});

//DELETE
router.delete("/Categorie/:id", (req, res) => {
    
    controller.delete(req, res);

});

//COMPLETED
router.post("/Categorie/:id/done", (req, res) => {

    controller.done(req, res);

});

router.post("/Categorie/:id/undone", (req, res) => {

    controller.undone(req, res);

});

module.exports = router;