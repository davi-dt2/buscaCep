import React, { useState } from "react";
import "./styles.css";

function BuscarCepPeloEndereco() {
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mensagem, setMensagem] = useState("Buscar CEP pelo Endereço");

  const buscaCEP = async () => {
    try {
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

      if (!Array.isArray(responseCep) || responseCep.length === 0) {
        throw { cep_error: "Cidade ou rua inválidos" };
      }

      setResultados(responseCep);
    } catch (error) {
      if (error?.cep_error) {
        setMensagem(error.cep_error);
        setTimeout(() => {
          setMensagem("Buscar CEP pelo Endereço");
        }, 5000);
      }
    }
  };

  const resetResultados = () => {
    setResultados([]);
  };

  return (
    <div className="main">
      <div className="header">
        <div className="nav" onClick={() => (window.location.href = "index.html")}>
          <a href="#">Buscar Endereço pelo CEP</a>
        </div>
        <div className="nav" onClick={() => (window.location.href = "busca_cep.html")}>
          <a href="busca_cep.html">Buscar CEP pelo Endereço</a>
        </div>
      </div>

      <h2 id="message">{mensagem}</h2>

      <div className="search">
        <div className="input">
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            name="estado"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            name="cidade"
            id="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="rua">Rua:</label>
          <input
            type="text"
            name="rua"
            id="rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
        </div>
        <button onClick={buscaCEP}>Buscar CEP pelo Endereço</button>
      </div>

      <div className="results">
        {resultados.length > 0 ? (
          resultados.map((data, index) => (
            <div className="result" key={index}>
              <p>CEP: {data.cep}</p>
              <p>Estado: {data.uf}</p>
              <p>Cidade: {data.localidade}</p>
              <p>Rua: {data.logradouro}</p>
            </div>
          ))
        ) : (
          <p>Nenhum resultado encontrado</p>
        )}
      </div>
    </div>
  );
}

export default BuscarCepPeloEndereco;
              
