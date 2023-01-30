const router = require('express').Router();
const UserModel = require('../../services/mongo/models/user.model');
const { fork } = require('child_process');
const md5 = require('md5');
const random = require('../randoms');
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

router.get('/randoms', (req, res) => {
    const cant = req.query.cant || 100000000;
    const childProcess = fork('./src/routes/randoms.js');
  
    childProcess.send({ cant });
  
    childProcess.on('message', randomNumbers => {
      res.send(randomNumbers);
    });
  });

module.exports = router;