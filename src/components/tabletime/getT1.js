import { useEffect, useState } from "react";
import Axios from "axios";

export default function GetT1(props){
    const [ l1Cours , setL1Cours ] = useState([])
    const groupe = props.groupe
    const day = props.jours
    const per = props.periods

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/select/cours/${groupe}/${day}/${per}`).then((response)=> {
            setL1Cours(response.data)
                
        })
    })

    return(
        <div>
           {
            l1Cours.map((c)=>(
                <div className="timeTableInfos">
                    <p>{c.nom} {c.prenom}</p>
                    <p>{c.codeSalle}</p>
                    <p>{c.titreModule}</p>
                </div>
           ))}
        </div>
    )
}