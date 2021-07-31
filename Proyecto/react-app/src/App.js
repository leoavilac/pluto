// Libraries

// Components
import HeadTitle from './components/head-title';
import Component_AllData from "./components/Component_AllData";
import Component_TopTen from './components/Component_TopTen';
import Component_ByGender from './components/Component_ByGender';


function App() {
    // Variable declaration

    return (
        <div className="container">
            <br/>
            <HeadTitle />

            <hr /><br />

            <h3><b>Reporte #1</b></h3>
            <p>Datos almacenados en la base de datos, en MongoDB</p>
            <Component_AllData />

            <br /><hr /><br />
            
            <h3><b>Reporte #2</b></h3>
            <p>Top 10 de países más vacunados</p>
            <Component_TopTen />

            <br /><hr /><br />
            
            <h3><b>Reporte #3</b></h3>
            <p>Generos vacunados por país</p>
            <Component_ByGender />

            <br /><hr /><br />
        </div>
    );
}

export default App;
