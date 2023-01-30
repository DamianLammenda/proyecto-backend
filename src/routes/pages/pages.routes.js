const router = require('express').Router();
const os = require('os');
const path = require('path');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/signin', (req, res) => {
    if(req.isAuthenticated()){
       return res.redirect('/home')
    }
    res.render('signin');
});

router.get('/signup', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    res.render('signup');
});

router.get('/error', (_req, res) => {
    res.render('error');
});

router.get('/home', authMiddleware, (req, res) => {
    const userData = req.user;
    res.render('home', {fullName: userData.fullName});
});

router.get('/info', (req, res) => {
    const argv = process.argv;
    const platform = os.platform();
    const nodeVersion = process.version;
    const processId = process.pid;
    const projectDir = __dirname;
    const memoryUsage = process.memoryUsage().rss;
  
    res.status(200).json({
        argv,
        platform,
        nodeVersion,
        processId,
        projectDir,
        memoryUsage
        
    });
  });
  

module.exports = router;