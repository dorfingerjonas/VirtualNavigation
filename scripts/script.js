
function init() {
  const text = "virtual skiarea navigation";
  let i = 0;
  let content = "";
  let h = document.getElementById('headline');

  setInterval(() => {
    h.textContent = "";
    content += text.charAt(i);
    h.textContent += content;

    for (let j = 0; j < text.length - i - 1; j++) {
      h.textContent += "_";
    }
    i++;
  }, 200);
}
