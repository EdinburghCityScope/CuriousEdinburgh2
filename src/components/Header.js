import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flex: 0.08,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2c9eb7',
    },
    button: {
        top: 5,
        padding: 4,
    },
    title: {
        top: 2,
        fontSize: 20,
        color: '#ffffff',
    },
    logo: {
        top: 2,
        padding: 4,
        color: '#ffffff',
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        color: '#fffaf0',
    },
});

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    render() {
        return (
          <View style={styles.container}>
            <TouchableHighlight
              onPress={this.toggleModal}
              style={styles.button}
              underlayColor={styles.touchable}
            >
              <Icon
                style={styles.close}
                name="bars"
                size={30}
                color="white"
              />
            </TouchableHighlight>
            <Text style={styles.title}>
              {this.props.title}
            </Text>
            <Text style={styles.logo}>
              Logo
            </Text>
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => { }}
            >
              <View style={styles.modal}>
                {this.props.children}
                <Button title="OK" onPress={this.toggleModal} />
              </View>
            </Modal>
          </View>
        );
    }
}
Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.element,
};
Header.defaultProps = {
    children: null,
};