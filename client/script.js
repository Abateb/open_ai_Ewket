// the goal is to connect this to take this empty script and connect it to the open ai API tyo get prompts from it and actually provide intelligent answers based on what the user types!

import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form')  ;
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

//implement loading functionality
function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';

    }
  }, 300)
}


// implement typing functionality
function typeText() {
  let index = 0;

  let interval = setInterval(() => {
    if(index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20)
}

// generate a unique id for every single message to be able to map over them.
function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timeStamp}-${hexadecimalString}`;
}


//implement varying chat stripes of each prompt and answer. an icon if its ai or us.

function chatStripe(isAi,value,uniqueId) {   // we have a couple of parameters. in this case 3, first, is ai speaking or us? second, we gona get the value of the message & third   we gna pass it a unique ID.
return (
  `
  <div class= "wrapper ${isAi && 'ai'}">
    <div class= "chat">
      <div className="profile">
          <img
          src="${isAi ? bot : user}"
          alt= "${isAi ? bot : 'user'}"
          />
      </div>
      <div class= "message" id=${uniqueId}>${value}</div>
     </div>
     </div>

  `//  the div with class= 'message' & id= ${uiqueId} (which is gna be dynamic unique id) will be used to render the value which is going to be the ai generated message.

)
}

const handleSubmit = async(e) => {
  e.preventDefault() // prevent default browser behaviour from occuring which is to reload browser when form is submitted
  const data = new FormData(form);

  //generate user's chat stripe
  chatContainer.innerHTML += chatStripe(false,data.get('prompt'));

  //finally we might want to clear the text area input
  form.reset();

  //bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true," ",uniqueId); //the reason a string with empty space was added as the second parameter is coz its going to fill up later on upon loading (loader function on line 12)

  chatContainer.scrollTop = chatContainer.scrollHeight //as the user types we want to keep scrolling down so we see the message. this will put the new message in view.

  //fetch newly created div
  const messageDiv = document.getElementById(uniqueId) //this line explains why we need to create a new id for every single messsage.


  // turn on loader()
  loader(messageDiv)
}


form.addEventListener('submit',handleSubmit);
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) {
    handleSubmit(e);
  }
})
