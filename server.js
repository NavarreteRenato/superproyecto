import express from 'express'
import bcrypt, { compare } from 'bcrypt'
import stripe from 'stripe'
import {initializeApp} from 'firebase/app'
import {collection, getDoc, getFirestore, setDoc} from 'firebase/firestore'

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

//ruta para registrar
app.get("/signup",(req,res)=>{
  res.sendFile('signup.html',{root:'public'})
})

//ruta login
app.get("/login",(req,res)=>{
  res.sendFile('login.html',{root:'public'})
})

app.post('/login',(req,res)=>{
  let {email,password}=req.body
  if(!email.length||!password.length){
    return res.json({
      'alert':'fild all the inputs'
    })
  }
  const users=collection(db,'users')
  getDoc(doc(users,email))
  .then(user=>{
    if(!user.exists()){
      return res.json({
        'alert':'fild all the inputs'
      })
    }else{
      bcrypt.compare(password,user.data(),password,(err,result)=>{})
      if(result){
        let data =user.data()
        return res.json({
          name: data.name,
          email:data.email,
          seller:data.seller
        })
      }else{
        return res.json({'alert': 'password incorrect'})
      }
    }
  })
})


app.post('/signup',(req,res)=>{
  const {name,email,password,number,tac}=req.body
  //validaciones 
  if(name.length<3){
    res.json({'alert': 'name must be 3 letters long'})
  }else if(email.length){
    res.json({'alert': 'enter your email'})
  }else if(password.length<8){
    res.json({'alert':'password must be 8 letters long'})
  }else if(!Number(number)||number.length<10){
    res.json({'alert':'invalid number, please enter valid one'})
  }else if(!tac){
    res.json({'alert':'yoyr must agree to our terms'})
  }else{
    //almacenar datos en db
    const users=collection(db,"users")
    getDoc(users,email).then(user=>{
      if(user.exists()){
        res.json({'alert':'email already exist'})
      }else{
        //encriptar password
        bcrypt.genSalt(10, (err,hash)=>{
          req.body.password=hash
          req.body.server=false
          setDoc(doc(user,email),req.body).then(data=>{
            res.json({
              name: req.body.name,
              email: req.body.email,
              seller: req.body.seller
            })
          })
        })
      }
    })
  }
})

app.listen(3000,()=>{
    console.log('Servidor en Ejecucion...')
})
