const db = require("../models");
module.exports = function (app) {

    app.get("/", function (req, res) {
        res.redirect("/burgers");
    });


    app.get("/burgers", function (req, res) {

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

            console.log(result);
            res.redirect("/");
        });
    });

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

                res.json("/");
            });
    });

};
