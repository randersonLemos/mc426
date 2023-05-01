import axios from 'axios'

export async function sendMessage(number: string, message: string) {
  const options = {
    method: 'POST',
    url: 'https://mc426chatbot.ddns.net/api/chatbot/sendtext',
    headers: { 'Content-Type': 'application/json' },
    data: { number, message },
  }

  return await axios
    .request(options)
    .then((response) => response.data)
    .catch(function (error) {
      console.error(error)
    })
}
