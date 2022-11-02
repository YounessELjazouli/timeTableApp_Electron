import {useState , useEffect} from "react";
import Axios from "axios";

export default function UpdateFiliere(props){
    const [ newCodeFiliere , setNewCodeFiliere ] = useState('');
    const [ newNomFiliere , SetNewNomFiliere ] = useState('');
    
    
    const updateFiliere = () => {
        Axios.put("http://localhost:3001/api/update/filiere",{
            newCodeFiliere: newCodeFiliere ,
            newNomFiliere: newNomFiliere,
            initialCode : props.codeFil
            
        })
        
        
    }

    return(
        <form method="POST" id="filiereForm container">
            <div className="formBloc row justify-content-center">
                <span className="col-xl-12 col-lg-5 col-md-12 col-sm-12 justify-content-center">
                    <input type="text" className="user-input w-75" id="codeFil" placeholder="Modifier le code de Filiere ..." name="codeFil" onChange={(e) => {
                    setNewCodeFiliere(e.target.value)
                    }}/>  
                </span>
                <span className="col-xl-12 col-lg-5 col-md-12 col-sm-12 justify-content-center">
                    <input type="text" className="user-input w-75" id="nomFil" placeholder="Modifier le nom de Filiere ..." name="nomFil" onChange={(e) => {
                    SetNewNomFiliere(e.target.value)
                    }}/>
                </span>
            </div>
            <div id="aa">
                <button type="button" className="bouton fa-solid fa-sync btn btn-warning" id="submitFiliere"  onClick={ updateFiliere }>Modifier</button>
            </div>
        </form>
    )
}