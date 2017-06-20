# SimpleCanvas
Uma simples painel de desenho utilizando canvas, com opções de cores e tamanho do pincel

# Dependências
O Projeto utiliza o framework Bootstrap e o pacote de fontes FontAwesome

Para começar. importe o arquivo simplecanvas.js em sua pagina

crie um elemento "canvas" no corpo do seu documento e atribua-o um ID

depois é so chamar a init da classe informando o ID do canvas

```
// Criando o elemento o código html
<canvas id="sketch"></canvas>
```

```
// iniciando a instancia
simpleCanvas.init('sketch');
```


# Metodos disponiveis
```
init(ID_ELEMENT) // cria a instância do elemento
setSize(WIDTH, HEIGHT) // altera o tamanho do elemento canvas
clear() // limpa todo o desenho feito
setColor(HEX_COLOR) // define a cor do pincel
setRadius(SIZE) // define o tamanho do pincel
undo() // reverte a ultima alteração realizada
```
