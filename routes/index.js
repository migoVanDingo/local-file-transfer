const express = require("express")
const router = express.Router()
const controller = require("../controller/file.controller")
const util = require('../controller/util.controller')
const FileManager = require('../services/file-manager/FileManager')


let routes = (app) => {
    router.post("/upload", controller.upload)
    router.post("/convert/xlsx", controller.convertXlsx)
    router.get("/convert/xlsx/:projectId", controller.convertXlsx)
    router.get("/files", controller.getListFiles)
    router.get("/files/:name", controller.download)
    router.get('/health-check', util.healthCheck)

    router.get('/local-storage/:projectId', FileManager.createLocalStorage)
    router.get('/local-storage/:projectId/move', FileManager.moveFilesToLocalStorage)

    app.use(router)
}

module.exports = routes