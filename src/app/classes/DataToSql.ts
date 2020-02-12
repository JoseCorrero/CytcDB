// DataToSql.ts

export default class DataToSql {

    constructor() { }

    static stringToSql(str: string) : string {
        if(str != null)
            return str.replace(/'/gi, "''");

        return null;
    }

    static dateToSql(date: Date) {
        if(date) {
            let sqlDate = new Date(date);
            sqlDate.setHours(sqlDate.getHours() + 12);
            return `'` + sqlDate.toISOString().substr(0, 10) + `'`;
        }
        return null;
    }
}