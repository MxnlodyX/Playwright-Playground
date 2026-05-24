// Import Excel
import * as EXCEL from 'xlsx';
import fs from "fs";

interface TestRecord {
    userName : string;
    password : string;
}

export function readExcelFile(filePath:string){
    const file = fs.readFileSync(filePath);
    const workbook = EXCEL.read(file);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData: any[] = EXCEL.utils.sheet_to_json(sheet,{header:1})
    const records: TestRecord[] = rawData.slice(1).map((cols: any) => ({
        userName: cols[0],
        password: cols[1]
    }))
    return records;
}