const express = require('express');
const {uploadMedia, 
       
      } = require('../controllers/studentController');

const multer = require('multer')
const uploadMediaFile = require('../services/firebase')

const Multer = multer({
    storage:multer.memoryStorage(),
    limits:1024*1024,

})


const router = express.Router();

router.post('/student',Multer.single("image"),uploadMediaFile, uploadMedia);



module.exports = {
    routes: router
}