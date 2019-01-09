const db = require("../models");
module.exports = function (app) {
    // var express = require("express");

    // var router = express.Router();
    // var burger = require("../models");

    // get route -> index
    app.get("/", function (req, res) {
        res.redirect("/burgers");
    });


    app.get("/burgers", function (req, res) {
        // express callback response by calling burger.selectAllBurger
        db.Burger.findAll(

        ).then(function (data) {
            console.log(data);

            var hbsObject = { burgers: data };
            console.log(hbsObject);

            res.render("index", hbsObject);
        });
    });

    // post route -> back to index
    app.post("/burgers/create", function (req, res) {
        // takes the request object using it as input for burger.addBurger
        db.Burger.create({
            name: req.body.burger_name,
            devoured: false
        }).then(function (result) {
            // wrapper for orm.js that using MySQL insert callback will return a log to console,
            // render back to index with handle
            console.log(result);
            res.redirect("/");
        });
    });

    // put route -> back to index
    app.put("/burgers/update/:id", function (req, res) {
        db.Burger.update({
            devoured: true
        },
            {
                where: {
                    uniqueId: req.params.id
                }
            }).then(function (result) {

                console.log(result);
                // Send back response and let page reload from .then in Ajax
                res.json("/");
            });
    });

};
