# Sistema para envio de mensagens de utilidade pública

Esse projeto tem por objetivo criar uma aplicação que permita o envio de mensagens de interesse público para a população alvo. O intuito é facilitar o compartilhamento de informações como eventos, situações emergenciais, campanhas de saúde e outros assuntos relevantes para a comunidade, fornecendo um meio que permita grande alcance em um curto período de tempo e a possibilidade de escolha do público alvo das mensagens.
O projeto consiste em uma aplicação web para envio da mensagens e um banco de dados para o cadastramento de dados dos destinatários. 

# Projeto
O projeto está organizdo em três subprojetos (pastas) que a partir de agora também serão denomiandos de projetos. Aqui temos três projetos, um para o backend (banco de dados e apis) chamado de **laravel**, um para o frontend chamado de **nodejs** e um outro para disparo de mensagem via whatsapp chamado de **chatbot**. A seguir temos instruções de como rodar cada um desses projetos. 

**ATENÇÃO**: a princípio a única dependência para rodar todos os projeto é ter o [Docker](https://www.docker.com/) instalado.

## Laravel
Para rodar esse projeto vá dentro da pasta *laraval* e dispare os comandos

```
cp .env.example .env
docker compose up
```

## NodeJs
Para rodar esse projeto vá dentro da pasta *nodejs* e dispare o comando

```
docker compose up
```

## Chatbot
Para rodar esse projeto vá dentro da pasta *chatbot* e dispare o comando

```
docker compose up
```