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

### Configuração de acesso à rede

O MongoDB Atlas está configurado em Network Access com a regra `0.0.0.0/0`, permitindo conexões de diferentes endereços IP.

Essa configuração foi utilizada para facilitar o desenvolvimento e os testes da aplicação. Para maior segurança, recomenda-se restringir o acesso aos endereços IP autorizados.
