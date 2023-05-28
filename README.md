# Sistema para envio de mensagens de utilidade pública

Esse projeto tem por objetivo criar uma aplicação que permita o envio de mensagens de interesse público para a população alvo. O intuito é facilitar o compartilhamento de informações como eventos, situações emergenciais, campanhas de saúde e outros assuntos relevantes para a comunidade, fornecendo um meio que permita grande alcance em um curto período de tempo e a possibilidade de escolha do público alvo das mensagens.
O projeto consiste em uma aplicação web para envio da mensagens e um banco de dados para o cadastramento de dados dos destinatários. 

# [Como acessar o sistema online de recebimento e envio de alertas?](https://github.com/randersonLemos/mc426/wiki/Acessando-o-sistema)
# [Como rodar o sistema de recebimento e envio de alertas localmente?](https://github.com/randersonLemos/mc426/wiki/Rodando-o-sistema-locamente)

# Como rodar o Chatbot?
Para rodar esse projeto vá dentro da pasta *chatbot* e dispare o comando
```bash
docker compose up
```

# Descrição da arquitetura

Diagrama C4 em nível de componentes:
![image](https://github.com/randersonLemos/mc426/assets/54808604/ff888503-30c5-4f8b-953b-bb289c4799c3)

O estilo arquitetural da aplicação foi classificado como uma conjunção de dois estilos arquiteturais.

Um deles é o de Invocação Implícita (Publish/Subscribe) por conta da principal funcionalidade do projeto, que é a de envio de notificações. Os usuários se cadastram por meio de um formulário via interface web (meio de registro) e a aplicação (Publisher) envia mensagens para o WhatsApp (Subscriber) do número cadastrado.

Além disso, também foi identificada a similaridade com o estilo Model-View-Controller (MVC), ao considerar os componentes feitos em React como a apresentação (View) e o processamento interno da aplicação como o modelo de dados e serviços (Model). Considera-se que, a partir de mais desenvolvimento, seja possível tornar mais evidente a existência de um Controller (Controlador) no código.
