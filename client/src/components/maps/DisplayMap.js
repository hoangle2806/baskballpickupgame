import React, {Component} from 'react';


class DisplayMap extends Component{
    componentDidMount(){
        this.renderMap();
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA9I4yVCCipOqKe1vAGOC6VxIQ3HFWW1wg&callback=initMap");
        window.initMap = this.initMap;
    }

    initMap = () =>{
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.419857, lng: -122.078827},
          zoom: 11
        })
      }

    render(){
        return(
            <div id="map">
                <h1>GOOGLE MAPS</h1>
            </div>
        )
    }
}

function loadScript(url) {
    let index = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script,index);
  }

export default DisplayMap;