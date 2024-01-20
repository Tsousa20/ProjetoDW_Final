const express = require('express');
var morgan = require('morgan');
const mysql = require("mysql");
const cors = require('cors');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const encoder = bodyParser.urlencoded();


//criar uma app express
const app = express()
app.set('view engine', 'ejs')


//Middleware
app.use(express.static('views'))
app.use(morgan('dev'))
app.use(cors());
app.use(express.urlencoded({extended: false}));

//Express-Session
app.use(session({
    secret: 'burger',
    resave: false,
    saveUninitialized: true,
}));


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
            req.session.loggedin = true;
            res.redirect('/admin');
        } else{
            res.redirect('/login');
        }
        res.end();
    })
});


//************ Admin routes *********

app.get('/admin', verificaAutenticacao, async (req, res) => {
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

app.get('/admin/:formIdentifier/:firstOption', verificaAutenticacao, (req, res) => {
    const formIdentifier = req.params.formIdentifier;
    const firstOption = req.params.firstOption;

    let sql;
    let columnName;

    if(formIdentifier === 'formDeleteMenu'){
        sql = 'SELECT ingredients FROM menu WHERE item_name = ?';
        columnName = 'ingredients';
    } else {
        res.status(400).json({ error: 'Identificador de formulário inválido' });
        return;
    }

    connection.query(sql, [firstOption], (err, results) => {
        if (err) {
            console.error('Erro na consulta ao banco de dados:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        const options = results.map(result => ({
            value: result[columnName],
            text: result[columnName]
        }));

        res.json(options);
    });
});



//Forms-post
app.post('/add-admin', encoder, function(req, res){
    var owner_name = req.body.admin_name;
    var owner_user_name = req.body.admin_username;
    var owner_passwd = req.body.admin_passwd;
    var owner_about = req.body.admin_about;
    var owner_image = req.body.admin_image;
    var owner_about_descrp = req.body.admin_about_descrip;

    const query = 'INSERT INTO owners (owner_name, owner_user_name, owner_passwd, owner_about, owner_image, owner_about_descrp) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(query, [owner_name, owner_user_name, owner_passwd, owner_about, owner_image, owner_about_descrp], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
            return;
        }
        res.redirect('/admin');
    })
});


app.post('/delete-admin', encoder, function(req, res){
    var owner_user_name = req.body.admin_username;

    const query = 'DELETE FROM owners WHERE owner_user_name = ?';

    connection.query(query, [owner_user_name], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
            return;
        }
        res.redirect('/admin');
    })
});

app.post('/change-passwd', encoder, function(req, res){
    const owner_user_name = req.body.admin_username;
    const owner_old_pass = req.body.admin_oldpasswd;
    const owner_new_pass = req.body.admin_newpasswd;

    const query = 'SELECT * FROM owners WHERE owner_user_name = ? AND owner_passwd = ?';

    connection.query(query, [owner_user_name, owner_old_pass], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
            return;
        } else if (results.length > 0){
            const query2 = 'UPDATE owners SET owner_passwd = ? WHERE owner_user_name = ?';
            connection.query(query2, [owner_new_pass, owner_user_name], (err, results) => {
                if (err) {
                    console.error('Erro ao executar a consulta:', err);
                    res.status(500).send('Erro interno servidor');
                    return;
                }
                res.redirect('/admin');
                return;      
            })
        }
        res.redirect('/admin');
        return;
    })
});    




app.post('/change-menu', encoder, function(req, res){
    var item_name = req.body.menu_item_name;
    var item_sign_name = req.body.menu_item_sign_name;
    var ingredients = req.body.menu_ingredients;

    const query = 'INSERT INTO menu (item_name, item_sign_name, ingredients) VALUES (?, ?, ?)';

    connection.query(query, [item_name, item_sign_name, ingredients], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
            return;
        }
        res.redirect('/admin');
    })
});

app.post('/admin/formDeleteMenu', encoder, function(req, res){
    var ingredients = req.body.menu_ingredients;

    const query = 'DELETE FROM menu WHERE ingredients = ?';

    connection.query(query, [ingredients], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
            return;
        }
        res.redirect('/admin');
    })
});

app.post('/add-image', encoder, function(req, res){
    var path_url = req.body.gallery_add_image;

    const query = 'INSERT INTO gallery (path_url) VALUES (?)';

    connection.query(query, [path_url], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
            return;
        }
        res.redirect('/admin');
    })
});

app.post('/delete-image', encoder, function(req, res){
    var path_url = req.body.gallery_delete_image;

    const query = 'DELETE FROM gallery WHERE path_url = ?';

    connection.query(query, [path_url], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
            return;
        }
        res.redirect('/admin');
    })
});

app.post('/change-about', encoder, function(req, res){
    var owner_name = req.body.admin_name_change_about;
    var owner_about = req.body.admin_change_about;

    const query = 'UPDATE owners SET owner_about = ? WHERE owner_name = ?';

    connection.query(query, [owner_about, owner_name], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno servidor');
            return;
        }
        res.redirect('/admin');
    })
});

function verificaAutenticacao(req, res, next) {
    if (req.session.loggedin) {
      // Autoriza a rota
      next();
    } else {
      // O admin não está autenticado, redireciona para a página de login
      res.redirect('/login');
    }
};

app.get('/logout', (req, res) => {
    // Remove a sessão
    req.session.loggedin = false;
  
    // Redireciona para a página de login
    res.redirect('/login');
  });

app.get('/admin', verificaAutenticacao, (req, res) => {
    res.render('admin_page')
});


//404
app.use((req, res) => {
    res.render('404')
})

//escutar os request
app.listen(3000);