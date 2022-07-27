import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity,Keyboard } from 'react-native';
import React,{useState, useRef} from 'react';
import api from './src/services/api';

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);

  const [userCep, setUserCep] = useState(null)

  async function buscar(){

    if(cep == ''){
      alert('Preencha o campo cep.');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`${cep}/json`);
      //console.log(response.data)
      setUserCep(response.data)
      Keyboard.dismiss();
    } catch (error) {
      alert('Cep Incorreto!')
    }

  }


  function limpar(){
    setCep('');
   inputRef.current.focus();
    setUserCep(null)
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Text style={styles.text}> Digite o cep desejado:</Text>
        <TextInput
        style={styles.input}
        placeholder='Ex: 79003241'
        value={cep}
        onChangeText={(texto) => setCep(texto)}
        keyboardType='numeric'

        ref={inputRef}//referenciado o input para o inputRef(useRef)
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.btn, {backgroundColor:'#1d7'} ]}
        onPress={ buscar }
        >
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

    
    {userCep && (
      //se tiver algo dentro do userCep então renderiza o jsx abaixo
      <View style={styles.resultado}>
        <Text style={styles.itemText}>Cep: {userCep.cep}</Text>
        <Text style={styles.itemText}>Logradouro: {userCep.lagradouro}</Text>
        <Text style={styles.itemText}>Bairro: {userCep.bairro}</Text>
        <Text style={styles.itemText}>Cidade: {userCep.localidade}</Text>
        <Text style={styles.itemText}>Estado: {userCep.uf}</Text>
      </View>
    
    )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    marginTop:'12%',
    fontSize:25,
    fontWeight:'bold'
  },
  input:{
    width: '90%',
    borderWidth:1,
    fontSize:15,
    padding: 10,
    borderColor:'#ddd',
    marginTop:'6%'
  },
  areaBtn:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:'6%'
  },
  btn:{
    backgroundColor:'#cd3e1d',
    height: 65,
    width: 150,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  btnText:{
    fontSize:21,
    fontWeight:'bold',
    color: '#fff',
    alignItems:'center'
  },
  resultado:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  itemText:{
    fontSize:27,
    padding: 8
  }
});
