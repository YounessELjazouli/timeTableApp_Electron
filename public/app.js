const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
const path = require('path');


const sqlite3 = require('sqlite3').verbose();
const cnx = new sqlite3.Database('bd/emploi.db');
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())





app.get('/api/select/codesSalles',(req,res) => {

    cnx.all("SELECT codeSalle from salle", (err, row) => {
        res.send(row)
    })
})









app.get('/api/select/formateurs',(req,res) => {

    cnx.all("SELECT * from formateur ORDER BY nom", (err, row) => {
        res.send(row)
    })
})

app.post('/api/insert/formateur',(req,res) => {
    const nom = req.body.nom
    const prenom = req.body.prenom
    const mh = req.body.massHoraire
    const departement = req.body.departement
    const email = req.body.email
    const tel = req.body.tel

    const stmt = cnx.prepare("INSERT INTO formateur (nom,prenom,massHoraire,email,tel,departement) VALUES (?,?,?,?,?,?)");
    stmt.run([nom,prenom,mh,email,tel,departement])
})

app.delete('/api/delete/formateur/:idFormateur',(req,res)=>{
    const formateur = req.params.idFormateur
    const stmt = cnx.prepare("DELETE FROM formateur where idFormateur = ?");
    stmt.run([formateur])
})

app.put('/api/update/formateur',(req,res) => {
    const newNom = req.body.newNom
    const newPrenom = req.body.newPrenom
    const newMassHoraire = req.body.newMassHoraire
    const newDepartement = req.body.newDepartement
    const newEmail = req.body.newEmail
    const newTel = req.body.newTel
    const idForamteur = req.body.idForamteur
    const stmt = cnx.prepare("UPDATE formateur SET nom = ? , prenom = ? , massHoraire = ? , email = ? , tel = ? , departement = ? WHERE idFormateur = ?",(err)=>{
        res.send(err)
    });
    stmt.run([newNom,newPrenom,newMassHoraire,newEmail,newTel,newDepartement,idForamteur])
})








app.get('/api/select/filiere',(req,res) => {

    cnx.all("SELECT * from filiere", (err, row) => {
        res.send(row)
    })
})

app.post('/api/insert/filiere',(req,res) => {
    const codeFiliere = req.body.codeFiliere
    const nomFiliere = req.body.nomFiliere
    const stmt = cnx.prepare("INSERT INTO filiere VALUES (?,?)",(err)=>{
        console.log(err)
    });
    stmt.run([codeFiliere,nomFiliere])

})

app.delete('/api/delete/filiere/:codeFiliere',(req,res)=>{
    const filiere = req.params.codeFiliere
    const stmt = cnx.prepare("DELETE FROM filiere where codeFiliere = ?");
    stmt.run([filiere])
})

app.put('/api/update/filiere',(req,res) => {
    const newCodeFiliere = req.body.newCodeFiliere
    const newNomFiliere = req.body.newNomFiliere
    const initialCode = req.body.initialCode
    const stmt = cnx.prepare("UPDATE filiere SET codeFiliere = ? , nomFiliere = ? WHERE codeFiliere = ?",(err)=>{
        res.send(err)
    });
    stmt.run([newCodeFiliere,newNomFiliere,initialCode])
})









app.get('/api/select/groupe',(req,res) => {

    cnx.all("SELECT * from groupe", (err, row) => {
        res.send(row)
    })
})


app.post('/api/insert/groupe',(req,res) => {
    const codeGroupe = req.body.codeGroupe
    const codeFiliere = req.body.codeFiliere
    const annee = req.body.annee
    const stmt = cnx.prepare("INSERT INTO groupe VALUES (?,?,?)",(err)=>{
        console.log(err)
    });
    stmt.run([codeGroupe,codeFiliere,annee])

})

app.delete('/api/delete/groupe/:codeGroupe',(req,res)=>{
    const groupe = req.params.codeGroupe
    const stmt = cnx.prepare("DELETE FROM groupe where codeGroupe = ?");
    stmt.run([groupe])
})
app.put('/api/update/filiere',(req,res) => {
    const newCodeFiliere = req.body.newCodeFiliere
    const newCodeGroupe = req.body.newCodeGroupe
    const newAnnee = req.body.newAnnee
    const currentCodeGroupe = req.body.currentCodeGroupe

    const stmt = cnx.prepare("UPDATE groupe SET codeGroupe = ? , codeFiliere = ? , annee = ? WHERE codeFiliere = ?",(err)=>{
        res.send(err)
    });
    stmt.run([newCodeGroupe,newCodeFiliere,newAnnee,currentCodeGroupe])
})







app.post('/api/insert/module',(req,res) => {
    const codeModule = req.body.codeModule
    const titreModule = req.body.titreModule
    const masseHoraire = req.body.masseHoraire
    const codeFiliere = req.body.codeFiliere
    const codeGroupe = req.body.codeGroupe
    console.log(codeGroupe)
    const stmt = cnx.prepare("INSERT INTO module VALUES (?,?,?)",(err)=>{
        console.log(err)
    });
    stmt.run([codeModule,titreModule,masseHoraire])

    const stmt2 = cnx.prepare("INSERT INTO groupe_module_filiere VALUES (?,?,?)",(err)=>{
        console.log(err)
    });
    stmt2.run([codeGroupe,codeModule,codeFiliere])
})

