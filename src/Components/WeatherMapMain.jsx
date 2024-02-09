// https://api.openweathermap.org/data/2.5/weather?q=London&appid=8530a98cb783c5c18cb14f22eb7238a2


import { Container, Row, Col } from "react-bootstrap"
import italyMap from '../assets/Mappa-Italia-1-1702x2048.jpg'
import Card from 'react-bootstrap/Card'
import  ListGroup  from "react-bootstrap/ListGroup"
import { useEffect, useState } from "react"

const WeatherMain = () =>{

const [weatherItaly, setWeatherItaly] = useState(null)


useEffect(() => {
    const fetchItalyWeather = () => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Italy&appid=8530a98cb783c5c18cb14f22eb7238a2&units=metric')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then(italyWeather => {
                setWeatherItaly(italyWeather);
            })
            .catch(error => {
                console.error('Error receiving data', error);
            });
    };

    fetchItalyWeather();
}, []);
console.log('MeteoArray', weatherItaly)






    return(

    <Container className="bg-dark text-white">
        <h1>Meteo Italia</h1>
        <Row className="justify-content-center">
            <Col className="col-sm-6 col-md-4 col-lg-6 p-0">
                <img width={400} src={italyMap} alt="mappa italia" className="img-fluid img-thumbnail"/>

            </Col>
         <Col>
         {weatherItaly &&(
         <Card>
        <Card.Title>Previsioni medie Oggi</Card.Title>
         <Card.Img id="img-meteo" variant="top" src={weatherItaly && `http://openweathermap.org/img/wn/${weatherItaly.weather[0].icon}.png`} />
      <Card.Body>
    
        <ListGroup variant="flush">
      <ListGroup.Item>Temperatura minima: ℃ {weatherItaly.main.temp_min} </ListGroup.Item>
      <ListGroup.Item>Temperatura massima: ℃ {weatherItaly.main.temp_max} </ListGroup.Item>
      <ListGroup.Item>Umidità: {weatherItaly.main.humidity}%</ListGroup.Item>
      
    </ListGroup>
       
   
      </Card.Body>
    </Card>
    )}
         </Col>
        </Row>
    </Container>
    )
}

export default WeatherMain