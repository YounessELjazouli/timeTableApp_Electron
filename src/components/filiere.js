import {useState , useEffect} from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import UpdateFiliere from "./update/UpdateFiliere";

function Filiere(){

    const [ codeFiliere , setCodeFiliere ] = useState('');
    const [ nomFiliere , SetNomFiliere ] = useState('');

    const [filiereList ,  setFiliereList] = useState([])



    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/filiere").then((response)=> {
            setFiliereList(response.data)
        })
    },[])

    const submitFiliere = () => {
        let codeFil = document.getElementById('codeFil').value
        let nomFil = document.getElementById('nomFil').value
        
        if (codeFil === "" || nomFil === ""  ) {
            document.getElementById('message').setAttribute('class','d-block alert alert-danger')
            document.getElementById('message').innerHTML = 'tous les champs sont obligatoire !!'
            return false;
        }else{
            document.getElementById('message').setAttribute('class','d-none')
            Axios.post("http://localhost:3001/api/insert/filiere",{
                codeFiliere: codeFiliere,
                nomFiliere: nomFiliere
            })
            
            setFiliereList([...filiereList,{codeFiliere: codeFiliere,
                nomFiliere: nomFiliere}])
            setTimeout(()=>{
                document.getElementById('message').innerHTML = ''
                document.getElementById('message').setAttribute('class','d-none')
            },3000)
            document.getElementById('message').setAttribute('class','d-block alert alert-success')
            document.getElementById('message').innerHTML = 'Les données sont enregistré'
        }
    }

    const deleteFiliere = (codeFiliere) => {
        Axios.delete(`http://localhost:3001/api/delete/filiere/${codeFiliere}`)
        
        
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
        <div  className="container-fluid" id="content-add-filiere">
            <div className="row">
                <div className="col-sm-8 col-md-10 col-lg-12">
                    <div className="mt-5 wrapper">
                        <center><span id="message" className="d-none"></span></center><br/>
                        <h1 className="title">Ajouter Filiére</h1>
                        <form method="POST" id="filiereForm container">
                            <div className="formBloc row justify-content-center">
                                <span className="col-xl-5 col-lg-5 col-md-12 col-sm-12 justify-content-center">
                                    <input type="text" className="user-input w-75" id="codeFil" placeholder="Code de Filiere ..." name="codeFil" onChange={(e) => {
                                    setCodeFiliere(e.target.value)
                                    }}/>  
                                </span>
                                <span className="col-xl-5 col-lg-5 col-md-12 col-sm-12 justify-content-center">
                                    <input type="text" className="user-input w-75" id="nomFil" placeholder="Nom de Filiere ..." name="nomFil" onChange={(e) => {
                                    SetNomFiliere(e.target.value)
                                    }}/>
                                </span>
                            </div>
                            <div id="aa">
                                <button type="button" className="bouton fa-solid fa-plus btn btn-success" id="submitFiliere"  onClick={ submitFiliere }>Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12 mainFiliere mt-5'>
                    <input type="text" id="myInput" onKeyUp={filterNames} placeholder="Tréer par l'intitulé de filiére.."  className="user-input"/>
                    <table className="table table-hover table-primary table-striped">
                    <thead>
                        <tr>
                            <td>code filiere</td>
                            <td>intitulé</td>
                            <td>Supprimer</td>
                            <td>Modifier</td>
                        </tr>
                    </thead>
                    <tbody>
                    {filiereList.map((fil) =>(
                        <tr key={fil.codeFiliere}>
                            <td> {fil.codeFiliere} </td>
                            <td> {fil.nomFiliere} </td>
                            
                            <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteFiliere(fil.codeFiliere)}></i></td>
                            <td><Popup trigger={<button className="fa-solid fa-arrows-rotate btn btn-success text-light" ></button>} >
                                    <UpdateFiliere codeFil={fil.codeFiliere} />
                                </Popup></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                    
                </div>
            </div>
        </div>
        
    )
    
}

export default Filiere;