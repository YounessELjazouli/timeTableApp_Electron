import {useState , useEffect} from "react";
import Axios from "axios";
import GetT1 from "./tabletime/getT1";


export default function GetEmploi (){
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
                <center>
                    <form>
                        <select className="user-select w-50" onChange = {(e) => { setGroupeChoisis(e.target.value)}}>
                        {groupeList.map((g) =>(
                            <option key={g.codeGroupe} value={g.codeGroupe}> {g.codeGroupe} </option>
                        ))}
                        </select>
                    </form>
                </center>
                
            </div>
            <div className="row justify-content-center">
            <table className="table table-bordered table-light" id="timeTable">
            
            <thead>
                <tr>
                    <td colSpan={4}>Année de formation : 2022-2023</td>
                    <td>Niveau</td>
                </tr>
                <tr>
                    <td colSpan={3}>groupe : {groupeChoisis}</td>
                    <td colSpan={2}>Masse Horaire / Semaine : </td>
                </tr>
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
                    <td id="l1"> <GetT1 groupe={groupeChoisis} jours="lundi" periods={1} /> </td>
                    <td id="l2"> <GetT1 groupe={groupeChoisis} jours="lundi" periods={2} /> </td>
                    <td id="l3"><GetT1 groupe={groupeChoisis} jours="lundi" periods={3} /></td>
                    <td id="l4"><GetT1 groupe={groupeChoisis} jours="lundi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Mardi</td>
                    <td id="m1"><GetT1 groupe={groupeChoisis} jours="mardi" periods={1} /></td>
                    <td id="m2"><GetT1 groupe={groupeChoisis} jours="mardi" periods={2} /></td>
                    <td id="m3"><GetT1 groupe={groupeChoisis} jours="mardi" periods={3} /></td>
                    <td id="m4"><GetT1 groupe={groupeChoisis} jours="mardi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Mercredi</td>
                    <td id="me1"><GetT1 groupe={groupeChoisis} jours="mercredi" periods={1} /></td>
                    <td id="me2"><GetT1 groupe={groupeChoisis} jours="mercredi" periods={2} /></td>
                    <td id="me3"><GetT1 groupe={groupeChoisis} jours="mercredi" periods={3} /></td>
                    <td id="me4"><GetT1 groupe={groupeChoisis} jours="mercredi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Jeudi</td>
                    <td id="j1"><GetT1 groupe={groupeChoisis} jours="jeudi" periods={1} /></td>
                    <td id="j2"><GetT1 groupe={groupeChoisis} jours="jeudi" periods={2} /></td>
                    <td id="j3"><GetT1 groupe={groupeChoisis} jours="jeudi" periods={3} /></td>
                    <td id="j4"><GetT1 groupe={groupeChoisis} jours="jeudi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Vendredi</td>
                    <td id="v1"><GetT1 groupe={groupeChoisis} jours="vendredi" periods={1} /></td>
                    <td id="v2"><GetT1 groupe={groupeChoisis} jours="vendredi" periods={2} /></td>
                    <td id="v3"><GetT1 groupe={groupeChoisis} jours="vendredi" periods={3} /></td>
                    <td id="v4"><GetT1 groupe={groupeChoisis} jours="vendredi" periods={4} /></td>
                </tr>
                <tr>
                    <td>Samedi</td>
                    <td id="s1"><GetT1 groupe={groupeChoisis} jours="samedi" periods={1} /></td>
                    <td id="s2"><GetT1 groupe={groupeChoisis} jours="samedi" periods={2} /></td>
                    <td id="s3"><GetT1 groupe={groupeChoisis} jours="samedi" periods={3} /></td>
                    <td id="s4"><GetT1 groupe={groupeChoisis} jours="samedi" periods={4} /></td>
                </tr>
            </tbody>
        
        </table>
            </div>
        </div>
    )
}