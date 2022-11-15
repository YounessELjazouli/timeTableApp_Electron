module.exports = {
    salle : function(app,cnx){

       
            app.post('/api/insert/salle',(req,res) => {
                const codeSalle = req.body.codeSalle
                const typeSalle = req.body.typeSalle
                const stmt = cnx.run(`INSERT INTO salle VALUES (${codeSalle},${typeSalle})`,(err)=>{
                    if (err) return console.error("Cette salle déja existe");
                });
            })
        


        try {
            app.get('/api/select/infoSalles',(req,res) => {

                const row = cnx.prepare("SELECT * from salle where typeSalle = 'info' ORDER BY codeSalle").all()
                res.send(row);
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }
        
        try {
            app.get('/api/select/normalSalles',(req,res) => {
                const row = cnx.prepare("SELECT * from salle where typeSalle = 'normale' ORDER BY codeSalle").all()
                res.send(row);
            })
        } catch (error) {
            console.log("Une erreur a occuré")
        }


        try {
            app.get('/api/select/atelier',(req,res) => {
    
                const row = cnx.prepare("SELECT * from salle where typeSalle = 'atelier' ORDER BY codeSalle").all()
                res.send(row);
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






