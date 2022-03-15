//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/Boutique');

//CREATE
router.post("/Boutique", (req, res) => {

    controller.create(req, res);

});

//READ
router.get("/Boutiques", (req, res) => {
    
    controller.reads(req, res);

});

router.get("/Boutique/:id", (req, res) => {
    
    controller.read(req, res);

});

//UPDATE
router.put("/Boutique/:id", (req, res) => {
    
    controller.update(req, res);

});

//DELETE
router.delete("/Boutique/:id", (req, res) => {
    
    controller.delete(req, res);

});

//COMPLETED
router.post("/Boutique/:id/done", (req, res) => {

    controller.done(req, res);

});

router.post("/Boutique/:id/undone", (req, res) => {

    controller.undone(req, res);

});

module.exports = router;