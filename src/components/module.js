import {useState , useEffect} from "react";
import Axios from "axios";

function  Modules(){

    const [ codeModule , setCodeModule ] = useState('');
    const [ titreModule , setTitreModule ] = useState('');
    const [ masseHoraire , setMasseHoraire ] = useState('');
    const [ codeFiliere , setCodeFiliere] = useState('');
    const [ codeGroupe , setCodeGroupe] = useState([]);
    const [filieres ,  SetFilieres] = useState([])
    const [groupes ,  setGroupes] = useState([])
    const [modulesList ,  setModulesList] = useState([])
    const [FiliereChoisis,setFiliereChoisis] = useState("")



    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/filiere").then((response)=> {
            SetFilieres(response.data)
        })
    },[])

    

  

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/select/groupe`).then((response)=> {
            setGroupes(response.data)
        })
    })

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/select/module`).then((response)=> {
            setModulesList(response.data)
        })
    },[])


    const getModules  = () => {
        
        Axios.get(`http://localhost:3001/api/select/module/${FiliereChoisis}`).then((response)=> {
            setModulesList(response.data)
        })
        document.getElementById('clearFilter').style.display = "inline";


        
    }
    const getAllModules = () => {
        Axios.get(`http://localhost:3001/api/select/module`).then((response)=> {
            setModulesList(response.data)
        })
        document.getElementById('clearFilter').style.display = "none";
    }


    const submitModule = () => {
        let codeM = document.getElementById('codeM').value
        let titreM = document.getElementById('titreM').value
        let masseHoraireM = document.getElementById('masseHoraireM').value
        let filiereM = document.getElementById('filiereM').value
        let groupeM = document.getElementById('groupeM').value
        if (codeM === "" || titreM === "" || masseHoraireM === "" || filiereM === "default" || groupeM === "default") {
            document.getElementById('message').setAttribute('class','d-block alert alert-danger')
            document.getElementById('message').innerHTML = 'tous les champs sont obligatoire !!'
            return false;
        }else{
            let groupesValue = document.querySelectorAll('#groupeM option')
            let selectedGroupes = []
            groupesValue.forEach((gv)=>{
                if(gv.selected){
                    selectedGroupes.push(gv.value)
                }
            })
        Axios.post("http://localhost:3001/api/insert/module",{
            codeModule: codeModule,
            titreModule: titreModule,
            masseHoraire: masseHoraire,
            codeFiliere:codeFiliere,
            codeGroupe:selectedGroupes
        })
        setModulesList([...modulesList,{codeModule: codeModule,
            titreModule: titreModule,
            masseHoraire: masseHoraire,
            codeFiliere:codeFiliere,
            codeGroupe:codeGroupe}])
        }
        setTimeout(()=>{
            document.getElementById('message').innerHTML = ''
            document.getElementById('message').setAttribute('class','d-none')
        },3000)
        document.getElementById('message').setAttribute('class','d-block alert alert-success')
        document.getElementById('message').innerHTML = 'Les données sont enregistré'
    }



    const deleteModule = (idModule) => {
        Axios.delete(`http://localhost:3001/api/delete/module/${idModule}`)  
    }
    
    const filterNames = () => {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.querySelector("table");
        tr = table.getElementsByTagName("tr");
        
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
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
            <div  className="container" id="content-add-module">
                <div className="row">
                    <div className="col-sm-8 col-md-10 col-lg-12">
                        <div className="mt-5 wrapper">
                            <center><span id="message" className="d-none"></span></center><br/>
                            <h1 className="title">Ajouter Module</h1>
                            <form method="POST" id="moduleForm" className="container">
                                <div className="row">
                                <span className="col-xl-5 col-lg-5 col-md-8 col-lg-10">
                                    <input type="text" className="user-input w-100" placeholder="Code de Module ..." id="codeM"  onChange = {(e) => {
                                    setCodeModule(e.target.value)
                                    }}/>
                                </span>
                                <span className="col-xl-5 col-lg-5 col-md-8 col-lg-10">
                                    <input type="text" className="user-input w-100" id="titreM" placeholder="Intitulé de Module ..." name="titreM" onChange = {(e) => {
                                    setTitreModule(e.target.value)
                                    }}/>
                                </span>
                                <span className="col-xl-5 col-lg-5 col-md-8 col-lg-10">
                                    <input type="number" className="user-input w-100" id="masseHoraireM" placeholder="Masse Horaire de Module ..." name="masseHoraireM" onChange= {(e) => {
                                    setMasseHoraire(e.target.value)
                                    }}/>
                                </span>
                                <span className="select-wrapper col-xl-5 col-lg-5 col-md-8 col-lg-10">
                                    <select className=" user-select w-100"  aria-label="Default select example" id="filiereM" onChange = {(e) => {
                                        setCodeFiliere(e.target.value)
                                        document.getElementById('groupeM').innerHTML = "";
                                        const FiltredGroupes =groupes.filter((groupe) => {
                                            return groupe.codeFiliere===e.target.value }
                                        )
                                    
                                        // eslint-disable-next-line
                                        {FiltredGroupes.map((g) =>(
                                            document.getElementById('groupeM').innerHTML +=
                                            `<option key=${g.codeGroupe} value=${g.codeGroupe}> ${g.codeGroupe} </option>`
                                        ))}

                                        
                                        }}>
                                        <option value="default" Selected disabled> Choisissez une filiere</option>
                                        {filieres.map((fil) =>(
                                            <option key={fil.codeFiliere} value={fil.codeFiliere}> {fil.nomFiliere} </option>
                                        ))}
                                    
                                    </select>
                                    </span>
                                    <span className="row justify-content-center">
                                    <select className="user-select w-50 h-100  col-xl-5 col-lg-5 col-md-8 col-lg-10"  aria-label="Default select example" id="groupeM"  multiple size={4} onChange = {(e) => {
                                        setCodeGroupe(e.target.value)
                                    }}>
                                        <option value="default" Selected disabled> Choisissez une groupe</option>
                                        
                                    
                                    </select>
                                </span>
                                </div>
                                <div id="aa">
                                    <button type="button" className="bouton fa-solid fa-plus btn btn-success" name="addTeacher" id="submit" onClick={submitModule}> Ajouter </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-12 mainModule mt-5">
                        <form  method="POST" id="getModuleForm">
                            <div className="select-wrapper">
                                <select className="user-select" aria-label="Default select example" name="getfiliereM" id="filieres" 
                                onChange = {(e) => {
                                    setFiliereChoisis(e.target.value)
                                }}>
                                    <option disabled Selected>choisir les semaines durant lesquelles ce cours aura lieu :</option>
                                    {filieres.map((fil)=>(
                                        <option key={fil.codeFiliere} value={fil.codeFiliere}>{fil.nomFiliere}</option>
                                    ))}
                                    
                                
                                </select>
                                <i className="btn btn-dark text-light fa-solid fa-sort"  onClick={getModules}></i>
                                <i className="btn btn-dark text-light fa-solid fa-sort-alpha-up mx-2" id="sortAZ" onClick={getAllModules}></i>
                                <input type="text" id="myInput" onKeyUp={filterNames} placeholder="Tréer par l'intitulé de module.."  className="user-input"/>

                            </div>

                            
                        </form>
                        <table className="table table-hover table-primary table-striped">
                                <thead>
                                    <tr>
                                        <td>code Module</td>
                                        <td> Intitulé</td>
                                        <td>Masse Horaire</td>
                                        <td>Supprimer</td>
                                        <td>Modifier</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {modulesList.map((module) =>(
                                    <tr key={module.idModule}>
                                        <td> {module.codeModule} </td>
                                        <td> {module.titreModule} </td>
                                        <td> {module.masseHoraire} </td>
                                        <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteModule(module.idModule)}></i></td>
                                        <td><i className='fa-solid fa-arrows-rotate btn btn-success text-light'></i></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                    </div>
                </div>     
            </div>
    )
    
}

export default Modules;