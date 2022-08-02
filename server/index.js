const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1020304050",
    database: "projetoweb", 
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res)=>{
    const {name} = req.body;
    const {cpf} = req.body;
    const {birth} = req.body;
    const {registerDate} = req.body;
    const {ativo} = req.body;
    
    let SQL = "INSERT INTO  Pessoa (Nome, CPF, DataNascimento, DataCadastro, Ativo) VALUES ( ?,?,?,?,?)"

    db.query(SQL, [name, cpf, birth, registerDate, ativo], (err, result) =>{
        console.log(err);
    });
});

app.get("/getCards", (req, res) => {
    let SQL = "SELECT * FROM Pessoa";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result);
    });
});

app.put("/edit", (req, res) =>{
    const {id} = req.body;
    const {name} = req.body;
    const {cpf} = req.body;
    const {birth} = req.body;
    const {registerDate} = req.body;

    let SQL = "UPDATE Pessoa SET Nome = ?, CPF = ?, DataNascimento = ?, DataCadastro = ? WHERE IDPessoa = ?";

    db.query(SQL, [name, cpf, birth, registerDate, id], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM Pessoa WHERE IDPessoa = ?";
    db.query(SQL, [id],(err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.listen(3001, () => {
    console.log("rodando servidor");
});
