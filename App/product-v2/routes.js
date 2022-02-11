const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const Product = require('./model');
const fs = require('fs');
const path = require('path');

router.post('/product', upload.single('image'), (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.create({name, price, stock, status, image_url: `http://127.0.0.1:3000/public/${image.originalname}`})
            .then(result => res.send(result))
            .catch(error => res.send(error));
        }
    });

router.get('/product', (req, res) => {
    Product.find()
        .then(result => res.send(result))
        .catch(error => res.send(error));
    });

router.get('/product/:id', (req, res) => {     
    Product.findOne({_id: req.params.id})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    });

// router.put('/product/:id', (req, res) => {
//     Product.findByIdAndUpdate(req.params.id, {$set: req.body})
//         .then(result => res.send(result))
//         .catch(error => res.send(error));
//     });

router.patch('/product/:id', (req,res) => {   
    Product.findByIdAndUpdate(req.body.id, {
        name:  req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        status:req.body.status
    },   
        function(err) {  
        if (err) {  
        res.send(err); return;}  
        res.send({data:"Record has been Updated"});  
        });  
    });

router.delete('/product/:id', (req, res) => {   
    Product.remove({_id: req.params.id})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    });

module.exports = router;