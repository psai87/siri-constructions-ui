import { useState } from 'react';
import { Pencil, Trash2, Check, Plus, Save } from 'lucide-react';
import type { AlertsProps } from '../../model/Props.ts';
import {DateInput} from "@mantine/dates";

export default function EditTimeSheet({ setAlerts }: AlertsProps) {
    const [data, setData] = useState([
        { id: 1, name: 'Cypher', job: 'Data Analyst', location: 'Sector 7', startDate: '2023-01-15', endDate: '2024-03-20', employee: 'Alice Johnson', isEditing: false },
        { id: 2, name: 'Replicant', job: 'System Engineer', location: 'Nexus-6', startDate: '2022-06-01', endDate: '2024-05-10', employee: 'Bob Smith', isEditing: false },
        { id: 3, name: 'Neon', job: 'Security Protocol', location: 'Deep Web', startDate: '2023-09-01', endDate: '2024-12-31', employee: 'Charlie Brown', isEditing: false },
        { id: 4, name: 'Synapse', job: 'Network Architect', location: 'The Grid', startDate: '2021-02-20', endDate: '2025-01-30', employee: 'Diana Ross', isEditing: false },
        { id: 5, name: 'Unit 734', job: 'Automated Response', location: 'Server Farm', startDate: '2024-01-01', endDate: '2024-06-01', employee: 'Alice Johnson', isEditing: false },
    ]);

    const [employees] = useState(['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Ross', 'Eve Adams']);

    const handleInputChange = (e, index, field) => {
        const newData = [...data];
        newData[index][field] = e.target.value;
        setData(newData);
    };

    const handleAddRow = () => {
        const newId = data.length > 0 ? Math.max(...data.map(row => row.id)) + 1 : 1;
        const newRow = { id: newId, name: '', job: '', location: '', startDate: '', endDate: '', employee: employees[0], isEditing: true };
        setData([...data, newRow]);
    };

    const handleDeleteRow = (index) => setData(data.filter((_, i) => i !== index));

    const handleEditRow = (index) => {
        const newData = [...data];
        newData[index].isEditing = true;
        setData(newData);
    };

    const handleConfirmEdit = (index) => {
        const newData = [...data];
        newData[index].isEditing = false;
        setData(newData);
    };

    const handleSave = () => {
        console.log('Saving data:', data); // ✅ Console only (no alert)
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
            <div className="overflow-x-auto bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-200 w-full max-w-6xl">

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
                                // onChange={(e) => handleSelectService(e.target.value)}
                            >
                                <option value="">-- None selected --</option>
                                {/*{employees.map((emp) => (*/}
                                {/* <option key={emp.id} value={emp.id}>*/}
                                {/* {emp.firstName} {emp.lastName}*/}
                                {/* </option>*/}
                                {/*))}*/}
                            </select>
                        </div>
                        <DateInput
                            // value={employeeForm.dob}
                            // onChange={handleDateChange}
                            placeholder="Pick month and year"
                            label="Select Month & Year"
                            valueFormat="YYYY/MM/DD"
                        />
                        <DateInput
                            // value={employeeForm.dob}
                            // onChange={handleDateChange}
                            placeholder="Pick month and year"
                            label="Select Month & Year"
                            valueFormat="YYYY/MM/DD"
                        />
                    </div>
                    {/* Right-aligned buttons */}
                    <div className="flex gap-3">
                        <button
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg transition-all duration-300"
                            onClick={handleAddRow}
                        >
                            <Plus size={18} /> Add Row
                        </button>
                        <button
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg transition-all duration-300"
                            onClick={handleSave}
                        >
                            <Save size={18} /> Save
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
                    {data.map((row, index) => (
                        <tr
                            key={row.id}
                            className="shadow-md bg-white hover:shadow-xl hover:scale-[1.01] transition-all rounded-lg"
                        >
                            <td className="p-4">
                                <input
                                    type="date"
                                    value={row.endDate}
                                    onChange={(e) => handleInputChange(e, index, 'endDate')}
                                    readOnly={!row.isEditing}
                                    className={`w-full px-2 py-1 bg-transparent border-b outline-none ${
                                        row.isEditing
                                            ? 'border-blue-400 focus:ring-0'
                                            : 'border-transparent text-gray-700'
                                    }`}
                                />
                            </td>
                            <td className="p-4">
                                <input
                                    type="text"
                                    value={row.employee}
                                    disabled={!row.isEditing}
                                    onChange={(e) => handleInputChange(e, index, 'employee')}
                                    className={`w-full px-2 py-1 bg-transparent border-b outline-none ${
                                        row.isEditing
                                            ? 'border-blue-400 focus:ring-0'
                                            : 'border-transparent text-gray-700'
                                    }`}
                                />
                            </td>
                            <td className="p-4">
                                <input
                                    type="text"
                                    value={row.endDate}
                                    disabled={!row.isEditing}
                                    onChange={(e) => handleInputChange(e, index, 'employee')}
                                    className={`w-full px-2 py-1 bg-transparent border-b outline-none ${
                                        row.isEditing
                                            ? 'border-blue-400 focus:ring-0'
                                            : 'border-transparent text-gray-700'
                                    }`}
                                />
                            </td>
                            <td className="p-4 flex justify-center gap-2">
                                {row.isEditing ? (
                                    <button
                                        onClick={() => handleConfirmEdit(index)}
                                        className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-md transition"
                                    >
                                        <Check size={16} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEditRow(index)}
                                        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md transition"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteRow(index)}
                                    className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
                                >
                                    <Trash2 size={16} />
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
