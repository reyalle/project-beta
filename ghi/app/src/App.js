import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from './SalespeopleList.js';
import SalesPeopleForm from './SalespeopleForm.js';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';


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
          <Route path="salespeople" element={<SalesPeopleList salespeople={props.salespeople}/>} />
          <Route path="salespeople">
            <Route path="add" element={<SalesPeopleForm />} />
          </Route>
          <Route path="customers" element={<CustomerList customer={props.customer}/>} />
          <Route path="customers">
            <Route path="add" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
