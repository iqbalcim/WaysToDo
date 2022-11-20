import axios from "axios";
import * as React from 'react'
import { View, Text, Center, Image, Stack, Input, Pressable, HStack, KeyboardAvoidingView } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config/api";

export default function Register(props) {
    // const form setform
    const [form, setForm] = React.useState({
        firstName: '',
        email: '',
        password: ''
    })
    const handleOnChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        })
    }


    const handleRegister = async () => {
        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const body = JSON.stringify(form);

            const response = await API.post("/auth/register", body, config)
            console.log(response)

            if (response) {
                await AsyncStorage.setItem('token', response.data.token)
            }

            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                console.log(value)
            }
            alert('Registration Succeeded')
            props.navigation.navigate("Login")
        } catch (e) {
            console.log(e);
            console.log("this error ");
            alert("Registration Failed");
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" p={30}>
            <Center mb={50}>
                <Image mt={50} alt="loginicon" source={{ uri: "https://res.cloudinary.com/dm8xxyjfx/image/upload/v1667545476/WaysTodo/Login_Icon_pdd1uu.png" }} style={{ width: 500, height: 258 }} />

                <Text fontSize="2xl" bold style={{ textAlign: 'left' }} mb={5}>Register</Text>
                <Stack space={4} w="100%" mx="auto" alignItems="center">
                    <Input bg="coolGray.200" w="100%" variant="outline" name="email" placeholder="Email" value={form.email} onChangeText={(value) => handleOnChange('email', value)} />
                    <Input bg="coolGray.200" w="100%" variant="outline" name="name" placeholder="Name" value={form.firstName} onChangeText={(value) => handleOnChange('firstName', value)} />
                    <Input mb={50} bg="coolGray.200" w="100%" variant="outline" name="password" placeholder="Password" value={form.password} onChangeText={(value) => handleOnChange('password', value)} />
                    <Pressable w="100%" rounded={8} shadow={3} mb={3} p={3} bg="#FF5555"><Text bold style={{ color: 'white', textAlign: 'center' }} onPress={handleRegister}>Register</Text></Pressable>
                    <HStack>
                        <Text>Joined us before? </Text>
                        <Text color="#FF5555" onPress={() => props.navigation.navigate("Login")}>Login</Text>
                    </HStack>
                </Stack>
            </Center>
        </KeyboardAvoidingView>

    )
}
