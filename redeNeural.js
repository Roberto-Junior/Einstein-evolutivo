//função de ativação
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x)); //adaptação da função sigmoid
}

//Rede Neural
class RedeNeural {
  constructor(camada_entrada, camada_oculta, camada_saida) {
    this.camada_entrada = camada_entrada; //numero de entradas
    this.camada_oculta = camada_oculta; //numero de nós da camada oculta
    this.camada_saida = camada_saida; //numero de saidas
    
    //pesos entre entradas e camada oculta: eo (entrada-oculta)
    this.pesos_eo = new Matriz(this.camada_oculta, this.camada_entrada); 
    //"this.camada_oculta" = numero de linhas e "this.camada_entrada" = numero de colunas

    //pesos entre camada oculta e saida: os (oculta- saida)
    this.pesos_os = new Matriz(this.camada_saida, this.camada_oculta);
    //"this.camada_saida" = numero de linhas e "this.camada_entrada" = numero de colunas
    
    //preenchendo os pesos com valores aleatorios
    this.pesos_eo.aleatorio();
    this.pesos_os.aleatorio();

    //bias para os nós da camado oculta
    this.bias_o = new Matriz(this.camada_oculta, 1);
    //cria matriz de bias com "this.camada_oculta" linhas (quantidade nó da camada oculta) e 1 coluna

    this.bias_s = new Matriz(this.camada_saida, 1); //bias para os nós de saida
    //cria matriz de bias com "this.camada_saida" linhas (quantidade nó da camada oculta) e 1 coluna

    //preencher bias da camada oculta de forma aleatoria
    this.bias_o.aleatorio(); 
    this.bias_s.aleatorio();
  }

  //feed-forward da rede neural
  prever(entrada_array) {

    //--Gerando as saidas da camada oculta
   
    //convertendo entrada (array) vindo do "main" para o objeto tipo Matriz
    let entradas = Matriz.paraMatriz(entrada_array);

    //oculta = multiplicar this.pesos_eo (pesos de entrada-camada oculta) com entradas
    //matematicamente: H = W * I (camada oculta = pesos * entradas)
    let oculta = Matriz.multiplicar(this.pesos_eo, entradas);

    //adicionar bias em cada nó da camada oculta
    oculta.add(this.bias_o);

    // gerando saida da camada oculta usando funcao de ativação
    oculta.map(sigmoid);

    //--Gerando as saidas da rede neural

    //saida = multiplicar this.pesos_os (pesos de camada oculta-saida) com camada.oculta
    //matematicamente: O = W * H (camada oculta = pesos * entradas)
    let saida = Matriz.multiplicar(this.pesos_os, oculta);

    //add bias em cada nó da saida
    saida.add(this.bias_s);

    // gerando saida usando funcao de ativação
    saida.map(sigmoid);

    // convertendo tipo Matriz para array e retornando valores  
    return saida.paraArray();
  }
}