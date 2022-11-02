import {useState , useEffect} from "react";
import Axios from "axios";
import SetT1 from "./tabletime/setT1";


export default function SetEmlploi (){
    const [groupeList ,  setGroupeList] = useState([])
    const [ groupeChoisis , setGroupeChoisis ] = useState("")


    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/groupe").then((response)=> {
            setGroupeList(response.data)
        })
    },[groupeList])




    return(
        <div className="container">
            <div className="row justify-content-center">
                <form>
                    <center className="select-wrapper">
                        <select className="user-select" onChange = {(e) => { setGroupeChoisis(e.target.value)}}>
                        {groupeList.map((g) =>(
                            <option key={g.codeGroupe} value={g.codeGroupe}> {g.codeGroupe} </option>
                        ))}
                        </select>
                    </center>

                </form>
            </div>
            <div className="row justify-content-center">
            <table className="table table-bordered table-light" id="timeTable">
            
            <thead>
                <tr>
                    <th>  </th>
                    <th> <span className="start">08:30</span> <span className="end">10:50</span>  </th>
                    <th> <span className="start">11:10</span> <span className="end">13:15</span>  </th>
                    <th> <span className="start">13:30</span> <span className="end">15:50</span>  </th>
                    <th> <span className="start">16:10</span> <span className="end">18:30</span>  </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Lundi</td>
                    <td id="l1"> <SetT1 groupe={groupeChoisis} jours="lundi" periods={1} /> </td>
                    <td id="l2"> <SetT1 groupe={groupeChoisis} jours="lundi" periods={2} /> </td>
                    <td id="l3"><SetT1 groupe={groupeChoisis} jours="lundi" periods={3} /></td>
                    <td id="l4"><SetT1 groupe={groupeChoisis} jours="lundi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Mardi</td>
                    <td id="m1"><SetT1 groupe={groupeChoisis} jours="mardi" periods={1} /></td>
                    <td id="m2"><SetT1 groupe={groupeChoisis} jours="mardi" periods={2} /></td>
                    <td id="m3"><SetT1 groupe={groupeChoisis} jours="mardi" periods={3} /></td>
                    <td id="m4"><SetT1 groupe={groupeChoisis} jours="mardi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Mercredi</td>
                    <td id="me1"><SetT1 groupe={groupeChoisis} jours="mercredi" periods={1} /></td>
                    <td id="me2"><SetT1 groupe={groupeChoisis} jours="mercredi" periods={2} /></td>
                    <td id="me3"><SetT1 groupe={groupeChoisis} jours="mercredi" periods={3} /></td>
                    <td id="me4"><SetT1 groupe={groupeChoisis} jours="mercredi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Jeudi</td>
                    <td id="j1"><SetT1 groupe={groupeChoisis} jours="jeudi" periods={1} /></td>
                    <td id="j2"><SetT1 groupe={groupeChoisis} jours="jeudi" periods={2} /></td>
                    <td id="j3"><SetT1 groupe={groupeChoisis} jours="jeudi" periods={3} /></td>
                    <td id="j4"><SetT1 groupe={groupeChoisis} jours="jeudi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Vendredi</td>
                    <td id="v1"><SetT1 groupe={groupeChoisis} jours="vendredi" periods={1} /></td>
                    <td id="v2"><SetT1 groupe={groupeChoisis} jours="vendredi" periods={2} /></td>
                    <td id="v3"><SetT1 groupe={groupeChoisis} jours="vendredi" periods={3} /></td>
                    <td id="v4"><SetT1 groupe={groupeChoisis} jours="vendredi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Samedi</td>
                    <td id="s1"><SetT1 groupe={groupeChoisis} jours="samedi" periods={1} /></td>
                    <td id="s2"><SetT1 groupe={groupeChoisis} jours="samedi" periods={2} /></td>
                    <td id="s3"><SetT1 groupe={groupeChoisis} jours="samedi" periods={3} /></td>
                    <td id="s4"><SetT1 groupe={groupeChoisis} jours="samedi" periods={4} /></td>
                </tr>
            </tbody>
        
        </table>
            </div>
        </div>
    )
}