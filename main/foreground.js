
const ce_main_container = document.createElement('DIV');
const ce_name = document.createElement('DIV');
const ce_input = document.createElement('INPUT');
const ce_button = document.createElement('DIV');

ce_main_container.classList.add('ce_main'); 
ce_name.id = 'ce_name';
ce_input.id = 'ce_input';
ce_button.id = 'ce_button';

ce_name.innerHTML = 'Hello STUDENT';
ce_button.innerHTML = 'Change Name';
ce_main_container.appendChild(ce_name);
ce_main_container.appendChild(ce_input);
ce_main_container.appendChild(ce_button);

document.querySelector('body').appendChild(ce_main_container);
for (char in ce_input.value){
    console.log(charCount, length.charCount);
    charCount = [];
    if (length.charCount > 15){
        alert("Your input must be less than 15 letters");
    }
}

ce_button.addEventListener("click", ()=>{
    chrome.runtime.sendMessage({
        message: 'change_name',
        payload: ce_input.value

    }, response =>{
        if (response.message === 'success'){
            ce_name.innerHTML = `Hello ${ce_input.value }`;
        }
    });
})


