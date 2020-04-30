import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 130, 
      density: {
        enable: true, 
        value_area: 800
      }
    }
  }
}

const initialState = {
    input: '',
    imageURL: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      score: 0,
      joined: ''	
    }
}

class App extends React.Component {
  
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const image_width = Number(image.width);
    const image_height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * image_width,
      topRow: clarifaiFace.top_row * image_height,
      rightCol: image_width - (clarifaiFace.right_col * image_width),
      botRow: image_height - (clarifaiFace.bottom_row * image_height) 
    }
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});

  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onSubmit = () => {
    this.setState({imageURL: this.state.input});
    /*
    clarifaiApp.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    */
    fetch('https://salty-fortress-67499.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ input: this.state.input })
    })
    .then(response => response.json())
    .then( response => {
    	if(response.status) {
    		fetch('https://salty-fortress-67499.herokuapp.com/image', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ id: this.state.user.id })
			})
			.then(response => response.json())
			.then(score => {
				this.setState(Object.assign(this.state.user, {score: score}))
      })
      .catch(console.log)
    	} else {
        return;
      }
    	this.displayFaceBox( this.calculateFaceLocation(response) ) } 

    )
    .catch( err => console.log(err) )
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
      route = 'signin';
    } else if(route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  };

  loadUser = (user) => {
  	this.setState({ user });
  	console.log(this.state.user);
  }

  render()
  {
    return (
    <div className="App">
      <Particles className='particles' params={particlesOptions} />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
      { this.state.route === 'home' 
      ? <div>
          <Logo />
          <Rank user={this.state.user} />
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecognition box={this.state.box}  imageURL={this.state.imageURL}/>
          <footer className='pv4 ph3 ph5-m ph6-l mid-gray'> <a href="https://icons8.com/icon/44839/science-fiction">Science Fiction icon by Icons8</a> </footer>
        </div>
      : (

        this.state.route === 'signin'
        ? <SignIn onRouteChange={this.onRouteChange} loadUser = {this.loadUser} />
        : <Register onRouteChange={this.onRouteChange} loadUser = {this.loadUser} />

        )
      }
      
    </div>
    );  
  }
  
}

export default App;
