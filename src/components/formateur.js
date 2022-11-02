import {useState , useEffect} from "react";
import Axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UpdateProf from "./update/UpdateProf";
function Formateurs(){
    const [ nom , setNom ] = useState('');
    const [ prenom , setPrenom ] = useState('');
    const [ massHoraire , setMh ] = useState('');
    const [formateursList ,  setFormateursList] = useState([])
    const [ departement , setDepartement ] = useState('');
    const [email ,  setEmail] = useState([])
    const [tel ,  setTel] = useState([])



    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/formateurs").then((response)=> {
            setFormateursList(response.data)
        })
    },[])

    const submitFormateur = () => {
        let nomField = document.getElementById('nomF').value
        let prenomField = document.getElementById('prenomF').value
        let masseHoraireField = document.getElementById('masseHoraireF').value
        let departementF = document.getElementById('departementF').value
        let mailF = document.getElementById('mailF').value
        let telF = document.getElementById('telF').value
        if (nomField === "" || prenomField === "" || masseHoraireField === "" || departementF === "" || mailF === "" || telF === "" ) {
            document.getElementById('message').setAttribute('class','d-block alert alert-danger')
            document.getElementById('message').innerHTML = 'tous les champs sont obligatoire !!'
            return false;
        }else{
            document.getElementById('message').setAttribute('class','d-none')
            
            Axios.post("http://localhost:3001/api/insert/formateur",{
                nom: nom,
                prenom: prenom,
                massHoraire: massHoraire,
                departement : departement,
                email : email,
                tel: tel
            })
            setFormateursList([...formateursList,{nom: nom,
                prenom: prenom,
                massHoraire: massHoraire,
                departement : departement,
                email : email,
                tel: tel}])

            setTimeout(()=>{
                document.getElementById('message').innerHTML = ''
                document.getElementById('message').setAttribute('class','d-none')
            },3000)
            document.getElementById('message').setAttribute('class','d-block alert alert-success')
            document.getElementById('message').innerHTML = 'Les données sont enregistré'
        }
        
    }

    const deleteFormateur = (idFormateur) => {
        Axios.delete(`http://localhost:3001/api/delete/formateur/${idFormateur}`)
        
        
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

    return (
        
        <div  className="container" id="content-add-teacher">
            
            <div className="row">
                <div className="col-sm-8 col-md-10 col-lg-12 justify-content-center">
                    <div className="mt-5 wrapper">
                    <center><span id="message" className="d-none"></span></center><br/>
                        <h1 className="title">Ajouter un formateur/formatrice</h1>
                        <form method="POST"  id="formateurForm" className="container">
                            <div className="formBloc row">
                                <span className="col-xl-4 col-lg-4 col-md-8 col-sm-12">
                                    <input type="text" className="user-input w-100" id="nomF" placeholder="Entrez le nom de formateur" name="nomF" required onChange={(e) => {
                                        setNom(e.target.value)
                                    }} />
                                    
                                </span>
                                <span className="col-xl-4 col-lg-4 col-md-8 col-sm-12">
                                    <input type="text" className="user-input w-100" id="prenomF" placeholder="Entrez le prenom de formateur" name="prenomF" required onChange={(e) => {
                                        setPrenom(e.target.value)
                                    }}/>
                                </span>
                                <span className="col-xl-4 col-lg-4 col-md-8 col-sm-12">
                                    <input type="number" className="user-input w-100" id="masseHoraireF" name="masseHoraireF" placeholder="La masse horaire par semaine : " required onChange={(e) => {
                                        setMh(e.target.value)
                                    }}/>
                                    
                                </span>
                            </div>

                            <div className="formBloc row">
                                <span className="col-xl-4 col-lg-4 col-md-8 col-sm-12">
                                    <input type="text" className="user-input w-100" id="departementF" placeholder="Département de formateur" name="departementF" required onChange={(e) => {
                                        setDepartement(e.target.value)
                                    }}/>
                                </span>

                                <span className="col-xl-4 col-lg-4 col-md-8 col-sm-12">
                                    <input type="email" className="user-input w-100" id="mailF" placeholder="Adresse Mail de formateur " name="mailF" required onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}/>
                                </span>

                                <span className="col-xl-4 col-lg-4 col-md-8 col-sm-12">
                                    <input type="number" className="user-input w-100" id="telF" placeholder="Numéro de telephone du formateur" name="telF" required onChange={(e) => {
                                        setTel(e.target.value)
                                    }}/>
                                </span>
                            </div>
                            <div id="aa">
                            <button type="button" className="bouton fa-solid fa-plus btn btn-success" name="addTeacher" id="submit" onClick={ submitFormateur }>Ajouter </button>
                           </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 mainFormateur mt-5">
                <input type="text" id="myInput" onKeyUp={filterNames} placeholder="Tréer par nom.."  className="user-input w-25"/><i className="fa-solid fa-search"></i>
                    <table className="table table-hover table-primary table-striped">
                        <thead>
                            <tr>
                                <td>Nom</td>
                                <td>Prenom</td>
                                <td>Masse Horaire</td>
                                <td>Département</td>
                                <td>Email</td>
                                <td>Télephone</td>
                                <td>Supprimer</td>
                                <td>Modifier</td>
                            </tr>
                        </thead>
                        <tbody>
                        {formateursList.map((prof) =>(
                            <tr key={prof.idFormateur}>
                                <td> {prof.nom} </td>
                                <td> {prof.prenom} </td>
                                <td> {prof.massHoraire} </td>
                                <td> {prof.departement} </td>
                                <td> {prof.email} </td>
                                <td> {prof.tel} </td>
                                <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteFormateur(prof.idFormateur)}></i></td>
                                <td><Popup trigger={<button className="fa-solid fa-arrows-rotate btn btn-success text-light" ></button>} >
                                    <UpdateProf idProf={prof.idFormateur} nom={prof.nom} prenom={prof.prenom} mh={prof.massHoraire} dep={prof.departement} email={prof.email} tel={prof.tel}/>
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

export default Formateurs;