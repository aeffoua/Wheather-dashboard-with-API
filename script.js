var APIKey= 'c317fe562c65e62a24be96830a417e95';
var searchBtn= document.getElementById("searchBtn");
function searchCity(){
    console.log("test");
var nameOfCity= document.getElementById('form1').value
console.log(nameOfCity);
fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + nameOfCity + '&limit=10&appid=c317fe562c65e62a24be96830a417e95')
.then((response) => response.json())
.then((data) =>{
    console.log(data)
// fetch('api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=c317fe562c65e62a24be96830a417e95')
});

}
searchBtn.addEventListener("click", searchCity);

