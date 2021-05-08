// let slider1 = document.getElementById('slider1')
// let slider2 = document.getElementById('slider2')
// let slider3 = document.getElementById('slider3')
// let slider4 = document.getElementById('slider4')
// let slider5 = document.getElementById('slider5')

// output.innerHTML = slider1.value;

// slider1.oninput = () => {
//   output.innerHTML = this.value
// }

risco_click = (elem) => {
  document.getElementById(elem.id).style.animationName = "clicar_risco";
  document.getElementById(elem.id).childNodes.animationName = "font_risco";
  document.getElementById(elem.id).getElementsByTagName("p")[0].style.color =
    "#ffffff";

  setTimeout(() => {
    document.getElementById(elem.id).style.backgroundColor = "#ff2d44";
    document
      .getElementById(elem.id)
      .getElementsByTagName("p")[0].style.fontWeight = "bolder";
    document.getElementById(elem.id).style.borderColor = "#f5c6cb";
  }, 900);

  console.log(elem.textContent);
};
