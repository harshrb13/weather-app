const searchBtn = document.getElementById('searchBtn')
const serachBar = document.getElementById('serachBar')
const timeZone = document.getElementById('timeZone')
const cityName = document.getElementById('cityName')
const tempreture = document.getElementById('tempreture')
const tempStatus = document.getElementById('tempStatus')

const getDate = () => {
    let timeZone = new Date;
    let timePeriod = 'AM'

    let hours = timeZone.getHours()
    if (hours > 11) {
        timePeriod = 'PM'
        if (hours > 12) {
            hours = hours - 12;
            hours = '0' + hours;
        }
    }

    let minutes = timeZone.getMinutes()
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    //Mange day in a week
    const Weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let day = Weekday[timeZone.getDay()];


    //Mange month in a year
    const yearMonth = ['Jan', 'Feb', 'Mar', 'Apr', "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let Monthn = yearMonth[timeZone.getMonth()]

    //Get current date
    const currentDate = timeZone.getDate();

    //Get current year
    const year = timeZone.getFullYear();


    return `${hours}:${minutes} ${timePeriod} , ${day} | ${Monthn} ${currentDate} , ${year}`

}

setInterval(() => {
    timeZone.innerHTML = getDate()
}, 100)

const getInfo = (event) => {
    event.preventDefault();
    if (serachBar.value === '') {
        cityName.innerHTML = `Please enter city`;
        tempreture.innerHTML = '';
        tempStatus.innerHTML = '';
    }
    else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${serachBar.value}&appid=abc1ce70caa4e6d464a92f438b2fc755`).then(response => {
            if (response.status == 404) {
                throw Error('data not found')
            }
            return response.json()
        }).then(data => {
            let arrData = [data]
            // console.log(data)
            cityName.innerHTML = `${arrData[0].name},${arrData[0].sys.country}`

            tempreture.innerHTML = `${arrData[0].main.temp}<sup>o</sup>F`

            if (arrData[0].weather[0].main == 'Clouds') {
                tempStatus.innerHTML = '<i class="fa-solid fa-cloud temp-status" style="color: #ffffff;"></i>'
            }
            else if (arrData[0].weather[0].main == 'Smoke') {
                tempStatus.innerHTML = '<i class="fa-solid fa-smog temp-status" style="color: #ffffff;"></i>'
            }
            else if (arrData[0].weather[0].main == 'Haze') {
                tempStatus.innerHTML = '<i class="fa-solid fa-cloud-sun temp-status" style="color: #ffffff;"></i>'
            }
            else if (arrData[0].weather[0].main == 'Clear') {
                tempStatus.innerHTML = '<i class="fa-solid fa-sun temp-status" style="color: #ffea00;"></i>'
            }
        }).catch(error => {
            cityName.innerHTML = error;
            tempreture.innerHTML = '';
            tempStatus.innerHTML = '';
        })
    }
    serachBar.value = '';
}
    searchBtn.addEventListener('click', getInfo)
