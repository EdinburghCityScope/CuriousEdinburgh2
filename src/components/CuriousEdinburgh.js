import React, { Component } from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SplashScreen from 'react-native-splash-screen';

// Services
import WordPress from '../services/WordPress';
import MapBox from '../services/MapBox';
// Models
import Tour from '../models/Tour';
import Preference from '../models/Preference';
// Components
import Header from './Header';
import TourMap from './TourMap/index';
import TourPlaceList from './TourPlaceList';
import TourList from './TourList';
import About from './About';

import url from 'url';
import Utils from '../utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 0.91,
    },
    tabHighlight: {
        backgroundColor: '#404142',
    },
});

export default class CuriousEdinburgh extends Component {
    constructor() {
        super();
        this.firstCallToFetch = true;   //Used as Flag to hide the SplashScreen JUST once, i.e. at the beginning for the first call to _fetch
        this.baseUrl;   //This attribute is set ONLY when a successful URL is passed to the app
        this.state = { tours: [], selectedTour: null };
        this.changeSelectedTour = this.changeSelectedTour.bind(this);
        this._handleDeepLink = this._handleDeepLink.bind(this);
    }
    _fetch(){
        WordPress.getTours(this.baseUrl)
            .then((tours) => {
                this.setState({ tours, selectedTour: null });
                if(this.firstCallToFetch){
                    this.firstCallToFetch = false;
                    SplashScreen.hide();
                }
            }, (error) => {
                if(this.firstCallToFetch){
                    this.firstCallToFetch = false;
                    SplashScreen.hide();
                }
                Alert.alert('WordPress tours', error.toString());
        });
    }
    _handleDeepLink(event){
        const url_param = event.url;
        if (url_param) {
            const du = decodeURIComponent(url_param);
            const r = url.parse(du);
            const host = r.host;
            const tour = Utils.getParameterByName('tour', du);
            const protocol = Utils.getParameterByName('protocol', du);
            if (tour) {
                Preference.setTourId(tour);
            }
            if (protocol === 'secure') {
                this.baseUrl = `https://${host}`;
            } else {
                this.baseUrl = `http://${host}`;
            }
        }
        this._fetch();
    }
    componentDidMount() {
        this._fetch();
        Linking.addEventListener('url', this._handleDeepLink);
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.state.selectedTour !== nextState.selectedTour) {
            if(nextState.selectedTour !== null){
                Preference.setTourId(nextState.selectedTour.id);
            }
        }
    }
    componentDidUpdate() {
        if (this.state.selectedTour === null) {
            Preference.getTourId().then(tourId => this.changeSelectedTour(tourId));
        }
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleDeepLink);
    }
    changeSelectedTour(tourId) {
        const tour = this.state.tours.find(e => e.id === tourId);
        if (tour) {
            if (tour.tourPlaces.length > 0) {
                if (Utils.isAndroid()) {
                    // temporary workaround for
                    // https://github.com/edina/CuriousEdinburgh2/issues/75
                    setTimeout(() => {
                        this.setState({ selectedTour: tour });
                    }, 100);
                } else {
                    this.setState({ selectedTour: tour });
                }
            } else {
                WordPress.getTourPlaces(tour, this.baseUrl).then((tourPlaces) => {
                    const locations = tourPlaces.map(value => value.location);
                    const index = this.state.tours.findIndex(e => e.id === tourId);
                    MapBox.getDirections(locations)
                        .then((directions) => {
                            const newTour = Object.assign(
                                new Tour(), tour, { tourPlaces, directions });
                            const newTours = this.state.tours.slice(0, index)
                                .concat([newTour])
                                .concat(this.state.tours.slice(index + 1));
                            this.setState({ tours: newTours, selectedTour: newTour });
                        }, (error) => {
                            const newTour = Object.assign(
                                new Tour(), tour, { tourPlaces });
                            const newTours = this.state.tours.slice(0, index)
                                .concat([newTour])
                                .concat(this.state.tours.slice(index + 1));
                            this.setState({ tours: newTours, selectedTour: newTour });
                            Alert.alert('Mapbox directions', error.toString());
                        });
                }, (error) => {
                    Alert.alert('WordPress tour places', error.toString());
                });
            }
        }
    }
    render() {
        const tourPlaces = (this.state.selectedTour !== null ?
            this.state.selectedTour.tourPlaces : []);
        return (
          <View style={styles.container}>
            <Header title={this.state.selectedTour != null ? this.state.selectedTour.name : 'Loading...'}>
              <TourList
                tours={this.state.tours}
                selectedValue={this.state.selectedTour !== null ?
                    this.state.selectedTour.id : ''}
                onValueChange={this.changeSelectedTour}
              />
            </Header>
            <ScrollableTabView
              tabBarPosition="bottom"
              style={styles.body}
              tabBarUnderlineStyle={styles.tabHighlight}
              tabBarActiveTextColor='#404142'
              tabBarInactiveTextColor='#4a9113'
              ref={(tabView) => { this.tabView = tabView; }}
            >

              <TourMap
                tabLabel="Map"
                tour={this.state.selectedTour || undefined}
              />
              <TourPlaceList
                tabLabel="List"
                tourPlaces={tourPlaces}
              />
              <About
                tabLabel="About"
                tabView={this.tabView}
                onValueChange={this.changeSelectedTour}
              />
            </ScrollableTabView>
          </View>
        );
    }
}
