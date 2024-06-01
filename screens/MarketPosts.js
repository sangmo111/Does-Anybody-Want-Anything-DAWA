// import { Layout, Text } from "@ui-kitten/components";
import {useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { supabase } from "../supabase";

import { StyleSheet, View, Pressable, FlatList, Text, ScrollView } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import DahaPost from "../components/DahaPost";
import DawaPost from "../components/DawaPost";

const MarketPosts = ( {navigation} ) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // state variables for $ filters
    const [shownPosts, setShownPosts] = useState(posts);
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    
    const filterPosts = (a, b, c, d, posts2 = posts) => {
        if (!a && !b && !c && !d) {
            setShownPosts(posts2);
        } else {
            let newShownPosts = [];
            for (let post of posts2) {
                let price = post.dollar_sign;
                if (a && price === '$') newShownPosts.push(post);
                else if (b && price === '$$') newShownPosts.push(post);
                else if (c && price === '$$$') newShownPosts.push(post);
                else if (d && price === '$$$$') newShownPosts.push(post);
            }
            setShownPosts(newShownPosts);
        }
    }
    const fetchHotPosts = async () => {
        setLoading(true); 
        const { data, error } = await supabase
        .from('posts')
        .select()
        .order('created_at', {ascending: false})
        .eq('completed', false)
        setPosts(data);
        filterPosts(one, two, three, four, data);
        setLoading(false);
    };  
    
    useEffect(() => {
        fetchHotPosts();
     }, []);

    //  if (loading) {
    //     return <ActivityIndicator/>
    //  }

     console.log(posts);

     return (
        <View style={styles.screen}>
            <View style={styles.priceButtons}>
                <Pressable onPress={() => {filterPosts(!one, two, three, four); setOne(!one);}} style={ one ? fonts.smallButton.dark : fonts.smallButton.light}>
                    <Text style={ one ? fonts.buttonText.dark : fonts.buttonText.light }>$</Text>
                </Pressable>
                <Pressable onPress={() => {filterPosts(one, !two, three, four); setTwo(!two);}} style={ two ? fonts.smallButton.dark : fonts.smallButton.light}>
                    <Text style={ two ? fonts.buttonText.dark : fonts.buttonText.light }>$$</Text>
                </Pressable>
                <Pressable onPress={() => {filterPosts(one, two, !three,  four); setThree(!three);}} style={ three ? fonts.smallButton.dark : fonts.smallButton.light}>
                    <Text style={ three ? fonts.buttonText.dark : fonts.buttonText.light }>$$$</Text>
                    </Pressable>
                <Pressable onPress={() => {filterPosts(one, two, three, !four); setFour(!four);}} style={ four ? fonts.smallButton.dark : fonts.smallButton.light}>
                    <Text style={ four ? fonts.buttonText.dark : fonts.buttonText.light }>$$$$</Text>
                </Pressable>
            </View>
            <FlatList data={shownPosts}
                onRefresh={fetchHotPosts}
                refreshing={loading}
                renderItem={({ item, index }) => {
                    if (item.daha_name === null || item.daha_name == "") {
                        return <DawaPost navigation={navigation} key={index} post={item} canOffer={true}/>;
                    } else {
                        return <DahaPost navigation={navigation} key={index} post={item} canOffer={true}/>;      
                    }
                }}
                />
            </View>
        );
    };

export default MarketPosts;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.lightblue,
        height: '100%',
        paddingHorizontal: 20
    },
    priceButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
});