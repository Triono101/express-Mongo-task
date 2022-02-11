const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb');
const fs = require('fs');
const path = require('path');

// Select All Data or Delete some Data
const index = (req, res) => {
    db.collection('products').find()
        .toArray()
        .then(result => res.send(result))
        .catch(Error => res.send(Error));
};

// Select Data by ID
const view = (req, res) => {
    const {id} = req.params;
    db.collection('products').findOne({_id: ObjectId(id)})
        .then(result => res.send(result))
        .catch(Error => res.send(Error));
};

// Insert Data
const store = (req, res) => {
    const {name, price, stock, status, user_id} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('products').insertOne({name, price, stock, status, user_id, image_url: `http://127.0.0.1:3000/public/${image.originalname}`})
            .then(result => res.send(result))
            .catch(Error => res.send(Error));
    }
};

// Update Data
const update = (req, res) => {
    const {id} = req.params;
    db.collection('products').updateOne({_id: ObjectId(id)}, { $set: req.body })
        .then(result => res.send(result))
        .catch(Error => res.send(Error));
};

// Delete Data
const destroy = (req, res) => {
    const {id} = req.params;
    db.collection('products').deleteOne({_id: ObjectId(id)})
        .then(result => res.send(result))
        .catch(Error => res.send(Error));
};

module.exports = {
    index,
    view,
    store,
    update,
    destroy
};