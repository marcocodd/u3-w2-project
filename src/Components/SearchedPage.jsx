import { Container, Row, Col } from "react-bootstrap"
import Card from 'react-bootstrap/Card'
import ListGroup from "react-bootstrap/ListGroup"
import { useEffect, useState } from "react"
import italyMap from '../assets/Mappa-Italia-1-1702x2048.jpg'
import { useParams } from "react-router-dom"

const SearchedPage = () => {
    const { wordSearch } = useParams(); 
    const [todayWeather, settodayWeather] = useState(null);
    const [weekWeather, setWeekWeather] = useState([])
    useEffect(() => {
        const fetchItalyWeather = () => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${wordSearch}&appid=8530a98cb783c5c18cb14f22eb7238a2&units=metric`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(response.status);
                    }
                })
                .then(weather => {
                    settodayWeather(weather);
                    
                    //console.log(latitude,longitude)
                    
                })
                .catch(error => {
                    console.error('Error receiving data', error);
                });
        };

        fetchItalyWeather();
       
    }, [wordSearch]);
    console.log('MeteoArray', todayWeather);
    
    useEffect(() => {
        const startDate = new Date(); // Inizializza startDate con la data corrente
        const fetchWeatherForMultipleDays = () => {
            const weeklyWeather = [];
            
            const fetchWeatherForDay = (date) => {
                const dateIso = date.toISOString().split('T')[0];
                return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${wordSearch}&appid=8530a98cb783c5c18cb14f22eb7238a2&units=metric&dt=${dateIso}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch weather data');
                        }
                        return response.json();
                    })
                    .then(data => {
                        weeklyWeather.push(data);
                    })
                    .catch(error => {
                        console.error('Errore ricezione dati', error);
                    });
            };
            
            const fetchPromises = [];
            for (let i = 0; i < 6; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                fetchPromises.push(fetchWeatherForDay(date));
            }
            
            return Promise.all(fetchPromises)
                .then(() => weeklyWeather);
        };
        
        fetchWeatherForMultipleDays()
        .then(weeklyWeather => {
            // Aggiorniamo lo stato solo dopo che tutte le richieste di fetch sono state completate
            setWeekWeather(weeklyWeather);
            console.log('Dati meteo per più giorni:', weeklyWeather);
        })
        .catch(error => {
            console.error('Errore ricezione dati per più giorni:', error);
        });
}, [wordSearch]);



    return (
        <Container fluid className="bg-dark text-white">
            <h1>Meteo {wordSearch}</h1>
            <Row className="justify-content-center">
                <Col className="col-sm-6 col-md-4 col-lg-6 p-0">
                    <img width={400} src={italyMap} alt="mappa italia" className="img-fluid img-thumbnail" />
                </Col>
                <Col>
                    {todayWeather && (
                        <Card>
                            <Card.Title>Previsioni Oggi</Card.Title>
                            <Card.Img id="img-meteo" variant="top" src={todayWeather && `http://openweathermap.org/img/wn/${todayWeather.weather[0].icon}.png`} />
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Temperatura minima: ℃ {todayWeather.main.temp_min} </ListGroup.Item>
                                    <ListGroup.Item>Temperatura massima: ℃ {todayWeather.main.temp_max} </ListGroup.Item>
                                    <ListGroup.Item>Umidità: {todayWeather.main.humidity}%</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
            <Row className="justify-content-center mt-4 g-3">
            {weekWeather.map((dayWeather, index) => (
                <Col key={index} className="col-sm-6 col-md-4 col-lg-3">
                    <Card>
                    <Card.Title>Previsioni per {new Date(dayWeather.dt * 1000).toLocaleDateString()}</Card.Title>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Temperatura minima: ℃ {dayWeather.main.temp_min} </ListGroup.Item>
                                <ListGroup.Item>Temperatura massima: ℃ {dayWeather.main.temp_max} </ListGroup.Item>
                                <ListGroup.Item>Umidità: {dayWeather.main.humidity}%</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        </Container>
    )
}

export default SearchedPage
