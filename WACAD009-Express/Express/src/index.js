const express = require("express")
const dotenv = require("dotenv")

dotenv.config()
const PORT = process.env.PORT ?? 4455
const app = express()

app.get("/", (req, res) =>{
    res.send("Hello world")
})

app.get("/about", (req, res) =>{
    res.send("Página about!")
})

app.listen(PORT)