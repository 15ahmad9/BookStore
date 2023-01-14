const options = {
    method: 'GET',
    url: 'https://flixster.p.rapidapi.com/search',
    params: {query: 'spiderman', zipCode: '90002', radius: '50'},
    headers: {
      'X-RapidAPI-Key': 'eedf40bf42mshf6bede1b85e680ap1a2949jsn03f06b2faefc',
      'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
    }
  };

async function getWeatherData(){

    let res = await fetch('https://flixster.p.rapidapi.com/search?query=batman',options);
    let data = await res.json();
    console.log(data);
    showWeatherData(data);
}

getWeatherData();

function showWeatherData(data){

    let tableData1 = `<tr>


<th style = "text-align: center;">name</th>
<th style = "text-align: center; ">img</th>
<th style = "text-align: center; ">Rating</th>

</tr>`;


for(let i = 0; i<50; i++){

        tableData1+= `<tr>

    <td>${data.data.search.movies[i].name}</td>
    <td><img src ="${data.data.search.movies[i].posterImage.url}" width="150px"/></td>
    <td>${data.data.search.movies[i].userRating.dtlLikedScore}</td>

    
    </tr>`;

    document.getElementById("tab12").innerHTML = tableData1;

}

}