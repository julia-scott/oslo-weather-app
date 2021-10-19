import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import WeatherPage from "./WeatherPage";
import './LoadingPage.css';

export default function LoadingPage() {

    const [dailyData, setDailyData] = useState({});
    const [forecastData, setForecastData] = useState({});
    const [done, setDone] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            const apiKey = process.env.REACT_APP_API_KEY;

            Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/forecast?id=3143244&appid=${apiKey}&units=metric`),
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=59.912731&lon=10.74609&appid=${apiKey}&exclude=current,minutely,hourly,alerts&units=metric`)
                ]).then((responses) => {
                    return Promise.all(responses.map(function (response) {
                        return response.json();
                    }));
                }).then((data) => {
                    setForecastData(data[0]);
                    setDailyData(data[1]);
                    setDone(true);
                }).catch((error) => {
                    console.log(error);
                });
        }, 2000);
    }, []);

    return(
        <>
            {!done ? (
                <div className="Load-page">
                    <div className="Load-text">
                        <h1>Fetching weather data for Oslo, Norway</h1>
                        <p>*elevator music*</p>
                        <ReactLoading type="spokes" color="#F4D772" height={100} width={50}/>
                    </div>
                </div>
            ) : (
                <WeatherPage forecast = {forecastData} daily = {dailyData}/>
            )}
        </>
    );
}
