const express = require("express")
const server = express()

//importa o banco de dados
const db = require("./database/db")

//Configura a pasta publica
server.use(express.static("public"))

//Habilita o uso do req.body
server.use(express.urlencoded({ extended: true}))

//Utilizando template nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
  const query =`
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
          console.log(err)
          return res.send("Erro no cadastro!")
        }

        console.log("Cadastro realizado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

  const search = req.query.search

  if(search == "" ){
    return res.render("search-results.html", { total: 0})
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err){
        return console.log(err)
    }

    const total = rows.length

    return res.render("search-results.html", {places: rows, total: total})
  })

})

//ligar servidor
server.listen(3000)