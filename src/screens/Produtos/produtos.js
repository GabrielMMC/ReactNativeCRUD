import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';
import {
  Text, StyleSheet, SafeAreaView, TextInput,
  TouchableOpacity, Image, FlatList, View
} from 'react-native';
import { hydrateRoot } from 'react-dom/client';
import firebase from '../../services/connectionFirebase'
import Listagem from '../Listar/listagem';
import DocumentPicker from 'react-native-document-picker';

const rootElement = document.getElementById('root');


function onPressMenuTabs() {
  const root = hydrateRoot(rootElement, <Produtos />);

}


export default function Produtos() {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');
  const [key, setKey] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  function limparDados() {
    setNome('')
    setMarca('')
    setPreco('')
    setImagem('')
  }

  const selectFile = async () => {
    // Abrir o selecionar arquivo para selecionar imagem
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('res : ' + JSON.stringify(res));
      setImagem(res);
    } catch (err) {
      setImagem(null);
      // Tratando possiveis erros
      if (DocumentPicker.isCancel(err)) {
        // Se upload cancelado
        alert('Upload cancelado');
      } else {
        // Para erro desconhecido
        alert('BotÃ£o em teste por enquanto: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  useEffect(() => {
    async function dados() {
      await firebase.database().ref('produtos').on('value', (snapshot) => {
        setProdutos([]);


        snapshot.forEach((chilItem) => {
          let data = {
            key: chilItem.key,
            nome: chilItem.val().nome,
            marca: chilItem.val().marca,
            preco: chilItem.val().preco,
            imagem: chilItem.val().imagem,
          };
          console.log('teste', data)
          setProdutos(oldArray => [...oldArray, data].reverse());
        })
        setLoading(false);
      })
    }
    dados();
  }, []);

  async function cadastrar() {
    //editar dados
    if (nome !== '' & marca !== '' & preco !== '' & imagem !== '' & key !== '') {
      firebase.database().ref('produtos').child(key).update({
        nome: nome, marca: marca, preco: preco, imagem: imagem
      })
      Keyboard.dismiss();
      alert('Produto Editado!');
      limparDados();
      setKey('');
      return;
    }
    //cadastrar dados
    let produtos = await firebase.database().ref('produtos');
    let chave = produtos.push().key;




    produtos.child(chave).set({
      nome: nome,
      marca: marca,
      preco: preco,
      imagem: imagem
    });



    alert('Produto Cadastrado!');
    limparDados();
  }


  function handleDelete(key) {
    firebase.database().ref('produtos').child(key).remove()
      .then(() => {
        const findProdutos = produtos.filter(item => item.key !== key)
        setProdutos(findProdutos)
      })
  }



  function handleEdit(data) {
    setKey(data.key),
      setNome(data.nome),
      setMarca(data.marca),
      setPreco(data.preco),
      setImagem(data.imagem)
  }

  console.log('imagem', imagem)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> Insira o nome do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" onChange={(e) => setNome(e.target.value)} value={nome} />

      <Text style={styles.text}> Insira a marca do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" onChange={(e) => setMarca(e.target.value)} value={marca} />

      <Text style={styles.text}> Insira o preço do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" onChange={(e) => setPreco(e.target.value)} value={preco} />

      {/* <div class="mb-3" style={{ width: '75%' }}>
        <label for="formFile" class="form-label">Selecione um arquivo de imagem</label>
        <input class="form-control" type="file" id="formFile" onChange={(e) => setImagem(e.target.files[0])} />
      </div> */}
      <Button style={styles.button} mode="contained" color="#96BB48" activeOpacity={0.5} onPress={selectFile}>
        Selecione uma imagem
      </Button>

      <Button icon="" mode="contained" className='btn-1' color="#fb1" onPress={() => cadastrar()}>
        Cadastrar
      </Button>

      <View>
        <Text style={styles.listar}>Listagem de Produtos</Text>
      </View>



      {loading ?
        (
          <ActivityIndicator color="#121212" size={45} />
        ) :
        (
          <FlatList
            keyExtractor={item => item.key}
            data={produtos}
            renderItem={({ item }) => (
              <Listagem data={item} deleteItem={handleDelete}
                editItem={handleEdit} />
            )}
          />
        )
      }
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fea",
  },

  text: {
    fontSize: 15,
  },

  input: {
    marginBottom: 20,
    padding: 10,
    width: '75%',
    borderWidth: 2,
    borderRadius: '.4rem',
    backgroundColor: "#FFF",
    borderColor: "#fb1",
    textAlign: "center",
  },

  button: {
    marginBottom: 20,
    backgroundColor: "#fb1",
    borderRadius: 5,
    width: '75%'
  },
});