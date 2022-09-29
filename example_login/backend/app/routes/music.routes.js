const express = require('express')
const music = require('../controllers/music.controllers')

module.exports = (app) => {
    const router = express.Router();

   
    router.route("/")
        .get(music.getAllMusics)
        .post(music.addNewMusic)

    router.route("/:musicId")
        .delete(music.deleteMusic)
        
    app.use("/api/music", router);
};