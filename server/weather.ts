import fetch from 'node-fetch';

const { OPENWEATHER_API_KEY } = process.env;

export default async function getWeatherInfo(city: string) {
  try {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`);
    const data: any = res.json();
    console.log(data);
    const kelvin = data.main.temp;
    const celsius = Math.round(kelvin - 273.15);
    return celsius;

  } catch (err) {
    console.log(err);
    Promise.reject(err);
  }
}
