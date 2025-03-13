const wordText = document.querySelector('.word'),hintText = document.querySelector('.hint span'),timeText = document.querySelector('.time b'),inputField = document.querySelector('input'),refreshBtn = document.querySelector('.refresh-word'),checkBtn = document.querySelector('.check-word');
let correctWord, timer;

if (!localStorage.getItem('phoneNumber')) {
(async () => {
const { value: phoneNumber } = await Swal.fire({
title: 'Enter Your WhatsApp Number',
input: 'text',
inputLabel: 'Your WhatsApp Number',
inputPlaceholder: 'cth: 6282170988479',
showCancelButton: false
});
if (!phoneNumber) return;
localStorage.setItem('phoneNumber', phoneNumber);
})();
}

const initTimer = maxTime => {
clearInterval(timer);
timer = setInterval(() => {
if(maxTime > 0) {
maxTime--;
timeText.innerText = maxTime;
} else {
Swal.fire('Time off!', `${correctWord.toUpperCase()} was the correct word`, 'error');
initGame();
}
}, 1000);
}

const initGame = () => {
initTimer(30);
let randomObj = words[Math.floor(Math.random() * words.length)];
let wordArray = randomObj.word.split('');
for (let i = wordArray.length - 1; i > 0; i--) {
let j = Math.floor(Math.random() * (i + 1));
[wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
}
wordText.innerText = wordArray.join('');
hintText.innerText = randomObj.hint;
correctWord = randomObj.word.toLowerCase();
inputField.value = '';
inputField.setAttribute('maxlength', correctWord.length);
}

initGame();

const checkWord = async () => {
let userWord = inputField.value.toLowerCase();
if(!userWord) return Swal.fire('Oops!', 'Please enter the word to check!', 'warning');
if(userWord !== correctWord) return Swal.fire('Oops!', `${userWord} is not a correct word`, 'error');

const phoneNumber = localStorage.getItem('phoneNumber');
if (!phoneNumber) return Swal.fire('Error!', 'You need to enter your phone number first.', 'error');

try {
await fetch('/api/winners', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ phone: phoneNumber, game: 'Susun Kata', timestamp: new Date().toISOString() })
});
Swal.fire('Success!', 'Your win has been recorded!', 'success');
initGame();
} catch (error) {
Swal.fire('Error!', 'Failed to send data to the server.', 'error');
}
}

refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);
