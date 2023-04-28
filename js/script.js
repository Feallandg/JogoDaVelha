const celula = document.querySelectorAll(".celula");
let fimDeJogo = false;
const jogador_X = "X";
const jogador_O = "O";

const combinacoes = [
   /*horizontal*/
    [0,1,2],
    [3,4,5],
    [6,7,8],
    /*vertical*/
    [0,3,6],
    [1,4,7],
    [2,5,8],
    /*cruzado*/
    [0,4,8],
    [2,4,6]
]

document.addEventListener("click", (event ) =>{
    if(event.target.matches(".celula")){
        jogar(event.target.id, jogador_X);
        setTimeout(() => bot(), 250);
    }
});

function bot(){
    const posicoesDisponiveis = [];
    //verificando as posições, atraves com !isNaN(index)
    for (index in celula) {
        if(!isNaN(index)){
          if(!celula[index].classList.contains("X") && !celula[index].classList.contains("O")){
            posicoesDisponiveis.push(index);
          }
        }
    }
    const posicaoAleatoria = Math.floor(
        //multiplicando pelo lenght das posicoes disponiveis
        Math.random() * posicoesDisponiveis.length
    );

    if(!fimDeJogo) {
        jogar(posicoesDisponiveis[posicaoAleatoria], jogador_O);
    }

    jogar(posicoesDisponiveis[posicaoAleatoria], jogador_O);
}

function jogar(id, turno){
    const celula = document.getElementById(id);
    celula.textContent = turno;
    celula.classList.add(turno);
    
    checaVencedor(turno);
}

function checaVencedor(turno){
    const vencedor = combinacoes.some((comb) => {
        return comb.every((index) =>{
            return celula[index].classList.contains(turno);
        })
    });

    if(vencedor){
        encerraJogo(turno);
    }else if(checarEmpate()){
        encerraJogo();
    }
}

function checarEmpate(){
        let x = 0;
        let o = 0;

        for(index in celula){
            if(!isNaN(index)){
                if(celula[index].classList.contains(jogador_X)){
                    x++;
                }
                if(celula[index].classList.contains(jogador_O)){
                    o++;
                }
            }
            }
           
}

function encerraJogo(vencedor = null){
    fimDeJogo = true;
   const tela = document.getElementById("tela");
   const h2 = document.createElement("h2");
   const h3 = document.createElement("h3");
   let mensagem = null;
   
    tela.style.display = "block";
    tela.appendChild(h2);/*os elementos serão inseridos*/
    tela.appendChild(h3);

   
    if(vencedor){
        h2.innerHTML = `O jogador <span>${vencedor}</span> venceu`;
    }else {
        h2.innerHTML = "Empatou";
    }

    let contador = 3;
    setInterval(() =>{
        h3.innerHTML = `Reiniciando em ${contador--} `;
    }, 1000);

    setTimeout(() => location.reload(), 4000);

}