//biblioteca de operações com matrizes
class Matriz {
  constructor(linhas, colunas) {
    this.linhas = linhas; //linhas
    this.colunas = colunas; //colunas
    this.dados = []; //dados da matriz

    for (let i = 0; i < this.linhas; i++) {
      this.dados[i] = [];
      for (let j = 0; j < this.colunas; j++) {
        this.dados[i][j] = 0;
      }
    }
  }
  
  //converter matrizes em vetor de 1 linha (para colocar no cromosso do Individuo)
  para_vetor(matriz, bias1, bias2){
    let novo = [];

    //inserindo pesos da entrada (ou saida, dependendo de quem esta chamando a função)
    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        novo.push(this.dados[i][j]);
      }
    }
    //inserindo bias da oculta (ou saida, dependendo de quem esta chamando a função)
    for (let i = 0; i < bias1.linhas; i++) {
      for (let j = 0; j < bias1.colunas; j++) {
        novo.push(bias1.dados[i][j]);
      }
    }

    //inserindo pesos da saida (ou entrada, dependendo de quem esta chamando a função)
    for (let i = 0; i < matriz.linhas; i++) {
      for (let j = 0; j < matriz.colunas; j++) {
        novo.push(matriz.dados[i][j]);
      }
    }
    //inserindo bias da saida (ou oculta, dependendo de quem esta chamando a função)
    for (let i = 0; i < bias2.linhas; i++) {
      for (let j = 0; j < bias2.colunas; j++) {
        novo.push(bias2.dados[i][j]);
      }
    }
    console.log("Mostrando individuo gerado:");
    console.log(JSON.parse(JSON.stringify(novo)));
    return novo;
  }

  //colocando cromossomo gerado na rede neural para testar no jogo
  para_matrizes(matriz, cromossomo_individuo, bias1, bias2){
    let z = 0;

    //inserindo pesos da entrada (dependendo de quem chama a função)
    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        this.dados[i][j] = cromossomo_individuo[z];
        z++;
      }
    }
    //inserindo bias da oculta
    for (let i = 0; i < bias1.linhas; i++) {
      for (let j = 0; j < bias1.colunas; j++) {
        bias1.dados[i][j] = cromossomo_individuo[z];
        z++;
      }
    }

    //inserindo pesos da saida (dependendo de quem chama a função)
    for (let i = 0; i < matriz.linhas; i++) {
      for (let j = 0; j < matriz.colunas; j++) {
        matriz.dados[i][j] = cromossomo_individuo[z];
        z++;
      }
    }
    //inserindo bias_s
    for (let i = 0; i < bias2.linhas; i++) {
      for (let j = 0; j < bias2.colunas; j++) {
        bias2.dados[i][j] = cromossomo_individuo[z];
        z++;
      }
    }

  }

  //converter vetor para objeto Matriz de 1 coluna
  static paraMatriz(arr) {
    let m = new Matriz(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.dados[i][0] = arr[i];
    }
    return m;
  }

  //converte objeto do tipo Matriz para array
  paraArray() {
    let arr = [];
    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        arr.push(this.dados[i][j]);
      }
    }
    return arr;
  }

  //preencher Matriz com numeros aleatorios
  aleatorio() {
    for (let i = 0; i < this.linhas; i++) {
        for (let j = 0; j < this.colunas; j++) {
            this.dados[i][j] = parseFloat((Math.random() * (8 + 8) - 8).toFixed(2)); //gerar numeros de 2 a +2
      }
    }
  }

  //somar "n" a todas as posiçoes da matriz
  add(n) {
    // se "n" for um objeto do tipo Matriz
    if (n instanceof Matriz) {
      for (let i = 0; i < this.linhas; i++) {
        for (let j = 0; j < this.colunas; j++) {
          this.dados[i][j] += n.dados[i][j];
        }
      }
    } else {
      // se "n" for um numero qualquer, e não um objeto
      for (let i = 0; i < this.linhas; i++) {
        for (let j = 0; j < this.colunas; j++) {
          this.dados[i][j] += n;
        }
      }
    }
  }

  multiplicar(n) {
    // se "n" for um objeto do tipo Matriz
    if (n instanceof Matriz) {
      // hadamard product
      for (let i = 0; i < this.linhas; i++) {
        for (let j = 0; j < this.colunas; j++) {
          this.dados[i][j] *= n.dados[i][j];
        }
      }
    } else {
      // se for um numero qualquer, e não um objeto
      for (let i = 0; i < this.linhas; i++) {
        for (let j = 0; j < this.colunas; j++) {
          this.dados[i][j] *= n;
        }
      }
    }
  }

  //multiplicacao de matrizes (Produto Escalar das Matrizes):
  static multiplicar(a, b) {
    if (a.colunas !== b.linhas) {
      console.log('As colunas de A devem corresponder às linhas de B.');
      //regra para multiplicacao de matrizes: (álgebra linear)
      //o numero de colunas da matriz "a" tem que ser igual ao numero de linhas de "b"
      return undefined;
    }
    let resultado = new Matriz(a.linhas, b.colunas);
    for (let i = 0; i < resultado.linhas; i++) {
      for (let j = 0; j < resultado.colunas; j++) {
        let sum = 0;
        for (let k = 0; k < a.colunas; k++) {
          sum += a.dados[i][k] * b.dados[k][j];
        }
        resultado.dados[i][j] = sum;
      }
    }
    return resultado;
  }

  map(func) {
    // aplica função para cada elemento da Matriz
    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        let val = this.dados[i][j];
        this.dados[i][j] = func(val);
      }
    }
  }

}