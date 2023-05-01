import axios from "axios";

export async function sendMessage(message: string) {
    const options = {
      method: 'POST',
      url: 'https://mc426chatbot.ddns.net/api/chatbot/sendtext',
      headers: { 'Content-Type': 'application/json' },
      data: { number: '5519988352366', message }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }