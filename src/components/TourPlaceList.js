import React, { Component } from 'react';
import { Image,
         ListView,
         Text,
         TouchableHighlight,
         View } from 'react-native';
import TourRecord from 'components/TourRecord';
import * as styles from 'components/styles/TourPlaceList';

export default class TourPlaceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        };
    }

    componentWillMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.tourPlaces),
        });
    }

    componentWillReceiveProps(nextProps) {
        // if current tourPlaces object is different from next tourPlaces
        if (this.props.tourPlaces !== nextProps.tourPlaces) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.tourPlaces),
            });
        }
    }

    _onPressRecord(row) {
        this.modal.show(row);
    }

    render() {
        return (
          <View style={styles.page}>
            <TourRecord
              ref={(c) => { this.modal = c; }}
            />
            <ListView
              dataSource={this.state.dataSource}
              renderRow={
                rowData =>
                  <TouchableHighlight
                    onPress={
                      () => this._onPressRecord(rowData)
                    }
                  >
                    <View style={styles.place}>
                      <Text style={styles.title}>{rowData.title}</Text>
                        <View style={styles.detail}>
                        <View>
                          <View style={styles.numberContainer}>
                            <Text style={styles.number}>{rowData.stop}</Text>
                          </View>

                          <Image
                            style={styles.image}
                            source={{ uri: rowData.images[0] }}
                          />
                        </View>
                        <View style={styles.textContainer}>
                          <Text
                            style={styles.text}
                          >
                            {rowData.getShortDescription()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>
              }
            />
          </View>
        );
    }
}

TourPlaceList.propTypes = {
    tourPlaces: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
