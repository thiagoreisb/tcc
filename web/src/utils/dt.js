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

    /**
     * Compare two strings representing time values.
     * @param {string} time1 Time as string type
     * @param {string} time2 Time as string type
     * @returns 0 if equal, 1 if first is greater else -1
     */
    compareTime(time1, time2) {
        let h = parseInt(time1.substring(0, 2));
        let m = parseInt(time1.substring(3, 5));
        let s = 0;
        let start = new Date(2019, 1, 1);
        start.setHours(h, m, s);

        h = parseInt(time2.substring(0, 2));
        m = parseInt(time2.substring(3, 5));
        let end = new Date(2019, 1, 1);
        end.setHours(h, m, s);

        // Iguais
        if (start.getTime() == end.getTime()) {
            return 0;
        }

        // Menor
        if (start < end) {
            return -1;
        }

        // Maior
        if (start >  end) {
            return 1;
        }
    }
}

export default DateUtils;