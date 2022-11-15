module.exports = {
    filiere : function(app,cnx){
        try {
            app.get('/api/select/filiere',(req,res) => {
                const row = cnx.prepare("SELECT * from filiere ORDER BY nomFiliere").all()
                res.send(row);
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }
        
        

        app.post('/api/insert/filiere',(req,res) => {
            const codeFiliere = req.body.codeFiliere
            const nomFiliere = req.body.nomFiliere
            cnx.run(`INSERT INTO filiere VALUES (?,?)`,[codeFiliere,nomFiliere],(err)=>{
                if (err){
                    res.send(`Filiére ${codeFiliere} déja existe`);
                }
            
            });        
        })

        
        try {
            app.delete('/api/delete/filiere/:codeFiliere',(req,res)=>{
                const filiere = req.params.codeFiliere
                const stmt = cnx.prepare("DELETE FROM filiere where codeFiliere = ?",(err)=>{
                    if (err) throw err;
                });
                stmt.run([filiere])
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }
        
        
        app.put('/api/update/filiere',(req,res) => {
            const newCodeFiliere = req.body.newCodeFiliere
            const newNomFiliere = req.body.newNomFiliere
            const initialCode = req.body.initialCode
            const stmt = cnx.prepare("UPDATE filiere SET codeFiliere = ? , nomFiliere = ? WHERE codeFiliere = ?",(err)=>{
                res.send(err)
            });
            stmt.run([newCodeFiliere,newNomFiliere,initialCode])
        })
    }
}




