# Sobre

Este projeto tem o intuito de criar um bot que transmite mensagens do twitter ao discord.

# Bibliotecas

- "discord.js": "^14.6.0"
- "dotenv": "^16.0.3"
- "twitter-api-v2": "^1.12.8"

# Como rodar

Inicialmente, clone o repositório:

```bash
$ git clone https://github.com/LucasAlvesBS/bot-discord-twitter.git
```

Agora, é importante gerar as chaves (token) do [Twitter](https://developer.twitter.com/en) e do
[Discord](https://discord.com/developers/applications) para serem adicionadas no arquivo ".env".

Para instalar as dependências necessárias, execute:

```bash
$ npm install
```

Para rodar a aplicação na máquina local:

```bash
# Produção
$ npm run start

# Desenvolvimento
$ npm run dev
```

Para rodar no docker, construa a imagem:

```bash
$ docker build -t <nome-do-app>:<tag> .
```

Ex.: docker build -t bot:1.0 .

Posteriormente, execute o comando:

```bash
$ docker run <nome-do-app>:<tag>
```

# Tecnologias

- Docker
- NodeJS
- TypeScript

# Variáveis de Ambiente

Na raiz do projeto, consta um arquivo ".env.example", que exibe todas as variáveis de ambiente necessárias. Para rodar a aplicação, altere o nome do arquivo para ".env" e preencha as variáveis com os seus respectivos valores.

Para obter o ID de um perfil no twitter, acesse [Twitter-ID](https://commentpicker.com/twitter-id.php).

# Links

- [Docker](https://docs.docker.com/)
- [NodeJS](https://nodejs.org/en/docs/)
- [TypeScript](https://www.typescriptlang.org/docs/)
