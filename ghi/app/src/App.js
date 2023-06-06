import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
// import Salespeople from './Salespeople.js';
import SalesPeopleForm from './SalespeopleForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="salespeople" element={<Salespeople salespeople={props.salespeople}/>} /> */}
          <Route path="salespeople">
            <Route path="add" element={<SalesPeopleForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
