import Navbar from "./components/Navbar";
import Home from "./components/home";
import { BrowserRouter as Router , Route , Switch} from "react-router-dom";
import Formateurs from "./components/formateur";
import Filiere from "./components/filiere";
import Groupes from "./components/groupe";
import Modules from "./components/module";
import Salles from "./components/salle";
import SetEmlploi from "./components/setEmploi";
import GetEmploi from "./components/getEmploi";

function App(){
    
    
    return(
        <Router>
            <div className="container-fluid">
                <div className="row">
                <nav className="col-md-2 col-sm-2 col-lg-2">
                    <Navbar />
                </nav>
                <div className="col-md-10 col-md-10 col-lg-10 mainScreen">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/formateurs">
                            <Formateurs />
                        </Route>
                        <Route path="/filieres">
                            <Filiere />
                        </Route>
                        <Route path="/groupes">
                            <Groupes />
                        </Route>
                        <Route path="/modules">
                            <Modules />
                        </Route>
                        <Route path="/salles">
                            <Salles />
                        </Route>
                        <Route path="/setEmploi">
                            <SetEmlploi />
                        </Route>
                        <Route path="/getEmploi">
                            <GetEmploi />
                        </Route>
                    </Switch>
                    
                </div>
            </div>  
        </div>
        </Router>

    )
   
};
export default App;