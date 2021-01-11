module.exports = function response_format(success, data, err) {
    if (success) {
        return {
            success: true,
            error: null,
            ...data
        };
    } else {
        return {
            success: false,
            error: err,
            ...data
        }
    }
}