app.get('/api/select/module/',(req,res) => {

    cnx.all("SELECT * from module ",(err, row) => {
        res.send(row)
    })
})

app.get('/api/select/module/:FiliereChoisis',(req,res) => {
    const FiliereChoisis = req.params.FiliereChoisis
    console.log(FiliereChoisis);
    cnx.all("SELECT * from module M inner join groupe_module_filiere GM ON M.codeModule = GM.codeModule WHERE codeFiliere = ?",[FiliereChoisis] ,(err, row) => {
        console.log(row)
        res.send(row)
    })
})

app.delete('/api/delete/module/:codeModule',(req,res)=>{
    const module = req.params.codeModule
    const stmt = cnx.prepare("DELETE FROM module WHERE codeModule = ?");
    stmt.run([module])
})





app.post('/api/insert/salle',(req,res) => {
    const codeSalle = req.body.codeSalle
    const typeSalle = req.body.typeSalle

    console.log(codeSalle)
    const stmt = cnx.prepare("INSERT INTO salle VALUES (?,?)",(err)=>{
    });
    stmt.run([codeSalle,typeSalle])

})


app.get('/api/select/infoSalles',(req,res) => {

    cnx.all("SELECT * from salle where typeSalle = ?", ["info"] ,(err, row) => {
        res.send(row)
    })
})


app.get('/api/select/normalSalles',(req,res) => {

    cnx.all("SELECT * from salle where typeSalle = ?", ["normale"] ,(err, row) => {
        res.send(row)
    })
})

app.get('/api/select/atelier',(req,res) => {

    cnx.all("SELECT * from salle where typeSalle = ?", ["atelier"] ,(err, row) => {
        res.send(row)
    })
})

app.delete('/api/delete/salle/:codeSalle',(req,res)=>{
    const codeSalle = req.params.codeSalle
    const stmt = cnx.prepare("DELETE FROM salle where codeSalle = ?");
    stmt.run([codeSalle])
})




 
app.get('/api/select/salleDispo',(req,res) => {

    cnx.all("SELECT * from salle WHERE codeSalle NOT IN(SELECT codeSalle FROM cours )" ,(err, row) => {
        res.send(row)
        console.log(row);
    })
})



app.get('/api/select/cours',(req,res) => {

    cnx.all("  " ,(err, row) => {
        res.send(row)
        console.log(row);
    })
})




app.get('/api/select/cours/:groupe/:day/:per',(req,res) => {
    const groupe = req.params.groupe
    const day = req.params.day
    const per = req.params.per
    cnx.all("SELECT * from cours C INNER JOIN formateur F ON C.idFormateur = F.idFormateur INNER JOIN module M On C.codeModule = M.codeModule WHERE codeGroupe = ? AND jours = ? AND periods = ?",[groupe,day,per] ,(err, row) => {
        res.send(row)
    })
})

app.delete('/api/delete/cours/:groupe/:day/:per',(req,res) => {
    const groupe = req.params.groupe
    const day = req.params.day
    const per = req.params.per
    const stmt = cnx.prepare("DELETE FROM cours where codeGroupe = ? AND jours = ? AND periods = ?");
    stmt.run([groupe , day , per])
})

app.get('/api/select/coursSalles/:day/:per',(req,res) => {
    const day = req.params.day
    const per = req.params.per
    cnx.all("SELECT * from salle WHERE codeSalle NOT IN (select codeSalle from cours WHERE jours = ? AND periods = ?)",[day,per] ,(err, row) => {
        res.send(row)
        
    })
})

app.get('/api/select/coursFormateurs/:day/:per',(req,res) => {
    const day = req.params.day
    const per = req.params.per
    cnx.all("SELECT * from formateur WHERE idFormateur NOT IN (select idFormateur from cours WHERE jours = ? AND periods = ?)",[day,per] ,(err, row) => {
        res.send(row)
        
    })
})

app.get('/api/select/coursModules/:groupe',(req,res) => {
    const groupe = req.params.groupe
    cnx.all("SELECT * from module M inner join groupe_module_filiere GM ON M.codeModule = GM.codeModule WHERE codeGroupe = ?",[groupe] ,(err, row) => {
        res.send(row)
    })
})

app.post('/api/insert/cours',(req,res) => {
    const idValue = req.body.idValue
    const groupe = req.body.groupe
    const salleValue = req.body.salleValue
    const moduleValue = req.body.moduleValue
    const profValue = req.body.profValue
    const per = req.body.per
    const day = req.body.day
    const modeCoursValue = req.body.modeCoursValue
    console.log(modeCoursValue)
    const stmt = cnx.prepare("INSERT INTO cours VALUES (?,?,?,?,?,?,?,?)");
    stmt.run([idValue,groupe,salleValue,moduleValue,profValue,per,day,modeCoursValue])
})






app.listen(3001)
