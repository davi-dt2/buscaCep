async function buscaCEP() {
  try {
    const estado = document.querySelector("#estado").value.trim();
    const cidade = document.querySelector("#cidade").value.trim();
    const rua = document.querySelector("#rua").value.trim();

    if (cidade.length < 3 || rua.length < 3) {
      throw { cep_error: "Cidade e rua necessitam de 3 ou mais caracteres" };
    }

    const response = await fetch(
      `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json`
    );
    if (!response.ok) {
      throw { cep_error: "Erro na consulta do CEP" };
    }
    const responseCep = await response.json();

    if (document.querySelector(".results").hasChildNodes()) {
      resetDiv();
    }

    if (!Array.isArray(responseCep) || responseCep.length === 0) {
      throw { cep_error: "Cidade ou rua inválidos" };
    }

    responseCep.forEach((data) => {
      const div = document.createElement("div");
      div.className = "result";

      const labels = ["Cep: ", "Estado: ", "Cidade: ", "Rua: "];
      const items = [data.cep, data.uf, data.localidade, data.logradouro];

      labels.forEach((label, index) => {
        const p = document.createElement("p");
        p.textContent = `${label}${items[index]}`;
        div.appendChild(p);
      });

      document.querySelector(".results").appendChild(div);
    });
  } catch (error) {
    if (error?.cep_error) {
      const message = document.querySelector("#message");
      message.textContent = error.cep_error;
      setTimeout(() => {
        message.textContent = "Buscar CEP pelo Endereço";
      }, 5000);
    }
  }
}

function resetDiv() {
  const div = document.querySelector(".results");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
