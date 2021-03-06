const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async (req, res, next) => {

    try {
        const { username, password, name } = req.body;
        const already = await userModel.findOne({ where: { "username": username } })
        if (already) {
            return res.status(422).json({
                "code": 'ALREADY_FIELD',
                "description": `Username: ${username} is Already`,
                "field": "username"
            });

        }
        if (username === undefined || username === '') {
            return res.status(422).json({

                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Username Is Required',
                'field': 'username',

            });
        }
        const tmp = {
            "username": username,
            "password": bcrypt.hashSync(password, 8),
            "name": name,
        }
        let register = await userModel.create(tmp);
        res.status(200).json({

            'Message': `Register  Username: ${register.username} SuccessFuly`,

        });

    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'somting went wrong ,Please try agian',
            'error': error
        });

    }

}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        let user = await userModel.findOne({ where: { "username": username } });
        if (!user) {

            return res.status(200).json({

                'code': 'BAD_REQUEST_ERROR',
                'description': 'username not found in the system',
                'field': 'username',
                'OK': false
            });
        }

        let _password = await bcrypt.compare(password, user.password);
        if (!_password) {

            return res.status(200).json({

                'code': 'BAD_VALID_ERROR',
                'description': 'Password is incorrect. Please Try Again',
                'field': 'password',
                'OK': false

            });
        }

        let token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);

        if (token) {

            return res.status(200).json({
                'access_token': token,
                'token_type': 'Bearer',
                'message': 'Login SuccessFully',
                'OK': true
            });

        } else {

            throw new Error('somthing went worng');
        }

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Internal Server Error',
            'error': error
        });

    }







}

exports.users = async(req,res,next)=>{

    

}