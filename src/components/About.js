import React, { Component } from 'react';
import { Image,
         Linking,
         ListView,
         ScrollView,
         Text,
         TouchableHighlight,
         View } from 'react-native';
import * as styles from 'components/styles/About';

const banner = require('assets/cityscope-banner.jpg');

export default class About extends Component {

    constructor(props) {
        super(props);

        // navigation tab reference
        this.tabView = this.props.tabView;

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            // hard code tours until available from API
            dataSource: ds.cloneWithRows([
                {
                    id: '4',
                    title: 'General Science Tour',
                    description: 'From Charles Darwin to Higgs’ Boson  this tour will allow you to explore some of the places associated with major scientific and medical discoveries and personalities of the last five centuries, as well as some that are less famous, but deserve to be more widely known.',
                    image: 'http://curiousedinburgh.org/wp-content/uploads/2016/04/Peter-Higgs-150x150.jpg',
                },
                {
                    id: '21',
                    title: 'History of Geology',
                    description: 'Edinburgh has a long association with the science of geology. Perhaps the most famous Edinburgh geologist is James Hutton, whose name will forever be associated with the idea of ‘deep time’. However, Edinburgh was also home to many other colourful characters and events in the history of this ‘sublime science’. You can learn about some of them here.',
                    image: 'http://curiousedinburgh.org/wp-content/uploads/2016/07/irish-elk-150x150.jpg',
                },
                {
                    id: '25',
                    title: 'History of Physics',
                    description: 'Some of the most important figures in the history of physics have called Edinburgh their home, from John Napier in the 16th century to Peter Higgs in the 21st. This tour will guide you through the fascinating stories of their lives and work.',
                    image: 'http://curiousedinburgh.org/wp-content/uploads/2016/07/royal-obs-150x150.jpg',
                },
                {
                    id: '2',
                    title: 'History of Medicine',
                    description: 'Edinburgh is well known for its role in the history of medicine, with many notable figures having trained in the city. In this tour you will find out about some of the most important and intriguing of these people and their work.',
                    image: 'http://curiousedinburgh.org/wp-content/uploads/2017/02/ultrasound-150x150.jpg',
                },
            ]),
        };
    }

    _onPressTour(tour) {
        // register change of tour
        this.props.onValueChange(tour.id);

        // navigate to map
        this.tabView.goToPage(0);
    }

    render() {
    /* eslint-disable max-len */
        return (
          <ScrollView style={styles.page}>
            <View style={styles.header}>
              <Image
                source={banner}
                style={styles.banner}
              />
            </View>
            <View style={styles.body}>
              <Text style={styles.text}><Text style={{color: '#a7cb43'}}
            onPress={() => Linking.openURL('http://www.edinburghcityscope.org/')}>
                Edinburgh Cityscope
            </Text> turning the city of Edinburgh into a pervasive learning environment. Bit-by-bit we are creating tools that you can use to explore the city and to share what you find. This version of the Edinburgh Cityscope Tour app has been customised to guide you around points of interest chosen by someone using the Edinburgh Cityscope Tour Blog. The author of the blog chose what s/he wanted to show in the tour and this content was loaded into the app when you clicked the link you received by email or via social media on your phone. You only need to click this link once to customise the app. Thereafter, the app can be opened in the normal way and will automatically update with any new points of interest added by the author. If at any time you are sent a new link by someone, this will link the app to a different tour. The app can only show you one tour at a time, so if you want to revert to previous content just click on the relevant link. {'\n\n'}
              Edinburgh Cityscope is a project of the University of Edinburgh{'\n\n'}
            <Text style={styles.title}>
              Credits:{'\n\n'}
            </Text>
            Jonathan Silvertown{'\n\n'}
            Ben Butchart{'\n\n'}
            Richard Good{'\n\n'}
              </Text>
            </View>

          </ScrollView>
        );
        /* eslint-enable */
    }
}

About.propTypes = {
    onValueChange: React.PropTypes.func.isRequired,
    tabView: React.PropTypes.instanceOf(Object),
};

About.defaultProps = {
    tabView: {},
};
