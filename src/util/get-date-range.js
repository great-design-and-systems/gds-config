import moment from 'moment';

export default class GetDateRange {
    constructor(dateFormat) {
        //format should be yyyy-mm-dd
        const m = moment(dateFormat);
        console.log('m', m);
        this.date = m.toDate();
        this.startTime = getStartTime(this.date.getTime());
        this.endTime = getEndTime(this.date.getTime());
    }

    getStartTime() {
        return this.startTime;
    }

    getEndTime() {
        return this.endTime;
    }
}

function getStartTime(today) {
    var start = new Date(today);
    start.setHours(0, 0, 0, 0);
    return start.getTime();
}
function getEndTime(today) {
    var end = new Date(today);
    end.setHours(23, 59, 59, 999);
    return end.getTime();
}
