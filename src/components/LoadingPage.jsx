import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import WeatherPage from "./WeatherPage";
import './LoadingPage.css';

export default function LoadingPage() {

    const [dailyData, setDailyData] = useState({});
    const [forecastData, setForecastData] = useState({});
    const [done, setDone] = useState(undefined);
    var [units, setUnits] = useState(0);
    const myArray = ['standard', 'imperial', 'metric'];

    console.log(units);

    useEffect(() => {
        // Make loading screen visible for 2 sec
        setTimeout(() => {
            const apiKey = process.env.REACT_APP_API_KEY;
            console.log(units);
            Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/forecast?id=3143244&appid=${apiKey}&units=${myArray[units]}`),
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=59.912731&lon=10.74609&appid=${apiKey}&exclude=current,minutely,hourly,alerts&units=${myArray[units]}`)
                ]).then((responses) => {
                    return Promise.all(responses.map(function (response) {
                        return response.json();
                    }));
                }).then((data) => {
                    setForecastData(data[0]); // Variable for forecast API response
                    setDailyData(data[1]); // Variable for onecall API response
                    setDone(true); // State variable, determines when to show loading page
                }).catch((error) => {
                    console.log(error);
                });
        }, 2000);
    }, [units]);

    return(
        <>
            {!done ? (
                // Display loading page when not done fetching data
                <div className="Load-page">
                    <div className="Load-text">
                        <h1>Fetching weather data for Oslo, Norway</h1>
                        <p>*elevator music*</p>
                        <ReactLoading type="spokes" color="#F4D772" height={100} width={50}/>
                    </div>
                </div>
            ) : (
                <div>
                    // Display weather page when done fetching data
                    // Send API responses as props
                    <WeatherPage forecast = {forecastData} daily = {dailyData}/>
                    <button onClick={() => {
                            units += 1;
                            if(units === 3) {
                                units = 0;
                            }
                            setUnits(units);
                        }} type="button" class="btn btn-primary btn-sm">Switch Units</button>
                </div>
            )}
        </>
    );
}
