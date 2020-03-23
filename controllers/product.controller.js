const product = require('../models/product.model');
const Sequelize = require('sequelize');

const formidable = require('formidable');
const path = require("path");
const fs = require('fs-extra');
const Op = Sequelize.Op;
const jsftp = require('jsftp');


//**********************  Method  *****************
uploadImage = async (files, doc) => {
    if (files.image != null) {
        var fileExtention = files.image.name.split(".")[1];
        const name = doc.name

        doc.image = `${name}.${fileExtention}`;

        var newpath = path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;

        console.log(newpath);
        if (fs.exists(newpath)) {
            await fs.remove(newpath);
        }
        await fs.moveSync(files.image.path, newpath);

        // Update database
        let result = product.update(
            { image: doc.image },
            { where: { id: doc.id } }
        );
        return result;
    }
};

//**************************** Module  *******************


//Get Product By ID
exports.addproduct = async (req, res, next) => {

    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            let result = await product.create(fields);
            result = await uploadImage(files, result);
            res.json({
                'OK': true,
                'messages': result,
            });

        })

    } catch (error) {
        res.json({
            'OK': false,
            'message': error,
        });

    }

}
//get Product By ID 
exports.product = async (req, res, ) => {
    try {
        console.log(req.params.id);
        let result = await product.findOne({ where: { id: req.params.id } })

        res.json(result)

    } catch (error) {
        res.json(error)
    }
}


//get Product by Keyword
exports.keyproduct = async (req, res) => {

    const { keyword } = req.params;
    let result = await product.findAll({
        where: {
            name: { [Op.like]: `%${keyword}%` }
        }
    });

    res.json(result);

}
//get All Products
exports.allproduct = async (req, res) => {

    try {
        const result = await product.findAll();

        res.json({ "result": result });

    } catch (error) {

        res.json({ "message": error });

    }

}

