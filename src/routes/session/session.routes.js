const router = require('express').Router();
const UserModel = require('../../services/mongo/models/user.model');
const md5 = require('md5');
const authMiddleware = require('../../middlewares/authMiddleware');

const passport = require('passport');

router.post('/signup', passport.authenticate('signup', {failureRedirect: '/error'}), async (req, res) => {
    console.log(req.user);
    res.redirect('/home');
});

router.post('/signin', passport.authenticate('login', {failureRedirect: '/error'}), async (req, res) => {
    console.log(req.user);
    res.redirect('/home');
});

router.get('/signout', (req, res) => {
    req.logout(() => {
        res.redirect('/signin');
    })
});

router.get('/viewProducts', authMiddleware, async (req, res) => {
    const userData = req.user;
    res.render('viewProducts', {fullName: userData.fullName});
});


module.exports = router;