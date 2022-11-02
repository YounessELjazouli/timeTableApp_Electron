import {useState , useEffect} from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import UpdateGroupe from "./update/UpdateGroupe";


function Groupes(){

    const [ codeGroupe , setCodeGroupe ] = useState('');
    const [ codeFiliere , setCodeFiliere ] = useState('');
    const [ annee , setAnnee ] = useState('');
    const [filieres ,  setFilieres] = useState([])

    const [groupeList ,  setGroupeList] = useState([])



    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/filiere").then((response)=> {
            setFilieres(response.data)
        })
    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/groupe").then((response)=> {
            setGroupeList(response.data)
        })
    },[])

    const submitGroupe = () => {
        let codeGr = document.getElementById('codeGr').value
        let filiereGr = document.getElementById('filiereGr').value
        let anneeGr = document.getElementById('anneeGr').value
        if (codeGr === "" || filiereGr === "default" || anneeGr === "default" ) {
            document.getElementById('message').setAttribute('class','d-block alert alert-danger')
            document.getElementById('message').innerHTML = 'tous les champs sont obligatoire !!'
            return false;
        }else{
        Axios.post("http://localhost:3001/api/insert/groupe",{
            codeGroupe: codeGroupe,
            codeFiliere: codeFiliere,
            annee:annee
        })
        
        setGroupeList([...groupeList,{codeGroupe: codeGroupe,
            codeFiliere: codeFiliere,
            annee:annee}])
        }
        setTimeout(()=>{
            document.getElementById('message').innerHTML = ''
            document.getElementById('message').setAttribute('class','d-none')
        },3000)
        document.getElementById('message').setAttribute('class','d-block alert alert-success')
        document.getElementById('message').innerHTML = 'Les données sont enregistré'
    }

    const deleteGroupe = (codeGroupe) => {
        Axios.delete(`http://localhost:3001/api/delete/groupe/${codeGroupe}`)
        
        
    }
    const filterNames = () => {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.querySelector("table");
        tr = table.getElementsByTagName("tr");
        
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
            }
        }
    }
    return(
            <div  className="container" id="content-add-group">
                <div className="row">
                    <div className="col-sm-8 col-md-10 col-lg-12">
                        <div className="mt-5 wrapper">
                            <center><span id="message" className="d-none"></span></center><br/>
                            <div className="title">Ajouter groupe</div>
                            <form method="POST" id="groupeForm" className="container">
                                <div className="formBloc row justify-content-center">
                                    <span className="col-xl-6 col-lg-6 col-md-8 col-lg-10">
                                        <input type="text" className="user-input w-100" id="codeGr" placeholder="Code de Groupe ..." name="codeGr" onChange={(e) => {
                                        setCodeGroupe(e.target.value)
                                        }}/>
                                    </span>
                                    <span className="select-wrapper row justify-content-center5">
                                        <span className="col-xl-5 col-lg-5 col-md-8 col-lg-10">
                                            <select name="filiereGr" id="filiereGr" className="user-select w-75" onChange={(e) => {
                                                setCodeFiliere(e.target.value)
                                            }}>
                                                <option disabled selected value="default">Choisir un Filiere : </option>
                                                {filieres.map((fil) =>(
                                                    <option key={fil.codeFiliere} value={fil.codeFiliere}> {fil.nomFiliere} </option>
                                                ))}
                                                
                                            </select>
                                        </span>
                                        <span className="col-xl-5 col-lg-5 col-md-8 col-lg-10">
                                            <select name="anneeGr" id="anneeGr" className="user-select w-75" onChange={(e) => {
                                                setAnnee(e.target.value)
                                            }}>
                                                <option disabled selected value="default">Choisir L'année de formation  : </option>
                                                <option value="1A">1ére Année</option>
                                                <option value="2A">2éme Année</option>
                                            </select>
                                        </span>
                                    </span>
                                </div>
                                <div id="aa">
                                    <button type="button" className="bouton fa-solid fa-plus btn btn-success" id="submit" name="ajouterGroupe"  onClick={submitGroupe}>Ajouter </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-12 mainGroup">
                        <div id="groupeList"  className="my-5">
                            <input type="text" id="myInput" onKeyUp={filterNames} placeholder="Tréer par le code de groupe.."  className="user-input W-50"/>
                            <table className="table table-hover table-primary table-striped">
                                <thead>
                                    <tr>
                                        <td>code Groupe</td>
                                        <td> Filiere</td>
                                        <td>Année de formation</td>
                                        <td>Supprimer</td>
                                        <td>Modifier</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {groupeList.map((groupe) =>(
                                    <tr key={groupe.codeGroupe}>
                                        <td> {groupe.codeGroupe} </td>
                                        <td> {groupe.codeFiliere} </td>
                                        <td> {groupe.annee} </td>
                                        <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteGroupe(groupe.codeGroupe)}></i></td>
                                        <td><Popup trigger={<button className="fa-solid fa-arrows-rotate btn btn-success text-light" ></button>} >
                                            <UpdateGroupe codeGr={groupe.codeGroupe} filieres={filieres} />
                                            </Popup>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
   
    )
    
}

export default Groupes;