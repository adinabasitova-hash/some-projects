const input = document.createElement('input');
input.placeholder = 'Enter the city';
input.classList.add('input')

const dateF = document.createElement('input');
dateF.type = 'date';
dateF.classList.add('date')

const result = document.createElement('div');
result.classList.add('result');

const dateS = document.createElement('input');
dateS.type = 'date';
dateS.classList.add('date')


const sBtn = document.createElement('button');
sBtn.textContent = 'Get weather'

const inner = document.createElement('div')
inner.classList.add('inner')


  /*async function getWeather(location, date1, date2) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/${date1}/${date2}?key=2JECE2S65LF84BESKVZAF9EE7`);
    
    if(!response.ok){
      throw new Error(await response.text());
    }
      const data = await response.json();
  console.log(data);
  return data;
}
  */

async function getWeather(location, date1, date2) {
  const response = await fetch('./mock.json');
  return response.json();
}
   
const content = document.querySelector('.content');
inner.append(input, sBtn, dateF, dateS)

function renderWeather(data){
  result.innerText = '';
  result.classList.add('result')

  const title = document.createElement('h2');
  title.textContent = data.resolvedAddress
  title.classList.add('title')
  result.appendChild(title)

  data.days.forEach((day)=>{
    const card = document.createElement('div');
    card.classList.add('card')

   const dies = document.createElement('h4');
const date = new Date(`${day.datetime}T00:00:00`);

dies.textContent = date.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
});
dies.classList.add('dies');

    const grads = document.createElement('h4')
    grads.textContent = `${day.temp}F`
    grads.classList.add('grads')

    const max  = document.createElement("h4")
    max.textContent = `${day.tempmax}`
    max.classList.add('max')

    const min  = document.createElement("h4")
    min.textContent = `${day.tempmin}`
    min.classList.add('min')

    card.append(dies, grads, max, min)
    result.appendChild(card)
    
  });
}

sBtn.addEventListener('click', async () => {
  const location = input.value.trim();
  const date1 = dateF.value;
  const date2 = dateS.value;

  if (!location || !date1 || !date2) {
    result.textContent = 'Fill in the city and both dates';
    return;
  }

  try {
    const data = await getWeather(location, date1, date2);
    renderWeather(data);
  } catch (err) {
    result.textContent = 'Could not load weather';
    console.error(err);
  }
});

inner.append(input, dateF, dateS, sBtn, result);
content.appendChild(inner)