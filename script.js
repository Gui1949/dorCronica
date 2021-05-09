// let slider1 = document.getElementById('slider1')
// let slider2 = document.getElementById('slider2')
// let slider3 = document.getElementById('slider3')
// let slider4 = document.getElementById('slider4')
// let slider5 = document.getElementById('slider5')

// output.innerHTML = slider1.value;

// slider1.oninput = () => {
//   output.innerHTML = this.value
// }

let click_array = [];

risco_click = (elem) => {
  pintar_botao = () => {
    click_array.push(elem.textContent);
    document.getElementById(elem.id).style.animationName = "clicar_risco";
    document.getElementById(elem.id).getElementsByTagName("p")[0].style.color =
      "#ffffff";
  };

  if (click_array.includes(elem.textContent) == false) {
    if (click_array.length >= 4) {
      if (click_array.length == 4) {
        pintar_botao();
      }

      if (window.matchMedia("(orientation: portrait)").matches) {
        let proximo = document.getElementById("proximo");
        proximo.style.display = "flex";
        proximo.style.animationName = "prox_aparecer";
      } else {
        $(".draggable").draggable("option", "disabled", true);
        setTimeout(
          () =>
            document
              .getElementById("listar_1")
              .scrollIntoView({ block: "start", behavior: "smooth" }),
          300
        );
      }
    } else {
      pintar_botao();
    }
  }
};
