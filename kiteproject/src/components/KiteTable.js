import React, { useMemo, useState } from 'react';
import { useTable,useSortBy } from 'react-table';
import useFetch from './useFetch';
import ColumnsOfTable from './ColumnsOfTable';
import './KiteTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV,faLongArrowAltDown,faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'

const KiteTable = () => {
    const arrawIcon = {updown:<FontAwesomeIcon icon={faArrowsAltV}/>,
                       up:<FontAwesomeIcon icon={faLongArrowAltDown}/>,
                       down:<FontAwesomeIcon icon={faLongArrowAltUp}/>}

    let url = "https://606cae1c603ded0017502834.mockapi.io/spot"
    const { data, isPending, error } = useFetch(url)

    const columnsNames = useMemo(() => ColumnsOfTable, [])   //useMemo to store the values and if they change rerender
    const locationData = useMemo(() => data, [data])
    //const [ceva,setceva]=useState();setceva(prevcev=>!prevcev); 

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({  //unsing usetable hook get all the properties of table
        columns: columnsNames,
        data: locationData
    },
    useSortBy)   //add sorting feature to my table instance

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) =>
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (   //Header is defined in ColumnsOfTable
                                <th{...column.getHeaderProps(column.getSortByToggleProps)}>  
                                    {column.render('Header')}   
                                    <span className='columnName'> 
                                    { column.isSorted?(column.isSortedDesc ? arrawIcon.up :arrawIcon.down):arrawIcon.updown } 
                                    </span>  
                                 </th> // add properties related to the sorted feature on each column
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