
const consts = function () {

    let getToday = function () {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        return year + "-" + month + "-" + day;
    }

    return{
        invisible: "d-none",
        api_key: "fTmf3bnTh3b0mRfIVK1Q1zQS7bF6xIqYalgNrFDl",
        username: ()=> document.getElementById("user").value.trim(),
        today: getToday,
    }
}()


document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("start-date").value = consts.today();
    document.getElementById("end-date").value = consts.today();

    document.getElementById("login-form").addEventListener("submit",(event)=>{
        event.preventDefault();
        document.getElementById("loginpanel").classList.add(consts.invisible)
        document.getElementById("imagepannel").classList.remove(consts.invisible)
    });
    getImage();
    document.getElementById("start-date").addEventListener("selectionchange",getImage);
    document.getElementById("end-date").addEventListener("change",getImage );
});

function getImage()
{
    let start_date = document.getElementById("start-date").value;
    let end_date = document.getElementById("end-date").value;
    let base_url = `https://api.nasa.gov/planetary/apod`;

    console.log(end_date);
    let params = {
        api_key : consts.api_key,
        end_date: end_date,
        start_date : start_date
    }
    let query = Object.entries(params)
        .map(([key, value]) =>`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    let url = `${base_url}?` + query ;
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
        const image = document.getElementById("nasa_picture")
        image.src = data[0].hdurl;
        console.log(data);})
        .catch(function(error) {
            console.log(error); // we should display the error to the user
        });
}
/*
function getData(event) {
    event.preventDefault(); // because it is a form
    let params = {
        num1: document.getElementById("num1").value.trim(),
        num2: document.getElementById("num2").value.trim(),
        action: document.getElementById("action-select").value
    }
    let query = Object.entries(params)
        .map(([key, value]) =>`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    let url = `${event.target.action}?` + query ;
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
        document.getElementById("result").innerHTML = data.result;
    })
        .catch(function(error) {
            console.log(error); // we should display the error to the user
        });
}*/
