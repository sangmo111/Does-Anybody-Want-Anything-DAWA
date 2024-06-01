import { StyleSheet, View, Pressable, TextInput, Dimensions, Image, Modal, Keyboard, TouchableWithoutFeedback} from "react-native";
import { useState, ChangeEvent } from "react";
import * as ImagePicker from 'expo-image-picker';  // not react-image-picker
import { Icon } from 'react-native-elements'
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// import * as eva from '@eva-design/eva';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Layout, Text, IconRegistry, CheckBox} from '@ui-kitten/components';

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/boostrap.min.css'; 
// import { Container, Form, Button } from 'react-bootstrap';
import { supabase} from "../supabase";
import { my_user_id } from "../supabase";

// connects to supabase
// async function uploadImage(e) {
//     console.log("Upload!");
// }

// const [ images, setImages ] = useState([]);
// async function getImages() {
//     const { data, error } = await supabase
//         .storage 
//         .from('images')
//         .list(  {
//             limit: 100,
//             offset:0,
//             sortBy: {order: "asc"}
//         });

//         if(data !== null) {
//             setImages(data);
//         } else {
//             alert("Error loading images");
//             console.log(error);
//         }
// }


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

const width = Dimensions.get('window').width;

const NewPost = ({navigation}) => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ dawa, setDawa ] = useState("");
    const [ daha, setDaha ] = useState("");
    const [ useDaha, setUseDaha ] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [photofile, setPhotoFile] = useState(null);


    const uploadPost = async () => {

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

            const response = await supabase.storage.from('images').createSignedUrl(data.path, 999999999999999);
            // console.log(response);

            const { error } = await supabase
            .from("posts")
            .insert({daha_name: daha, dawa_name: dawa, dollar_sign: "$", image_url: response.data.signedUrl, user_id: my_user_id});

            // pop up display
            setModalVisible(true);
            closeModal();
        }


       // const { publicURL } = supabase.storage.from('images').getPublicUrl(`public/${image.name}`)

    }

    console.log(my_user_id);

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
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <View style={styles.newPostContainer}>
            <View style={styles.headingContainer}>
            <Pressable style={[fonts.smallButton.dark]} onPress={() => navigation.goBack(null)}>
                <Text style={fonts.buttonText.dark}>{"<"}</Text>
            </Pressable>
            <Text style={[fonts.heading, {flexGrow: 1, textAlign: 'center'}]}>New Post</Text>
            </View>

            <Text style={fonts.subheading}>#DAWA</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setDawa} 
                value={dawa}
                multiline={true}
            />
            <View style={styles.dahaHeading}>
                <CheckBox
                    checked={useDaha}
                    onChange={setUseDaha}
                    style={styles.checkbox}
                />
                <Text style={useDaha ? fonts.subheading : styles.subheadingDisabled}>#DAHA?</Text>
            </View>
            <TextInput style={useDaha ? styles.input : styles.inputDisabled}
                onChangeText={setDaha} 
                value={daha}
                multiline={true}
                editable={useDaha}
            />
            <View style={styles.photoUploadContainer}>
                <Text style={fonts.body}>Upload a picture of your offer:</Text>

                <Icon onPress={choosePhoto} name="file-upload" style={fonts.smallButton.dark} color={colors.white} size={16} />
            </View>
            {photo && <Image source={{uri: photo}} style={styles.inputImage}/>}

            <Pressable onPress={uploadPost} style={[fonts.button.dark, styles.newPostButton]}>
                <Text style={[fonts.buttonText.dark]}>upload</Text>
            </Pressable>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                this.setState({modalVisible: !modalVisible});
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalText}>Post posted!</Text>
                    </View>
                </View>
            </Modal>

            {/* <Button 
                buttonStyle={fonts.button.dark} 
                containerStyle={styles.newPostButton}
                icon={{name: 'add', size: 16, color: colors.white}}
                title="post"
                onPress = {uploadPost}
            >  */}
            {/* Post </Button> */}
        </View>
        </TouchableWithoutFeedback>
    );
}

export default NewPost;

const styles = StyleSheet.create({
    newPostContainer: {
        height: '100%',
        backgroundColor: colors.lightblue,
        padding: 20
    },
    newPostButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    input: {
        height: 100,
        borderWidth: 1,
        padding: 10,
        marginVertical: 10
    },
    inputDisabled: {
        height: 100,
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderColor: 'gray',
        color: 'gray'
    },
    subheadingDisabled: {
        ...fonts.subheading,
        color: 'gray'
    },
    checkbox: {
        borderColor: colors.dark,
        borderWidth: 2,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginRight: 10
    },
    dahaHeading: {
        display: 'flex',
        flexDirection: 'row'
    },
    inputImage: {
        width: width - 20,
        height: 300,
        resizeMode: 'cover'
    },
    photoUploadContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
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
        color: 'white',
        fontSize: 55,
        ...fonts.heading,
      },
      headingContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

});