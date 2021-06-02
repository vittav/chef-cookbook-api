# chef-cookbook-api
A small project using NodeJS and MongoDB

## To build in your machine:

### Clone o repositório em sua máquina local

### Execute o comando `yarn install` para baixar e instalar os pacotes utilizados


### Execute o comando `node seeder/seed.js` para popular a database com usuários e receitas
Três chefs serão criados, escolha um (ou todos) para testar a funcionalidade de login:

[
  {
    name: 'Chef Fogaça',
    email: 'fogaca@cocobambu.com',
    password: '12345678',
    _id: 60b7205a2e2440008be74334
  },
  {
    name: 'Chef Jaquin',
    email: 'jaquin@cocobambu.com',
    password: '12345678',
    _id: 60b7205a2e2440008be74335
  },
  {
    name: 'Chef Paola',
    email: 'paola@cocobambu.com',
    password: '12345678',
    _id: 60b7205a2e2440008be74336
  }
]

### Após realizar o seed, abra o servidor com o comando `nodemon`

### Para testar a API os seguintes endpoints estão disponíveis:

#### GET localhost:8080/api/users
  retornará todos os usuários salvos no banco de dados mongoDB

#### GET localhost:8080/api/recipes
  retornará todas as receitas salvas no banco de dados, com seus ingredientes e seus passos

#### GET localhost:8080/api/recipes/:id
  retornará detalhes de uma receita específica

### POST localhost:8080/api/login, body: {email: <EMAIL_DO_USUÁRIO>, password: <SENHA_DO_USUÁRIO>}
  realizará o login do usuário e retornará os dados do usuário logado assim como seu Token

Para todos os requests acima, um header simples contendo { Content-Type:application/json } é o suficiente.


# Em termos de funcionalidade o app funciona no modelo MVC simples:

## index.js e db.js são responsáveis por iniciar e realizar a configuração inicial da aplicação e sua conexão com o banco de dados

## Quando o request é feito o router determina pra qual controller o request é enviado

## O Controller mata no peito e resolve o problema, dando a resposta adequada para o usuário

#### A parte do front-end pode ser encontrada em: https://github.com/vittav/chef-cookbook
