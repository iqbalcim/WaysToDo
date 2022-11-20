import * as React from 'react';

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, CheckIcon, HStack, Input, Pressable, Select, Text, TextArea, View } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../config/api';

export default function AddList(props) {
    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date')
    const [show, setShow] = React.useState(false)
    const [text, setText] = React.useState('Choose Date')

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate)

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
        setText(fDate)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const [dataCategory, setDataCategory] = React.useState([])

    const findUserCategories = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const user_id = await AsyncStorage.getItem('user_id')
            setList({
                user_id,
                status: "todo",
                date: new Date()
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

    const [list, setList] = React.useState({ user_id: null, status: null })

    function handleOnChange(name, value) {
        setList({
            ...list,
            [name]: value,

        });
    };

    const handleAddList = async () => {
        try {
            const token = await AsyncStorage.getItem('token')

            if (!token) {
                props.navigation.navigate("Login")
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }
            const response = await API.post("/AddList", list, config)
            alert("List Successfully Added")
        } catch (err) {
            console.log(err)
        }
    }


    React.useEffect(() => {
        findUserCategories()
    }, [])

    return (
        <View p={30}>
            <Text mb={6} bold fontSize="2xl">Add List</Text>
            <Box alignItems="center">

                <Input value={list.name} name="name" onChangeText={(value) => handleOnChange("name", value)} bg="blueGray.200" borderRadius={8} borderWidth={2} borderColor="blueGray.400" mb="3" placeholder="Name" w="100%" />

                <Select name="category" onValueChange={(value) => handleOnChange("category", value)} bg="blueGray.200" borderRadius={8} borderWidth={2} borderColor="blueGray.400" mb="5px" w="100%" placeholder='Category' accessibilityLabel='Categories' _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={5} />,
                }}

                >
                    {dataCategory?.map((item, index) => (
                        <Select.Item key={index} label={item?.name} value={item.name} />
                    ))}


                </Select>
                <Pressable title='DatePicker' onPress={() => showMode('date')} p={3} h={47} bg="blueGray.200" borderRadius={8} borderWidth={2} borderColor="blueGray.400" mb="3" w="100%">
                    <HStack justifyContent="space-between">
                        <Text fontSize="xs" color="blueGray.400">{text}</Text>
                        <Text color="blueGray.400"><Ionicons name="calendar-outline" /></Text>

                    </HStack>
                </Pressable>

                <TextArea name="desc" value={list.desc} onChangeText={(value) => handleOnChange("desc", value)} h={150} mb={100} bg="blueGray.200" borderRadius={8} borderWidth={2} borderColor="blueGray.400" mx="3" placeholder="Description" w="100%" />
                <Pressable w="100%" onPress={handleAddList} rounded={8} shadow={3} mb={3} p={3} bg="#FF5555"><Text bold style={{ color: 'white', textAlign: 'center' }}>Add List</Text></Pressable>

                {show && (<DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    display='default'
                    onChange={onChangeDate}
                />)}
            </Box>
        </View >
    )
}