import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import {  Routes, Route } from "react-router-dom";
import Kpi from './pages/Kpi/Kpi';


function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kpi" element={<Kpi />} />
        </Routes>
    </div>
  );
}

export default App;
