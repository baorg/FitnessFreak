var crypto = require('crypto');
const cloudinary = require('cloudinary');


module.exports.signPayload = function(req, res, next) {
    try {
        const api_secret = process.env.CLOUDINARY_API_SECRET;
        console.log('Sign handler: ', req.query);

        let payload = JSON.parse(req.query.params_to_sign);

        let string_to_stign = `folder=fitness_freak&source=${payload.source}&timestamp=${payload.timestamp}&unique_filename=true&upload_preset=${payload.upload_preset}&use_filename=false`;
        // console.log(`String to sign: '${string_to_stign}'`);

        let signed_payload = crypto.createHash('sha256').update(string_to_stign + api_secret).digest().toString('hex');

        return res.send(signed_payload);
    } catch (err) {
        console.error('ERROR:', err);

        res.data.success = false;
        res.data.error = 'Internal error.';
        return next();
    }
}