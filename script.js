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
let riscos = [
  "Risco 1",
  "Risco 2",
  "Risco 3",
  "Risco 4",
  "Risco 5",
  "Risco 6",
  "Risco 7",
  "Risco 8",
  "Risco 9",
  "Risco 10",
  "Risco 11",
  "Risco 12",
  "Risco 13",
  "Risco 14",
  "Risco 15",
  "Risco 16",
  "Risco 17",
  "Risco 18",
  "Risco 19",
  "Risco 20",
  "Risco 21",
  "Risco 22",
  "Risco 23",
  "Risco 24",
  "Risco 25",
  "Risco 26",
  "Risco 27",
  "Risco 28",
  "Risco 29",
  "Risco 30",
  "Risco 31",
  "Risco 32",
  "Risco 33",
  "Risco 34",
  "Risco 35",
  "Risco 36",
  "Risco 37",
  "Risco 38",
  "Risco 39",
  "Risco 40",
];

document.addEventListener("DOMContentLoaded", function (event) {
  document.body.requestFullscreen();
  gerar_riscos();
  typewrite();
});

const aparecer_elemento = (elemento) => {
  document.getElementById(elemento).style.display = "flex";
  document.getElementById(elemento).style.animationName = "prox_aparecer";
};

const sumir_elemento = (elemento) => {
  document.getElementById(elemento).style.animationName = "etapa1_desaparecer";
  setTimeout(
    () => (document.getElementById(elemento).style.display = "none"),
    900
  );
};

const gerar_riscos = () => {
  let num_risco = 0;
  while (num_risco < riscos.length) {
    let riscos_obj = document.createElement("div");
    riscos_obj.className = "draggable ui-widget-content";
    riscos_obj.id = "risco" + num_risco;
    riscos_obj.innerHTML = "<p>" + riscos[num_risco] + "</p>";
    let divAtual = document.getElementById("riscos");
    divAtual.appendChild(riscos_obj);
    riscos_obj.onclick = () => risco_click(riscos_obj);
    num_risco++;
  }
};

const typewrite = () => {
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

const adicionar_typewrite = (texto) => {
  dataText.push(texto);
  dataText.shift();
  typewrite();
};

const pintar_botao = (elem) => {
  try {
    document.getElementById(elem).style.animationName = "clicar_risco";
    document.getElementById(elem).getElementsByTagName("p")[0].style.color =
      "#ffffff";
  } catch {}
};

const risco_click = (elem) => {
  let conteudoBTN = elem.textContent;
  conteudoBTN = conteudoBTN.replace(/\t/g, "");
  conteudoBTN = conteudoBTN.replace(/\n/g, "");

  if (click_array.length <= 4) {
    if (click_array.includes(conteudoBTN) == false) {
      click_array.push(conteudoBTN);
      pintar_botao(elem.id);

      if (click_array.length >= 5) {
        if (click_array.length == 5) {
          pintar_botao();
        }

        if (window.matchMedia("(orientation: portrait)").matches) {
          aparecer_elemento("proximo");
        } else {
          etapa3_mobile();
          $(".draggable").draggable({ disabled: true });
        }
      } else {
        pintar_botao();
      }
    }
  }
};

const etapa2_mobile = (elem) => {
  let array_valid = [];

  sumir_elemento(elem.id);
  sumir_elemento("riscos");

  const etapa2_mobile_valid = (btn) => {
    pintar_botao(btn);

    if (array_valid.includes(btn) == false) {
      array_valid.push(btn);
    }

    if (array_valid.length == 5) {
      aparecer_elemento("proximo");
      document.getElementById("proximo").onclick = () => etapa3_mobile();
    }
  };

  setTimeout(() => {
    document.getElementById("riscos").remove();
    aparecer_elemento("piramide");
    adicionar_typewrite("Mova os cinco riscos para a pirâmide.");

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
      riscos_mobile.ontouchstart = () => etapa2_mobile_valid(riscos_mobile.id);    
      i++;
    }

    $(".draggable").draggable({ snap: ".ui-widget-header" });
  }, 900);
};

