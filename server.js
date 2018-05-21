const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

var users = [
    {id: 0, name: 'oscar'},
    {id: 1, name: 'juan'}
];

// soporte para body codificados en jsonsupport
app.use(bodyParser.json());
// soporte para body codificados
app.use(bodyParser.urlencoded({ extended: true }));
 
app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
})

// Listar usuarios
app.get('/users', (req, res) => {
    res.send(users.reverse())
})

// Crear usuarios
app.post('/users', (req, res) => {
    let data = req.body;
    let itemUser = {name: data.Name};
    users.push(itemUser)
    res.send("New user add")
})

// Actualizar usuarios
app.patch('/users/:id',(req, res) => {
    let params = req.params;
    let data = req.query;
    users[params.id] = {name: data.user_name};
    res.send("User update")
})

// Eliminar usuarios
app.delete('/users/:id',(req, res) => {
    let params = req.params;
    users.splice(params.id, 1);
    res.send('User delete')
})
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})