import React, { Component } from 'react';
import AppContainer from './AppContainer';
import { AppState } from 'react-native';
import { connection } from './src/components/LoginScreen';
import { NetworkProvider } from './src/components/NetworkProvider';

class App extends Component {

  componentDidMount() {
    AppState.addEventListener('change', (val) => {
      if (val === 'active' && connection && connection.state !== 1) {
        connection
          .start()
          .done(() => {
            memoryStore.setItem("connectionId", connection.id);
          })
          .fail((err) => console.log('failed', err));
      }
    })
  }

  render() {
    return (
      <NetworkProvider>
        <AppContainer />
      </NetworkProvider>
    )
  }
}

export default App;
