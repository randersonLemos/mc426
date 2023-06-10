const express = require('express');
const venom = require('venom-bot');


// API
const app = express();
const PORT = 5100;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
var fs = require('fs');
const { default: axios } = require('axios');


// Venom bot client
let client = null

const start = async (client) => {

  //Envia imagem para um numero
  app.post('/api/chatbot/sendimage', async (request, response) => {
    try {
      const number = request.body.number + '@c.us'
      const message = request.body.message

      let valid_number = number
	    //let is_success = false
      	    //let valid_number = ''
      	    //console.log('Chatbot: Checking number status...')
      	    //const chat = await client.checkNumberStatus(number)
      	    //.then((result) => {
      	    //  console.log('NUMBER STATUS Result: ', result); //return object success
      	    //  valid_number=result.id._serialized
      	    //  is_success = true
      	    //}).catch((erro) => {
      	    //    console.error('NUMBER STATUS Error when sending: ', erro); //return object error
      	    //          response.status(400).json({ status: erro })
      	    //});
      	    //if (!is_success){
      	    //       return
      	    //}
      //console.log(chat)
      const base64 = 'data:image/jpg;base64,' + request.body.base64

      console.log('Chatbot: sending message...')
      await client.sendImageFromBase64(valid_number, base64, 'image', message)
      .then((result) => {
        console.log('Result: ', result); //return object success
        response.json({ status: 'OK' })
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        response.status(400).json({ status: erro })
      });

    } catch (error) {
      console.error('Error when sending: ', error); //return object error
      response.status(400).json({ status: 'ERROR' })
    }
  });

  //Envia mensagem de texto
  app.post('/api/chatbot/sendtext', async (request, response) => {
    try {
      const number = request.body.number + '@c.us'
      const message = request.body.message

      console.log('Chatbot: sending message...')
      await client.sendText(number, message)
      .then((result) => {
        console.log('Result: ', result); //return object success
        response.json({ status: 'OK' })
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        response.status(400).json({ status: erro })
      });
    } catch (error) {
      console.error('Error when sending: ', error); //return object error
      response.status(400).json({ status: 'ERROR' })
    }
  });


  //Envia mensagem de texto
  app.post('/api/chatbot/sendtextmany/', async (request, response) => {
    try {
      const numbers = request.body.numbers
      const message = request.body.message

      numbers.forEach(async (element) => {
          console.log('Chatbot: sending message...', element)
          let number = element + '@c.us'

          await client.sendText(number, message)
          .then( (result) => {
            console.log('Result: ', result); //return object success
          })
          .catch( (error) => {
            console.error('Error when sending: ', error); //return object error
            response.status(400).json({ status: 'ERROR' })
          })
      });
      response.status(200).json('Ok')
    } catch (error) {
        console.error('Error when sending: ', error); //return object error
        response.status(400).json({ status: 'ERROR' })

    }
  });


  //Envia imagem para um grupo
  app.post('/api/chatbot/group/sendimage', async (request, response) => {
    try {
      const number = request.body.number + '@g.us'
      const message = request.body.message
      let base64 = 'data:image/jpg;base64,' + request.body.base64
      //console.log(base64)

      await client.sendImageFromBase64(number, base64, 'image', message)
      .then((result) => {
        console.log('Result: ', result); //return object success
        response.json({ status: 'OK' })
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        response.status(400).json({ status: erro })
      });
    } catch (error) {
      console.error('Error when sending: ', error); //return object error
      // response.json({status: 'ERROR'}, 400)
      prom_sendmsg_failure_total.inc()
      response.status(400).json({ status: 'ERROR' })
    }
  });

}

app.listen(PORT, async () => {
  try {

    client = await venom.create({
      multidevice: true,
    }).then((client) => start(client))
      .catch((erro) => {
        console.log(erro)
        proccess.exit(0)
      });

    console.log(`Express server currently running on port ${PORT}`)

  } catch (erro) {
    console.log(erro);
  }

});





