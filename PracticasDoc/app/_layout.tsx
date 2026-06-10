import '../global.css'
import {Platform, Text, View} from "react-native";
import {Slot} from "expo-router";
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

const isAndroid = Platform.OS === "android";

if (isAndroid) {
    NavigationBar.setBorderColorAsync('black');
}

const RootLayout = () => {
    const [loaded] = useFonts({Inter: require("../assets/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf")});

    if (!loaded) {
        return null;
    }

    return (
        <View>
          

            <Slot/>

       

            <StatusBar style="auto"></StatusBar>
        </View>
    );
}

export default RootLayout;