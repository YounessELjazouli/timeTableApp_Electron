import {useState , useEffect} from "react";
import Axios from "axios";

export default function UpdateGroupe(props){
    const [ newCodeGroupe , setNewCodeGroupe ] = useState('');
    const [ newCodeFiliere , setNewCodeFiliere ] = useState('');
    const [ newAnnee , setNewAnnee ] = useState('');
    
    const updateGroupe = () => {
        Axios.put("http://localhost:3001/api/update/groupe",{
            newCodeGroupe: newCodeGroupe,
            newCodeFiliere: newCodeFiliere ,
            newAnnee : newAnnee,
            currentCodeGroupe : props.codeGr
            
        })
        
        
    }

    return(
        <form method="POST" id="groupeForm" className="container">
            <div className="formBloc row justify-content-center">
                <span className="col-xl-6 col-lg-6 col-md-8 col-lg-10">
                    <input type="text" className="user-input w-100" id="codeGr" placeholder="Code de Groupe ..." name="codeGr" onChange={(e) => {
                    setNewCodeGroupe(e.target.value)
                    }}/>
                </span>
                <span className="select-wrapper row justify-content-center5">
                    <span className="col-xl-5 col-lg-5 col-md-8 col-lg-10">
                        <select name="filiereGr" id="filiereGr" className="user-select w-75" onChange={(e) => {
                            setNewCodeFiliere(e.target.value)
                        }}>
                            <option disabled selected value="default">Choisir un Filiere : </option>
                            {props.filieres.map((fil) =>(
                                <option key={fil.codeFiliere} value={fil.codeFiliere}> {fil.nomFiliere} </option>
                            ))}
                            
                        </select>
                    </span>
                    <span className="col-xl-5 col-lg-5 col-md-8 col-lg-10">
                        <select name="anneeGr" id="anneeGr" className="user-select w-75" onChange={(e) => {
                            setNewAnnee(e.target.value)
                        }}>
                            <option disabled selected value="default">Choisir L'année de formation  : </option>
                            <option value="1A">1ére Année</option>
                            <option value="2A">2éme Année</option>
                        </select>
                    </span>
                </span>
            </div>
            <div id="aa">
                <button type="button" className="bouton fa-solid fa-sync btn btn-warning" id="submit" name="ajouterGroupe"  onClick={updateGroupe}>Modifier </button>
            </div>
        </form>

    )
}