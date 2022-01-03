const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var app = express();

app.use(cors({origin: 'http://localhost:3000'}))
app.use(bodyParser.json())

app.post('/', function(req, res) {
    const data = req.body

    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, function(err) {

        if (err) {
            throw err
        }
        else {
            db.run(`INSERT INTO data (FirstName, LastName, Address, Phone, Email) VALUES ('${data.FirstName}', '${data.LastName}', '${data.Address}', '${data.Phone}', '${data.Email}')`);

            res.json({status: 200})
        }
        
    })
})

app.listen(3001);