
import { Center, Pressable, View, Image, Text } from "native-base"

export default function Home({ navigation }) {


    return (
        <Center mt={150}>
            <Image alt="dfadf" source={{ uri: "https://res.cloudinary.com/dm8xxyjfx/image/upload/v1667532273/WaysTodo/accept-request_1_2x_xg6h9s.png" }} style={{ width: 228, height: 258 }} />
            <Image mb={35} alt="dfadkfj" source={{ uri: "https://res.cloudinary.com/dm8xxyjfx/image/upload/v1667534183/WaysTodo/Ways_ToDO_zujweh.png" }} style={{ width: 210, height: 38 }} />
            <View mb={120} pr={30} pl={30}>
                <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Roboto' }}>Write your activity and finish your activity.
                    Fast, Simple and Easy to Use</Text>
            </View>
            <Pressable rounded={8} shadow={3} mb={4} p={3} bg="#FF5555"><Text bold style={{ color: 'white', width: 325, textAlign: 'center' }} onPress={() => navigation.navigate("Login")}>Login</Text></Pressable>
            <Pressable rounded={8} shadow={3} p={3} bg="coolGray.400"><Text bold style={{ color: 'white', width: 325, textAlign: 'center' }} onPress={() => navigation.navigate("Register")}>Register</Text></Pressable>
        </Center >
    )

}
