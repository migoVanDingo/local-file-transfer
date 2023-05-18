const healthCheck = (req, res) => {

    res.status(200)
    res.send("Get health check works")
}
module.exports = {
    healthCheck
}