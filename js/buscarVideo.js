import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";

async function buscarVideo(evento) {
  evento.preventDefault();
  const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
  const busca = await conectaApi.buscaVideo(dadosDePesquisa);

  // console.log(busca);

  const lista = document.querySelector("[data-lista]");

  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  console.log("Resultado da busca:", busca);

  busca.forEach(elemento => lista.appendChild(
    constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)));
};

// async function buscarVideo(evento) {
//   evento.preventDefault();
//   const input = document.querySelector("[data-pesquisa]");
//   const dadosDePesquisa = input.value.trim();

//   if (!dadosDePesquisa) {
//     console.log("Pesquisa vazia — digite algo!");
//     return;
//   }

//   const busca = await conectaApi.buscaVideo(dadosDePesquisa);
//   console.log("Resultado da busca:", busca);
// };


const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");

botaoDePesquisa.addEventListener("click", evento => buscarVideo(evento));