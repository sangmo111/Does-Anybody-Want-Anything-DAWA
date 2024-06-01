import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useState, useEffect } from 'react';
import Offer from "../components/Offer";
import colors from "../styles/colors";

import { supabase } from "../supabase";

const pendingOffers = [
    {
        id: 1,
        price: '$', //post.price
        type: 'daha', //post.daha
        name: 'toothbrush', // post.name 
        offer: 'offering u a kitkats', // words 
        date_time: '12/232/1232', //timestamp
        image:'https://i.redd.it/rc353y7jrfvz.jpg'//post.image
    },
    {
        id: 2,
        price: '$$',
        type: 'dawa',
        name: 'watch',
        offer: 'i want a watch. do u want dishsoap?',
        date_time: '123/123/232',
        image: 'https://i.redd.it/fc5ia8obatr81.jpg'
    },
    {
        id: 3,
        price: '$$$',
        type: 'dawa',
        name: 'nailpolish',
        offer: 'Hi, can I get this for a concealer',
        date_time: '123/123/232',
        image: 'https://i.ebayimg.com/images/g/tYAAAOSwOpxjvaPY/s-l640.jpg'
    }           
];

const completedOffers = [
    {
        id: 1,
        price: '$',
        type: 'daha',
        name: 'chicken',
        offer: 'yuhs',
        date_time: '12/232/1232',
        image: 'tenor.gif'
    },
    {
        id: 2,
        price: '$$',
        type: 'dawa',
        name: 'burrito',
        offer: 'ok bro',
        date_time: '123/123/232',
        image: 'tenor.gif'
    }       
];



const OfferScreen = () => {
    const [toggle, setToggle] = useState(true);
    const [pendingOffers, setPendingOffers] = useState([]);
    const [completedOffers, setCompletedOffers] = useState([]);
    const [loadingPending, setLoadingPending] = useState(true);
    const [loadingCompleted, setLoadingCompleted] = useState(true);

    const fetchPendingOffers = async () => {
        setLoadingPending(true); 
        const { data, error } = await supabase
        .from('offers')
        .select()
        .order('created_at', {ascending: false})
        .eq('pending', true)
        setPendingOffers(data);
        setLoadingPending(false);
    }; 

    const fetchCompletedOffers = async () => {
        setLoadingPending(true); 
        const { data, error } = await supabase
        .from('offers')
        .select()
        .order('created_at', {ascending: false})
        .eq('pending', false)
        setCompletedOffers(data);
        setLoadingCompleted(false);
    }; 

    useEffect(() => {
        fetchCompletedOffers();
        fetchPendingOffers();
     }, []);

    function handleToggle(value) {
        setToggle(value);
    }

    // if (loadingPending || loadingCompleted) {
    //     return <ActivityIndicator/>
    // }

    return (
        <View style={styles.screen}>
            <View style={styles.toggleContainer}>
                <Pressable onPress={() => handleToggle(true)} style={[styles.leftToggle, toggle ? styles.selectedToggle : styles.unselectedToggle]}>
                    <Text style={toggle ? styles.selectedText : styles.unselectedText}>Pending</Text>
                </Pressable>
                <Pressable onPress={() => handleToggle(false)} style={[styles.rightToggle, toggle ? styles.unselectedToggle : styles.selectedToggle]}>
                    <Text style={toggle ? styles.unselectedText : styles.selectedText}>Completed</Text>
                </Pressable>
            </View>
            { toggle ?
                <FlatList
                data={pendingOffers}
                onRefresh={fetchPendingOffers}
                refreshing={loadingPending}
                renderItem={({ item, index }) => {
                    return <Offer offer={item} completed={false}/>
                }}
                keyExtractor={(item) => item.id}
                /> :
                <FlatList
                data={completedOffers}
                onRefresh={fetchCompletedOffers}
                refreshing={loadingCompleted}
                renderItem={({ item, index }) => {
                    return <Offer offer={item} completed={true}/>
                }}
                keyExtractor={(item) => item.id}
                />
            }
        </View>
    );
};

export default OfferScreen;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.lightblue,
        padding: 20,
        height: '100%',
    },
    toggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    leftToggle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopStartRadius: 999999,
        borderBottomStartRadius: 999999,
    },
    rightToggle: {
        borderRadiusRight: 9999999,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopEndRadius: 999999,
        borderBottomEndRadius: 999999,
    },
    selectedToggle: {
        backgroundColor: colors.dark,
    },
    unselectedToggle: {
        backgroundColor: colors.white
    },
    selectedText: {
        color: colors.white
    },
    unselectedText: {
        color: colors.dark
    }

});