module.exports = function response(req, res) {
    
    let response_data = res.data;
    response_data.isAuthenticated = req.isAuthenticated();

    // console.log('Sending: ', response_data);
    return res.send(response_data);
}