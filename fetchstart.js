
const current_temp_fields = ['temp_c','wind_kph','wind_dir','pressure_mb','humidity','cloud']
const forecast_data_field = ['sunrise','sunset','moonrise','moonset','Is_Moon_Up','Is_Sun_Up']
const input_value = document.querySelector('.submit')
const button = document.querySelector('.button')
const response_html = document.querySelector('.response')


button.addEventListener('click',function(event){
    let my_value = input_value.value  
    input_value.value = ''
    weather_update(my_value)
})


async function weather_update(city_name){
    const country = `india/${city_name}`;
    const api_key = '65dcc49227ec442487255210241102';
    const myapi = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${country}&aqi=no`)
    const my_data = await myapi.json()
    const new_arry = [];
    const forecast_data_store = [];
    

    let current_temp_data = my_data.current 
   
    for(let i in current_temp_data){
        if(i!='condition'){
            new_arry.push(current_temp_data[i])
        }
    }
  
    let forecast_data = my_data.forecast.forecastday[0].astro
    for(let x in forecast_data){
        if(x!='moon_phase' && x!='moon_illumination'){
            forecast_data_store.push(forecast_data[x])
        }
    }
    console.log(my_data);

    response_html.innerHTML = `
    <h2>${city_name} Weather details are </h2>
    <table class = 'first'>
    <tr>
      <th>${current_temp_fields[0]}</th>
      <th>${current_temp_fields[1]}</th>
      <th>${current_temp_fields[2]}</th>
      <th>${current_temp_fields[3]}</th>
      <th>${current_temp_fields[4]}</th>
      <th>${current_temp_fields[5]}</th>
    </tr>
    <tr>
      <td>${new_arry[0]}</td>
      <td>${new_arry[1]}</td>
      <td>${new_arry[2]}</td>
      <td>${new_arry[3]}</td>
      <td>${new_arry[4]}</td>
      <td>${new_arry[5]}</td>
    </tr>
  </table> 
  <table class='Second'>
  <tr>
  <th>${forecast_data_field[0]}</th>
  <th>${forecast_data_field[1]}</th>
  <th>${forecast_data_field[2]}</th>
  <th>${forecast_data_field[3]}</th>
  <th>${forecast_data_field[4]}</th>
  <th>${forecast_data_field[5]}</th>
</tr>
<tr>
  <td>${forecast_data_store[0]}</td>
  <td>${forecast_data_store[1]}</td>
  <td>${forecast_data_store[2]}</td>
  <td>${forecast_data_store[3]}</td>
  <td>${forecast_data_store[4]}</td>
  <td>${forecast_data_store[5]}</td>
</tr>
</table>` 
}

