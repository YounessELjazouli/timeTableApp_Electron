module.exports = {
    cours : function(app,cnx){
        try {
            app.get('/api/select/cours/:groupe/:day/:per',(req,res) => {
                const groupe = req.params.groupe
                const day = req.params.day
                const per = req.params.per
                cnx.all("SELECT * from cours C INNER JOIN formateur F ON C.idFormateur = F.idFormateur INNER JOIN module M ON C.idModule = M.idModule WHERE codeGroupe = ? AND jours = ? AND periods = ?",[groupe,day,per] ,(err, row) => {
                    res.send(row)
                    if (err) throw err;
                })
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        try {
            app.delete('/api/delete/cours/:groupe/:day/:per',(req,res) => {
                const groupe = req.params.groupe
                const day = req.params.day
                const per = req.params.per
                const stmt = cnx.prepare("DELETE FROM cours where codeGroupe = ? AND jours = ? AND periods = ?",(err)=>{
                    if (err) throw err;
                });
                stmt.run([groupe , day , per])
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        try {
            app.get('/api/select/coursSalles/:day/:per',(req,res) => {
                const day = req.params.day
                const per = req.params.per
                cnx.all("SELECT * from salle WHERE codeSalle NOT IN (select codeSalle from cours WHERE jours = ? AND periods = ?)",[day,per] ,(err, row) => {
                    res.send(row)
                    if (err) throw err;
                })
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        try {
            app.get('/api/select/coursFormateurs/:day/:per',(req,res) => {
                const day = req.params.day
                const per = req.params.per
                cnx.all("SELECT * from formateur WHERE idFormateur NOT IN (select idFormateur from cours WHERE jours = ? AND periods = ?)",[day,per] ,(err, row) => {
                    res.send(row)
                    if (err) throw err;
                })
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        try {
            app.get('/api/select/coursModules/:groupe',(req,res) => {
                const groupe = req.params.groupe
                cnx.all("SELECT * from module M inner join groupe_module_filiere GM ON M.idModule = GM.idModule WHERE codeGroupe = ?",[groupe] ,(err, row) => {
                    res.send(row)
                    if (err) throw err;
                })
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        
        try {
            app.post('/api/insert/cours',(req,res) => {
                const groupe = req.body.groupe
                const salleValue = req.body.salleValue
                const moduleValue = req.body.moduleValue
                const profValue = req.body.profValue
                const per = req.body.per
                const day = req.body.day
                const modeCoursValue = req.body.modeCoursValue
                const stmt = cnx.prepare("INSERT INTO cours(codeGroupe,codeSalle,idModule,idFormateur,periods,jours,modeFormation) VALUES(?,?,?,?,?,?,?)",(err)=>{
                    if (err) throw err;
                })
                stmt.run([groupe,salleValue,moduleValue,profValue,per,day,modeCoursValue])
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
    }
}

