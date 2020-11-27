const path =require('path');
const fs=require('fs');

module.exports = function(req, res) {
    console.log("hi");
    console.log(req.files.upload);
    let tempFile=req.files.upload
    let tempFilePath=tempFile.path;
    const targetPathUrl=path.join(__dirname+'/uploads/'+tempFile.name);
    if(path.extname(tempFile.originalFilename).toLowerCase()===".png " || ".jpg"){

        fs.rename(tempFilePath,targetPathUrl,err=>{
            if(err) return console.log(err)
        })
    }
}