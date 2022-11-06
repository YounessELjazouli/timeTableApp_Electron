module.exports = {
    groupe : function(app,cnx){

        try {
            app.get('/api/select/groupe',(req,res) => {

                cnx.all("SELECT * from groupe", (err, row) => {
                    res.send(row)
                    if (err) throw err;
                })
            })   
        } catch (err) {
            console.log("Une erreur a occuré")
        }


        try {
            app.post('/api/insert/groupe',(req,res) => {
                const codeGroupe = req.body.codeGroupe
                const codeFiliere = req.body.codeFiliere
                const annee = req.body.annee
                const stmt = cnx.prepare("INSERT INTO groupe VALUES (?,?,?)",(err)=>{
                    if (err) throw err;
                });
                stmt.run([codeGroupe,codeFiliere,annee])
    
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }




        try {
            app.delete('/api/delete/groupe/:codeGroupe',(req,res)=>{
                const groupe = req.params.codeGroupe
                const stmt = cnx.prepare("DELETE FROM groupe where codeGroupe = ?",(err) => {
                    if (err) throw err;
                });
                stmt.run([groupe])
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }




        try {
            app.put('/api/update/groupe',(req,res) => {
                const newCodeFiliere = req.body.newCodeFiliere
                const newCodeGroupe = req.body.newCodeGroupe
                const newAnnee = req.body.newAnnee
                const currentCodeGroupe = req.body.currentCodeGroupe
    
                const stmt = cnx.prepare("UPDATE groupe SET codeGroupe = ? , codeFiliere = ? , annee = ? WHERE codeGroupe = ?",(err)=>{
                    if (err) throw err;
                });
                stmt.run([newCodeGroupe,newCodeFiliere,newAnnee,currentCodeGroupe])
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }


    }
}




