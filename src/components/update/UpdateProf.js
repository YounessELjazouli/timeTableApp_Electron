import {useState } from "react";
import Axios from "axios";

export default function UpdateProf(props){
    const [ newNom , setNewNom ] = useState('');
    const [ newPrenom , setNewPrenom ] = useState('');
    const [ newMassHoraire , setNewMh ] = useState('');
    const [ newDepartement , setNewDepartement ] = useState('');
    const [ newEmail ,  setNewEmail] = useState([])
    const [ newTel ,  setNewTel] = useState([])
    
    const updateFormateur = () => {
        Axios.put("http://localhost:3001/api/update/formateur",{
            idForamteur: props.idProf ,
            newNom: newNom,
            newPrenom: newPrenom,
            newMassHoraire: newMassHoraire,
            newDepartement : newDepartement,
            newEmail : newEmail,
            newTel: newTel
        })
        
        
    }

    return(
        <form method="POST" id="formateurForm">
            <input type="text" className="update-user-input"  placeholder="Modifier le nom ..."    onChange={(e) => {
                                    setNewNom(e.target.value)
                                }}/>
            <input type="text" className="update-user-input" placeholder="Modifier le prenom ..." onChange={(e) => {
                                    setNewPrenom(e.target.value)
                                }}/>
            <input type="number" className="update-user-input" placeholder="Modifier la masse Horaire ..."  onChange={(e) => {
                                    setNewMh(e.target.value)
                                }}/>
            <input type="email" className="update-user-input" placeholder="Modifier l'email ..."  onChange={(e) => {
                                    setNewEmail(e.target.value)
                                }}/>
            <input type="number" className="update-user-input" placeholder="Modifier le numéro de telephone ..."  onChange={(e) => {
                                    setNewTel(e.target.value)
                                }}/>
            <input type="text" className="update-user-input" placeholder="Modifier le departement ..." onChange={(e) => {
                                    setNewDepartement(e.target.value)
                                }} />
            <div className="input-group ml-3">
                <button type="button" className="bouton" name="addTeacher" id="submit" onClick={ updateFormateur }>Modifier</button>
            </div>
        </form>
    )
}