"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const { OPENWEATHER_API_KEY } = process.env;
async function getWeatherInfo(city) {
    try {
        const res = await node_fetch_1.default(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`);
        const data = res.json();
        console.log(data);
        const kelvin = data.main.temp;
        const celsius = Math.round(kelvin - 273.15);
        return celsius;
    }
    catch (err) {
        console.log(err);
        Promise.reject(err);
    }
}
exports.default = getWeatherInfo;
//# sourceMappingURL=weather.js.map