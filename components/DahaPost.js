import { StyleSheet, Text, View, Image, Pressable, Dimensions } from "react-native";
import image from '../images/tenor.gif';
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const width = Dimensions.get('window').width;

const DahaPost = ({ post, navigation, canOffer }) => {
    return (
        <View style={styles.postContainer}>
            <View style={styles.postTitle}>
                <Text style={fonts.subheading}>#daha</Text>
                <Text style={fonts.subheading}>{post.dollar_sign}</Text>
            </View>
            <Text style={fonts.body}>{post.daha_name}</Text>
            <View style={styles.dawaContainer}>
                <Text style={fonts.subheading}>#dawa</Text>
                <Text style={fonts.body}>{post.dawa_name}</Text>
                <Image style={styles.image} source={{uri: post.image_url}}/>
            </View>
            { canOffer ?
            <Pressable onPress={() => navigation.navigate("MakeOffer", {post: post})} style={[fonts.button.dark, {alignSelf: 'center'}]}>
                <Text style={fonts.buttonText.dark}>make offer</Text>
            </Pressable> : "" }
        </View>
    );
};

export default DahaPost;

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: colors.green,
        padding: 20,
        margin: 10,
        borderRadius: 10,

        // shadow stuff
        shadowColor: colors.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    image: {
        width: width - 140,
        height: 250,
        resizeMode: 'cover',
        marginTop: 10,
        alignSelf: 'center', 
    },
    postTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    dawaContainer: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        marginVertical: 10
    }
});