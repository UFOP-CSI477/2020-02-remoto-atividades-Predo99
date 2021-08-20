# **CSI606-2020-02 - Remoto - Trabalho Final - Resultados**
## *Aluno: Pedro Henrique Sant'Ana*

--------------

### Resumo

  O trabalho final tem como tema o desenvolvimento de um "sistema educativo" com semelhanças com o Moodle/Udemy, onde professores podem cadastrar aulas, materiais e atividades, e alunos podem ter acesso ao conteúdo disponibilizado.

### 1. Funcionalidades implementadas

  As seguintes funcionalidades foram previstas e implementadas:
    * Cadastrar e atualizar Professores
      * Cadastrar e atualizar disciplinas
      * CRUD de aulas
      * CRUD de arquivos
      * CRUD de atividades
    * Cadastrar e atualizar Alunos
      * Realizar matrícula em disciplinas
      * Visualizar de aulas e arquivos
      * Visualizar e responder atividades
  
### 2. Funcionalidades previstas e não implementadas

  As seguintes funcionalidades foram previstas e implementadas:
      * Permitir aos alunos favoritarem disciplinas
      * Opção de filtrar disciplinas na página inicial
      * Permitir outros tipos de atividades, não somente as de múltipla escolha

### 3. Principais desafios e dificuldades
  
  Os principais desafios e dificuldades foram com relação às tecnologias utilizadas: Node.js, React, Typescript, MongoDB, pois são tecnologias com que tive pouco contato e/ou nenhum contato, então foi necessário aprender muito sobre elas, em especial no backend com a parte de autenticação, onde foi utilizado JSON Web Token (JWT), a parte de estados no frontend com react e a sintaxe e "tipagem" do Typescript.

### 4. Instruções para instalação e execução

  Para executar a aplicação é necessário possuir o Node.js e npm instalados. Também é possível utilizar o Yarn se preferir. Após isso é necessário rodar o comando npm install ou yarn install na raíz onde existem os arquivos package.json (frontend e backend). Após isso é necessário configurar o endereço do banco de dados (na aplicação foi utilizado o MongoDB Atlas, uma versão online do MongoDB que conta com planos gratuitos) no arquivo server.ts, assim como o usuário e senha no arquivo .env. Caso seja desejado é possível mudar as portas em que a aplicação será executada. Após isso, é necessário rodar o comando yarn dev ou npm run dev, no backend, e yarn start ou npm start no frontend.
  
  A versão dos componentes utilizadas foi a seguinte:
    * Node.js: v14.16.0
    * NPM: 6.14.11
    * Yarn: 1.17.3

### 5. Referências
  * Moodle. **Moodle**, 2021. Disponível em: https://www.moodlepresencial.ufop.br. Acesso em 20 ago. 2021.
  * Udemy, Inc. **Udemy**, 2021. Disponível em: https://www.udemy.com/pt/. Acesso em 20 ago. 2021.

