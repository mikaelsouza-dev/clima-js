document.querySelector('.busca').addEventListener('submit', async (e) => {
  e.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    showWarning('Perae, carregando....');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1b9daaa19fc59dff4b49b4d0dae82954&units=metric&lang=pt_br`
    
    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      })
    } else {
      showWarning(`Localização não encontrada! Error ${json.cod}`);
      document.querySelector('.resultado').style.display = 'none';
    }
  }

});

let showWarning = (msg) => {
  document.querySelector('.aviso').innerText = msg;
}

let showInfo = (json) => {
  showWarning('');

  document.querySelector('.resultado').style.display = 'block';

  document.querySelector('.titulo').innerText = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;

  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`

}