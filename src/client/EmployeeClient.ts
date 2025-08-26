import {AuthState, host} from "../model/Constants.ts";
import type {Employee} from "../model/Employee.ts";

class EmployeeClient {
    employeeUrl: string = host + "/siricons/employee";

    async getEmployees(): Promise<Employee[]> {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        const response: Response = await fetch(this.employeeUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`getEmployees HTTP error! status: ${response.status}`);
        }
        return await response.json() as Employee[];
    }

    async createEmployees(employees: Employee[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(employees)
        };
        const response: Response = await fetch(this.employeeUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`createEmployees HTTP error! status: ${response.status}`);
        }
    }

    async updateEmployees(employees: Employee[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(employees)
        };
        const response: Response = await fetch(this.employeeUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`updateEmployees HTTP error! status: ${response.status}`);
        }
    }

    async deleteEmployees(employees: string[]): Promise<void> {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthState.token}`},
            body: JSON.stringify(employees)
        };
        const response: Response = await fetch(this.employeeUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`deleteEmployees HTTP error! status: ${response.status}`);
        }
    }

}

export const employeeClient = new EmployeeClient();