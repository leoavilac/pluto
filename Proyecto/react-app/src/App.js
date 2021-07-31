// Libraries
import { BrowserRouter, Route } from "react-router-dom";

// Components
import HeadTitle from './components/head-title';
import ReportsList from './components/reports-list';
import SavedData from './components/saved-data';
import Top10Countries from './components/top10-countries';
import TotalByGender from './components/total-by-gender';
import TotalByAge from './components/total-by-age';


function App() {
    // Variable declaration

    return (
        <BrowserRouter>
            <Route path='/' exact render={( props ) => (
                <div className="container">
                    <HeadTitle />
                    <ReportsList />
                </div>
            )} />

            <Route path='/datos_almacenados' component={ SavedData }/>
            <Route path='/top10_paises' component={ Top10Countries }/>
            <Route path='/total_por_genero' component={ TotalByGender }/>
            <Route path='/total_por_edad' component={ TotalByAge }/>
        </BrowserRouter>
    );
}

export default App;
