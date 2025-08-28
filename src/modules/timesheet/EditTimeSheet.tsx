import {useEffect, useState} from 'react';
import {Check, Cross, Pencil, Plus, Save, Trash2} from 'lucide-react';
import type {AlertsProps} from '../../model/Props.ts';
import {DateInput} from "@mantine/dates";
import type {Employee} from "../../model/Employee.ts";
import {employeeClient} from "../../client/EmployeeClient.ts";
import {timeSheetClient} from "../../client/TimeSheetClient.ts";
import type {TimeSheet} from "../../model/TimeSheet.ts";
import {type RowDetail, RowState} from "../../model/Constants.ts";

export default function EditTimeSheet({setAlerts}: AlertsProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [startDate, setStartDate] = useState<string | undefined | null>();
    const [endDate, setEndDate] = useState<string | undefined | null>();
    const [timeSheets, setTimeSheets] = useState<TimeSheet[]>([]);
    const [rowTimesheet, setRowTimesheet] = useState<Map<string, RowDetail>>(new Map<string, RowDetail>())
    const [tempRowTimesheets, setTempRowTimesheets] = useState<Map<string, TimeSheet>>(new Map<string, TimeSheet>())


    useEffect(() => {
        employeeClient.getEmployees()
            .then(response => {
                setEmployees(response);
                console.log("Employee loaded");
            })
            .catch(error => {
                console.log(error)
                showAlert("error", error.message)
            })
    }, []);

    const showAlert = (type: "success" | "error", message: string) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, {id, type, message}]);
    };

    const handleSelectService = (selectedValue: string) => {
        if (!selectedValue || !selectedValue.trim()) {
            return;
        }
        const selectedEmployee: Employee | undefined = employees.find((employee: Employee) => employee.id === selectedValue);
        if (selectedEmployee) {
            setSelectedEmployee(selectedEmployee);
        }
    };

    const handleInputChange = (
        id: string,
        field: string,
        value: string
    ): void => {
        setTimeSheets((prev) =>
            prev.map((row: TimeSheet) =>
                row.id === id ? {...row, [field]: value} : row
            ));
    }

    const handleAddRow = () => {
        const newTimesheet: TimeSheet = {
            id: crypto.randomUUID(),
            employeeId: "",
            date: "",
            hours: 0
        };
        const newRowDetail: RowDetail = {
            editable: false,
            state: RowState.Added
        }
        setTimeSheets(prev => [...prev, newTimesheet]);
        setRowTimesheet(prevMap => new Map(prevMap).set(newTimesheet.id, newRowDetail));
    };

    const handleDeleteRow = (id: string): void => {
        setRowTimesheet(prevMap => {
            const newMap = new Map(prevMap);
            if (newMap.get(id)?.state == RowState.Added) {
                newMap.delete(id)
            } else {
                newMap.set(id, {...newMap.get(id) as RowDetail, state: RowState.Deleted});
            }
            return newMap;
        })
        setTimeSheets(prevMap => prevMap.filter(timesheet => timesheet.id !== id))
        setTempRowTimesheets(prevMap => {
            const newMap = new Map(prevMap);
            newMap.delete(id)
            return newMap;
        })
    };

    const handleEditRow = (id: string): void => {
        setRowTimesheet(prevMap =>
            new Map(prevMap).set(id, {...prevMap.get(id)!, editable: true}));
        setTempRowTimesheets(prevMap =>
            new Map(prevMap).set(id, timeSheets.find(data => data.id === id) as TimeSheet));
    };

    const handleConfirmEdit = (id: string): void => {
        setRowTimesheet(prevMap => {
            const prevDetail: RowDetail = prevMap.get(id) as RowDetail;
            return new Map(prevMap).set(id, {
                ...prevDetail,
                editable: false,
                state: prevDetail?.state === RowState.Added ? RowState.Added : RowState.Edited,
            });
        });
        setTempRowTimesheets(prevMap => {
            const newMap = new Map(prevMap);
            newMap.delete(id)
            return newMap;
        })
    };

    const handleCancel = (id: string): void => {
        setRowTimesheet(prevMap =>
            new Map(prevMap).set(id, {...prevMap.get(id) as RowDetail, editable: false}));
        setTimeSheets(prevMap => prevMap.filter(timesheet => timesheet.id !== id)
            .concat(tempRowTimesheets.get(id) as TimeSheet));
        setTempRowTimesheets(prevMap => {
            const newMap = new Map(prevMap);
            newMap.delete(id)
            return newMap;
        })
    };

    const handleSearch = () => {
        timeSheetClient
            .getTimesheets(selectedEmployee!.id, startDate!, endDate!)
            .then(response => {
                setTimeSheets(response)
                console.log("timesheet loaded successfully")
            })
            .catch(error => {
                console.error(error)
                showAlert("error", error.message)
            })
    }

    const handleSave = () => {
        console.log('Saving data:'); // ✅ Console only (no alert)
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen p-6 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
            <div
                className="overflow-x-auto bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-200 w-full max-w-6xl">

                {/* Title */}
                <h2 className="text-4xl font-extrabold text-left text-gray-800 drop-shadow mb-10 tracking-tight">
                    💼 Employee Timesheet Console
                </h2>

                {/* Toolbar */}
                <div className="flex justify-between items-center mb-6">
                    {/* Left-aligned items */}
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-start gap-1">
                            <label className="text-gray-600 text-sm font-medium">Select Employee</label>
                            <select
                                className="px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                value={""}
                                onChange={(e) => handleSelectService(e.target.value)}
                            >
                                <option value="">-- None selected --</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.firstName} {emp.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <DateInput
                            value={startDate}
                            onChange={(val) => setStartDate(val)}
                            placeholder="Pick month and year"
                            label="Select Month & Year"
                            valueFormat="YYYY/MM/DD"
                        />
                        <DateInput
                            value={endDate}
                            onChange={(val) => setEndDate(val)}
                            placeholder="Pick month and year"
                            label="Select Month & Year"
                            valueFormat="YYYY/MM/DD"
                        />
                    </div>
                    {/* Right-aligned buttons */}
                    <div className="flex gap-3">
                        <button
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg transition-all duration-300"
                            onClick={handleSearch}
                            disabled={!selectedEmployee || !startDate || !endDate}
                        >
                            <Plus size={18}/> Search
                        </button>
                        <button
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg transition-all duration-300"
                            onClick={handleAddRow}
                            disabled={!selectedEmployee || !startDate || !endDate}
                        >
                            <Plus size={18}/> Add Row
                        </button>
                        <button
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg transition-all duration-300"
                            onClick={handleSave}
                            disabled={!selectedEmployee || !startDate || !endDate}
                        >
                            <Save size={18}/> Save
                        </button>
                    </div>
                </div>

                {/* Table */}
                <table className="table w-full text-base text-gray-800 border-separate border-spacing-y-2">
                    <thead>
                    <tr className="bg-gray-200/80 rounded-lg">
                        <th className="p-4 text-left font-semibold">Date</th>
                        <th className="p-4 text-left font-semibold">Employee</th>
                        <th className="p-4 text-left font-semibold">Daily Hours</th>
                        <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {timeSheets.map((row) => (
                        <tr
                            key={row.id}
                            className="shadow-md bg-white hover:shadow-xl hover:scale-[1.01] transition-all rounded-lg"
                        >
                            <td className="p-4">
                                <DateInput
                                    readOnly={!rowTimesheet.get(row.id)?.editable}
                                    value={row.date}
                                    // onChange={(val) =>}
                                    placeholder="Pick month and year"
                                    label="Select Month & Year"
                                    valueFormat="YYYY/MM/DD"
                                    className={`w-full px-2 py-1 bg-transparent border-b outline-none ${
                                        rowTimesheet.get(row.id)?.editable
                                            ? 'border-blue-400 focus:ring-0'
                                            : 'border-transparent text-gray-700'
                                    }`}
                                />
                            </td>
                            <td className="p-4">
                                <input
                                    type="text"
                                    value={row.employeeId}
                                    disabled={true}
                                    className={`w-full px-2 py-1 bg-transparent border-b outline-none ${'border-blue-400 focus:ring-0'}`}
                                />
                            </td>
                            <td className="p-4">
                                <input
                                    type="text"
                                    value={row.hours}
                                    disabled={!rowTimesheet.get(row.id)?.editable}
                                    onChange={(e) => handleInputChange(row.id, 'hours', e.target.value)}
                                    className={`w-full px-2 py-1 bg-transparent border-b outline-none ${
                                        !rowTimesheet.get(row.id)?.editable
                                            ? 'border-blue-400 focus:ring-0'
                                            : 'border-transparent text-gray-700'
                                    }`}
                                />
                            </td>
                            <td className="p-4 flex justify-center gap-2">
                                {!rowTimesheet.get(row.id)?.editable ? (
                                    <button
                                        onClick={() => handleConfirmEdit(row.id)}
                                        className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-md transition"
                                    >
                                        <Check size={16}/>
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEditRow(row.id)}
                                            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md transition"
                                        >
                                            <Pencil size={16}/>
                                        </button>
                                        <button
                                            onClick={() => handleCancel(row.id)}
                                            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md transition"
                                        >
                                            <Cross size={16}/>
                                        </button>
                                    </div>

                                )}
                                <button
                                    onClick={() => handleDeleteRow(row.id)}
                                    className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
                                >
                                    <Trash2 size={16}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
