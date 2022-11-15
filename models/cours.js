module.exports = {
    cours : function(app,cnx){
        try {
            app.get('/api/select/cours/:groupe/:day/:per',(req,res) => {
                const groupe = req.params.groupe
                const day = req.params.day
                const per = req.params.per
                
                const row = cnx.prepare(`SELECT * from cours C INNER JOIN formateur F ON C.idFormateur = F.idFormateur INNER JOIN module M ON C.idModule = M.idModule WHERE codeGroupe = '${groupe}'  AND jours = '${day}' AND periods = '${per}'`).all()
                res.send(row);
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
                
                const row = cnx.prepare(`SELECT * from salle WHERE codeSalle NOT IN (select codeSalle from cours WHERE jours = '${day}' AND periods = '${per}')`).all()
                res.send(row);
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        try {
            app.get('/api/select/coursFormateurs/:day/:per',(req,res) => {
                const day = req.params.day
                const per = req.params.per
                const row = cnx.prepare(`SELECT * from formateur WHERE idFormateur NOT IN (select idFormateur from cours WHERE jours = '${day}' AND periods = '${per}')`).all()
                res.send(row);
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        try {
            app.get('/api/select/coursModules/:groupe',(req,res) => {
                const groupe = req.params.groupe

                const row = cnx.prepare(`SELECT * from module M inner join groupe_module_filiere GM ON M.idModule = GM.idModule WHERE codeGroupe = '${groupe}'`).all()
                res.send(row);
                
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        
      
        app.post('/api/insert/cours',(req,res) => {
            const groupe = req.body.groupe
            const salleValue = req.body.salleValue
            const moduleValue = req.body.moduleValue
            const profValue = req.body.profValue
            const per = req.body.per
            const day = req.body.day
            const modeCoursValue = req.body.modeCoursValue
            const stmt = cnx.run(`INSERT INTO cours(codeGroupe,codeSalle,idModule,idFormateur,periods,jours,modeFormation) VALUES(${groupe},${salleValue},${moduleValue},${profValue},${per},${day},${modeCoursValue})`,(err)=>{
                if (err) return console.error("Impossible de planifier cette seance");
            })
        })
        
    }
}

