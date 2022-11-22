import firebase from 'firebase/compat/app';

//autenticação de email e senha
import 'firebase/compat/auth';

//possibilita trabalhar junto ao banco de dados
import 'firebase/compat/database'; 


let firebaseConfig = {
    apiKey: "AIzaSyB9Gu1O_kjeWKmVjE2muZ0NE1B_IcB3O1s",
    authDomain: "bancoloja-21511.firebaseapp.com",
    projectId: "bancoloja-21511",
    storageBucket: "bancoloja-21511.appspot.com",
    messagingSenderId: "373248298934",
    appId: "1:373248298934:web:2a7ef365afd43be043bb17"
  };

  if(!firebase.apps.length){ // se o tamanho do firebase for vazio, então ele abre, caso contrário ele ta aberto
      // Inicializa o Firebase

      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;