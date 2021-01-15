module.exports = function response_format(res, data, success, err = null) {
    res.data.success = true;
    res.data.error = err;
    res.data = {...res.data, ...data };
}