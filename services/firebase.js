var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");


const BUCKET = "mediaupload-59c84.appspot.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:BUCKET
});


const bucket = admin.storage().bucket();



const uploadMedia = (req,res,next)=>{
    if(!req.file) return next();

    const image = req.file;
    const name = Date.now() +"."+image.originalname.split('.').pop();


    const file = bucket.file(name);

    const stream = file.createWriteStream({
        metadata:{
            contentType:image.mimetype,

        }
    });

    stream.on("error",(e)=>{
        console.log(e)
    });

    stream.on("finish",async ()=>{

        await file.makePublic()

        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${name}`;

        next();
    })

    stream.end(image.buffer)


}

module.exports = uploadMedia