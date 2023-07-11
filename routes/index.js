const express = require("express")
const router = express.Router()
const controller = require("../controller/file.controller")
const util = require('../controller/util.controller')

let routes = (app) => {
    router.post("/upload", controller.upload)
    router.post("/convert-csv", controller.convertXlsx)
    router.get("/convert-csv", controller.convertXlsx)
    router.get("/files", controller.getListFiles)
    router.get("/files/:name", controller.download)
    router.get('/health-check', util.healthCheck)

    app.use(router)
}

module.exports = routes