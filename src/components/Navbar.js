import "../style.css";
import { Link } from "react-router-dom";

function Navbar(){



    const handleClick = () => {
        document.querySelector(".sidebar").classList.toggle("open");
    }
    
    return (
        <div>
            <div className="sidebar">
                <div className="logo-details">
                <i className></i>
                    <div className="logo_name">OFPPT</div>
                    <i className='fa-solid fa-bars' id="btn" onClick={handleClick}></i>
                </div>
                <ul className="nav-list">

                <li>
                    <Link to="/">
                    <i className='fa-solid fa-home'></i>
                    <span className="links_name">Accueil</span>
                    </Link>
                    <span className="tooltip">Accueil</span>
                </li>
                <li>
                <Link to="/formateurs">
                    <i className='fa-solid fa-chalkboard-teacher' ></i>
                    <span className="links_name">Formateurs</span>
                </Link>
                <span className="tooltip">Formateurs</span>
                </li>
                <li>
                <Link to="/filieres">
                    <i className='fa-solid fa-sitemap' ></i>
                    <span className="links_name">Filiéres</span>
                </Link>
                <span className="tooltip">Filiéres</span>
                </li>
                <li>
                <Link to="/groupes">
                    <i className='fa-solid fa-layer-group' ></i>
                    <span className="links_name">Groupes</span>
                </Link>
                <span className="tooltip">Groupes</span>
                </li>
                <li>
                <Link to="/modules">
                    <i className='fa-solid fa-book-open' ></i>
                    <span className="links_name">Modules</span>
                </Link>
                <span className="tooltip">Modules</span>
                </li>
                <li>
                <Link to="/salles">
                    <i className='fa-solid fa-school' ></i>
                    <span className="links_name">Salles</span>
                </Link>
                <span className="tooltip">Salles</span>
                </li>
                <li>
                <Link to="/setEmploi">
                    <i className='fa-solid fa-clock' ></i>
                    <span className="links_name">Modifer les emplois de temps</span>
                </Link>
                <span className="tooltip">Modifer les emplois de temps</span>
                </li>
                <li>
                <Link to="/getEmploi">
                    <i className='fa-solid fa-calendar-alt' ></i>
                    <span className="links_name">Voir les emplois de temps</span>
                </Link>
                <span className="tooltip">Voir les emplois de temps</span>
                </li>
                
                </ul>
            </div>
            <section className="home-section">
                <div className="text">OFPPT</div>
            </section>
            
        </div>
    )
}
export default Navbar;