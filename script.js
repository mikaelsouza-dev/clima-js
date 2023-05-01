document.querySelector('.busca').addEventListener('submit', async (e) => {
  e.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    showWarning('Perae, carregando....');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1b9daaa19fc59dff4b49b4d0dae82954&units=metric&lang=pt_br`
    
    let results = await fetch(url);
    let json = await results.json();

    console.log(json)
  }

});

let showWarning = (msg) => {
  document.querySelector('.aviso').innerText = msg;
}