const express = require('express');
const multer = require('multer');
const fs = require('node:fs');

const upload = multer({dest:'uploads/'});

const app = express();

app.post('/images/single',upload.single('image'), (req, res) =>{
    console.log(req.file);
    saveImage(req.file);
    res.send('Termina');
});

app.post('/images/multi', upload.array('photos', 10), (req,res)=>{
    req.files.map(saveImage);
    res.send('complete multi')
})

function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

app.listen(3000, ()=>{
    console.log('listen port 3000');
});




   
