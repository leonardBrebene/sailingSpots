import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import useFetch from './useFetch';
import ColumnsOfTable from './ColumnsOfTable';

const KiteTable = () => {
    let url = "https://606cae1c603ded0017502834.mockapi.io/spot"
    const { data, isPending, error } = useFetch(url)

    const columnsNames = useMemo(() => ColumnsOfTable, [])   //useMemo to store the values and if they change rerender
    const locationData = useMemo(() => data, [data])
    //const [ceva,setceva]=useState();setceva(prevcev=>!prevcev); 


    const tableInstance = useTable({  //unsing usetable hook get all the properties of table
        columns: columnsNames,
        data: locationData
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

    } = tableInstance

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) =>
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th{...column.getHeaderProps()}>
                                    {column.render('Header')}  </th> //Header is defined in ColumnsOfTable
                            ))}
                        </tr>
                    )}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr{...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (<td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>)
                                })
                                } </tr>
                        )
                    })}
                </tbody>
            </table>
            {error && <div>{error}</div>}
            {isPending && <div>Loading..</div>}
        </div>
    )
}

export default KiteTable