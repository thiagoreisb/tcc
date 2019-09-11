class DateUtils {

    /**
     * Normalize date value to the Brazil timezone
     * @function
     * @param {Date} utcDate Date in UTC format
     */
    toLocal(utcDate) {
        utcDate.setHours(utcDate.getHours() + 5);
    }

    /**
     * Normalize a date on string format to Brazilian timezone if needed
     * @param {String} utcString Date variable in string yyyy-MM-ddTHH:mm:ss.sss format
     * @returns {String} String formatted
     */
    stringToLocal(utcString) {
        let aux = parseInt(utcString.substr(11, 13));
        
        return (aux < 5 ? utcString.substr(0, 12) + '5' + utcString.substr(13, utcString.length)
                : utcString);
    }
}

export default DateUtils;