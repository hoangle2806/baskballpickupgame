

import React, {Component} from 'react';

class AutoCompleteAdress extends Component{

    state = {
        location: '',
        place: '',
    }

    componentDidUpdate(){
        this.initAutocomplete();
    }

    initAutocomplete = () =>{
        let autocomplete = document.getElementById('searchTextField')
        let places = new window.google.maps.places.Autocomplete(autocomplete);

    }

    render(){
        return(
            <div>
                <input 
                type='text'
                placeholder="Location of the game ..."
                value = {this.state.location}
                onChange={(event) => {
                    this.setState({location : event.target.value});
                }}
                id="searchTextField"/>
            </div>
        )
    }
}

export default AutoCompleteAdress;