import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MeteoNavBar from './Components/MeteoNavBar';
import { Container } from 'react-bootstrap';
import WeatherMain from './Components/WeatherMapMain';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchedPage from "./Components/SearchedPage";


// manca componente per le regioni italiane causa tempo
// con la versione free dell'api non riuscivo comunque ad avere i dati meteo settimanali e ho provato a fare un for di fetch in searchedPage...
function App() {
  const [SearchedInput, setSearchedInput] = useState('')
  const handleSearchedWord = (word) => {
   setSearchedInput(word);
  };
  
  return (
   <div data-bs-theme="dark" className="App bg-dark h-100">
    <BrowserRouter>
     <Container>
      <MeteoNavBar word={handleSearchedWord} />
      <Routes>
       <Route path="/" element={<WeatherMain />} />
       <Route path="/search/:wordSearch" element={<SearchedPage />} />
      </Routes>
     </Container>
    </BrowserRouter>
   </div>
  );
}

export default App;

//https://api.openweathermap.org/data/2.5/weather?q=London&appid=8530a98cb783c5c18cb14f22eb7238a2