import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './NavMenu';
import ItemDetail from './ItemDetail';
import AdminPanel from './AdminPanel';
import '../bootstrap5/css/bootstrap.css';
import '../bootstrap5/css/bootstrap.min.css';
import '../bootstrap5/js/bootstrap.min.js';
import './index.css';

function App() {
    return (
        <Router>
            <NavMenu />
            <Routes>
                <Route path='/' element={<h1>Welcome to SCP CRUD Application</h1>} />
                <Route path='/item/:id' element={<ItemDetail />} />
                <Route path='/admin' element={<AdminPanel />} />
                <Route path="/item/:id" render={() => {setIsSubPage(true); return <SubPage />; }} />
            </Routes>
        </Router>
    );
}

export default App;