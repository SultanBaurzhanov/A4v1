const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
    check('username', 'Name cannot be empty').notEmpty(),
    check('password', 'Password can be 3-10 length of symbols').isLength({ min: 3, max: 10 })
], controller.registration);

router.post('/login', controller.login);

router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers) //admin gets user list

/*router.get('/registration', (_, res) => {
    res.sendFile(path.join(__dirname, '/public/registration.html'))
})*/

module.exports = router;
