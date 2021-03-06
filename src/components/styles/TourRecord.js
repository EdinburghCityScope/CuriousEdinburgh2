import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#4a9113',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        alignSelf: 'center',
        top: 4,
        padding: 5,
    },
    close: {
        backgroundColor: '#4a9113',
        color: 'white',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    images: {
        flexDirection: 'row',
        padding: 20,
    },
    mediaContainer: {
        paddingRight: 10,
    },
    media: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    details: {
        borderWidth: 10,
        borderColor: '#efeff4',
    },
    address: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    description: {
        paddingTop: 10,
        fontSize: 18,
        padding: 10,
    },
    linksTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10,
    },
    link: {
        color: '#679fad',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
});
