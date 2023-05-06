import { collection, getDocs, query, where } from 'firebase/firestore'
import axios from 'axios'
import { db } from '@/pages/_app'

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

export async function userExists(uid: string) {
  // Create a reference to the cities collection
  const usersRef = collection(db, 'users')

  // Create a query against the collection.
  const q = query(usersRef, where('uid', '==', uid))
  const querySnapshots = await getDocs(q)
  
  if (querySnapshots.empty) return false

  return true
}
