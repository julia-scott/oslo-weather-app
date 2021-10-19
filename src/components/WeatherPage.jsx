import React from "react";
import logo from './../images/app_icon.png';
import './WeatherPage.css';
import { Button, Card, Carousel } from 'react-bootstrap';
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

export default function WeatherPage(props) {
    const dates = getDates();

    return (
        <>
            <div className="Weather-page">
                <div className="title">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>Oslo, Norway Weather Forecast</h1>
                </div>

                <Button variant="outline-dark">
                    <BsChevronLeft />
                    Previous
                </Button>
                <Button variant="outline-dark">
                    Next
                    <BsChevronRight />
                </Button>{' '}

                <Card border="dark" style={{ width: '18rem' }} className="text-center">
                    <Card.Header>Today</Card.Header>
                    <Card.Body>
                        <img src={`https://openweathermap.org/img/wn/${props.daily.daily[0].weather[0].icon}@2x.png`} alt="weather"/>
                        <Card.Title>
                            {Math.round(props.daily.daily[0].temp.day)}&deg;C
                        </Card.Title>
                    </Card.Body>
                    <Card.Footer className="text-muted">{props.daily.daily[0].weather[0].description}</Card.Footer>
                </Card>
                <Card border="dark" style={{ width: '18rem' }} className="text-center">
                    <Card.Header>{dates[1]}</Card.Header>
                    <Card.Body>
                        <img src={`https://openweathermap.org/img/wn/${props.daily.daily[1].weather[0].icon}@2x.png`} alt="weather"/>
                        <Card.Title>
                            {Math.round(props.daily.daily[1].temp.day)}&deg;C
                        </Card.Title>
                    </Card.Body>
                    <Card.Footer className="text-muted">{props.daily.daily[1].weather[0].description}</Card.Footer>
                </Card>
                <Card border="dark" style={{ width: '18rem' }} className="text-center">
                    <Card.Header>{dates[2]}</Card.Header>
                    <Card.Body>
                        <img src={`https://openweathermap.org/img/wn/${props.daily.daily[2].weather[0].icon}@2x.png`} alt="weather"/>
                        <Card.Title>
                            {Math.round(props.daily.daily[2].temp.day)}&deg;C
                        </Card.Title>
                    </Card.Body>
                    <Card.Footer className="text-muted">{props.daily.daily[2].weather[0].description}</Card.Footer>
                </Card>
                <Card border="dark" style={{ width: '18rem' }} className="text-center">
                    <Card.Header>{dates[3]}</Card.Header>
                    <Card.Body>
                        <img src={`https://openweathermap.org/img/wn/${props.daily.daily[3].weather[0].icon}@2x.png`} alt="weather"/>
                        <Card.Title>
                            {Math.round(props.daily.daily[3].temp.day)}&deg;C
                        </Card.Title>
                    </Card.Body>
                    <Card.Footer className="text-muted">{props.daily.daily[3].weather[0].description}</Card.Footer>
                </Card>
                <Card border="dark" style={{ width: '18rem' }} className="text-center">
                    <Card.Header>{dates[4]}</Card.Header>
                    <Card.Body>
                        <img src={`https://openweathermap.org/img/wn/${props.daily.daily[4].weather[0].icon}@2x.png`} alt="weather"/>
                        <Card.Title>
                            {Math.round(props.daily.daily[4].temp.day)}&deg;C
                        </Card.Title>
                    </Card.Body>
                    <Card.Footer className="text-muted">{props.daily.daily[4].weather[0].description}</Card.Footer>
                </Card>
            </div>
        </>
    );
}

function getDates() {
    var dates = [];
    var startDate = new Date();
    var nextDate = new Date(startDate);
    for (var i = 1; i < 6; i++) {
        dates.push(nextDate);
        nextDate = new Date(startDate);
        startDate = nextDate.setDate(nextDate.getDate() + 1);
    }
    dates = dates.map(formatDate)
    return (dates);
}

function formatDate(date) {
    const newDate = date.toLocaleString('en-US', {
        weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
    });
    return (newDate);
}
