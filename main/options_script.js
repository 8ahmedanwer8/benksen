console.log(" I am the options");
chrome.runtime.sendMessages({
    message: 'get_name'
}, response =>{
    if (response.message === 'success'){
        document.querySelector('div').innerHTML = `Hello ${response.payload}`;
    }
});