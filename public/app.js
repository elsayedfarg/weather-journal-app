// For a better load performance
setTimeout(() => {
    document.querySelector("body").style.opacity = '1';
}, 300);

const generate = document.querySelector("#generate");
const country = document.getElementById('country');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const key = "&appid=a9a2c0598720047fa9f01191e0f24ef7&units=metric";
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const city = document.getElementById('city');
const weather = document.getElementById('weather');
const date = document.getElementById('date');
const errorMessage = document.getElementById('message');
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
let d = new Date();
let newDate = d.toDateString();

const getData = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e.message);
    }
};

const projectData = async (data) => {
    try {
        const info = {
            date: newDate,
            temp: Math.round(data.main.temp),
            content: feelings.value,
            city: data.name,
            weather: data.weather[0].description,
            country: data.sys.country,
        };
        return info;
    } catch (e) {
        console.log(e);
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
};

const retrieveData = async (url) => {
    const response = await fetch(url);
    try {
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
};

const updateUI = async (info) => {
    if (!info.message) {
        city.innerHTML = info.city + ", " + info.country;
        weather.innerHTML = info.weather;
        temp.innerHTML = `${info.temp}&#176`;
        content.innerHTML = info.content ? info.content : "How are you feeling &#128517;";
        date.innerHTML = info.date;
        errorMessage.innerHTML = "";
        document.querySelector(".weather-info").style.opacity = "1";

        setTimeout(() => {
            document.querySelector(".api-input").style.opacity = "1";
            document.querySelector(".api-input").style.display = "flex";
            document.querySelector(".api-input").scrollIntoView();
        }, 1000);

        if (info.temp < 32) {
            document.querySelector("img").setAttribute("src", "./images/snow.png");
        } else if (info.temp > 80) {
            document.querySelector("img").setAttribute("src", "./images/hot.png");
        } else {
            document.querySelector("img").setAttribute("src", "https://freepngimg.com/thumb/weather/23698-6-weather-transparent-background.png");
        }
    } else {
        document.querySelector(".weather-info").style.opacity = "1";
        setTimeout(() => {
            document.querySelector(".api-input").style.opacity = "0";
            document.querySelector(".api-input").style.display = "none";
            errorMessage.innerHTML = info.message;
        }, 1000);
    }
};

generate.addEventListener("click", (e) => {
    e.preventDefault();

    // Validate ZIP and Country
    if (!zip.value) {
        errorMessage.innerHTML = "Please enter both ZIP code.";
        return;
    }

    const madeURL = `${baseURI}${zip.value},${country.value}${key}`;

    getData(madeURL)
        .then((data) => {
            if (data.cod !== 200) {
                errorMessage.innerHTML = data.message || "Invalid ZIP code or country.";
                // Optional: auto-clear message
                setTimeout(() => errorMessage.innerHTML = "", 4000);
                return;
            }

            projectData(data)
                .then((info) => {
                    postData("/add", info)
                        .then(() => {
                            errorMessage.innerHTML = '';
                            retrieveData("/all")
                                .then((data) => {
                                    updateUI(data);
                                });
                        });
                });
        });
});
