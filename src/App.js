import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import {  Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
    </div>
  );
}

export default App;
