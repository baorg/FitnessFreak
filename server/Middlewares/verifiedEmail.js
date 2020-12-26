function verifyEmail(req, res, next) {
    if (!req.user.email_verified) {
        return res.send({ isAuthenticated: true, error: 'Email not verified' });
    } else {
        res.data.verifiedEmail = true;
        next();
    }
}

module.exports = verifyEmail;