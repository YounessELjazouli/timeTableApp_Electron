import { Component } from "react"



class Cours extends Component{
    getSalle(val){
        // $.ajax({
        //     type:"POST",
        //     url : "getSalle.php",
        //     data : "idFormateur="+val,
        //     success:function(data){
        //         $('#salleC').append(data);
                
        //     }
        // })
    }
    getGroupe(val){
        // $.ajax({
        //     type:"POST",
        //     url : "getGroupe.php",
        //     data : "codeFiliere="+val,
        //     success:function(data){
        //         $('#groupeC').append(data);
        //         $('#groupeE').append(data);
                
        //     }
        // })
    }


    getModule(val){
        // $.ajax({
        //     type:"POST",
        //     url : "getModule.php",
        //     data : "codeFiliere="+val,
        //     success:function(data){
        //         $('#moduleC').html(data);
        //     }
        // })
    }
    render(){
        return(
            <div  class="container-fluid" id="content-add-course">
                <div class="row">
                    <div class="col-sm-11 dashCours">
                        <div class="addTeacherFormWrapper">
                            <span id="message"></span>
                            <form method="POST" id="coursForm">

                                <div class="breakline">
                                    <select class="form-select form-control my-3" aria-label="Default select example" name="formateurC" id="formateurC" onchange="getSalle(this.value);">
                                        <option disabled Selected>Choisir le formateur/la formatrice :</option>
                                        


                                    </select>

                                    <select class="form-select form-control my-3" aria-label="Default select example" name="salleC" id="salleC" >
                                        <option disabled Selected>Choisir la salle de formateur :</option>
                                    </select>
                                </div>

                                <div class="breakline">
                                    <select class="form-select form-control my-3" aria-label="Default select example" name="filiereC" id="filiereC" onchange="getGroupe(this.value);getModule(this.value)">
                                        <option Selected disabled>Choisir le Filiere  :</option>
                                    
                                    </select>

                                    <select class="form-select form-control my-3" aria-label="Default select example" name="groupeC" id="groupeC">
                                        <option disabled Selected>Choisir le groupe  :</option>
                                    </select>
                                </div>

                                <div class="breakline">
                                    <select class="form-select form-control my-3" aria-label="Default select example" name="moduleC" id="moduleC">
                                        <option disabled Selected>Choisir Le Module :</option>
                                    </select>

                                    <select class="form-select form-control my-3" aria-label="Default select example" name="joursC">
                                        <option disabled Selected>Choisir le jours de cours :</option>
                                        <option value="lundi">Lundi</option>
                                        <option value="mardi">Mardi</option>
                                        <option value="mercredi">Mercredi</option>
                                        <option value="jeudi">Jeudi</option>
                                        <option value="vendredi">Vendredi</option>
                                        <option value="samedi">Samedi</option>
                                    </select>
                                </div>

                                <select class="form-select form-control my-3" aria-label="Default select example" name="heureC">
                                    <option disabled Selected>Choisir L'horaire de cours :</option>
                                    <option value="1">08:30 &lt;=&gt; 10:50</option>
                                    <option value="2">11:10 &lt;=&gt; 13:15</option>
                                    <option value="12">08:30 &lt;=&gt; 13:15</option>
                                    <option value="3">13:30 &lt;=&gt; 15:50</option>
                                    <option value="4">16:10 &lt;=&gt; 18:30</option>
                                    <option value="34">13:30 &lt;=&gt; 18:30</option>
                                </select>

                                <div id="breakline">
                                    <select class="form-select form-control-1 my-3" aria-label="Default select example" name="semaineC" multiple size="8" id="weeks">
                                        <option disabled Selected>choisir les semaines durant lesquelles ce cours aura lieu :</option>

                                        
                                    </select>

                                    
                                    <div class="input-group my-3">
                                        <button type="button" class="btn btn-success" id="submit" name="ajouterSalle"  onclick="save_class();return false;">Ajouter le cours à l'emploi de temps</button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                    <div class="col-sm-12 mainCours">
                        <form  class="col-sm-12 d-block mx-auto" id="content-view-timetable">
                            <select class="form-select form-control2 w-50 d-block mx-auto my-4" aria-label="Default select example" name="filiereE" id="filiereE" onchange="getGroupe(this.value);">
                                <option Selected disabled>Choisir le Filiere  :</option>
                                
                            </select>

                            <select class="form-select form-control2 w-50 d-block mx-auto my-4" aria-label="Default select example" name="groupeE" id="groupeE">
                                <option disabled Selected>Choisir le groupe  :</option>
                            </select>

                            <select class="form-select form-control2 w-50 d-block mx-auto my-4" aria-label="Default select example" name="semaineE" id="weeks">
                                        <option disabled Selected>choisir les semaines durant lesquelles ce cours aura lieu :</option>

                                       
                            </select>
                            <div class="input-group ">
                                <button type="button" class="btn btn-success d-block mx-auto" id="submit2" name="ajouterSalle"  onclick="viewTimetable();return false;">Voir l'emploi de temps</button>
                            </div>
                        </form>
                        <span id="message2" class="emploi"></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cours;