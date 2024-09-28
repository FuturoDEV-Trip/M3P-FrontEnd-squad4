# M3P-FrontEnd-squad4

## Squad 4 - Viagem365

| Função              | Nome                                  | GitHub                         |
|---------------------|---------------------------------------|--------------------------------|
| Product Owner       | Alana Daniele de Oliveira Carneiro    | [a-natureza](https://github.com/a-natureza) |
| Integrante          | Keeity Braga Collodel                 | [Keeity](https://github.com/Keeity) |
| Integrante          | Rebeca Verissimo                      | [RebecaVerissimo](https://github.com/RebecaVerissimo) |
| Integrante          | Ingo Strunck Junior                   | [isjrsc](https://github.com/isjrsc) |



# TRIP FLOW

## Apresentação da TRIP FLOW 
A TripFlow é uma plataforma para promover viagens sustentáveis e experiências positivas para os usuários, fornecendo acesso a informações sobre destinos turísticos, praias, atrações naturais e atividades recreativas.

Os usuários podem explorar e descobrir novos destinos, encontrar dicas de viagem sustentável, compartilhar suas experiências e avaliações, inclusive quanto à acessibilidade e coleta de lixo seletiva.
 
Assim, o usuário terá como guardar todos os locais visitados e avaliados, para poder acessá-las futuramente e até mesmo compartilhar experiências com amigos ou pessoas desconhecidas do mundo todo.

As funcionalidades incluem o cadastro de usuário, dashboard com todos os locais cadastrados, inclusive mapa, inclusão, edição e seleção de destinos, visualização de informações dos destinos, entre outras.

Este projeto é uma solução simples e eficiente voltada ao turismo sustentável para facilitar a criação de roteiros de viagens e compartilhamento de experiências entre os viajantes.

Este é o MVP do projeto de frontEnd, complementando o projeto apresentado no módulo 1, de BackEnd. A proposta final da API busca atender à dificuldade dos usuários em planejar viagens a partir de uma plataforma que traga roteiros individualizados de viagem, incluindo atrações turísticas, hoteis e restaurantes, a partir das seleções feitas pelos usuários e considerando as avaliações dos demais usuários.


## Sobre a construção do projeto de Front End
Ao construir a aplicação proposta, foram colocados em prática os aprendizados em:
   * Versionamento: Uso do GitHub para versionamento de código.
   * HTML: Tags e Elementos semânticos
   * CSS: Seletores, Principais estilos, Layouts e Flexbox
   * JavaScript: Variáveis, Tipos de dados, Operadores, Manipulação do DOM, Estrutura de Controle de Fluxo, Funções, Eventos, JSON, LocalStorage, Interval, Timeout, Operadores Rest e Spread, Módulos, Arrow Functions, Funções de Arrays, Funções Assíncronas e Fetch.
   * React: Renderização de componentes, Props, Proptypes, Hooks, Eventos, Renderização de listas, React Router, Formulários, Composition, Estilos, Developer Tools e Deploy.
   * Skills: Organização, criação de documentação e apresentação de solução.

   ### Frontend desenvolvido em React.js
O projeto de frontend desta aplicação foi construído com a biblioteca de JavaScript, React.js, para permitir a interação com o backend através de uma API RESTful (Projeto Módulo 1), permitindo aos usuários realizar várias ações, como cadastro, listagem, edição e seleção de destinos, visualização de informações dos destinos, entre outras.
* Documentação do React: `https://reactjs.org/docs/getting-started.html`

   ### JSONServer 
Documentação do JSONServer: `www.npmjs.com/package/json-server`.

 Neste projeto, houve a simulação de criação de um servidor para armazenar e recuperar dados, pelo JSONServer, a partir do arquivo "db.json",  gerando os seguintes EndPoints:
   1. `http://localhost:3000/usuarios`
   2. `http://localhost:3000/spots`


   ### Context API e LocalStorage
A aplicação utiliza a Context API do React para gerenciar os dados globais da aplicação. Além disso, o LocalStorage é usado para persistir os dados no estado global, permitindo que os dados do usuário sejam mantidos mesmo após o fechamento e reabertura do navegador e permitindo validações.


   ### ESTRUTURA DO FRONTEND 
   Este projeto segue uma estrutura de organização baseada em funcionalidades, pautando-se em atomic design, mas de forma simplificada, para não molecularizar tanto.
   Essa estrutura ajuda a manter o código organizado e fácil de navegar, além de facilitar o trabalho colaborativo com outros desenvolvedores. Na pasta principal (SRC), constam as seguintes pastas:
   1. assets: armazenar arquivos estáticos que são usados no frontend da aplicação, a exemplo de imagens.
   2. components: contém todos os componentes reutilizáveis.
   3. contexts: contém todos os Contextos da aplicação, sendo que cada arquivo dentro desta pasta define um Contexto React, que permite compartilhar dados globais entre vários componentes sem a necessidade de passar explicitamente esses dados através de props.
   4. hooks: contém todos os hooks personalizados.
   5. pages: contém todas as páginas da aplicação.
   6. routes: contém todas as rotas da aplicação.
   7. services: contém todas as funções que interagem com a API.

   ### Utilização de API VIACEP e API Nominatim
   A aplicação utiliza a API do ViaCEP para o cadastro de usuário e a API Nominatim para o cadastro de locais, que puxa o endereço e as coordenadas. Aqui, o usuário digita o nome do local e ele já puxa pelo nome, mas também permite puxar por CEP, quando preenchido.

## 🚀 Rotas e Páginas
O projeto foi estruturado para que os usuários, a depender do seu tipo de permissão, pudessem utilizar as funcionalidades relacionadas ao Cadastro, ao setor de Atrações Turísticas Privadas de cada usuário e ao setor de Atrações Turísticas Gerais, permitindo o acesso às funcionalidades apenas se o usuário for cadastrado e estiver logado.

   #### Rota para Login: `/login` - Página: SigninPage
   Inicia com uma página para login e, caso não tenha cadastro, direciona para a página de cadastro.
![Trip Flow - projeto](https://github.com/Keeity/tripFlowFront/blob/main/src/assets/images/login.jpg)

   #### Rota para Cadastro de usuário: `/cadastro` - Página: SignupPage
A aplicação inclui uma página para cadastrar novos usuários, se já cadastrado, direciona ao login. Os usuários podem se cadastrar fornecendo as informações necessárias e, em seguida, fazer login para acessar a aplicação.

Todos os inputs de formulário de cadastro foram usados de maneira correta, com validação para garantir que todos os campos obrigatórios fossem preenchidos, além de validações adicionais com HookForm.
![Trip Flow - projeto](https://github.com/Keeity/tripFlowFront/blob/main/src/assets/images/cadastroUser.jpg)

   #### Rota para Dashboard: `/dashboard` - Página: DashboardPage
   página de Dashboard foi criada com cards para exibir as informações corretas. Ela fornece uma visão geral dos locais de viagem cadastrados, além de informar a quantidade de Usuário e Locais cadastrados, bem como mapa para visualização de todos os locais. 
![Trip Flow - projeto](https://github.com/Keeity/tripFlowFront/blob/main/src/assets/images/dashboard.jpg)

   #### Rota para Listagem de locais: `/locais` - Página: SpotsPage
   Lista os "Meus Locais", ou seja, todos os locais cadastrados pelo usuário, havendo opção de editar, excluir ou visualizar detalhes do local cadastrado pelo usuário.
![Trip Flow - projeto](https://github.com/Keeity/tripFlowFront/blob/main/src/assets/images/meuslocais.jpg)

#### Rota para Cadastro de nova Atração Turística Privada: `/local - Página`: SpotRegistrationPage
 A aplicação inclui uma página para cadastrar e/ou editar locais de destino da viagem. Os usuários podem fornecer as informações necessárias para criar um novo local de destino ou editar um existente, desde que cadastrado por si.
 ![Trip Flow - projeto](https://github.com/Keeity/tripFlowFront/blob/main/src/assets/images/localregistration.jpg)

#### Rota para Visualização de atração específica cadastrada pelo próprio usuário: /local/:id - Página: SpotViewPage
É usada para visualizar os detalhes de um local de destino específico, a partir da seleção no dashboard ou mesmo nos locais (Meus locais). Semelhante à rota de edição, o ID do local de destino é passado como um parâmetro na URL. A aplicação então carrega as informações completas desse local de destino da API e as exibe na página.  Esta página é somente leitura e não permite ao usuário fazer alterações nas informações. Se o usuário desejar editar as informações, ele pode navegar para a rota de edição correspondente.
![Trip Flow - projeto](https://github.com/Keeity/tripFlowFront/blob/main/src/assets/images/localviewid.jpg)

#### Rota para Alteração de atração específica cadastrada pelo próprio usuário: `/local/edit/:id` - Página: SpotEditPage
  Caos o usuário aperte em editar em `/locais`, leva para editar as informações de um local de destino específico que foi cadastrado pelo usuário. O usuário pode alterar qualquer informação e, em seguida, salvar as alterações, que são enviadas para armazenar no db.JSON.
![Trip Flow - projeto](https://github.com/Keeity/tripFlowFront/blob/main/src/assets/images/editarlocal.jpg)

## Rotas privadas
Neste projeto, algumas rotas são privadas, somente podendo ser acessadas por usuários autenticados. Isso é feito usando um componente PrivateRoute que verifica se o usuário está autenticado antes de renderizar o componente da rota.

O componente PrivateRoute usa o hook useAuth para acessar o estado de autenticação do usuário. Se o usuário não estiver autenticado (ou seja, user é null), o componente PrivateRoute redireciona o usuário para a página de login usando o componente Navigate do react-router-dom. Se o usuário estiver autenticado, o componente PrivateRoute renderiza os componentes filhos passados a ele, que são os componentes das páginas que você deseja proteger.

No componente RoutesComponent, as rotas para as páginas DashboardPage, SpotsPage, SpotRegistrationPage, SpotEditPage e SpotViewPage são envolvidas pelo componente PrivateRoute. Isso significa que essas páginas só podem ser acessadas por usuários autenticados. Se um usuário não autenticado tentar acessar essas rotas, ele será redirecionado para a página de login.

 ## Implementações Extras

### Responsividade para Diferentes Tipos de Tela: 
As páginas de login, cadastro de usuário, cadastro de locais, dashboard, etc, receberam a implementação de responsividade para diferentes tamanhos de tela. Isso garante que a aplicação seja facilmente utilizável em uma variedade de dispositivos, incluindo desktops, tablets e smartphones.

### Uso de Mapas:
 Foi implementado o uso de mapas, e o mesmo está funcionando adequadamente. O mapa foi implementado tanto na página de Dashboard como nas páginas de visualização dos detalhes de cada local.

 ## Configurar o Repositório:

   ### Se quiser iniciar o repositório local:
   1. Cria uma pasta local e abre no VsCode
   2. Iniciar novo repositório local: `git init`

   ### Para copiar o repositório remoto:
   1. Copiar: `git clone https://github.com/Keeity/tripFlowFront` 

## Rodar o repositório:
Para executar o sistema React, você precisa ter o Node.js instalado em seu computador: `http://localhost:5173/local`

   ### Para começar a utilizar, é necessário instalar as dependencias (node_modules):
   1. `npm install`
   2. Se for em ambiente local: `npm install --dev`

   ### Para rodar o repositório em ambiente local
   1. No terminal 1, para executar o script vite em modo de desenvolvimento: `npm run dev`
   2. No terminal 2, para simular chamada à API utilizando JSONServer: `npm run server`


## Para acessar as funcionalidades da TripFlow

  ### Para conseguir acessar como administrador(`admin`), utilizar para login uma das opções abaixo:

#### Usuário admin Keeity
   * email: `keeity@email.com`
   *  password: `keeity123`

#### Usuário admin Nicholas
   * email: `nicholas@email.com`
   *  password: `nicholas123`

## Futuras Melhorias

Em breve, a ideia a ser implementada é integrar com o projeto de backend já criado no módulo 1, além de aperfeiçoar e criar novas páginas para atender a tudo que foi previsto no projeto inicial de backEnd.
 
De toda a forma, este é o MVP de uma plataforma que não apenas permite criação e busca de locais turísticos, mas que possibilita ao usuário já ter um roteiro de viagem completo, incluindo locais turísticos, hoteis, restaurantes, o mais personalizado possível.

![Trip Flow - projeto](https://github.com/Keeity/tripFlowFront/blob/main/src/assets/images/ideia_final.jpg)

## Links da API

   ### Repositório do GITHUB
   `https://github.com/Keeity/tripFlowFront`

   ### Vídeo apresentando a API
   `https://drive.google.com/drive/folders/1B0YLrdVQAEixMW1NGNHfFGGdB-sLxEUM?usp=drive_link`

 