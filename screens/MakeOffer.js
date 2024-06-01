import { StyleSheet, View, Pressable, TextInput, Image, Dimensions, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';  // not react-image-picker
import { Icon } from 'react-native-elements'; 
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import image from '../images/tenor.gif';


import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Layout, Text, 
  Button, IconRegistry} from '@ui-kitten/components';

import { supabase} from "../supabase";

const width = Dimensions.get('window').width;

const createFormData = (photo, body = {}) => {
    const data = new FormData();
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
};
  

const MakeOffer = ({navigation, route}) => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [offer, setOffer] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photofile, setPhotoFile] = useState(null);
    const post = route.params.post;

    

    const sendOffer = async () => {
        if (photofile != "") {
            // get the extension
            const ext = photofile.assets[0].uri.substring(photofile.assets[0].uri.lastIndexOf(".") + 1);
            // get the file name
            const fileName = photofile.assets[0].uri.replace(/^.*[\\\/]/, "");
            var formData = new FormData();
            formData.append("files", { 
                uri: photofile.assets[0].uri,
                name: fileName,
                type: photofile.assets[0].type ? `image/${ext}` : `video/${ext}`,
            });
            // upload to default image bucket
            const { data, err } = await supabase.storage
            .from("images")
            .upload(fileName, formData);

            console.log(data);

            const response = await supabase.storage.from('images').createSignedUrl(data.path, 999999999999999);
            // console.log(response);

            const { error } = await supabase
            .from("offers")
            .insert({words: offer, dawa_name: post.dawa_name, image_url: response.data.signedUrl, to_user: post.user_id, post_id: post.post_id});

            /* CHANGE THIS PART
            const { error } = await supabase
            .from("posts")
            .insert({daha_name: daha, dawa_name: dawa, dollar_sign: "$", image_url: response.data.signedUrl});
            */
            // pop up display
            setModalVisible(true);
            closeModal();
        }
    }

    const choosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
            setPhotoFile(result);
        }
    }

   
    const closeModal = () => {
        setTimeout(() => setModalVisible(false), 2000);
    }


    return ( 
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
            <View style={styles.heading}>
                <Pressable style={fonts.smallButton.dark} onPress={() => navigation.goBack(null)}>
                    <Text style={fonts.buttonText.dark}>{"<"}</Text>
                </Pressable>
                <Text style={[fonts.heading, {flexGrow: 1, textAlign: 'center'}]}>make offer</Text>
            </View>
            <View style={styles.postContainer}>
                <Image style={styles.image} source={{uri: post.image_url}}/>
                <View style={styles.textContainer}>
                    <Text style={fonts.subheading}>#DAWA</Text>
                    <Text style={fonts.body}>{post.dawa_name}</Text>
                    {
                        post.daha_name === undefined ?
                        "" :
                        <View>
                            <Text style={fonts.subheading}>#DAHA</Text>
                            <Text style={fonts.body}>{post.daha_name}</Text>
                        </View>
                    }
                </View>
            </View>
            <Text style={[fonts.body, {marginTop: 10}]}>Write a note for your offer:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setOffer} 
                value={offer}
                multiline={true}
            />
            <View style={styles.photoUploadContainer}>
                <Text style={fonts.body}>Upload a picture of your offer:</Text>
                <Icon onPress={choosePhoto} name="file-upload" style={fonts.smallButton.dark} color={colors.white} size={16} />
            </View>
            {photo && <Image source={{uri: photo}} style={styles.inputImage}/>}
            <Pressable onPress={sendOffer} style={[fonts.button.dark, styles.offerButton]}><Text style={fonts.buttonText.dark}>send offer</Text></Pressable>


            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                this.setState({modalVisible: !modalVisible});
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalText}>Offer made!</Text>
                    </View>
                </View>
            </Modal>

        </View>
        </TouchableWithoutFeedback>


    );
}

export default MakeOffer;

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        backgroundColor: colors.lightblue,
        padding: 20
    },
    input: {
        height: 100,
        borderWidth: 1,
        padding: 10,
        marginVertical: 10
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    postContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover', 
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        flexGrow: 1,
    }, 
    offerButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    inputImage: {
        width: width - 20,
        height: 200,
        resizeMode: 'cover'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 50, //20
        backgroundColor: colors.green,
        borderRadius: 20,
        padding: 80, //35
        alignItems: 'center',
        shadowColor: 'white', //000
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 55,
        ...fonts.heading,
      },
    photoUploadContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-between',
    }

});