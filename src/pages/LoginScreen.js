import React from 'react';
import {View, TextInput, StyleSheet, Button, ActivityIndicator, Text, Alert} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            message: "",
        }
    }


    componentDidMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyC3Sx8p7DahWkyS7E07U3z656gOk9-xclw",
            authDomain: "appmyseries.firebaseapp.com",
            databaseURL: "https://appmyseries.firebaseio.com",
            projectId: "appmyseries",
            storageBucket: "appmyseries.appspot.com",
            messagingSenderId: "415786603639",
            appId: "1:415786603639:web:e9cd2168d306747b332272"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
    }

    onChangeHandler(field, valor) {
        this.setState({
            [field]: valor
        })
    }

    processLogin() {
        this.setState({isLoading: true});

        const {email, password} = this.state;

        const loginUserSucess = user => {
            this.setState({ message: "Sucesso!" });
            this.props.navigation.navigate('Main');
        }

        const loginUserFailed = error => {
            this.setState({
                message: this.getMessageByError(error.code)
            })
        }

        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(loginUserSucess)
        .catch(error => {
            if(error.code == "auth/user-not-found") {
                Alert.alert(
                    "Usuário não encontrado",
                    "Deseja criar um novo usuário?",
                    [{
                        text: 'Sim',
                        onPress: () => {
                            firebase
                            .auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then(loginUserSucess)
                            .catch(loginUserFailed)
                        }
                    }, {
                        text: 'Não',
                        onPress: () => {
                            console.log('Usuário não quis criar nova conta.');
                        }
                    }],
                    { cancelable: true }
                );
            }
            loginUserFailed
        })
        .then(() => {
            this.setState({isLoading: false})
        })
    }

    getMessageByError(code) {
        switch(code) {
            case "auth/user-not-found":
                return "E-mail inexistente.";
            case "auth/invalid-email":
                return "E-mail inválido.";
            case "auth/wrong-password":
                return "Senha inválida.";
            default:
                return "Erro desconhecido";    
        }
    }

    renderButton() {
        if(this.state.isLoading)
            return <ActivityIndicator />;
        
        return(
            <Button 
                title='Entrar'
                onPress={() => this.processLogin()}
            />
        );
    }

    renderMessage() {
        const { message } = this.state;

        if(!message)
            return null;

        return(
            <View>
                <Text>{message}</Text>
            </View>
        )
    }
   
    render() {
        return(
            <View>
                <FormRow>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="E-mail: user@provider.com"
                        value={this.state.email}
                        onChangeText={valor => {
                            this.onChangeHandler('email', valor)
                        }}
                    />
                </FormRow>
                <FormRow>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Enter your password here"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={valor => {
                            this.onChangeHandler('password', valor)
                        }}
                    />
                </FormRow>
                {this.renderButton()}
                {this.renderMessage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20
    }
})