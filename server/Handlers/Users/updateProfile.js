const { User } = require('../../Models');


async function updateProfileHandler(req, res, next) {
    try {
        let user = req.user;
        console.log('data:', req.body);
        let {
            first_name = user.first_name,
                last_name = user.last_name,
                bio = user.bio
        } = req.body;

        user.first_name = first_name;
        user.last_name = last_name;
        user.bio = bio;
        await user.save();

        res.data = {
            success: true,
            updated: true,
            user: user
        };
    } catch (err) {
        console.err('ERROR: ', err);
        res.data = { success: false, error: 'Some error occured in our end.', updated: false };
    } finally {
        return next();
    }
}



module.exports = updateProfileHandler;