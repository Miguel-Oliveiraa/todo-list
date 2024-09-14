# Projeto [Nome do Projeto]

Bem-vindo ao Todo List! Este é um projeto web para gerenciar tarefas. Abaixo, você encontrará instruções sobre como configurar e rodar o projeto em sua máquina local.

## Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

- [MySQL](https://dev.mysql.com/downloads/)
- [Node.js](https://nodejs.org/)

## Configuração do Projeto

### 1. Configuração do Banco de Dados

1. Crie um banco de dados MySQL em seu ambiente local. O nome do banco de dados e as credenciais devem ser configurados com base no arquivo `backend/src/config/database.js`.

2. Certifique-se de ter as credenciais de conexão com o banco de dados prontas para usar.

### 2. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:

```env
jwtSecret="sua_chave_secreta"
jwtExpiration="30d"
```

Substitua "sua_chave_secreta" por uma chave secreta segura.

## Instruções para Rodar o Projeto

Para rodar o projeto, você precisará usar dois terminais diferentes. Siga os passos abaixo para configurar e iniciar o backend e o frontend:

### Terminal 1: Backend

Navegue para o diretório backend:

```
cd backend
```

Instale as dependências do backend:

```
npm install
```

Inicie o servidor de desenvolvimento do backend:

```
npm run dev
```

### Terminal 2: Frontend

Navegue para o diretório frontend:

```
cd frontend
```

Instale as dependências do frontend:

```
npm install
```

Inicie o servidor de desenvolvimento do frontend:

```
npm run dev
```

Agora, o backend e o frontend estarão rodando em paralelo. Você pode acessar a aplicação web no seu navegador e começar a utilizá-la.

## Contribuição

Se você quiser contribuir para o projeto, fique à vontade para fazer um fork e enviar pull requests. Para mais informações sobre como contribuir, veja o arquivo CONTRIBUTING.md.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

Se você tiver alguma dúvida ou encontrar algum problema, não hesite em abrir uma issue no repositório.

Obrigado por usar o Todo list! 🚀
