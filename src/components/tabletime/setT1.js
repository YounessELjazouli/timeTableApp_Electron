import { useEffect, useState } from "react";
import Axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function SetT1(props){
    const [ l1Cours , setL1Cours ] = useState([])
    const [ dispoSalles , setDispoSalles] = useState([])
    const [ dispoProfs , setDispoProfs] = useState([])
    const [ moduleChoisis , setModuleChoisis ] = useState([])
    const [ salleValue , setSalleValue ] = useState([])
    const [ profValue , setProfValue ] = useState([])
    const [ moduleValue , setModuleValue ] = useState([])
    const [ modeCoursValue , setModeCoursValue] = useState([])
    const groupe = props.groupe
    const day = props.jours
    const per = props.periods
    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/select/cours/${groupe}/${day}/${per}`).then((response)=> {
            setL1Cours(response.data)
        })
    })

   useEffect(()=>{
        Axios.get(`http://localhost:3001/api/select/coursSalles/${day}/${per}`).then((response)=> {
            setDispoSalles(response.data)
                
        })
        Axios.get(`http://localhost:3001/api/select/coursFormateurs/${day}/${per}`).then((response)=> {
            setDispoProfs(response.data)
                
        })
        Axios.get(`http://localhost:3001/api/select/coursModules/${groupe}`).then((response)=> {
            setModuleChoisis(response.data)
                
        })
   })

    const deleteCours =  (groupe,day,per) => {
        Axios.delete(`http://localhost:3001/api/delete/cours/${groupe}/${day}/${per}`)

    }

    const ajouterCours =  () => {
        Axios.post("http://localhost:3001/api/insert/cours",{
            groupe : groupe,
            salleValue : salleValue,
            moduleValue : moduleValue,
            profValue : profValue,
            per : per,
            day : day,
            modeCoursValue : modeCoursValue,
            
        })
        setL1Cours([...l1Cours,{
            groupe : groupe,
            salleValue : salleValue,
            moduleValue : moduleValue,
            profValue : profValue,
            per : per,
            day : day,
            modeCoursValue : modeCoursValue}])
    
    }
    return(
        <div>
            

           { l1Cours.map((c)=>(
                <div key={c.idCours} id="detailsCours">
                    <p>{c.nom} {c.prenom}</p>
                    <p>{c.codeSalle}</p>
                    <p>{c.titreModule}</p>
                    
                </div>
           ))}
           
            <button className="btn btn-danger text-light" onClick={ ()=> deleteCours(groupe,day,per) }><i className="fa-solid fa-trash"></i></button>
            <Popup trigger={<button className="btn btn-primary text-light mx-5" ><i className="fa-solid fa-plus"></i></button>} >
                
                <form method="POST" id="popUpEmploi">
                    <div className="select-wrapper">
                        
                        <select className="user-select" aria-label="Default select example" id="salleF" required onChange={(e) => {
                                    setSalleValue(e.target.value)
                                }}>
                            <option disabled selected>Choisir une salle :</option>
                            {dispoSalles.map((salle) =>(
                                <option key={salle.codeSalle} value={salle.codeSalle}> {salle.codeSalle} </option>
                            ))}
                        
                        </select>
                        <select className="user-select" aria-label="Default select example" id="salleF" required onChange={(e) => {
                                    setProfValue(e.target.value)
                                }}>
                            <option disabled selected>Choisir le formateur/la formatrice :</option>
                            {dispoProfs.map((prof) =>(
                                <option key={prof.idFormateur} value={prof.idFormateur}> {prof.nom} {prof.prenom} </option>
                            ))}
                        
                        </select>
                        <select className="user-select" aria-label="Default select example" id="salleF" required onChange={(e) => {
                                    setModuleValue(e.target.value)
                                }}>
                            <option disabled selected>Choisir le module :</option>
                            {moduleChoisis.map((module) =>(
                                <option key={module.idModule} value={module.idModule}> {module.titreModule} </option>
                            ))}
                        </select>
                        <select className="user-select" aria-label="Default select example" id="salleF" required onChange={(e) => {
                                    setModeCoursValue(e.target.value)
                                }}>
                            <option disabled selected>Choisir le mode de formation :</option>
                            <option value="P">Présentielle</option>
                            <option value="D">A distance</option>
                        </select>
                    </div>
                    <div className="input-group ml-3">
                        <button type="button" className="bouton" name="addTeacher" id="submit" onClick={ ajouterCours }> Ajouter Seance </button>
                    </div>
                </form>
            </Popup>
        </div>
    )
}