const etapa3_mobile = () => {
  let i = 0;
  sumir_elemento("escolha_riscos");
  sumir_elemento("proximo");
  setTimeout(() => {
    adicionar_typewrite(
      "Avalie o risco mediante o seu conhecimento sobre o mesmo."
    );
    document.getElementById("escolha_riscos").remove();
    aparecer_elemento("listar_1");
    if (window.matchMedia("(orientation: landscape)").matches) {
      document.getElementById("conteudo").style.width = "55%";
    }
  }, 900);

  let riscos_lista1 = document.createElement("div");
  riscos_lista1.className = "item_lista1";
  riscos_lista1.id = "item_lista1_" + i;
  let divAtual = document.getElementById("listar_1");
  divAtual.appendChild(riscos_lista1);

  const while_lista1 = () => {
    while (i < click_array.length) {
      let risco_titulo = document.createElement("h3");
      risco_titulo.id = "risco_titulo";
      risco_titulo.innerHTML = click_array[i];
      riscos_lista1.appendChild(risco_titulo);

      let risco_subtitulo = document.createElement("h4");
      risco_subtitulo.innerHTML = "O quanto você acha que entende disso?";
      riscos_lista1.appendChild(risco_subtitulo);

      let risco_input = document.createElement("input");
      risco_input.id = "slider" + i;
      risco_input.list = "slider_lista";
      risco_input.className = "slider";
      risco_input.type = "range";
      risco_input.value = "50";
      risco_input.min = "1";
      risco_input.max = "100";
      riscos_lista1.appendChild(risco_input);

      let risco_list = document.createElement("datalist");
      risco_list.id = "slider_lista";

      let risco_option1 = document.createElement("option");
      let risco_option2 = document.createElement("option");
      let risco_option3 = document.createElement("option");

      risco_option1.value = "0";
      risco_option1.label = "Pouco";

      risco_option2.value = "50";
      risco_option2.label = "Não sei informar";

      risco_option3.value = "100";
      risco_option3.label = "Muito";

      risco_list.appendChild(risco_option1);
      risco_list.appendChild(risco_option2);
      risco_list.appendChild(risco_option3);

      riscos_lista1.appendChild(risco_list);

      let riscos_prox = document.createElement("div");
      riscos_prox.innerHTML = "Próximo";
      riscos_prox.className = "btn_prox_lista";
      riscos_prox.onclick = () => {
        if (i != 5) {
          sumir_elemento("risco_titulo");
          setTimeout(() => {
            riscos_lista1.innerHTML = "";
            while_lista1();
            aparecer_elemento("risco_titulo");
          }, 900);
        } else {
          sumir_elemento("listar_1");
          setTimeout(() => {
            etapa4_mobile();
          }, 900);
        }
      };
      riscos_lista1.appendChild(riscos_prox);

      i++;
      break;
    }
  };
  while_lista1();
};

const etapa4_mobile = () => {
  adicionar_typewrite("Informações sobre o risco.");

  let i = 0;

  const while_lista2 = () => {
    aparecer_elemento("listar_2");
    while (i < click_array.length) {
      let titulo_listar2 = document.createElement("div");
      titulo_listar2.className = "titulo_listar2";
      titulo_listar2.id = "titulo_listar2";
      titulo_listar2.innerHTML = click_array[i];

      let listar2 = document.getElementById("listar_2");
      listar2.appendChild(titulo_listar2);

      let conteudo_listar2 = document.createElement("div");
      conteudo_listar2.className = "conteudo_listar2";
      conteudo_listar2.id = "conteudo_listar2";
      listar2.appendChild(conteudo_listar2);

      let subtitulo1_listar2 = document.createElement("div");
      subtitulo1_listar2.className = "subtitulo1_listar2";
      subtitulo1_listar2.innerHTML = "Descrição:";
      conteudo_listar2.appendChild(subtitulo1_listar2);

      let texto1_listar2 = document.createElement("div");
      texto1_listar2.innerHTML = "Teste";
      conteudo_listar2.appendChild(texto1_listar2);

      subtitulo1_listar2 = document.createElement("div");
      subtitulo1_listar2.className = "subtitulo1_listar2";
      subtitulo1_listar2.innerHTML = "Significância:";
      conteudo_listar2.appendChild(subtitulo1_listar2);

      texto1_listar2 = document.createElement("div");
      texto1_listar2.innerHTML = "Teste";
      conteudo_listar2.appendChild(texto1_listar2);

      subtitulo1_listar2 = document.createElement("div");
      subtitulo1_listar2.className = "subtitulo1_listar2";
      subtitulo1_listar2.innerHTML = "Participação:";
      conteudo_listar2.appendChild(subtitulo1_listar2);

      texto1_listar2 = document.createElement("div");
      texto1_listar2.innerHTML = "Teste";
      conteudo_listar2.appendChild(texto1_listar2);

      let botao_prox = document.createElement("div");
      botao_prox.innerHTML = "Próximo";
      botao_prox.className = "btn_prox_lista lista2";

      botao_prox.onclick = () => {
        if (i != 5) {
          sumir_elemento("listar_2");
          setTimeout(() => {
            document.getElementById("listar_2").innerHTML = "";
            while_lista2();
          }, 900);
        } else {
          document.write("Fim da execução");
        }
      };

      listar2.appendChild(botao_prox);
      i++;
      break;
    }
  };

  while_lista2();
};
