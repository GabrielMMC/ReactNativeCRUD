import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import {
  Text, StyleSheet, SafeAreaView, TextInput,
  TouchableOpacity, Image
} from 'react-native';
import Logo from '../../images/logo.png'
import MenuTabs from '../MenuTabs/menutabs'
import { hydrateRoot } from 'react-dom/client';
import firebase from '../../services/connectionFirebase';
import { Link, useNavigation } from '@react-navigation/native';

const rootElement = document.getElementById('root');


function onPressMenuTabs() {
  const root = hydrateRoot(rootElement, <MenuTabs />);

}

export default function Login(props) {
  const [email, setEmail] = useState('lanalana@hotmail.com');
  const [password, setPassword] = useState('123456');
  const [type, setType] = useState('login');
  const [status, setStatus] = useState('');

  function handleLogin() {
    if (type === 'login') {

      // Aqui fazemos o login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log('logou', user, props.setUser)
          props.setUser(user.user.uid)
          // props.navigation.push('menutabs')
        })
        .catch((err) => {
          console.log(err);
          alert('Email ou senha não cadastrados!');
          return;
        })



    } else {
      // Aqui cadastramos o usuario 
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log('cadastrou', user)
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          setStatus(err)
          console.log(err);
          alert('Erro ao Cadastrar!');
          return;
        })
    }
  }
  console.log('props', props)

  function handleCadastrar(){
    // const root = hydrateRoot(rootElement, <Cadastrar />);
    console.log('cadastrar')
    props.navigation.push('sigin')
  }

  return (
    <SafeAreaView style={styles.container}>
      <div className='row m-auto'>
        <div className='col-12'>
          <img
            src={Logo} style={{
              padding: 10,
              maxWidth: '100%',
              maxHeight: '100%',
              margin: 'auto',
              borderRadius: 360,

            }} />
        </div>

        <div className='col-12 my-3 text-warning'>
          <input placeholder="Digite seu Email"
            className='form-control m-auto bg-dark text-warning'
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input>
        </div>

        <div className='col-12 mb-3'>
          <input placeholder="*******"
            className='form-control m-auto bg-dark text-warning'
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className='col-6 m-auto'>
          <TouchableOpacity
            style={[styles.handleLogin,
            { backgroundColor: type === 'login' ? '#F0BF78' : '#9FDB8F' }]}
            onPress={() => type === 'login' ? handleLogin() : handleCadastrar()}
          >
            {console.log('navigate', navigation)}
            <Text style={styles.loginText}>
              {type === 'login' ? 'Entrar' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>



          <TouchableOpacity onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')} >
            <Text style={{ textAlign: 'center' }}>
              {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
            </Text>
          </TouchableOpacity>
        </div>
      </div>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 25,
  },
  input: {

    backgroundColor: 'black',
    color: '#D6A54F',
    borderRadius: 10,
    height: 45,
    marginBottom: 10,
    width: 320,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D6A54F'
  },

  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,

  },

  loginText: {
    color: '#FFF',
    fontSize: 20,
  }
})