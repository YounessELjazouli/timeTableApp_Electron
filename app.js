const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
const path = require('path');

// const sqlite3 = require('sqlite3').verbose();
// const cnx = new sqlite3.Database('bd/emploi.db');

const cnx = require('better-sqlite3')('bd/emploi.db');



app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

const dbFormateur = require('./models/formateur')
dbFormateur.formateur(app,cnx);

const dbFiliere = require('./models/filiere')
dbFiliere.filiere(app,cnx);

const dbGroupe = require('./models/groupe')
dbGroupe.groupe(app,cnx);

const dbModule = require('./models/module')
dbModule.module(app,cnx);

const dbSalle = require('./models/salle')
dbSalle.salle(app,cnx);

const dbCours = require('./models/cours')
dbCours.cours(app,cnx);


app.listen(3001)

