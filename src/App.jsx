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
        var accessToken = "BQAB-4EnG7lFpg_xfC2P6NX__jE_wgIz3hsIDaLmLtJ39sdqx0lgeqTJALhgvWKeiUf2SgWeYhf6T8205l6PaA974mrsdFlC5l98C4-LtU5To9u77mmeG_0ys1fJOGUJjfQ891TcVgwigpNUsH7Exdqzh6V2kHboYSQgAPfLyaFLbQMy77Y&refresh_token=AQDG480fM3u_CyPXVDyvMXmt08iQTsMAGNqTkrA7zQa9Mhf1WC2D5oPnnO8WmooISHC7wSEpTyV4xYZfL2CZLEwPtFj1i33zeInBw-uTyR7g1XLB2HETPCILhSp0kcSLFTs";

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
                const artist = json.artists.items[0];
                this.setState({artist});
            });
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
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
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        )
    }
}

export default App;