// DateManager.ts

export default class DateManager {

    constructor() { }

    static addYearsToDate(date: Date, years: number) {
        if(date != null && years != null) {
            let newDate = new Date(date);
            newDate.setFullYear(newDate.getFullYear() + years);
            return newDate;
        }
        return null;
    }
}