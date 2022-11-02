import {useState , useEffect} from "react";
import Axios from "axios";



function Salles(){
    
    const [ codeSalle , setCodeSalle ] = useState('');
    const [ typeSalle , setTypeSalle ] = useState('');
    const [ infoSallesList , setInfoSallesList ] = useState([]);
    const [ normalSallesList , setNormalSallesList] = useState([]);
    const [ atelierList , SetAtelierList] = useState([]);

    const submitSalle = () => {
        let codeS = document.getElementById('codeS').value
        let typeS = document.getElementById('typeS').value
        if (codeS === "" || typeS === "default" ) {
            document.getElementById('message').setAttribute('class','d-block alert alert-danger')
            document.getElementById('message').innerHTML = 'tous les champs sont obligatoire !!'
            return false;
        }else{
            Axios.post("http://localhost:3001/api/insert/salle",{
                codeSalle: codeSalle,
                typeSalle: typeSalle
                
            })
            if(typeSalle = "atelier"){
                SetAtelierList([...atelierList,{codeSalle: codeSalle,
                    typeSalle: typeSalle}])
            }else{
                setInfoSallesList([...infoSallesList,{codeSalle: codeSalle,
                    typeSalle: typeSalle}])
                setNormalSallesList([...normalSallesList,{codeSalle: codeSalle,
                    typeSalle: typeSalle}])
            }
            setTimeout(()=>{
                document.getElementById('message').innerHTML = ''
                document.getElementById('message').setAttribute('class','d-none')
            },3000)
            document.getElementById('message').setAttribute('class','d-block alert alert-success')
            document.getElementById('message').innerHTML = 'Les données sont enregistré'
        }
       
        
    }

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/infoSalles",{
        }).then((response)=> {
            setInfoSallesList(response.data)
        })
    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/normalSalles",{
        }).then((response)=> {
            setNormalSallesList(response.data)
        })
    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/select/atelier",{
        }).then((response)=> {
            SetAtelierList(response.data)
        })
    },[])
 
    const deleteSalle = (codeSalle) => {
        Axios.delete(`http://localhost:3001/api/delete/salle/${codeSalle}`)
        
        
    }


    return(
        <div  className="container" id="content-add-salle">
            <div className="row">
                <div className="col-sm-8 col-md-10 col-lg-12 ">
                    <div className="mt-5 wrapper">
                        <center><span id="message" className="d-none"></span></center><br/>
                        <h1 className="title">Ajouter Salle</h1>
                        <form method="POST" id="salleForm" className="container">
                            <span className="row justify-content-center">
                                <span className=" col-xl-5 col-lg-5 col-md-8 col-lg-10">
                                    <input type="text" className="user-input w-75" id="codeS" placeholder="Code de la salle ..." name="codeS" onChange = {(e) => {
                                        setCodeSalle(e.target.value)
                                    }}/>
                                </span>
                            
                                <select className=" user-select w-75  col-xl-5 col-lg-5 col-md-8 col-lg-10" aria-label="Default select example" id="typeS" onChange = {(e) => {
                                        setTypeSalle(e.target.value)
                                    }}>
                                    <option selected disabled value="default">Choisir le type de cette salle :</option>
                                    <option value="normale">Salle Normale</option>
                                    <option value="info">Salle Informatique</option>
                                    <option value="atelier">Atelier</option>
                                </select>
                            </span>

                            <div id="aa">
                                <button type="button" className="bouton fa-solid fa-plus btn btn-success" id="submit" name="ajouterSalle"  onClick={submitSalle}>Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-sm-12 mainSalle mt-5'>
                    <div id="salleList" className='container'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <table className="table table-hover table-primary table-striped">
                                    <thead>
                                        <tr><th colSpan={3} className="text-center">Salles informatiques</th></tr>
                                        <tr>
                                            <th>Code de Salle</th>
                                            <th>Modifier</th>
                                            <th>Supprimer</th>
                                        </tr>  
                                    </thead>
                                    <tbody>
                                        {infoSallesList.map((salle)=>(
                                            <tr key={salle.codeSalle}>
                                                <td>{salle.codeSalle}</td>
                                                <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteSalle(salle.codeSalle)}></i></td>
                                                <td><i className='fa-solid fa-arrows-rotate btn btn-success text-light'></i></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <table className="table table-hover table-primary table-striped">
                                    <thead>
                                        <tr><th colSpan={3} className="text-center">Salles de cours</th></tr>
                                        <tr>
                                            <th>Code de Salle</th>
                                            <th>Modifier</th>
                                            <th>Supprimer</th>
                                        </tr>  
                                    </thead>
                                    <tbody>
                                        {normalSallesList.map((salle)=>(
                                            <tr key={salle.codeSalle}>
                                                <td>{salle.codeSalle}</td>
                                                <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteSalle(salle.codeSalle)}></i></td>
                                                <td><i className='fa-solid fa-arrows-rotate btn btn-success text-light'></i></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                <table className="table table-hover table-primary table-striped">
                                    <thead>
                                        <tr><th colSpan={3} className="text-center">Ateliers</th></tr>
                                        <tr>
                                            <th>Code de Salle</th>
                                            <th>Modifier</th>
                                            <th>Supprimer</th>
                                        </tr>  
                                    </thead>
                                    <tbody>
                                        {atelierList.map((salle)=>(
                                            <tr key={salle.codeSalle}>
                                                <td>{salle.codeSalle}</td>
                                                <td><i className='fa-solid fa-trash-can text-danger btn btn-danger text-light' onClick={() => deleteSalle(salle.codeSalle)}></i></td>
                                                <td><i className='fa-solid fa-arrows-rotate btn btn-success text-light'></i></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Salles;