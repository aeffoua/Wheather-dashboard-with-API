var APIKey = 'c317fe562c65e62a24be96830a417e95';
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchCity);

getHistory()

function searchCity() {
    var nameOfCity = document.getElementById('form1').value
    console.log(nameOfCity);
    fetchData(nameOfCity)
}

function fetchData(nameOfCity) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + nameOfCity + '&appid=c317fe562c65e62a24be96830a417e95')
        .then((response) => response.json())
        .then((data) => {
            showWeather(data)
            // fetch('api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=c317fe562c65e62a24be96830a417e95')
        });
}

function mainWeather(payload) {
    let template = `
    <div class="border border-secondary p-2 mt-2">
                    <div class="fw-bold fs-3 text-left"> ${payload.city} (${payload.date}) <img src="http://openweathermap.org/img/w/${payload.icon}.png"/></div>
                    <div class="mt-2">Temp: ${payload.temp} F</div>
                    <div class="mt-2">Wind: ${payload.wind} MPH</div>
                    <div class="my-2">Humidity: ${payload.humidity} %</div>

                </div>
                `
    return template
}


function showWeather(data) {
    if (data.cod != 200) {
        alert('This City does not exist')
        return
    }
    document.getElementById('mainsection').innerHTML = ''
    document.getElementById('dailybox').innerHTML = ''
    let city = data.city.name
    saveCity(city)
    getHistory(city)
    for (let i = 0; data.list.length > i; i += 8) {
        console.log(data.list[i])
        let payload = {
            city: data.city.name,
            temp: data.list[i].main.temp,
            icon: data.list[i].weather[0].icon,
            wind: data.list[i].wind.speed,
            humidity: data.list[i].main.humidity,
            date: dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')
        }
        if (i == 0) {
            let mainSection = mainWeather(payload)
            document.getElementById('mainsection').innerHTML = mainSection

        }
        let daily = document.createElement('div')
        daily.classList.add('border', 'text-light', 'weather-card')
        daily.innerHTML = dayWeather(payload)

        document.getElementById('dailybox').appendChild(daily)
    }

}


function dayWeather(payload) {
    let template = `
    <div> Date: ${payload.date}</div>
    <div> <img src="http://openweathermap.org/img/w/${payload.icon}.png"/></div>
    <div> Temp: ${payload.temp} F</div>
    <div> Wind: ${payload.wind} MPH</div>
    <div> Humidity: ${payload.humidity} %</div>
  
    `
    return template
}

function saveCity(city) {
    let storagedata = Object.values(window.localStorage.valueOf())
    if (storagedata.includes(city)) {
        return
    }
    let key = window.localStorage.length
    window.localStorage.setItem(key, city)

}


function showHistory(el) {
    let historyDiv = document.getElementById('history')
    let div = document.createElement('div')
    div.classList.add('d-grid', 'mt-3', 'gap-2')
    let button = document.createElement('button')
    button.classList.add('btn', 'form1', 'btn-secondary')
    button.innerHTML = el
    div.appendChild(button)
    button.addEventListener("click", clickHistory);
    historyDiv.appendChild(div)
}


function getHistory() {
    let historyDiv = document.getElementById('history')
    historyDiv.innerHTML = ''
    let history = Object.values(window.localStorage.valueOf())
    for (let el of history) {
        showHistory(el)
    }
}


function clickHistory(e) {
    let nameOfCity = e.target.textContent
    fetchData(nameOfCity)
}

