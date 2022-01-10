'use strict';

const firebase = require('../db');
const Student = require('../models/student');
const firestore = firebase.firestore();


const uploadMedia = async (req, res, next) => {
    try {

        return console.log(req.file)

        const data = req.body;
        await firestore.collection('students').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    uploadMedia,
    
}