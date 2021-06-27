const start_pom = document.getElementById("start_pom");
const save_button = document.getElementById("save_session_button");

let colorSwitchCounter = 1;

let greeting;
const greeting_write = document.getElementById('greeting-write');
let today = new Date();
let hourNow = today.getHours();

if (hourNow > 18 && hourNow <24) {
    greeting = 'Good evening, let us beat those deadlines!';
} 
else if (hourNow > 12 && hourNow <18) {
    greeting = 'Good afternoon';
} 
else if ( hourNow > 0 && hourNow <6) {
    greeting = 'Good morning! Pulling an all-nighter?';
} 
else if (hourNow > 6 && hourNow <12) {
    greeting = 'Good morning, productivity is best in the morning!';
} 
else {
    greeting = 'Welcome';
}    
console.log(hourNow, greeting);
greeting_write.innerHTML='<h1>' + greeting + '</h1>';

// const startingMinutes = 25;
// let time = startingMinutes*60;
const countdownEl = document.getElementById("countdown-timer");

// setInterval(updateCountdown,1000);

// function updateCountdown(){
//     const minutes = Math.floor(time / 60);
//     let seconds = time%60;
//     countdownEl.innerHTML = `${minutes}: ${seconds}`;
//     console.log(`${minutes}: ${seconds}`);
//     time--;
// }


start_pom.addEventListener("click", ()=>{
    console.log("I was clicked", colorSwitchCounter);
    colorSwitchCounter = colorSwitchCounter +1;
    if(colorSwitchCounter%2 ==0){
        chrome.runtime.sendMessage({
            message: 'pomo_change',
            payload: 'ON'

        }, response =>{
            if (response.message === 'success'){
                start_pom.innerHTML= 'Stop Pomodoro';
                start_pom.style.backgroundColor = "#de7878";
            }
        });
    }
    else{
        chrome.runtime.sendMessage({
            message: 'pomo_change',
            payload: 'OFF'
        }, response =>{
            if (response.message === 'success'){
                start_pom.innerHTML= 'Start Pomodoro';
                start_pom.style.backgroundColor = "#78A3DE";
            }
        });
    }

})

save_button.addEventListener("click", ()=>{
    console.log("Save button clicked");

    chrome.runtime.sendMessage({
        message: 'save_tabs',
    }, response =>{
        if (response.message === 'success'){
            alert("What would you like to name this session?");
        }
        else{
            alert("An error occurred while saving your session");
        }
    });
})

chrome.runtime.sendMessage({
    message: 'get_state'
}, response =>{
    console.log(response.payload);
    if (response.payload === "ON"){
        start_pom.innerHTML= 'Stop Pomodoro';
        start_pom.style.backgroundColor = "#de7878";
    }
    if (response.payload === "OFF"){
        start_pom.innerHTML= 'Start Pomodoro';
        start_pom.style.backgroundColor = "#78A3DE";
    }

});

chrome.runtime.sendMessage({
    message: 'get_time'
}, response =>{
    console.log(response.payload);
    countdownEl.innerHTML = response.payload;

});

// function pomStatus(){
//     if (click==true){
//         console.log("the pomodoro loop is on");
//     }if (click==false){
//         console.log("the pomodoro loop is OFF");
//     }
// }

// start_pom.addEventListener("click", click);
// start_pom.addEventListener("click", pomStatus);


