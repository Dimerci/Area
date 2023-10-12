"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postWeather = void 0;
;
function postWeather(req, res) {
    req.body.city = "Londres";
    try {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + req.body.city + "&appid=3344b25c81b169bdfe06f4a1888e8f4b&units=metric&lang=fr", {
            "method": "GET",
        })
            .then(response => {
            console.log(response);
        })
            .catch(err => {
            console.log(err);
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.postWeather = postWeather;
