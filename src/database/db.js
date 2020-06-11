//importa a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

//cria o objeto que irá fazer as operações no banco de dados 
const db = new sqlite3.Database("./src/database/database.db") 

module.exports = db

//utiliza o objeto de banco de dados
// db.serialize(() => {
//     // db.run(`
//     //     CREATE TABLE IF NOT EXISTS places (
//     //         id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //         image TEXT,
//     //         name TEXT,
//     //         address TEXT,
//     //         address2 TEXT,
//     //         state TEXT,
//     //         city TEXT,
//     //         items TEXT
//     //     );
//     // `)

    // const query =`
    //     INSERT INTO places(
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    // const values = [
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTFkv94kDLLaHmWOZyWOSdNZ8gXAwjPqmwgBLzGf5CnMBqI5b-_&usqp=CAU",
    //     "Papersider",
    //     "Casemiro de Abreu, Parangaba",
    //     "Nº 960",
    //     "Ceará",
    //     "Fortaleza",
    //     "Papéis e Papelão"
    // ]

    // function afterInsertData(err){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Cadastro realizado com sucesso!")
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)

//     // db.all(`SELECT * FROM places`, function(err, rows) {
//     //     if(err){
//     //         return console.log(err)
//     //     }

//     //     console.log("Aqui estão seu registros:")
//     //     console.log(rows)
//     // })

    db.run(`DELETE FROM places WHERE id = ?`, [12], function(err){
        if(err){
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")
    })
// })