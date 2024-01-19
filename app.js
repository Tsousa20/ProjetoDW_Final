const express = require('express');
var morgan = require('morgan');
const mysql = require("mysql");
const cors = require('cors');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();


//criar uma app express
const app = express()
app.set('view engine', 'ejs')


//Middleware
app.use(express.static('views'))
app.use(morgan('dev'))
app.use(cors());
app.use(express.urlencoded({extended: false}));


//mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fc.porto.20',
    database: 'burgershop'

})

//connect to database
connection.connect(function(error){
    if(error){
        throw error
    } else{
        console.log("Connected to database")
    }
})

//Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'd11burger.house@gmail.com',
        pass: 'fzte xvqt docz mqtb'
    }
});


//Routes

//************ Welcome routes *********
app.get('/', (req, res) => {
    res.render('welcome_page')
})

app.get('/home', (req, res) => {
    res.render('welcome_page')
})
//************ About routes *********

app.get('/about', (req, res) => {
    const sql = 'SELECT * FROM owners';

    connection.query(sql, (error, results, fields) => {
        if (error) throw error;

        const dadosDoBanco = results;

        // Renderizar a view EJS passando os dados
        res.render('about_page', { dados: dadosDoBanco });
    });
});

app.get('/about', (req, res) => {
    res.render('about_page')
})
//************ Gallery routes *********
app.get('/gallery', (req, res) => {
    const sql = 'SELECT * FROM gallery';

    connection.query(sql, (error, results, fields) => {
        if (error) throw error;

        const dadosDoBanco = results;

        // Renderizar a view EJS passando os dados
        res.render('gallery_page', { dados: dadosDoBanco });
    });
});

app.get('/gallery', (req, res) => {
    res.render('gallery_page')
})

//************ Menu routes *********
app.get('/menu', async (req, res) => {
    try {
        // Primeira Query
        const query1 = 'SELECT * FROM menu WHERE item_name = "Hamburger"';
        const resultados1 = await executeQuery(query1);

        // Segunda Query
        const query2 = 'SELECT * FROM menu WHERE item_name = "Acompanhamentos"';
        const resultados2 = await executeQuery(query2);

        // Terceira Query
        const query3 = 'SELECT * FROM menu WHERE item_name = "Bebidas"';
        const resultados3 = await executeQuery(query3);

        // Quarta Query
        const query4 = 'SELECT * FROM menu WHERE item_name = "Sobremesas"';
        const resultados4 = await executeQuery(query4);

        // Renderizar a página EJS com os resultados
        res.render('menu_page', { resultados1, resultados2, resultados3, resultados4 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar as queries.');
    }
});


function executeQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.get('/menu', (req, res) => {
    res.render('menu_page')
})

//************ Reservas routes *********
app.get('/reservas', (req, res) => {
    res.render('reservas_page')
})

function enviarEmail(destinatario, assunto, corpo) {
    const mailOptions = {
        from: 'd11burger.house@gmail.com',
        to: destinatario,
        subject: assunto,
        text: corpo
    };

    transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
            console.error('Erro ao enviar e-mail:', erro);
        } else {
            console.log('E-mail enviado:', info.response);
        }
    });
}


app.post('/criar-reservas', encoder, function(req, res){
    var first_name = req.body.f_name;
    var last_name = req.body.l_name;
    var date_reserva = req.body.date_reserv;
    var time_reserva = req.body.time_reserv;
    var email = req.body.email_reserv;
    var number_of_people = req.body.n_o_people;

    const query = 'INSERT INTO reservas (first_name, last_name, date_reserva, time_reserva, email, number_of_people) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(query, [first_name, last_name, date_reserva, time_reserva, email, number_of_people], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
            return;
        }
        res.redirect('/reservas');
    })
})

app.post('/verificar-reservas', encoder, function(req, res){
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;

    const query = 'SELECT * FROM reservas WHERE first_name = ? AND last_name = ? AND email = ?';

    connection.query(query, [first_name, last_name, email], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
        } else {
            res.render('reservas_page', { reservas: results });
        
            if (results.length > 0) {
                const destinatario = 'd11burger.house@gmail.com';
                const assunto = 'Confirmação da Reserva BurgerD11';
                const corpo = `Confirmamos uma reserva de ${results[0].first_name} ${results[0].last_name}, com o email: ${results[0].email}, para ${results[0].number_of_people} pessoas, na data ${results[0].date_reserva} às ${results[0].time_reserva}.`;

                enviarEmail(destinatario, assunto, corpo);
            }
        }
    })
})

//************ Login routes *********
app.get('/login', (req, res) => {
    res.render('login_page')
})

app.post('/login', encoder, function(req, res){
    var owner_user_name = req.body.admin_user_name;
    var owner_passwd = req.body.admin_passwd;
    
    connection.query('SELECT * FROM owners WHERE owner_user_name = ? AND owner_passwd = ?', [owner_user_name, owner_passwd], function(error, results, fields){
        if (results.length > 0){
            res.redirect('/admin');
        } else{
            res.redirect('/login');
        }
        res.end();
    })
})

//************ Admin routes *********

app.get('/admin', async (req, res) => {
    try {
        // Query para reservas
        const query1 = 'SELECT * FROM reservas ORDER BY date_reserva ASC';
        const resultados1 = await executeQueryAdmin(query1);

        // Query para admins and about
        const query2 = 'SELECT * FROM owners';
        const resultados2 = await executeQueryAdmin(query2);

        // Query para gallery
        const query3 = 'SELECT * FROM gallery';
        const resultados3 = await executeQueryAdmin(query3);

        // Query para menu - hamburger
        const query4 = 'SELECT * FROM menu WHERE item_name = "Hamburger"';
        const resultados4 = await executeQueryAdmin(query4);

        // Query para menu - acompanhamentos
        const query5 = 'SELECT * FROM menu WHERE item_name = "Acompanhamentos"';
        const resultados5 = await executeQueryAdmin(query5);

        // Query para menu - bebidas
        const query6 = 'SELECT * FROM menu WHERE item_name = "Bebidas"';
        const resultados6 = await executeQueryAdmin(query6);

        // Query para menu - sobremesas
        const query7 = 'SELECT * FROM menu WHERE item_name = "Sobremesas"';
        const resultados7 = await executeQueryAdmin(query7);

        // Renderizar a página EJS com os resultados
        res.render('admin_page', { resultados1, resultados2, resultados3, resultados4, resultados5, resultados6, resultados7 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar as queries.');
    }
});


function executeQueryAdmin(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.get('/admin', (req, res) => {
    res.render('admin_page')
})


app.use((req, res) => {
    res.render('404')
})

//escutar os request
app.listen(3000);