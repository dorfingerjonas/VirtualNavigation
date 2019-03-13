
function init() {
  const text = "virtual skiarea navigation";
  let element = document.getElementById('headline');
  textAnimation(text, 100, element);
  removeText(100, element);
}

function writeText(text, duration, element) {
  let i = 0;
  let content = "";
  let counter = 0;

  let interval = setInterval(() => {
    element.textContent = "";
    content += text.charAt(i);
    element.textContent = content + "|";
    i++;
    if (i >= text.length) {
      clearInterval(interval);

      setInterval(() => {
        if (counter % 2 === 0) {
          element.textContent = content + "\xA0";
        } else {
          element.textContent = content + "|";
        }
        counter++;
      }, 200);
    }
  }, duration);
}

function removeText(duration, element) {
  let i = 0;
  let content = "";
  let counter = 0;


}
