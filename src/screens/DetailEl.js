import { View, Text, Pressable, HStack, Image, VStack } from "native-base";

export default function Detail(props) {

    const done = "https://res.cloudinary.com/dm8xxyjfx/image/upload/v1667556672/WaysTodo/icon__Check_Circle__nukfzp.png"

    const todo = "https://res.cloudinary.com/dm8xxyjfx/image/upload/v1667563372/WaysTodo/Ellipse_1_l2mbbh.png"

    const data = props.route.params.itemData.item

    return (
        <View borderRadius={8} m={5} p={5} bg="blue.100" h="92%">

            <HStack justifyContent="space-between" alignItems="center" mb={30}>
                <Text>
                    <Text fontSize="xl" bold>{data.category}</Text>
                    <Text bold> - </Text>
                    <Text fontSize="xl" bold>{data.name}</Text>
                </Text>
                <VStack alignItems="center" justifyContent="center" >
                    <Pressable mb={3} borderRadius={8} p={1} bg="blue.200"><Text color="#fff">{data.category}</Text></Pressable>
                    {data.status === "done" ? <Image alt="status" source={{ uri: done }} width="50px" height="50px" /> : <Image alt="status" source={{ uri: todo }} width="50px" height="50px" />}
                </VStack>

            </HStack>

            <Text color="coolGray.400">{data.desc}</Text>

        </View >
    )
}