let jogadoras = [
    {
        nome: "Andressa Alves",
        posicao: "Meio-campo",
        clube: "Corinthians",
        foto: "https://cdn.meutimao.com.br/_upload/jogador/andressa-alves-da-silva-no-corinthians_v.jpg",
        gols: 15,
        assistencias: 10,
        jogos: 28,
        favoritar:false
    },
    {
        nome: "Dayana Rodríguez",
        posicao: "Meio-campo",
        clube: "Corinthians",
        foto: "https://cdn.meutimao.com.br/_upload/jogador/dayana-lisset-rodriguez-leon-no-corinthians_a.jpg",
        gols: 5,
        assistencias: 12,
        jogos: 30,
        favoritar:false
    },
    {
        nome: "Mariza",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://cdn.meutimao.com.br/_upload/jogador/mariza-nascimento-silva-no-corinthians_p.jpg",
        gols: 2,
        assistencias: 1,
        jogos: 32,
        favoritar:false
    },
    {
        nome: "Thaís Regina",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://cdn.meutimao.com.br/_upload/jogador/thais-regina-da-silva-no-corinthians_z.jpg",
        gols: 1,
        assistencias: 2,
        jogos: 25,
        favoritar:false
    },
    {
        nome: "Letícia Teles",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://cdn.meutimao.com.br/_upload/jogador/leticia-teles-da-silva-no-corinthians_b.jpg",
        gols: 0,
        assistencias: 0,
        jogos: 18,
        favoritar:false
    }
];

window.onload = function () {
    loadJogadoras()
    displayJogadoras();
    document.querySelector('#botaoSubmit').addEventListener('click',createCard)
    document.querySelector('#listaJogadoras').addEventListener('click',handleCards)

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
    }else if(action =="favoritar")
        favoritarJogadora(index)
}

//READ
function displayJogadoras() {
    const lista = document.getElementById('listaJogadoras');
    lista.innerHTML = '';
    const classeFavorita = jogadoras.favoritar ? 'favorita' : '';


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
                <div class= 'favoritar-icon'>
                    <button class ="btn-favoritar ${jogadora.favoritar ? 'favorita' : ''}" data-action = "favoritar" data-index = "${index}"><i class="fa-solid fa-heart"></i></button>
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
    //Tratamento das informações
    const chaves = ['nome','posicao','clube','foto','gols','assistencias','jogos']
    const info = chaves.map(campo => obj[campo])
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
    //Checa a existencia do botao para garantir que os dados serao alterados dentro da propriedade alterar
    
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
            chaves.forEach((chave, i) => {
            obj[chave] = info[i];
            });
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
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras))
}

function loadJogadoras() {
    const jogadorasSalvas = localStorage.getItem("jogadoras")
    if (jogadorasSalvas) {
        jogadoras = JSON.parse(jogadorasSalvas)
    }else{
        localSaveJogadoras()
    }
}

function favoritarJogadora(index){
    jogadoras[index].favoritar = !jogadoras[index].favoritar
    localSaveJogadoras()
    displayJogadoras()
}