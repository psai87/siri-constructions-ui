import {useEffect, useState} from 'react';
import {Check, Cross, Pencil, Plus, Save, Search, Trash2} from 'lucide-react';
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
    const [startDate, setStartDate] = useState<string | undefined | null>(null);
    const [endDate, setEndDate] = useState<string | undefined | null>(null);
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
        setTimeSheets([])
        setSelectedEmployee(null)
        setRowTimesheet(new Map());
        if (selectedValue && selectedValue.trim()) {
            const selectedEmployee: Employee | undefined = employees.find((employee: Employee) => employee.id === selectedValue);
            if (selectedEmployee) {
                setSelectedEmployee(selectedEmployee);
            }
        }
    };

    const handleInputChange = (
        id: string,
        field: string,
        value: string | null
    ): void => {
        if (!value) {
            console.warn("val cannot be null")
            return;
        }
        console.log(field, id, value);
        setTimeSheets((prev) =>
            prev.map((row: TimeSheet) =>
                row.id === id ? {...row, [field]: value} : row
            ));
    }

    const handleAddRow = () => {
        const newTimesheet: TimeSheet = {
            id: crypto.randomUUID(),
            employeeId: selectedEmployee!.id,
            date: "",
            hours: 0,
            createdTime: new Date().toISOString().slice(0, 19)
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
                if (response) {
                    setTimeSheets(response)
                    setRowTimesheet(new Map(response.map(data => [data.id as string, {
                        editable: false,
                        state: RowState.Original
                    } as RowDetail])))
                }
                console.log("timesheet loaded successfully")
            })
            .catch(error => {
                console.error(error)
                showAlert("error", error.message)
            })
    }

    function shouldDisableSave(): boolean {
        return timeSheets.find(data => data.date.trim() == "") != undefined;
    }

    const handleSave = async () => {
        console.log("Saving data");
        if (new Set(timeSheets.map(data => data.date)).size < timeSheets.length) {
            showAlert("error", "timesheets cannot have same date")
            return;
        }
        const added: TimeSheet[] = timeSheets.filter(data => RowState.Added === rowTimesheet.get(data.id)?.state)
        const updated: TimeSheet[] = timeSheets.filter(data => RowState.Edited === rowTimesheet.get(data.id)?.state)
        const deleted: string[] = [...rowTimesheet.entries()]
            .filter(([, item]) => RowState.Deleted === item.state)
            .map(([key,]) => key)
        const promiseArray: Promise<void>[] = []
        if (added?.length > 0) {
            console.log("added timesheets [size=" + added.length + "]");
            promiseArray.push(timeSheetClient.createTimesheets(added));
        }
        if (updated?.length > 0) {
            console.log("updates timesheets [size=" + updated.length + "]")
            promiseArray.push(timeSheetClient.updateTimesheets(updated));
        }
        if (deleted?.length > 0) {
            console.log("deleted timesheets [size=" + deleted.length + "]");
            promiseArray.push(timeSheetClient.deleteTimesheets(deleted));
        }
        try {
            await Promise.all(promiseArray);
            showAlert("success", "Successfully save data");
            const timesheets = await timeSheetClient.getTimesheets(selectedEmployee!.id, startDate!, endDate!)
            setTimeSheets(timesheets);
        } catch (error) {
            console.error(error)
            showAlert("error", "Failed to save data");
        }

    };

    return (
        <div className="antialiased font-inter bg-gray-50 min-h-screen">
            <style>
                {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Oswald:wght@500;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F4F6F8;
            color: #1a202c;
        }
        h1, h2, h3, h4, .font-oswald {
            font-family: 'Oswald', sans-serif;
        }
        .table {
          border-collapse: separate;
          border-spacing: 0 0.5rem;
        }
        .table th, .table td {
          padding: 1rem;
        }
        .table tbody tr {
          transition: all 0.2s ease-in-out;
        }
        `}
            </style>

            <main className="flex justify-center items-center py-25 px-6">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full max-w-6xl overflow-x-auto">
                    <h2 className="text-4xl font-extrabold text-gray-800 text-left mb-10 tracking-tight">
                        💼 Employee Timesheet Console
                    </h2>

                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 mb-6">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
                            <div className="flex flex-col items-start gap-1 w-full md:w-auto">
                                <label className="text-gray-600 text-sm font-medium">Select Employee</label>
                                <select
                                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                                    value={selectedEmployee?.id || ""}
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
                                onChange={setStartDate}
                                placeholder="Pick month and year"
                                label="Select Start Date"
                            />
                            <DateInput
                                value={endDate}
                                onChange={setEndDate}
                                placeholder="Pick month and year"
                                label="Select End Date"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row justify-end gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <button
                                className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 w-full md:w-auto
                  ${!selectedEmployee || !startDate || !endDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'}`}
                                onClick={handleSearch}
                                disabled={!selectedEmployee || !startDate || !endDate}
                            >
                                <Search size={18}/> Search
                            </button>
                            <button
                                className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 w-full md:w-auto
                  ${!selectedEmployee || !startDate || !endDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
                                onClick={handleAddRow}
                                disabled={!selectedEmployee || !startDate || !endDate}
                            >
                                <Plus size={18}/> Add
                            </button>
                            <button
                                className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 w-full md:w-auto
                  ${!selectedEmployee || !startDate || !endDate || shouldDisableSave() ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'}`}
                                onClick={handleSave}
                                disabled={!selectedEmployee || !startDate || !endDate || shouldDisableSave()}
                            >
                                <Save size={18}/> Save
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-base text-gray-800 border-separate border-spacing-y-4">
                            <thead>
                            <tr className="bg-gray-200 rounded-lg shadow-md">
                                <th className="p-4 text-left font-semibold rounded-l-lg">Date</th>
                                <th className="p-4 text-left font-semibold">Employee</th>
                                <th className="p-4 text-left font-semibold">Daily Hours</th>
                                <th className="p-4 text-center font-semibold rounded-r-lg">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {timeSheets.map((row) => (
                                <tr key={row.id} className="shadow-md bg-white hover:shadow-lg hover:-translate-y-1 transition-all rounded-lg">
                                    <td className="p-4 rounded-l-lg">
                                        <DateInput
                                            readOnly={!rowTimesheet.get(row.id)?.editable}
                                            value={row.date}
                                            onChange={(val) => handleInputChange(row.id, "date", val)}
                                            placeholder="YYYY-MM-DD"
                                            styles={{
                                                input: {
                                                    border: 'none', // remove default border
                                                    borderBottom: rowTimesheet.get(row.id)?.editable ? '2px solid #3b82f6' /* Tailwind blue-500 */ : '1px solid transparent',
                                                    backgroundColor: 'transparent',
                                                    padding: '0.25rem 0.5rem',
                                                    outline: 'none',
                                                    color: rowTimesheet.get(row.id)?.editable ? undefined : '#4b5563' /* Tailwind gray-700 */,
                                                    // optionally add focus style
                                                    '&:focus': {
                                                        borderBottomColor: '#3b82f6',
                                                        boxShadow: 'none',
                                                    }
                                                }
                                            }}
                                        />
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="text"
                                            value={selectedEmployee?.firstName}
                                            disabled={true}
                                            className="w-full px-2 py-1 bg-transparent border-b outline-none border-transparent text-gray-700"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="number"
                                            value={row.hours}
                                            disabled={!rowTimesheet.get(row.id)?.editable}
                                            onChange={(e) => handleInputChange(row.id, 'hours', e.target.value)}
                                            className={`w-full px-2 py-1 bg-transparent border-b outline-none ${
                                                rowTimesheet.get(row.id)?.editable
                                                    ? 'border-orange-400 focus:ring-0'
                                                    : 'border-transparent text-gray-700'
                                            }`}
                                        />
                                    </td>
                                    <td className="p-4 rounded-r-lg">
                                        <div className="flex justify-center items-center gap-2">
                                            {rowTimesheet.get(row.id)?.editable ? (
                                                <>
                                                    <button
                                                        onClick={() => handleConfirmEdit(row.id)}
                                                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-md transition"
                                                    >
                                                        <Check size={16}/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancel(row.id)}
                                                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
                                                    >
                                                        <Cross size={16}/>
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleEditRow(row.id)}
                                                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-md transition"
                                                >
                                                    <Pencil size={16}/>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteRow(row.id)}
                                                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
                                            >
                                                <Trash2 size={16}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-8 text-center mt-12">
                <div className="container mx-auto px-6">
                    <p>&copy; 2024 Siri Constructions. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
