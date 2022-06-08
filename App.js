import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  NativeModules,
  NativeEventEmitter,
  ScrollView,
} from 'react-native';
import { logger } from 'react-native-logs';
import SplashScreen from 'react-native-splash-screen';

var log = logger.createLogger();

const App = () => {
  const [stateCamera, setStateCamera] = useState('Olá');

  const { UnicoCheckModule } = NativeModules;
  const eventEmitter = new NativeEventEmitter(UnicoCheckModule);

  SplashScreen.hide()

  useEffect(() => {
    eventEmitter.addListener('onSuccess', e => {
      setStateCamera(e.objResult);
      log.info("success-react-native");
    });
    
    eventEmitter.addListener('onError', e => {
      setStateCamera(e.objResult);
      log.info("error-react-native");
      log.info(e.objResult);
    });

    return () => {
      eventEmitter.removeAllListeners('onSuccess');
      eventEmitter.removeAllListeners('onError');
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <View style={{ height: 200 }}>
        <ScrollView>
          <Text style={{ fontSize: 15, color: 'black' }}>{stateCamera}</Text>
        </ScrollView>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => UnicoCheckModule.callDefaultCamera()}
        style={{
          backgroundColor: 'red',
          borderRadius: 5,
          width: 150,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Câmera Normal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => UnicoCheckModule.callSmartCamera()}
        style={{
          backgroundColor: 'green',
          borderRadius: 5,
          width: 150,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Câmera Smart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => UnicoCheckModule.callLivenessCamera()}
        style={{
          backgroundColor: 'darkgray',
          borderRadius: 5,
          width: 150,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Câmera Liveness</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => UnicoCheckModule.callDocumentCamera()}
        style={{
          backgroundColor: 'blue',
          borderRadius: 5,
          width: 150,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Documentos</Text>
      </TouchableOpacity>
    </View >
  );
};

export default App;
