import { Platform } from 'react-native';

export default class Utils {
    static getURLsFromHTMLImage(html) {
        const regex = /<img[^>]*(?:\bsrc\b\s*=)[^"]*"([^"]*)"[^>]*>/g;
        try {
            return Utils.getFirstCapturedMatchForSuccessiveMatches(regex, html);
        } catch (e) {
            return [];
        }
    }
    static getURLsFromPipeString(string) {
        const regex = /(\bhttp\b[^|]*|\bhttps\b[^|]*)/g;
        try {
            return Utils.getFirstCapturedMatchForSuccessiveMatches(regex, string);
        } catch (e) {
            return [];
        }
    }
    /*
        @param tourSlug represents the category slug (e.g. history_of_science) to match
        @param tourStops represent the custom field containing all the tour stops
            for a post (e.g. history_of_science:19|history_of_physics:1)
        @return the stop number for a given category slug or null if does not match
    */
    static getTourStopFromSlug(tourSlug, tourStops) {
        if (!(typeof tourStops === 'string')) {
            throw new TypeError('String parameter is expected for tourStops');
        }
        const regex = new RegExp(`${tourSlug}:(\\d+)`, 'g');
        const result = regex.exec(tourStops);
        return result !== null ? result[1] : null;
    }
    static getFirstCapturedMatchForSuccessiveMatches(regex, string) {
        if (!(regex instanceof RegExp)) {
            throw new TypeError('RegExp parameter is expected for regex');
        }
        if (!(typeof string === 'string')) {
            throw new TypeError('String parameter is expected for string');
        }
        let matches = null;
        const result = [];
        while ((matches = regex.exec(string)) !== null) { // eslint-disable-line no-cond-assign
            result.push(matches[1]);
        }
        return result;
    }
    static isIos() {
        return Platform.OS === 'ios';
    }
    static isAndroid() {
        return Platform.OS === 'android';
    }
    /**
     * Convert youtube page URL to a playable embedded URL.
     * @param Youtube page URL.
     * @return Converted youtube embedded URL.
     */
    static getEmbeddedYTURL(url) {
        return url.replace('watch?v=', 'embed/');
    }
    static toFloat(value) {
        const r = parseFloat(value);
        if (!isFinite(r)) {
            return 0.0;
        }
        return r;
    }

    static getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

}
