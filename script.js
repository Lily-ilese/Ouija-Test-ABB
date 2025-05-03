let recognizing = false;
let recognition;
const planchette = document.getElementById("planchette");
const micBtn = document.getElementById("micBtn");

function movePlanchetteRandomly() {
  const x = Math.random() * (window.innerWidth - planchette.offsetWidth);
  const y = Math.random() * (window.innerHeight - planchette.offsetHeight);
  planchette.style.transform = `translate(${x}px, ${y}px)`;
}

micBtn.onclick = () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech Recognition not supported on this browser.");
    return;
  }

  if (!recognition) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      recognizing = true;
      micBtn.style.background = "#0f0";
    };

    recognition.onend = () => {
      recognizing = false;
      micBtn.style.background = "#fff";
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      console.log("You said:", text);
      movePlanchetteRandomly();
    };
  }

  if (recognizing) {
    recognition.stop();
  } else {
    recognition.start();
  }
};
