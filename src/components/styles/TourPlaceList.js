import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    place: {
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 4,
        color: '#404142',
        backgroundColor: '#e6e6e6',
    },
    detail: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 5,
    },
    numberContainer: {
        paddingRight: 5,
        paddingBottom: 5,
    },
    number: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#4a9113',
        borderRadius: 50,
        width: 30,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 2,
        borderColor: '#404142',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        padding: 10,
        fontSize: 18,
    },
});
