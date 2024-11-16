const express = require('express');
const router = express();
const controller = require('../controllers/mainController')
const path = require('path')
/* GET home page. */


router.set('views',path.join(__dirname,'../views/users'))
router.use(express.static(path.join(__dirname,"../public/user")))


router.get('/',controller.loadHome)
router.post('/',controller.handleReservation)
router.get('/gallery',controller.loadGallery);
router.get('/contact',controller.loadContact)
router.post('/contact',controller.contactUs)
router.get('/about',controller.loadAbout)

module.exports = router;
