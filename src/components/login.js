import React from 'react';
import {View, Text, Image,TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import firebase from 'firebase';
import Card from './card.js';
import CardSection from './cardsection.js';
import Spinner from './spinner.js';
import { Hoshi } from 'react-native-textinput-effects';



class Login extends React.Component {
	state= {email: '', password: '',error:'', loading:false};

	onButtonPress(){
		this.setState({error:'', loading:true});
		const {email, password}=this.state;
		firebase.auth().signInWithEmailAndPassword(email,password).then(this.onLoginSuccess.bind(this))
		.catch(()=>{this.onLoginFail.bind(this)});
		this.setState({loading:false});
	}

	registrar(){
		this.setState({error:''});
		const {email, password}=this.state;
		firebase.auth().createUserWithEmailAndPassword(email,password)
		.catch(()=>{
			this.setState({error:'*Registro invalido.'});
		});

	}

	onLoginSuccess(){
			this.setState({
				email:'',
				password:'',
				loading:false,
				error:'inicio exitoso'
			});
	}

	onLoginFail(){
		this.setState({
			error:'*Usuario o contraseña incorrecta.',
			loading: false
		});
	}


	renderButton(){
		if (this.state.loading) {
			return <Spinner size="small" />
		}
		return (
		<Button
		  raised
		  onPress={this.onButtonPress.bind(this)}
		  icon={{name: 'send'}}
		  title="Ingresar"
		  backgroundColor="#761922"
		  style={{width:300}}
		/>);

	}

	render(){
		return (
			<Card>
				<CardSection>
					<Image
			            source={require('../images/logo2_pequeño.png')}
			            style={{
			                alignSelf: 'center',
			                flex:1,
			                height:180
			            }}
			            resizeMode="stretch"
			        />
				</CardSection>
				<CardSection>
					<View style={{
								height:250,
								flex:1,
								flexDirection: 'column',
								justifyContent: 'space-around',
								alignItems: 'center'
							}}
					>
					<Text style={{color:'red', fontSize:16}}>
						{this.state.error}
					</Text>
						<Hoshi
							value={this.state.email}
							onChangeText={email=> this.setState({email})}
						    label={'Usuario'}
						    style={{width:300}}
						    borderColor={'#000000'}
						    backgroundColor={'#ffffff'}
						/>
						<Hoshi
							secureTextEntry
							value={this.state.password}
							onChangeText={password=> this.setState({password})}
						    label={'Contraseña'}
						    style={{width:300}}
						    borderColor={'#000000'}
						    backgroundColor={'#ffffff'}
						/>
						{this.renderButton()}
						<Button
						  raised
						  onPress={this.registrar.bind(this)}
						  title="Registrarse"
						  fontSize={12}
						  backgroundColor="#0000ff"
						  style={{width:200}}

						/>
					</View>
				</CardSection>
			</Card>
		);
	}


};


export default Login;
