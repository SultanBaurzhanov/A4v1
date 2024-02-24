const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator') //return errors made during validation
const {secret} = require('./config') //only get the secret key

const generateAccessToken = (id, roles) => { //hides info
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '12h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message:'Error in registration', errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({ username }); // Await the result

            if (candidate) {
                return res.status(400).json({ message: 'User with this name already exists' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'USER' });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return res.json({ message: 'User registered!' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})

            if (!user) { //if no user found
                return res.status(400).json({message:`User ${username} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)  //if user is found / password normal, user.password hashed ver
            
            if (!validPassword) {
                return res.status(400).json({message:`Wrong password`})
            }

            //json web token
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token}) //return token on client
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find() //request to bd
            res.json(users); //gives all users
        } catch (error) {
           
        }
    }
}

module.exports = new authController();
