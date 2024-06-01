import { StyleSheet, Text, View, Image, Pressable, Dimensions } from "react-native";
import image from '../images/tenor.gif';
import colors from "../styles/colors";
import Ionicons from '@expo/vector-icons/Ionicons';


const width = Dimensions.get('window').width;

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>dawa</Text>
            <Ionicons style={styles.icon} name="moon" size={24} />

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightblue,
    },
    header: {
        fontWeight: '900',
        fontSize: '40',
        fontFamily: 'Cochin',
        color: colors.dark,
    },
    icon: {
        color: colors.dark
    }
});