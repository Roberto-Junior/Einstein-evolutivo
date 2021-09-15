class Individuo{
    constructor(pesos){
        this.fitness = 0; //começa sem nota de avaliação
        this.cromossomo = pesos;
    }

    //por enquanto fitness é so os frames do jogo
    avaliacao(pontos){
        this.fitness = pontos;
    }

    crossover(outro_individuo) {
        let filho1 = [], filho2 = [], filhos = [],
        corte = Math.round(Math.random() * this.cromossomo.length);

        if(corte == 0)
            corte = 1
    
        function slice1(array, corte) {
            let i = 0, resultado = [];
            while(i < corte){
                resultado.push(array[i])
                i+=1;
            }
            return resultado
        }
        
        function slice2(array, corte) {
            let i = array.length - 1, resultado = [];
            while(i >= corte){
                resultado.push(array[i])
                i-=1;
            }
            return resultado
        }

        filho1 = filho1.concat(slice1(this.cromossomo, corte).concat(slice2(this.cromossomo, corte)));
        filho2 = filho2.concat(slice1(this.cromossomo, corte).
                                    concat(slice2(outro_individuo.cromossomo, corte)))

        filhos[0] = new Individuo(filho1)
        filhos[1] = new Individuo(filho2)

        return filhos
    }

    mutacao(taxa_mutacao){
        //verifica se vai aplicar mutacao ou nao
        if(Math.random() < taxa_mutacao){
            //percorre todo o  cromossomo
            for(var i in this.cromossomo){
                //decide se vai mudar a posicao do cromossomo atual
                if(Math.random() < taxa_mutacao){
                    console.log("Aplicando mutação");
                    //gera novo valor de -2 a 2 para esta posicao do vetor cromossomo
                    let numero = Math.random() * (8 + 8) - 8; //gerar numeros de -8 a +8
                    this.cromossomo[i] = parseFloat(numero.toFixed(2));
                }
            }
        }
        //retorna cromossomo (alterado ou nao)
        return this;
    }
}

class Genetico{
    constructor(tamanho_populacao){
        this.tamanho_populacao = tamanho_populacao;
        this.populacao = []; //recebera uma lista do tipo Individuo
        this.geracao = 0;
        this.melhor_solucao = 0;
    }

    //inserindo objeto Individuo no genetico
    inicializa_populacao(novo_individuo){
        this.populacao.push(new Individuo(novo_individuo));
        
        //inicialmente melhor solucao escolhida aleatoriamente
        this.melhor_solucao = this.populacao[0]; 
    }

    //salvando melhor individuo
    melhor_individuo(individuo){
        if(individuo.fitness > this.melhor_solucao.fitness)
            this.melhor_solucao = individuo;
    }

    //somando avalicao para sorteio dos pais
    soma_avaliacoes(){
        var soma = 0;
        for(var i in this.populacao)
            soma += this.populacao[i].fitness;
        return soma;
    }

    //roleta viciada para selecionar pais
    seleciona_pai(soma_avaliacao){
        var pai = -1; //nao selecionou ninguem
        var valor_sorteado = Math.random() * soma_avaliacao;
        var soma = 0;
        var i = 0;
        while(i < this.tamanho_populacao && soma < valor_sorteado){
            soma += this.populacao[i].fitness;
            pai += 1; //vai dizer em qual posicao pegar do vetor populacao
            i++;  
        }
        return pai;
    }

    calcular_nova_geracao(taxa_mutacao){

        //gerando nova geracao
        for(var i=0; i<1; i++)
        {
            //console.log("Criando nova geraçaõ\n");

            var soma_fitness = this.soma_avaliacoes();
            console.log("Soma fitness: " + soma_fitness);
            var nova_populacao = [];
            
            //crossover
            for(var j=0; j<this.tamanho_populacao; j=j+2){
                var pai1 = this.seleciona_pai(soma_fitness);
                var pai2 = this.seleciona_pai(soma_fitness);

                var filhos = this.populacao[pai1].crossover(this.populacao[pai2]);

                //verificar se a populaçao não é um numero impar
                if(j+1 == this.tamanho_populacao){
                    nova_populacao.push(filhos[0].mutacao(taxa_mutacao));
                }
                else{
                    nova_populacao.push(filhos[0].mutacao(taxa_mutacao));
                    nova_populacao.push(filhos[1].mutacao(taxa_mutacao));    
                }
            }

            //substituir nova população na antiga
            this.populacao = nova_populacao;
            
            //fazer avaliacao da populacao
            for(var k in this.populacao){
                this.populacao[k].avaliacao();
            }

        }
    }
}