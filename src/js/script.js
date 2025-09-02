let jogadoras = [
    {
        nome: "Andressa Alves",
        posicao: "Meio-campo",
        clube: "Corinthians",
        foto: "https://cdn.agenciamural.org.br/2023/07/11213707/AndressaAlves-SamRoblesCBF.jpg",
        gols: 15,
        assistencias: 10,
        jogos: 28
    },
    {
        nome: "Dayana Rodríguez",
        posicao: "Meio-campo",
        clube: "Corinthians",
        foto: "https://www.meutimao.com.br/fotos-do-corinthians/w941/2025/01/15/dayana_rodriguez_no_treino_da_pre-temporada_vqbo.jpg",
        gols: 5,
        assistencias: 12,
        jogos: 30
    },
    {
        nome: "Mariza",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://centraldotimao.com.br/wp-content/uploads/2023/10/agenciacorinthians-foto-210079-1-scaled-e1696862715310.jpg",
        gols: 2,
        assistencias: 1,
        jogos: 32
    },
    {
        nome: "Thaís Regina",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://cdn.meutimao.com.br/_upload/jogador/thais-regina-da-silva-no-corinthians_x_corinthians.jpg",
        gols: 1,
        assistencias: 2,
        jogos: 25
    },
    {
        nome: "Letícia Teles",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://cdn.meutimao.com.br/fotos-do-corinthians/w941/2025/04/10/leticia_teles_em_treino_do_corinthians_f22v.jpg",
        gols: 0,
        assistencias: 0,
        jogos: 18
    }
];

window.onload = function () {
    displayJogadoras();
};

//READ
function displayJogadoras() {
    const app = document.getElementById("listaJogadoras");
    app.innerHTML = ""; // <--- evita duplicar quando recarregar

    jogadoras.forEach((jogadora) => {
        const card = document.createElement("div");
        card.classList.add("card-jogadora");

        card.innerHTML =
            `<h3>${jogadora.nome}</h3>
            <img src="${jogadora.foto}" alt="Foto de ${jogadora.nome}">
            <p>${jogadora.posicao} • ${jogadora.clube}</p>
            <p>Gols: ${jogadora.gols} | Assist.: ${jogadora.assistencias} | Jogos: ${jogadora.jogos}</p>`;

        app.appendChild(card);
    });
}