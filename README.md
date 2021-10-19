# oslo-weather-app
Interview task for Cognite.

The WeatherApp contains two screens:

* Loading screen
* Weather info screen

**Loading Screen**

The loading screen is the first screen that is shown when the app is being opened. Also this screen should be shown when fetching the weather data.

You can use OpenWeatherMap to obtain weather information. 

You can and get ApiKey from following link: https://home.openweathermap.org/users/sign_up 

**Weather Screen**

This screen should show the weather forecast for Oslo.

Example request: https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

Docs: https://openweathermap.org/forecast5 

This screen should contain:
- Should fetch the weather forecast for next following 5 days and show the loading screen while fetching
- Display the temperature for up to 3 days
- Left and Right arrows to get the temperature for next/prev day
- Below the arrows, a maximum of 3 weather cards should be visible. Each card should display the weather forecast for that day and the average temperature
- Below the weather cards, the hourly forecast should be shown for the selected day. You should show the hour, weather, min and max temperatures.

Non-goals
* Unit tests
* Responsive Interface
