const cors = require("cors")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")

global.__basedir = __dirname

app.use(
  cors({
    origin: "*",
  })
)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

const initRoutes = require("./routes/index")

app.use(express.urlencoded({ extended: true }))

initRoutes(app)

const PORT = 3002
app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT)
})
