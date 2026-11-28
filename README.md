Dupla: Lucas Bispo da Cruz e Enrique Meira Charão.
Tema: Sistema Escolar para cadastro de alunos e professores.

Requisitos funcionais:
RF01: O sistema deverá permitir o cadastro de alunos e professores.
RF02: O sistema terá de verificar se campos obrigatórios como "E-Mail, Nome e senha" estão sendo preenchidos.
RF03: O sistema terá uma função de atualizar os dados dos cadastrados.
RF04: Os dados necessários para se realizar um cadastro será:
1. Nome
2. E-Mail
3. Senha
4. CPF
5. Cargo (No caso aluno ou professor)
RF05: O sistema terá uma função para excluir alunos e professores já cadastrados anteriormente.
RF06: O sistema deverá ter um meio de consultar alunos e professores.

## Acesso ao MongoDB Atlas

O projeto utiliza o MongoDB Atlas como banco de dados na nuvem.

**Configurações do banco:**

- Banco de dados: `ptas3`
- Coleção: `peoples`
- Plataforma: MongoDB Atlas
- Usuário de conexão da aplicação: `dbPTAS`

**Como acessar os dados:**

1. Acesse o [MongoDB Atlas](https://cloud.mongodb.com/).
2. Entre na organização e no projeto correspondente.
3. Acesse a opção **Database**.
4. Abra o **Data Explorer**.
5. Localize o banco de dados `ptas3`.
6. Abra a coleção `peoples` para visualizar os registros cadastrados.

**Configuração da conexão:**

A aplicação utiliza a variável de ambiente `MONGODB_URI` para estabelecer a conexão com o banco.

No arquivo `.env`, deve ser configurada a seguinte variável:

```env
MONGODB_URI=sua_string_de_conexao
```

A string de conexão e a senha não são disponibilizadas publicamente por questões de segurança.

## Versionamento da API

A API utiliza versionamento por URL para permitir
a evolução do contrato sem prejudicar os clientes
que utilizam versões anteriores.

### API v1
Base URL: http://localhost:3000/api/v1/peoples

Retorna os dados diretamente em formato de array
nas consultas de listagem.

### API v2
Base URL: http://localhost:3000/api/v2/peoples

Retorna os dados dentro de um objeto contendo
`data` e `meta`.

A versão v1 continua disponível simultaneamente
com a v2.

### Configuração de acesso à rede

O MongoDB Atlas está configurado em Network Access com a regra `0.0.0.0/0`, permitindo conexões de diferentes endereços IP.

Essa configuração foi utilizada para facilitar o desenvolvimento e os testes da aplicação. Para maior segurança, recomenda-se restringir o acesso aos endereços IP autorizados.

## Integração com Prisma ORM

O projeto utiliza o Prisma ORM 6.19.3 para realizar a comunicação entre o backend e o MongoDB Atlas, substituindo o acesso direto pelo MongoDB Driver.

O Prisma facilita as operações no banco de dados, permitindo consultar, cadastrar, atualizar e excluir registros por meio de métodos próprios.

### Configuração

A integração utiliza o pacote `prisma` e o `@prisma/client`.

Para instalar:

```bash
npm install prisma@6.19.3 --save-dev
npm install @prisma/client@6.19.3
```

### Schema Prisma

O modelo principal da aplicação é `Person`, responsável por representar alunos e professores.

O schema está localizado em `prisma/schema.prisma` e utiliza a coleção existente `peoples` no MongoDB Atlas.

```prisma
model Person {
  id         String    @id @default(auto()) @map("_id") @db.ObjectId
  legacyId   Int       @unique @map("id")
  name       String
  email      String    @unique
  cpf        String
  category   String
  discipline String?
  deletedAt  DateTime?

  @@map("peoples")
}
```

### Configuração da conexão

A conexão é realizada por meio da variável `DATABASE_URL`, definida no arquivo `.env`:

```env
DATABASE_URL="mongodb+srv://USUARIO:SENHA@SEU_CLUSTER.mongodb.net/ptas3"
```

A instância do Prisma Client é criada em `src/lib/prisma.js`:

```javascript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
```

### Comandos utilizados

Gerar o Prisma Client:

```bash
npx prisma generate
```

Validar o schema:

```bash
npx prisma validate
```

Sincronizar o modelo com o banco de dados:

```bash
npx prisma db push
```

**Observação:** por utilizar MongoDB, o projeto utiliza `prisma db push` em vez de `prisma migrate dev`.

### Operações com Prisma

O arquivo `src/models/personModel.js` utiliza o Prisma Client para executar as operações de banco de dados:

- `findMany()`: listar pessoas.
- `findFirst()`: buscar registros.
- `create()`: cadastrar pessoas.
- `updateMany()`: atualizar e realizar exclusão lógica.

### Exclusão lógica

O sistema utiliza o campo `deletedAt` para implementar a exclusão lógica.

Quando uma pessoa é excluída, sua data de exclusão é registrada, mantendo o documento armazenado no MongoDB Atlas.

Dessa forma, os registros excluídos deixam de aparecer nas consultas normais, mas não são removidos definitivamente do banco de dados.
