import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store, persistor } from "./MyComponents/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { name as appName } from "./app.json";
import App from "./App";

const FitInApp = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(appName, () => FitInApp);
