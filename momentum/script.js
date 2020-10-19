"use strict";

(function(){
  const elmTime = document.querySelector('.time');
  const elmGreet = document.querySelector('.greeting')
  const elmName = document.querySelector('.name');
  const elmFocus = document.querySelector('.focus');

  const utils = {

    _arrWeekDays:['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    _arrMonth:['Январь', 'Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],

    getToday(){
      return new Date();
    },
    getHour(){
      return this._addZero(this.getToday().getHours());
    },
    getMin(){
      return this._addZero(this.getToday().getMinutes());
    },
    getSec(){
      return this._addZero(this.getToday().getSeconds());
    },
    getWeekDay(){
      return this._arrWeekDays[this.getToday().getDay()];
    },
    getMonthDay(){
      return `${this.getToday().getDate()} ${this._arrMonth[this.getToday().getMonth()]}`;
    },
    _addZero(n) {
      return (parseInt(n, 10) < 10 ? '0' : '') + n;
    },
    showTime() {
      let m =  `${this.getWeekDay()}, ${this.getMonthDay()} <br>
      ${this.getHour()}<span>:</span>${this.getMin()}<span>:</span>${this.getSec()}`;

      elmTime.innerHTML = m;
      setTimeout(this.showTime.bind(this), 1000);
    },

    setBgGreet(){
      if (this.getHour() <= 6) {
        document.body.style.backgroundImage = "url('./assets/images/night/01.jpg')";
        elmGreet.textContent = 'Good Night, ';
      } else if (this.getHour() <= 12) {
        document.body.style.backgroundImage = "url('./assets/images/morning/01.jpg')";
        elmGreet.textContent = 'Good Morning, ';
      } else if (this.getHour() <= 18) {
        document.body.style.backgroundImage = "url('./assets/images/day/01.jpg')";
        elmGreet.textContent = 'Good Day, ';
      } else {
        document.body.style.backgroundImage = "url('./assets/images/evening/01.jpg')";
        elmGreet.textContent = 'Good Evening, ';
       }
    },

    getName() {
      if (localStorage.getItem('name') === null) {
        elmName.textContent = '[Enter Name]';
      } else {
        elmName.textContent = localStorage.getItem('name');
      }
    },
    setName(e) {
      if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
          localStorage.setItem('name', e.target.innerText);
          elmName.blur();
        }
      } else {
        localStorage.setItem('name', e.target.innerText);
      }
    },

    getFocus() {
      if (localStorage.getItem('focus') === null) {
        elmFocus.textContent = '[Enter Focus]';
      } else {
        elmFocus.textContent = localStorage.getItem('focus');
      }
    },
    setFocus(e) {
      if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
          localStorage.setItem('focus', e.target.innerText);
          elmFocus.blur();
        }
      } else {
        localStorage.setItem('focus', e.target.innerText);
      }
    },
  }

  utils.getHour.bind(utils);

  elmName.addEventListener('keypress', utils.setName);
  elmName.addEventListener('blur', utils.setName);

  elmFocus.addEventListener('keypress', utils.setFocus);
  elmFocus.addEventListener('blur', utils.setFocus);

  utils.showTime();
  utils.setBgGreet();
  utils.getName();
  utils.getFocus();

})();

(function(){
  const blockquote = document.querySelector('blockquote');
  const figcaption = document.querySelector('figcaption');
  const elBtn = document.querySelector('.quote-btn');

  async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      blockquote.textContent = data.quoteText;
      figcaption.textContent = data.quoteAuthor;
    } catch(e) {
      console.log(e);
    }
  }

  document.addEventListener('DOMContentLoaded', getQuote);
  elBtn.addEventListener('click', getQuote);
})();

(function(){

  async function getWeather() {
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const weatherWind = document.querySelector('.weather-wind');
    const weatherHumidity = document.querySelector('.weather-humidity');


    const appid='f04eaf6702e5440e9b4dc5e2b3a5a2cd';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=${appid}&units=metric`;
    //console.log(url);

    try{
      const res = await fetch(url);
      const data = await res.json();

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);

      temperature.textContent = `${data.main.temp}°C (ощущается как ${data.main.feels_like})°C`;
      weatherDescription.textContent = `${data.weather[0].description}`;
      weatherHumidity.textContent = `влажность:${data.main.humidity}%`;
      weatherWind.textContent  = `ветер:${data.wind.speed}м\с`;

    }catch(e){
      console.log(e);
      alert('Не удалось получить прогноз погоды');
    }
  }

  function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }

  const city = document.querySelector('.city');
  document.addEventListener('DOMContentLoaded', getWeather);
  city.addEventListener('keypress', setCity);

})();

(function(){
  let base = './assets/images/day/';
  const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
  let i = 0;

  function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      body.style.backgroundImage = `url(${src})`;
    };
  }

  function getImage() {
    let hour = new Date().getHours();

    if (hour <= 8) {
      // ночь
      base = './assets/images/night/';

    } else if (hour <= 12) {
      // утро
      base = './assets/images/morning/';

    } else if (hour <= 18) {
      // день
      base = './assets/images/day/';

    } else {
      // вечер
      base = './assets/images/evening/';
    }

    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;

    console.log('getImage-по кнопке',imageSrc);
  }

  const btn = document.querySelector('.img-btn');
  btn.addEventListener('click', getImage);

})();

(function(){
  let base = './assets/images/day/';
  const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];


  let i = 0;

  function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      body.style.backgroundImage = `url(${src})`;
    };
  }

  function getImage() {
    let hour = new Date().getHours();

    if (hour <= 8) {
      // ночь
      base = './assets/images/night/';

    } else if (hour <= 12) {
      // утро
      base = './assets/images/morning/';

    } else if (hour <= 18) {
      // день
      base = './assets/images/day/';

    } else {
      // вечер
      base = './assets/images/evening/';
    }

    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;

    console.log('getImage-каждый час',imageSrc);

  }

  setInterval(getImage, 1000*60*60);
  //setInterval(getImage, 1000*60); //для проверки


})();