const router = require('express').Router();
const moment = require('moment');
const multer = require('multer');
const upload = multer({dest: 'uploads'});

// First Page response
router.get('/', (req,res) => {
    res.json({
        Status: `Succesfully added at ${moment().format('LTS')}`,
        Message: 'Selamat datang di halaman express-mongoDB',
        Navigation: '/api/v1/product',
        Information: '/api/v2/product'
    });
});

module.exports = router;