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
           { l1Cours.map((c)=>(
                <div>
                    <h4>{c.nom} {c.prenom}</h4>
                    <h5>{c.codeSalle}</h5>
                    <h6>{c.titreModule}</h6>
                </div>
           ))}
        </div>
    )
}