const cors = require("cors")
const express = require("express")
const app = express()

global.__basedir = __dirname



app.use(cors({ origin: "http://localhost:3000"}))

const initRoutes = require("./routes/index")

app.use(express.urlencoded({ extended: true}))

initRoutes(app)

const PORT = 3002
app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT)
})