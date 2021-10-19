import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import WeatherPage from "./WeatherPage";

export default function LoadingPage() {

    const [data, setData] = useState([]);
    const [done, setDone] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            const apiKey = process.env.REACT_APP_API_KEY;
            fetch(`https://api.openweathermap.org/data/2.5/forecast?id=3143244&appid=${apiKey}`)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                setData(data);
                setDone(true);
            })
            .catch((error) => {
                console.log(error);
            });
        }, 2000);
    }, []);

    return(
        <>
            {!done ? (
                <>
                    <h1>Fetching weather data for Oslo, Norway</h1>
                    <p>*elevator music*</p>
                    <ReactLoading type="spokes" color="#FFFF" height={100} width={50}/>
                </>
            ) : (
                <WeatherPage forecast = {data}/>
            )}
        </>
    );
}
