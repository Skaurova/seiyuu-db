"use client"

import React from "react"

export interface TableColumn {
    key: string;
    label: string;
}

interface TableProps {
    columns: TableColumn[];
    data: Record<string, any>[];
    className?: string;
}

export default function Table({ columns, data, className }: TableProps) {
    return (
        <table className={className} style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
                <tr>
                    {columns.map(column => (
                        <th
                            key={column.key}>
                            {column.label}
                        </th>))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map(column => (
                            <td>
                                {row[column.key]}
                            </td>))}
                    </tr>))}
            </tbody>
        </table>
    )
}