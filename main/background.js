chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.local.set({
        name: "Nigel",
        pomo_state: "OFF",
    });
});

// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//     let url = tabs.url;
//     linklogger(url);
// });

// function linklogger(tablink) {
//     console.log("also logged the links");
//     console.log(tablink);
//     for (link in tablink){
//       console.log(link, tablink[link]);
//     }
// };


chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    // let url = tabs.url[0];
    myFunction(url);
    // use `url` here inside the callback because it's asynchronous!
});

function myFunction(tablink) {
    console.log(tablink);
    // for (link in tablink){
    //     console.log(link, tablink[link]);
    // }
}
chrome.tabs.getSelected(null, function(tab) {
    myFunction(tab.url);
});

function myFunction(tablink) {
  // do stuff here
  console.log(tablink);
}

console.log("I am the background");
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^http/.test(tab.url)){
        chrome.scripting.insertCSS({
            target:{tabId:tabId},
            files: ["./foreground_styles.css"]
        })
            .then(()=>{
                console.log("INJECTED THE FOREGROUND STYLES")
                chrome.scripting.executeScript({
                    target:{tabId:tabId},
                    files: ["./foreground.js"]
                });

            })
            .catch(err => console.log(err));
    }
    
});


chrome.storage.local.get('pomo_state', data =>{
    if (chrome.runtime.lastError){
        sendResponse({
            message: 'fail'
        });
        return;
    }
    sendResponse({
        message: 'success',
        payload: data.pomo_state
    });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
    if (request.message === 'pomo_change'){
        chrome.storage.local.set({
            pomo_state:request.payload
        }, () => {
            if (chrome.runtime.lastError){
                sendResponse({message: 'fail'});
                return;
            }
            sendResponse({message: 'success'});

        });
        return true;
        
    } 
    else if (request.message === 'get_state'){
        chrome.storage.local.get('pomo_state', data =>{
            if (chrome.runtime.lastError){
                sendResponse({
                    message: 'fail'
                });
                return;
            }
            sendResponse({
                message: 'success',
                payload: data.pomo_state
            })
        });
        return true;
    } 
    else if (request.message === 'save_tabs'){
        if (chrome.runtime.lastError){
            sendResponse({
                message: 'fail'
            });
            return;
        }else{
            sendResponse({
                message: 'success'
            });
            console.log("sent success to the popup.js");
            // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            //     let url = tabs.url;
            //     linklogger(url);
            // });
            
        }
         
        return true;
        

    }

});



const startingMinutes = 25;
let time = startingMinutes*60;
// const countdownEl = document.getElementById("countdown-timer");

setInterval(updateCountdown,1000);

function updateCountdown(){
    const minutes = Math.floor(time / 60);
    let seconds = time%60;
    // countdownEl.innerHTML = `${minutes}: ${seconds}`;
    console.log(`${minutes}: ${seconds}`);
    time--;
    chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
        if (request.message === 'get_time'){
            if (chrome.runtime.lastError){
                sendResponse({message: 'fail'});
                return;
            }
            sendResponse({message: 'success', payload: `${minutes}: ${seconds}` });
        }
    });
    return true;
}
