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
let dataText = ["Da lista abaixo, escolha cinco riscos."];

document.addEventListener("DOMContentLoaded", function (event) {
  typewrite();
});

typewrite = () => {
  const typeWriter = (text, i, fnCallback) => {
    if (i < text.length) {
      document.getElementById("subtitulo1").innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    } else if (typeof fnCallback == "function") {
      setTimeout(fnCallback, 700);
    }
  };

  const StartTextAnimation = (i) => {
    try {
      if (i < dataText[i].length) {
        typeWriter(dataText[i], 0, function () {
          StartTextAnimation(i + 1);
        });
      }
    } catch {}
  };
  StartTextAnimation(0);
};

pintar_botao = (elem) => {
  document.getElementById(elem).style.animationName = "clicar_risco";
  document.getElementById(elem).getElementsByTagName("p")[0].style.color =
    "#ffffff";
};

risco_click = (elem) => {
  let conteudoBTN = elem.textContent;
  conteudoBTN = conteudoBTN.replace(/\t/g, "");
  conteudoBTN = conteudoBTN.replace(/\n/g, "");

  if (click_array.includes(conteudoBTN) == false) {
    click_array.push(conteudoBTN);
    pintar_botao(elem.id);

    if (click_array.length >= 4) {
      if (click_array.length == 4) {
        pintar_botao();
      }

      if (window.matchMedia("(orientation: portrait)").matches) {
        let proximo = document.getElementById("proximo");
        proximo.style.display = "flex";
        proximo.style.animationName = "prox_aparecer";
      } else {
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

etapa2_mobile = (elem) => {
  console.log(click_array);
  document.getElementById(elem.id).style.animationName = "etapa1_desaparecer";
  document.getElementById("riscos").style.animationName = "etapa1_desaparecer";

  setTimeout(() => {
    document.getElementById(elem.id).remove();
    document.getElementById("riscos").remove();
    document.getElementById("piramide").style.display = "flex";
    document.getElementById("piramide").style.animationName = "prox_aparecer";
    dataText.push("Mova os cinco riscos para a pirâmide.");
    dataText.shift();
    typewrite();

    let riscos_mobile_lista = document.createElement("div");
    $(".draggable").draggable("enabled");
    riscos_mobile_lista.id = "riscos_mobile_lista";
    document
      .getElementById("piramide")
      .insertAdjacentElement("afterend", riscos_mobile_lista);

    let i = 0;

    while (i < click_array.length) {
      let riscos_mobile = document.createElement("div");
      riscos_mobile.className = "draggable ui-widget-content";
      riscos_mobile.id = "risco_mobile_" + i;
      riscos_mobile.innerHTML = "<p>" + click_array[i] + "</p>";
      let divAtual = document.getElementById("riscos_mobile_lista");
      divAtual.appendChild(riscos_mobile);
      riscos_mobile.onclick = () => pintar_botao(riscos_mobile.id);
      i++;
    }
    $(".draggable").draggable({ snap: ".ui-widget-header" });
  }, 900);
};
