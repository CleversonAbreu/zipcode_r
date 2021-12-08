import React,{useState,useRef} from 'react';
import { StyleSheet, Image, Text, View,TextInput,TouchableOpacity,SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';
import { TextInputMask } from 'react-native-masked-text';

export default function App() {
  const [zipcode,setZipcode] = useState('');
  const inputRef = useRef(null);
  const [zipcodeUser,setZipcodeUser] = useState(null);  

  async function getZipcode(){
    if(zipcode==''){
      alert('Invalid Zip code')
      return;
    }

    try {
      const response = await api.get('/'+zipcode+'/json');
      setZipcodeUser(response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  function clear(){
    setZipcode('')
    inputRef.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center'}}>
      <Image source={require('./assets/correios_logo.jpeg')} style={styles.img}/>
        <TextInputMask
        placeholder='83601-970'
            style={styles.input}
            type={'zip-code'}
            value={zipcode}
            onChangeText={(text)=>setZipcode(text)}          
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.btn,{backgroundColor: '#FF9900'}]}onPress={getZipcode}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      { !zipcodeUser.erro &&
            <View style={styles.result}>
            <Text style={styles.itemText}>Address:</Text>
            <Text style={styles.itemText}>{zipcodeUser.logradouro}</Text>
            <Text style={styles.itemText}>{zipcodeUser.bairro}</Text>
            <Text style={styles.itemText}>{zipcodeUser.localidade}/{zipcodeUser.uf}</Text>
          </View>
      }     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:20
  },
  input:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding : 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  btn:{
    height: 55,
    width: 330,
    marginTop: 15,
    justifyContent:'center',
    alignItems: 'center',
    padding: 15,
    elevation: 2,
    shadowColor: '#52006A',
  },
  btnText:{
    fontSize:18,
    color: '#fff'
  },
  result:{
    flex: 1,
    marginTop: 10,
    padding: 15,
    alignItems:'flex-start'
  },
  itemText:{
    fontSize:20
  },
  img:{
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 300
  }
});
