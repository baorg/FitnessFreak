const path = require('path');
const fs = require('fs');

function getRandomFileName(folder, length = 20) {
    tmp = 'qwertyuioopasdfghjklzxcvbnnm12345678790';
    filename = '';
    for (var i = 0; i < length; i++) {
        filename += tmp[(Math.random() * tmp.length).toFixed(0) % tmp.length];
    }
    if (fs.existsSync(path.join(folder, filename)))
        return getRandomFileName(folder, length);

    return filename;
}



module.exports = function(req, res) {
    console.log("hi");
    console.log(req.files.upload);
    let tempFile = req.files.upload
    let tempFilePath = tempFile.path;
    let uploadFolder = path.join(path.dirname(path.dirname(path.dirname(__filename))), 'uploads');
    let filename = getRandomFileName(uploadFolder, 30);
    let targetPathUrl = path.join(uploadFolder, filename);

    if (path.extname(tempFile.originalFilename).toLowerCase() === ".png " || ".jpg") {
        fs.rename(tempFilePath, targetPathUrl, err => {
            if (err) {
                console.error('ERROR: ', err);
            } else {
                res.send({ success: true, filepath: targetPathUrl });
            }
        });
    }
}