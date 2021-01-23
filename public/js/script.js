console.log("The Client side JS file is linked and is working!");

const getData = (location) =>{
    fetch(`/weather?address=${location}`)
    .then(response =>response.json())
    .then(data => {
        if(data.error) {
            console.log(data.error);
            msg1.textContent = data.error;
        }else{
            console.log(data.name);
            console.log(data.forecast);

            msg1.textContent = data.name;
            line.style.display = 'block';
            msg2.textContent = data.forecast;
        }
    });
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msg1 = document.getElementById("message_1");
const msg2 = document.getElementById("message_2");

const line = document.getElementById("line");

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    msg1.textContent = "Loading...";
    msg2.textContent = "";
    line.style.display = 'none';
    const location = search.value;
    search.value = '';
    getData(location);
});