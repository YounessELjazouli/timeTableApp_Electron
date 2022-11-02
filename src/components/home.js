import '../style.css'

export default function Home(url){
    

    return(

        <div className="container-fluid homeWrapper">
            <div className="row">
                <div className="col-sm-2 col-md-2 col-lg-2">
                    <img src="images/logo.png" alt="logo" className="logoOfppt"/>
                </div>
                <div className="col-sm-7 col-md-7 col-lg-7 mainInterface">
                    <p className="text-center">مركب التكوين المهني تمارة</p>
                    <p className="text-center">COMPLXE DE FORMATION PROFESSIONELLE TEMARA</p>
                    <p className="text-center separer">المعهد المتخصص للتكنولوجيا التطبيقية تمارة</p>
                    <p className="text-center">INSTITUT SPECIALISE DE TECHNOLOGIE APPLIQUEE TEMARA</p>
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3">
                    <img src="images/logo.png" alt="logo" className="logoOfppt"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <ul class="honeycomb">
                        <li class="honeycomb-cell" onClick={ () => {window.location.href = "/formateurs";}}>
                            <img class="honeycomb-cell_img" src="images/formateur.jpg" />
                            <div class="honeycomb-cell_title">Formateurs / Formatrices</div>
                        </li>
                        <li class="honeycomb-cell" onClick={ () => {window.location.href = "/filieres";}}>
                            <img class="honeycomb-cell_img" src="images/filieres.png" />
                            <div class="honeycomb-cell_title">Filiéres</div>
                        </li>
                        <li class="honeycomb-cell" onClick={ () => {window.location.href = "/groupes";}}>
                            <img class="honeycomb-cell_img" src="images/groupes.jpg" />
                            <div class="honeycomb-cell_title">Groupes</div>
                        </li>
                        <li class="honeycomb-cell" onClick={ () => {window.location.href = "/modules";}}>
                            <img class="honeycomb-cell_img" src="images/web.jpg" />
                            <div class="honeycomb-cell_title">Modules</div>
                        </li>
                        <li class="honeycomb-cell" onClick={ () => {window.location.href = "/sallesDisponible";}}>
                            <img class="honeycomb-cell_img" src="images/salle.jpg" />
                            <div class="honeycomb-cell_title">Salles</div>
                        </li>
                        <li class="honeycomb-cell" onClick={ () => {window.location.href = "/getEmploi";}}>
                            <img class="honeycomb-cell_img" src="images/dispoSalle.jpg" />
                            <div class="honeycomb-cell_title">Salles disponible</div>
                        </li>
                        <li class="honeycomb-cell" onClick={ () => {window.location.href = "/setEmploi";}}>
                            <img class="honeycomb-cell_img" src="images/cours.jpg" />
                            <div class="honeycomb-cell_title">Emloi de temps</div>
                        </li>
                        <li class="honeycomb-cell honeycomb_Hidden">
                        </li>
                    </ul>
                </div>

            </div>
        </div>
   
    )
}