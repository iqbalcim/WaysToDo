import {
  NativeBaseProvider, extendTheme
} from "native-base";
import React from "react";


import Container from "./Container";

import { AppLoading } from "expo-app-loading";
import {
  Montserrat_400Regular,
  Montserrat_400Regular_Italic, useFonts
} from "@expo-google-fonts/montserrat";



export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
  });

  const fontConfig = {
    Montserrat: {
      400: {
        normal: "Montserrat_400Regular",
        italic: "Montserrat_400Regular_Italic",
      },
    },
  };

  const theme = extendTheme({
    fontConfig,
    fonts: {
      heading: "Montserrat",
      body: "Montserrat",
      mono: "Montserrat",
    },
  });


  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else {

  return (
    <NativeBaseProvider>
      <Container />
    </NativeBaseProvider>
  );
}
// }

