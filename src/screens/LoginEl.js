import * as React from 'react'
import { Center, Text, View, Image, Stack, Input, Box, Pressable, HStack, KeyboardAvoidingView } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../config/api';

export default function Login(props) {
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    })

    function handleOnChange(name, value) {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleLogin = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify(form);
            const response = await API.post(
                "/auth/login",
                body,
                config
            );

            if (response) {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('user_id', response.data.user._id);
                await AsyncStorage.setItem('user_name', response.data.user.firstName);
            }
            const value = await AsyncStorage.getItem("token");
            if (value !== null) {
                props.navigation.navigate("MyTab");
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }
    return (
        <KeyboardAvoidingView behavior='padding' p={30}>

            <Center mb={50}>
                <Image mt={50} alt="loginicon" source={{ uri: "https://res.cloudinary.com/dm8xxyjfx/image/upload/v1667545476/WaysTodo/Login_Icon_pdd1uu.png" }} style={{ width: 500, height: 258 }} />

                <Text fontSize="2xl" bold style={{ textAlign: 'left' }} mb={5}>Login</Text>
                <Stack space={4} w="100%" mx="auto" alignItems="center">
                    <Input bg="coolGray.200" w="100%" variant="outline" name="email" placeholder="Email" onChangeText={(value) => handleOnChange("email", value)} value={form.email} />
                    <Input mb={50} bg="coolGray.200" name="password" w="100%" variant="outline" placeholder="Password" onChangeText={(value) => handleOnChange("password", value)} value={form.password} secureTextEntry />
                    <Pressable w="100%" rounded={8} shadow={3} mb={3} p={3} bg="#FF5555"><Text bold style={{ color: 'white', textAlign: 'center' }} onPress={handleLogin}>Login</Text></Pressable>
                    <HStack>
                        <Text>New Users? </Text>
                        <Text color="#FF5555" onPress={() => props.navigation.navigate("Register")}>Register</Text>
                    </HStack>
                </Stack>
            </Center>
        </KeyboardAvoidingView>
    )
}