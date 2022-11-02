import {useState , useEffect} from "react";
import Axios from "axios";


function SallesDispo(){
    const [ chosenDay , setChosenDay ] = useState('');
    const [ chosenPeriod , setChosenPeriod ] = useState();

    const [ dispoSalles , setDispoSalles ] = useState([]);
    const [ filteredDispoSalles , setFilteredDispoSalles ] = useState([]);

    

    const getDispoSalles = () => {
        Axios.get(`http://localhost:3001/api/select/dispoSalle/${[chosenDay,chosenPeriod]}`).then((response)=> {
                setDispoSalles(response.data)
        })
    }


    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 salleDispoDash">
                        <div className='DaysWrapper'>
                            <button className='days btn btn-outline-primary btn-light' onClick={(e) => setChosenDay("lundi")}>Lundi</button>
                            <button className='days btn btn-outline-primary btn-light' onClick={(e) => setChosenDay("mardi")}>Mardi</button>
                            <button className='days btn btn-outline-primary btn-light' onClick={(e) => setChosenDay("mercredi")}>Mercredi</button>
                        </div>
                        <div className='DaysWrapper'>
                            <button className='days btn btn-outline-primary btn-light' onClick={(e) => setChosenDay("jeudi")}>Jeudi</button>
                            <button className='days btn btn-outline-primary btn-light' onClick={(e) => setChosenDay("vendredi")}>Vendredi</button>
                            <button className='days btn btn-outline-primary btn-light' onClick={(e) => setChosenDay("samedi")}>Samedi</button>
                        </div>
                        <div className='DaysWrapper'>
                            <button className='days btn btn-outline-primary btn-dark' onClick={(e) => setChosenPeriod(1)}>08:30 - 10:50</button>
                            <button className='days btn btn-outline-primary btn-dark' onClick={(e) => setChosenPeriod(2)}>11:10 - 13:15</button>
                        </div>
                        <div className='DaysWrapper'>
                            <button className='days btn btn-outline-primary btn-dark' onClick={(e) => setChosenPeriod(3)}>13:30 - 15:50</button>
                            <button className='days btn btn-outline-primary btn-dark' onClick={(e) => setChosenPeriod(4)}>16:10 - 18:30</button>
                        </div>
                        <button className="bouton" onClick={getDispoSalles}>Voir les salles disponible</button>

                </div>
                <div className="col-sm-12 mainSalleDispo">
                    
                        <div className="container-fluid">
                          <div className="row">
                       { dispoSalles.map((ds)=>(
                          
                                    <div className="col-sm-1 "  key={ds.codeSalle}>
                                        <h6>{ds.codeSalle}</h6>
                                        <p>{ds.typeSalle}</p>
                                    </div>
                                
                        ))

                    }
                    </div>
                                
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SallesDispo;