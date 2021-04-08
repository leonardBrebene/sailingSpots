import React, { useMemo, useState } from 'react';
import { useTable,useSortBy,usePagination } from 'react-table';
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
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        state,
        pageOptions,
        prepareRow,
    } = useTable({  //unsing usetable hook get all the properties of table
        columns: columnsNames,
        data: locationData
    },
    useSortBy,usePagination)   //add sorting feature to my table instance
    const {pageIndex}= state
    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) =>
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (   //Header is defined in ColumnsOfTable
                                <th{...column.getHeaderProps(column.getSortByToggleProps)}>  
                                    {column.render('Header')}   
                                    <span className='columnArraw'> 
                                    { column.isSorted?(column.isSortedDesc ? arrawIcon.up :arrawIcon.down):arrawIcon.updown } 
                                    </span>  
                                 </th> // add properties related to the sorted feature on each column
                            ))}
                        </tr>
                    )}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
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
            <div className='buttonContainer'>
                <span  >Page{''}
                {pageIndex+1} of {pageOptions.length } 
                </span>
                <button className='prevNextButton'  onClick={()=>previousPage() } disabled={!canPreviousPage}>  Previous</button>
                <button className='prevNextButton' onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            </div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading..</div>}
        </div>
    )
}

export default KiteTable