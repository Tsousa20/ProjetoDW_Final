const express = require('express')
var morgan = require('morgan')

//criar uma app express
const app = express()

//escutar os request
app.listen(3000)

//Middleware
app.use(express.static('view'))
app.use(morgan('dev'))

//Routes
app.get('/', (req, res) => {
    res.status(200).sendFile('./view/welcome_page.html', { root: __dirname})
})
app.get('/home', (req, res) => {
    res.status(200).sendFile('./view/welcome_page.html', { root: __dirname})
})
app.get('/about', (req, res) => {
    res.status(200).sendFile('./view/about_page.html', { root: __dirname})
})
app.get('/gallery', (req, res) => {
    res.status(200).sendFile('./view/gallery_page.html', { root: __dirname})
})
app.get('/menu', (req, res) => {
    res.status(200).sendFile('./view/menu_page.html', { root: __dirname})
})
app.get('/reservas', (req, res) => {
    res.status(200).sendFile('./view/reservas_page.html', { root: __dirname})
})
app.get('/login', (req, res) => {
    res.status(200).sendFile('./view/login_page.html', { root: __dirname})
})

app.use((req, res) => {
    res.status(404).sendFile('./view/404.html', { root: __dirname})
})


