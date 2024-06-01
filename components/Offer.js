import { StyleSheet, Text, View, Image, Pressable, Dimensions } from "react-native";
import image from '../images/tenor.gif';
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { supabase } from "../supabase";

const width = Dimensions.get('window').width;

const Offer = ({ offer, completed }) => {
    const acceptOffer = async () => {
        const { data, error } = await supabase
        .from('offers')
        .update({'pending' : false})
        .match({'id' : offer.id})  
    }

    return (
        <View style={styles.offerContainer}>
        <View style={styles.postContainer}>
            <Image style={styles.image} source={{uri: offer.image_url}}/>
            <View style={styles.textContainer}>
                <Text style={fonts.subheading}>#DAWA</Text>
                <Text style={fonts.body}>{offer.dawa_name}</Text>
            </View>
        </View>
            <Text style={fonts.body}>{offer.words}</Text>
            { completed ?
                "" :
                <Pressable onPress={acceptOffer} style={[fonts.button.dark, {alignSelf: 'center', marginTop: 10}]}><Text style={fonts.buttonText.dark}>accept offer</Text></Pressable>
            }
        </View>
    );
};

export default Offer;

const styles = StyleSheet.create({
    offerContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: colors.white,
        borderRadius: 10
    },
    postContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover', 
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        flexGrow: 1,
    }, 
});