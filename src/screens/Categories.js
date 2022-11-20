import * as React from 'react'
import { View, Text, Box, Input, Pressable, FlatList, Flex, Button, ScrollView } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../config/api';


export default function Categories(props) {
    const [category, setCategory] = React.useState({ user_id: null })
    const [dataCategory, setDataCategory] = React.useState([])



    function handleOnChange(name, value) {
        setCategory({
            ...category,
            [name]: value,
        })
    }

    const handleAddCategory = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const user_id = await AsyncStorage.getItem('user_id');
            setCategory({
                user_id
            })

            if (!token) {
                props.navigation.navigate("Login");
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }

            const response = await API.post("/Categories", category, config)
            alert('Adding Category Succeeded')
            findUserCategories()
            // setCategory()
        } catch (err) {
            console.log(err)
            alert("Adding Category Failed")
        }
    }

    const findUserCategories = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const user_id = await AsyncStorage.getItem('user_id')
            setCategory({
                user_id
            })

            if (token === null) {
                props.navigation.navigate("Login")
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }
            const response = await API.get(`/UserCategories?user_id=${user_id}`, config)
            setDataCategory(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        findUserCategories()
    }, [])


    return (
        <View p={30}>
            <View mb={50}>
                <Text mb={6} bold fontSize="2xl">Add Category</Text>
                <Box>
                    <Input bg="blueGray.200" borderRadius={8} borderWidth={2} borderColor="blueGray.400" mb={30} name="name" placeholder="Name" onChangeText={(value) => handleOnChange("name", value)} w="100%" />
                    <Pressable onPress={handleAddCategory} w="100%" rounded={8} shadow={3} mb={3} p={3} bg="#FF5555"><Text bold style={{ color: 'white', textAlign: 'center' }}>Add Category</Text></Pressable>
                </Box>
            </View>
            <View>
                <Text mb={6} bold fontSize="2xl">List Category</Text>
                <ScrollView horizontal>
                    <FlatList flexDirection="row" numColumns={3} data={dataCategory} renderItem={(itemData) => {
                        return (
                            <Button borderRadius={5} w="100px" bg="orange.200" p={1} m={1}><Text bold color="#fff" textAlign="center">{itemData.item.name}</Text></Button>
                        )
                    }}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                    />
                </ScrollView>
            </View>
        </View>
    )
}