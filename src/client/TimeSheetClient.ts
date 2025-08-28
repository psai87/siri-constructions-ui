import {AuthState, host} from "../model/Constants.ts";
import type {TimeSheet} from "../model/TimeSheet.ts";

class TimeSheetClient {
    timesheetUrl: string = host + "/siricons/employee/timesheets";

    async getTimesheets(employeeId: string, startDate: string, endDate: string): Promise<TimeSheet[]> {
        const urlParams = new URLSearchParams();
        urlParams.append("employee_id", employeeId);
        urlParams.append("start_Date", startDate);
        urlParams.append("end_date", endDate);
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        const response: Response = await fetch(`${this.timesheetUrl}?${urlParams.toString()}`, requestOptions);
        if (!response.ok) {
            throw new Error(`getTimesheets HTTP error! status: ${response.status}`);
        }
        return await response.json() as TimeSheet[];
    }

    async createTimesheets(timeSheets: TimeSheet[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(timeSheets)
        };
        const response: Response = await fetch(this.timesheetUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`createTimesheets HTTP error! status: ${response.status}`);
        }
    }

    async updateTimesheets(timeSheets: TimeSheet[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(timeSheets)
        };
        const response: Response = await fetch(this.timesheetUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`updateTimesheets HTTP error! status: ${response.status}`);
        }
    }

    async deleteTimesheets(timeSheets: string[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(timeSheets)
        };
        const response: Response = await fetch(this.timesheetUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`deleteTimesheets HTTP error! status: ${response.status}`);
        }
    }

}

export const timeSheetClient = new TimeSheetClient();