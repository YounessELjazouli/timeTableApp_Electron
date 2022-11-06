module.exports = {
    salle : function(app,cnx){

        try {
            app.post('/api/insert/salle',(req,res) => {
                const codeSalle = req.body.codeSalle
                const typeSalle = req.body.typeSalle
            
                console.log(codeSalle)
                const stmt = cnx.prepare("INSERT INTO salle VALUES (?,?)",(err)=>{
                    if (err) throw err;
                });
                stmt.run([codeSalle,typeSalle])
            
            })
        } catch (err) {
            console.log("Une erreur a occuré")
        }


        try {
            app.get('/api/select/infoSalles',(req,res) => {

                cnx.all("SELECT * from salle where typeSalle = ?", ["info"] ,(err, row) => {
                    res.send(row)
                    if (err) throw err;
                })
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        try {
            app.get('/api/select/normalSalles',(req,res) => {

                cnx.all("SELECT * from salle where typeSalle = ?", ["normale"] ,(err, row) => {
                    res.send(row)
                    if (err) throw err;
                })
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }


        try {
            app.get('/api/select/atelier',(req,res) => {
    
                cnx.all("SELECT * from salle where typeSalle = ?", ["atelier"] ,(err, row) => {
                    res.send(row)
                    if (err) throw err;
                })
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }

        try {
            app.delete('/api/delete/salle/:codeSalle',(req,res)=>{
                const codeSalle = req.params.codeSalle
                const stmt = cnx.prepare("DELETE FROM salle where codeSalle = ?",(err)=>{
                    if (err) throw err;
                });
                stmt.run([codeSalle])
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
    }
}






