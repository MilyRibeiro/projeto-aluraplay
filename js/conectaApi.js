async function listaVideos() {
  const conexao = await fetch("http://localhost:3000/videos");
  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

async function criaVideo(titulo, descricao, url, imagem) {
  const conexao = await fetch("http://localhost:3000/videos", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      titulo: titulo,
      descricao: `${descricao} mil visualizações`,
      url: url,
      imagem: imagem
    })
  });

  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

async function buscaVideo(termoDeBusca) {
  // Tenta buscar usando o recurso nativo do json-server
  const conexao = await fetch(
    `http://localhost:3000/videos?q=${encodeURIComponent(termoDeBusca)}`
  );
  let resultados = await conexao.json();

  // Busca todos para comparar quantidade
  const todos = await (await fetch("http://localhost:3000/videos")).json();

  // Se não filtrou nada ou trouxe tudo, aplica filtro manual no front-end
  if (resultados.length === 0 || resultados.length === todos.length) {
    const termo = termoDeBusca.toLowerCase();
    resultados = todos.filter(video =>
      video.titulo.toLowerCase().includes(termo) ||
      video.descricao.toLowerCase().includes(termo)
    );
  }

  return resultados;
}

export const conectaApi = {
  listaVideos,
  criaVideo,
  buscaVideo
};


// async function listaVideos() {
//   const conexao = await fetch("http://localhost:3000/videos");
//   const conexaoConvertida = await conexao.json();

//   return conexaoConvertida;
// };

// async function criaVideo(titulo, descricao, url, imagem) {
//   const conexao = await fetch("http://localhost:3000/videos", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json"
//     },
//     body: JSON.stringify({
//       titulo: titulo,
//       descricao: `${descricao} mil visualizações`,
//       url: url,
//       imagem: imagem
//     })
//   });

//   const conexaoConvertida = await conexao.json();

//   return conexaoConvertida;
// }

// async function buscaVideo(termoDeBusca) {
//   // const conexao = await fetch(`http://localhost:3000/videos?q=${termoDeBusca}`);
//   const conexao = await fetch(`http://localhost:3000/videos?q=${encodeURIComponent(termoDeBusca)}`);

//   const conexaoConvertida = await conexao.json();

//   return conexaoConvertida;
// };

// export const conectaApi = {
//   listaVideos,
//   criaVideo,
//   buscaVideo
// };