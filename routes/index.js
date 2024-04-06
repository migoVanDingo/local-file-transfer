const express = require("express")
const router = express.Router()
const controller = require("../controller/file.controller")
const util = require('../controller/util.controller')
const FileManager = require('../services/file-manager/FileManager')


let routes = (app) => {
    router.post("/upload", controller.upload)
    router.post("/convert/xlsx", controller.convertXlsx)
    router.get("/convert/xlsx/:repo_id/:file_set_id", controller.convertXlsx)
    router.get("/files", controller.getListFiles)
    router.get("/files/:name", controller.download)
    router.get('/health-check', util.healthCheck)

    router.get('/local-storage/:projectId/:repoId', FileManager.createLocalStorage)
    router.get('/local-storage/:projectId/move/:repoId', FileManager.moveFilesToLocalStorage)

    router.get('/convert/v2/xlsx', controller.convertXlsx)

    app.use(router)
}

module.exports = routes