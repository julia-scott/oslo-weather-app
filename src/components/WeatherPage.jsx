import React, { useState } from "react";
import logo from './../images/app_icon.png';
import './WeatherPage.css';
import { Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { forEach } from "async";

export default function WeatherPage(props) {
    const dates = getDates();
    const [hourlyDay, setHourlyDay] = useState([]);
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 3,
          slidesToSlide: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1
        }
    };

    return (
        <>
            <div className="Weather-page">
                <div className="title">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>Oslo, Norway Weather Forecast</h1>
                </div>

                <Carousel 
                    className="card-carousel"
                    responsive={responsive}
                    showDots={false}
                    focusOnSelect={false}>
                    <div >
                        <Card onClick={() => {setHourlyDay(dates[0])}}  border="dark" style={{ width: '18rem' }} className="text-center">
                            <Card.Header>Today</Card.Header>
                            <Card.Body>
                                <img src={`https://openweathermap.org/img/wn/${props.daily.daily[0].weather[0].icon}@2x.png`} alt="weather"/>
                                <Card.Title>
                                    {Math.round(props.daily.daily[0].temp.day)}&deg;C
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer className="text-muted">{props.daily.daily[0].weather[0].description}</Card.Footer>
                        </Card>
                    </div>
                    <div>
                        <Card onClick={() => {setHourlyDay(dates[1])}} border="dark" style={{ width: '18rem' }} className="text-center">
                            <Card.Header>{dates[1]}</Card.Header>
                            <Card.Body>
                                <img src={`https://openweathermap.org/img/wn/${props.daily.daily[1].weather[0].icon}@2x.png`} alt="weather"/>
                                <Card.Title>
                                    {Math.round(props.daily.daily[1].temp.day)}&deg;C
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer className="text-muted">{props.daily.daily[1].weather[0].description}</Card.Footer>
                        </Card>
                    </div>
                    <div>
                        <Card onClick={() => {setHourlyDay(dates[2])}} border="dark" style={{ width: '18rem' }} className="text-center">
                            <Card.Header>{dates[2]}</Card.Header>
                            <Card.Body>
                                <img src={`https://openweathermap.org/img/wn/${props.daily.daily[2].weather[0].icon}@2x.png`} alt="weather"/>
                                <Card.Title>
                                    {Math.round(props.daily.daily[2].temp.day)}&deg;C
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer className="text-muted">{props.daily.daily[2].weather[0].description}</Card.Footer>
                        </Card>
                    </div>
                    <div>
                        <Card onClick={() => {setHourlyDay(dates[3])}} border="dark" style={{ width: '18rem' }} className="text-center">
                            <Card.Header>{dates[3]}</Card.Header>
                            <Card.Body>
                                <img src={`https://openweathermap.org/img/wn/${props.daily.daily[3].weather[0].icon}@2x.png`} alt="weather"/>
                                <Card.Title>
                                    {Math.round(props.daily.daily[3].temp.day)}&deg;C
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer className="text-muted">{props.daily.daily[3].weather[0].description}</Card.Footer>
                        </Card>
                    </div>
                    <div>
                        <Card onClick={() => {setHourlyDay(dates[4])}} border="dark" style={{ width: '18rem' }} className="text-center">
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
                </Carousel>

                <TableData day = {hourlyDay} myArray = {props.forecast.list}/>
                
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
        month: 'short',
        timeZone: 'CET'
    });
    return (newDate);
}

function TableData(props) {
    var date = new Date(props.day);
    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const newArray = props.myArray.filter(e => {
        return e.dt_txt.includes(date);
    }).map(e => {
        return { hour: e.dt_txt.split(" ")[1], icon: e.weather[0].icon, max: Math.round(e.main.temp_max), min: Math.round(e.main.temp_min) };
    });

    var myTable = "<thead><tr>";
    newArray.forEach(e => myTable += `<th>${e.hour}</th>`);
    myTable += "</tr></thead><tbody><tr>";
    newArray.forEach(e => myTable += `<td><img src=https://openweathermap.org/img/wn/${e.icon}.png alt="weather"/><p><b>${e.max}&deg;C</b></p><p>${e.min}&deg;C</p></td>`);
    myTable += "</tr></tbody>";

    return (
        <div>
            <h4 className="table-head">{props.day}</h4>
            <table dangerouslySetInnerHTML={{ __html: myTable }} className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%"></table>
        </div>
    );
}
