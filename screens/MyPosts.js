import { StyleSheet, View, SafeAreaView, Pressable} from "react-native";
import { Icon } from 'react-native-elements'
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Layout, Text, IconRegistry} from '@ui-kitten/components';

import { supabase } from "../supabase";
import {useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

import { my_user_id } from "../supabase";
import DahaPost from "../components/DahaPost";
import DawaPost from "../components/DawaPost";
// import { useState } from 'react'
// import { createClient } from '@supabase/supabase-js'
// export async function getStaticProps() { 
//     const supabaseAdmin = createClient
//     ( process.env.NEXT_PUBLIC_SUPABASE_URL|| ' ',
//      process.env.SUPABASE_SERVICE_ROLE_KEY || ' '
// )

//     const { data } = await supabaseAdmin
//         .from('images')
//         .select('*') 
//         .order('id');
//     return {
//         props: {},
//     }
// }

const MyPosts = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
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
        .select("*")
        .order('created_at', {ascending: false})
        .eq('user_id', my_user_id)
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
            <View style={styles.headingContainer}>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={eva.light}></ApplicationProvider>
                <Text style={[fonts.heading, {textAlign: 'center'}]}>
                    My Posts
                </Text>
            </View>

            <FlatList data={shownPosts}
                onRefresh={fetchHotPosts}
                refreshing={loading}
                renderItem={({ item, index }) => {
                    if (item.daha_name === null || item.daha_name == "") {
                        return <DawaPost navigation={navigation} key={index} post={item} canOffer={false}/>;
                    } else {
                        return <DahaPost navigation={navigation} key={index} post={item} canOffer={false}/>;
                    }
                }}
                />

            <Pressable onPress={() => navigation.navigate('NewPost')} style={[fonts.button.dark, styles.postButton]}>
                <Icon name="add" color={colors.white} size={16}/>
                <Text style={[fonts.buttonText.dark, {paddingLeft: 5}]}>post</Text>
            </Pressable>
        </View>
        
    );
};



// const UploadPostButton = () => {
//     const uploadPost = async () => {
//        const { error } = await supabase
//             .from("posts")
//             .insert({daha_name: "Uploaded daha", dawa_name: "Uploaded dawa", dollar_sign: "$"});
//     }


//     return ( <Button 
//         style={
//             {position: 'absolute', 
//             bottom: -70, 
//             right: 8, 
//             borderRadius: 999999}} 
//         accessoryLeft={<Icon name="plus" />}
//         onPress = {uploadPost}
//     > 
//     Post </Button>
//     );
// }

export default MyPosts;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.lightblue,
        height: '100%',
        paddingHorizontal: 20
    },
    postButton: {
        borderRadius: 9999999,
        backgroundColor: colors.dark,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    postText: {
        color: colors.white
    },
    postButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
});