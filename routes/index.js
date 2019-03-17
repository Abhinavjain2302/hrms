var router = require('express').Router();

var controller = require("../controller/index");
//router.use('/post', require("./post"));
//router.use('/user', require("./user"));
//router.use('/like', require("./like"));
//router.use('/comment', require("./comment"));
//router.use("/reply", require("./reply"));

// router.get('/:email', function (req, res) { // get by email
//     controller.post.getByEmail(req, res);
// });

router.get('/', function (req, res) {
    if (req.isAuthenticated()) { // to homepage
        res.render('dashboard2');
    } else { // to login page 
        res.render("index");
    }

});




//new
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, new Date() + file.originalname);
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/'))
            cb(null, true);
        else
            cb(null, false);
    }
});

//var controller = require("../controller/index");


router.post('/login', function (req, res, next) {
   if(req.isAuthenticated())
   	return res.redirect('/');
   console.log("here");
    controller.user.logIn(req, res, next);

});

router.post('/userRegister',function(req,res,next){
    controller.user.signUp(req,res,next);

});

router.get('/showusers',function(req,res,next){
    controller.user.showUsers(req,res,next);

});

router.post('/generalInfo',function(req,res,next){
	controller.organization.generalInfo(req,res,next);
})

router.get('/generalInfo',function(req,res,next){
	controller.organization.getGeneralInfo(req,res,next);
})

router.get('/location',function(req,res,next){
	controller.organization.getLocation(req,res,next);
})

router.post('/location',function(req,res,next){
	controller.organization.postLocation(req,res,next);
})

router.get('/logout', function (req, res) {
    controller.user.logOut(req, res);
});
// router.post('/signUp', upload.single("image"), function (req, res, next) {
//     controller.user.signUp(req, res, next);
// });


module.exports = router;