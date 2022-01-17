import React, { useState } from "react";
import logo from './../images/app_icon.png';
import './WeatherPage.css';
import { Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

export default function WeatherPage(props) {
    const dates = getDates(); // Returns list of dates of today and next 4 days
    const [hourlyDay, setHourlyDay] = useState([]); // Determines what day to display hourly forecast
    const responsive = { // Display settings for react-multi-carousel
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
                    {
                        props.daily.daily.map(e => {
                            return (
                                <div>
                                    <Card onClick={() => {setHourlyDay(e.dt)}}  border="dark" style={{ width: '18rem' }} className="text-center">
                                        <Card.Header>{e.dt}</Card.Header>
                                        <Card.Body>
                                            <img src={`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt="weather"/>
                                            <Card.Title>
                                                {Math.round(e.temp.day)}&deg;
                                            </Card.Title>
                                        </Card.Body>
                                        <Card.Footer className="text-muted">{e.weather[0].description}</Card.Footer>
                                    </Card>
                                </div>
                            );
                        })
                    }
                    <div>
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
    var startDate = new Date(); // Today's date
    var nextDate = new Date(startDate);

    // Get 4 dates past today
    for (var i = 1; i < 6; i++) {
        dates.push(nextDate);
        nextDate = new Date(startDate);
        startDate = nextDate.setDate(nextDate.getDate() + 1);
    }
    dates = dates.map(formatDate) // Format: Tue, Oct 19, 2021
    return (dates);
}

function formatDate(date) {
    const newDate = date.toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        year: 'numeric',
        month: 'short',
        timeZone: 'CET'
    });
    return (newDate);
}

function TableData(props) {
    var date = new Date(props.day); // Selected date
    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(); // Format: 2021-10-19

    const newArray = props.myArray.filter(e => {
        // Filter array to include only the selected date
        return e.dt_txt.includes(date);
    }).map(e => {
        // Return only the hour, icon, max and min temps
        return { hour: e.dt_txt.split(" ")[1], icon: e.weather[0].icon, max: Math.round(e.main.temp_max), min: Math.round(e.main.temp_min) };
    });

    // Create table html
    var myTable = "<thead><tr>"; // Header row
    newArray.forEach(e => myTable += `<th>${e.hour}</th>`); // Hours
    myTable += "</tr></thead><tbody><tr>"; // Body rows
    newArray.forEach(e => myTable += `<td><img src=https://openweathermap.org/img/wn/${e.icon}.png alt="weather"/><p><b>${e.max}&deg;C</b></p><p>${e.min}&deg;C</p></td>`); // Icon, max, min
    myTable += "</tr></tbody>"; // Close tags

    return (
        // Return table with set inner html
        <div>
            <h4 className="table-head">{props.day}</h4>
            <table dangerouslySetInnerHTML={{ __html: myTable }} className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%"></table>
        </div>
    );
}
