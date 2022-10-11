import express from 'express'
import bcrypt from 'bcrypt'
import stripe from 'stripe'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

//configuracion de firebase
const firebaseConfig = {  
  apiKey: "AIzaSyAXAa5qVHmQLz_ChngTdCh4-wQvgm4Vvws",
  authDomain: "ecommerce-8ec5d.firebaseapp.com",
  projectId: "ecommerce-8ec5d",
  storageBucket: "ecommerce-8ec5d.appspot.com",
  messagingSenderId: "433028449960",
  appId: "1:433028449960:web:333055df42a4a047cae49d"
}

const firebase=initializeApp(firebaseConfig)
const db=getFirestore()


//inicializacion del servidor
const app=express()
//middware
app.use(express.static('public'))
app.use(express.json())//permite compartit forms

//rutas
//ruta home
app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:'public'})
})

app.listen(3000,()=>{
    console.log('Servidor en Ejecucion...')
})
