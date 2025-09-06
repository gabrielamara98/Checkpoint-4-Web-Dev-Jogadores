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
    loadJogadoras()
    displayJogadoras();
    document.querySelector('#botaoSubmit').addEventListener('click',createCard)
    document.querySelector('#placeholder-cards').addEventListener('click',handleCards)

};
function handleCards(event){
    const elementoClicado = event.target.closest("button")
    if(!elementoClicado) return;

    const action = elementoClicado.dataset.action
    const index = elementoClicado.dataset.index

    if(action == "editar"){
        updateInfoCard(index)
    }else if(action =="apagar"){
        removeCard(index)
    }
}

//READ
function displayJogadoras() {
    const lista = document.getElementById('listaJogadoras');
    lista.innerHTML = '';

    jogadoras.forEach((jogadora,index) => {
        const card = document.createElement('div');
        card.className = 'card-jogadora';

        card.innerHTML = `
            <div class="thumb">
                <img src="${jogadora.foto}" alt="Foto de ${jogadora.nome}">
            </div>

            <div class="conteudo">
                <h3>${jogadora.nome}</h3>
                <div class="meta">${jogadora.posicao} • ${jogadora.clube}</div>
                <div class="stats">
                    <span class="pill">Gols: <strong>${jogadora.gols}</strong></span>
                    <span class="pill">Assist.: <strong>${jogadora.assistencias}</strong></span>
                    <span class="pill">Jogos: <strong>${jogadora.jogos}</strong></span>
                </div>
                <div class='botoes-func'>
                    <button data-action = "editar" data-index = "${index}">Editar</button>
                    <button data-action = "apagar" data-index = "${index}">Apagar</button>
                </div>
            </div>
        `;

        lista.appendChild(card);
    });
}

function createCard(event){
    event.preventDefault()

    const inputs = document.querySelectorAll('.input-holder input')
    const chaves = ['nome','posicao','clube','foto','gols','assistencias','jogos']
    const atributos = {}
    const label = document.querySelectorAll('.input-holder label')

    inputs.forEach((item,index)=>{
        let elemento = item.value
        while(!elemento){
            elemento = prompt(`O campo ${label[index].textContent} é um campo vazio! Por favor preencha antes de prosseguir`)
            inputs[index].value = elemento
        }
        //Coloca dinamicamente os valores no objeto sem ter que repetir o processo
        const chave = chaves[index]
        atributos[chave] = elemento

    })

    jogadoras.unshift(atributos)
    document.querySelector('#form-jogadores').reset()
    localSaveJogadoras()
    displayJogadoras()
    alert('Jogadora adicionada com sucesso!')
    
}

function updateInfoCard(index){
    document.querySelector('#form-jogadores').reset() // Limpa qualquer info do forms
    //Pega e seleciona o conteudo do Objeto(Json)
    let obj = jogadoras[index]
    let info = []
    //Tratamento das informações
    for(let chave in obj){
        info.push(obj[chave])
    }
    //Pega as informações e coloca nos campos do forms
    const inputs = document.querySelectorAll('.input-holder input')
    inputs.forEach((item,index)=>{
        item.value = info[index]
    })
    //Elementos que serão substituidos
    const botaoCadastrar = document.querySelector('#botaoSubmit')
    const tituloForm = document.querySelector('#form-holder h4')
    tituloForm.textContent = 'Alterar Jogador(a)'

    const checarElemento = document.getElementById('botao-alterar')
    //Checa a existencia do botao para garrantir que os dados serao alterados dentro da propriedade alterar
    
    if(checarElemento){
        alert("Voce ja clicou em Editar")
    }else{
        const criarBotao = document.createElement('button')
        criarBotao.setAttribute('id','botao-alterar')
        criarBotao.textContent = 'Alterar'
        botaoCadastrar.replaceWith(criarBotao)
        
        //Traz os valores dentro das chaves e coloca em um array
        document.querySelector('#botao-alterar').addEventListener('click',()=>{
            inputs.forEach((item,index)=>{
                info[index] = item.value
            })
            let count = 0
            for(let chave in obj){
                obj[chave] =info[count]
                count +=1
            }
            localSaveJogadoras()
            displayJogadoras()
            document.querySelector('#form-jogadores').reset()
            tituloForm.textContent = 'Cadastrar Jogador(a)'
            criarBotao.replaceWith(botaoCadastrar)
            alert("Jogadora editada com sucesso!")
        })
    }
}

function removeCard(index){
    const decisao = prompt("Tem certeza que deseja apagar o card?")
    if(decisao){
        jogadoras.splice(index,1)
        alert("Jogadora Deletada")
        localSaveJogadoras()
        displayJogadoras()
    }else{
        alert("Operação cancelada")
    }
}

function localSaveJogadoras() {
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
}

function loadJogadoras() {
    const jogadorasSalvas = localStorage.getItem("jogadoras");
    if (jogadorasSalvas) {
        jogadoras = JSON.parse(jogadorasSalvas);
    }
}