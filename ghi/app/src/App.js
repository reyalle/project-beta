import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
// import SalesPeopleList from './Salespeople.js';
import SalesPeopleForm from './SalespeopleForm.js';


function App(props) {
  // if (props.salespeople === undefined) {
  //   return null;
  // }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="salespeople" element={<SalesPeopleList salespeople={props.salespeople}/>} /> */}
          <Route path="salespeople">
            <Route path="add" element={<SalesPeopleForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
