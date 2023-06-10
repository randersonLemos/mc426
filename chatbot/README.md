# Chatbot
Projeto dedicado ao envio de mensagens para números de WhatsApp do Sistema de Alertas. Esse projeto foi inspirado em [Venom](https://github.com/orkestral/venom.git) e se dedica a externalizar as APIs responsáveis pelo envio messagens para números de Whatsapp.

O projeto está dockerizado e para rodá-lo basta disparar o comando:

```
docker compose up -d
```

Na primeira vez que o projeto está rodando um QRCode é apresentado na tela. Esse QRCode deve lido pelo aplicativo do WhatsApp de um usuário o qual, a partir desse momento, se tornará o bot do chatbot. Para mais informações consulatar documentação de [Venom](https://github.com/orkestral/venom.git).

Para rodar em modo localhost nenhuma configuração adicional é necessária, já, para rodar na núvem, provavelmente configurações de https são necessárias.

O projeto conta com arquivo do Insomina com as rotas existentes. Considerando que o projeto está rodando localhost, as rotas são:

* http://localhost:5100/api/chatbot/sendtext
* http://localhost:5100/api/chatbot/sendtextmany

Ambas as *requests* são POSTs e detalhes de como utilizá-las são encontrados no arquivo do Insomnia. 