const product = require('../models/product.model');
const Sequelize = require('sequelize');

const formidable = require('formidable');
const path = require("path");
const fs = require('fs-extra');
const Op = Sequelize.Op;


//Method
uploadImage = async (files, doc) => {
    if (files.image != null) {
        var fileExtention = files.image.name.split(".")[1];

        console.log(doc.name);

        doc.image = `${doc.id}.${fileExtention}`;

        var newpath =
            path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
           // path.resolve( "/uploaded/images/") + "/" + doc.image;
            
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

//Module
exports.addproduct = async (req, res, next) => {

    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            let result = await product.create(fields);
            result = await uploadImage(files, result);
            res.json({
                'OK': true,
                'messages': JSON.stringify(result)
            });

        })

    } catch (error) {
        res.json({
            'OK': false,
            'message': error,
        });

    }

}

