# Book API

Este repositório apresenta uma API desenvolvida em Node.js, utilizando o ORM Sequelize para interagir com um banco de dados Postgres. A principal funcionalidade da API é realizar operações CRUD (Create, Read, Update, Delete) com os dados de livros armazenados no banco de dados.

## Tecnologias Utilizadas

<div style="display: flex; justify-content: space-between;">
    <a href="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge">
    </a>
    <a href="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
        <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express Badge">
    </a>
    <a href="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
        <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" alt="Sequelize Badge">
    </a>
    <a href="https://img.shields.io/badge/Postgres-336791?style=for-the-badge&logo=postgresql&logoColor=white">
        <img src="https://img.shields.io/badge/Postgres-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres Badge">
    <a href="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
        <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" alt="Postgres Badge">
</div>

## Endpoints

### Criar Livro

- **Método**: POST
- **URL**: `/api/books`
- **Descrição**: Cria um novo livro com os detalhes fornecidos no corpo da requisição.

  **Corpo da Requisição (JSON)**:

  ```json
  {
      "title": "string" (obrigatório),
      "author": "string" (obrigatório),
      "genre": "string" (obrigatório),
      "published_date": "YYYY-MM-DD",
      "summary": "string",
      "isbn": "string"
  }
  ```

### Buscar Livros

- **Método**: GET
- **URL**: `/api/books`
- **Descrição**: Retorna uma lista de livros baseada nos parâmetros de consulta fornecidos.

  **Parâmetros da Query**:

  - `author`: Filtra livros pelo autor
  - `title`: Filtra livros pelo título
  - `genre`: Filtra livros pelo gênero
  - `limit` (opcional): Limita o número de resultados
  - `offset` (opcional): Offset para paginação dos resultados

  **Exemplo de Uso**:

  ```json
  GET /api/books?author=Stephen&genre=Fiction&limit=5
  ```

### Buscar Livro por ID

- **Método**: GET
- **URL**: `/api/books/:id`
- **Descrição**: Retorna os detalhes de um livro específico pelo ID fornecido.

  **Parâmetros da Rota**:

  - `id`: ID único do livro (obrigatório)

### Atualizar Livro por ID

- **Método**: PUT
- **URL**: `/api/books/:id`
- **Descrição**: Atualiza os detalhes de um livro específico identificado pelo ID.

  **Parâmetros da Rota**:

  - `id`: ID único do livro (obrigatório)

  **Corpo da Requisição (JSON)**:

  ```json
  {
    "title": "string",
    "author": "string",
    "genre": "string",
    "published_date": "YYYY-MM-DD",
    "summary": "string",
    "isbn": "string"
  }
  ```

### Deletar Livro por ID

- **Método**: DELETE
- **URL**: `/api/books/:id`
- **Descrição**: Deleta um livro específico pelo ID fornecido.

  **Parâmetros da Rota**:

  - `id`: ID único do livro (obrigatório)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/wandrey7/Books-API
   cd Books-API
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias, como:

   ```
   PORT=3000
   DATABASE_URL=postgres://usuario:senha@localhost:5432/nome-do-banco
   ```

4. Inicie a aplicação:

   ```bash
   npm start
   ```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
