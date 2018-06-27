

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'react-native-fetch-blob';

const options = {
  title: 'Select a photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from photo library',
  quality: 1
};


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      imageSource: null,
      data:null
    }
  }


  selectPhoto() {


    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }

      else {
        let source = { uri: response.uri };
        this.setState({
          imageSource: source,
          data:response.data
        });
      }
    });

  }

  uploadPhoto() {
    RNFetchBlob.fetch('POST', 'http://192.168.31.142/hello/upload.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [

        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data }

      ]).then((resp) => {
        // ...
      }).catch((err) => {
        // ...
      })


  }




  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.image}
          source={this.state.imageSource != null ? this.state.imageSource :
            require('./images/not_avail.jpg')}
        />
        <TouchableOpacity style={styles.button} onPress={this.selectPhoto.bind(this)}>
          <Text style={styles.text}>Select</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.uploadPhoto.bind(this)} >
          <Text style={styles.text}>UPLOAD</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  button: {
    width: 200,
    height: 40,
    backgroundColor: '#330066',
    borderRadius: 30,
    justifyContent: 'center'
  },

  text: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  image: {
    width: 200,
    height: 300,
    //marginTop:40,
    resizeMode: 'contain'
  },
});
