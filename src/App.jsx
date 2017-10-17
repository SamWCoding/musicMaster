import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            artist: null
        }
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        var accessToken = "BQA8FtF-MaBCJwjfl95y5OMK89HChdcFUbo5qjenYktoklFv4YyyFYafeEzJPd8Q9LKVfBGLwUalVbGQJSlVCT6iexQd349igXSFD3XTdD2CDU7bfawQBWNEJ-mVC9NJ_esvqLZnSOk2cZcZ51vgBO5BjKat54R7KpR2DDyTtrgImo4ERPI&refresh_token=AQDcrh56IaSbMVwEK70Fto3HXMUfzKJHUK7ofQfwzR4CEced8p9HGHr6UKyoLtydqE6RmyzM5ecX2_FGAlepfsOFKzo-uVYUT0PH-mH5TnnD0IYLlSk8PircSF5b0FTEg54";

        var myOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default',
        };

        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                const artist = json.artists.items[0];
                this.setState({artist});
            });
    }

    render() {
        return (
            <div className="app">
                <div className="app_title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl 
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === "Enter"){
                                    this.search()
                                }
                            }}
                        /> 
                        <InputGroup.Addon onClick={() => this.search()} >
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <Profile 
                    artist={this.state.artist}
                />
                <div className="gallery">
                    Gallery
                </div>
            </div>
        )
    }
}

export default App;