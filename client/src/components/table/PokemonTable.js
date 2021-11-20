import React, { useMemo } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import GlobalFilter from './GlobalFilter';
import '../../styles/pokemonTable.css';

const PokemonTable = ({ pokemonRows, pokemonColumns, pageSize, searchText, handleRowSelection }) => {

    const columns = useMemo(() => pokemonColumns, [pokemonColumns]);
    const data = useMemo(() => pokemonRows, [pokemonRows]);

    //Loads variables from react-table useTable hook
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
        setGlobalFilter,
        prepareRow,
    } = useTable(
        {
        columns,
        data,
        initialState: {
            pageSize: pageSize
        }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,    
    )
    
    const { globalFilter } = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} searchText={searchText}/>
            <table className="table table-striped table-primary table-bordered table-hover mt-3" {...getTableProps()} >
                <thead className="table-dark">
                    {headerGroups.map((headerGroup) => (
                        <tr className="text-start" {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th className="w-50" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <div className="d-flex justify-content-between">
                                        {column.render('Header')}
                                        <span>{column.isSorted ? (column.isSortedDesc ? '▼' : '▲' ) : ""}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr className="text-start body-rows" {...row.getRowProps({onClick: () => handleRowSelection(row)})}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="container-fluid d-flex justify-content-center mb-3">
                <button 
                    className="btn btn-primary" 
                    style={{width: "8em"}} disabled={!canPreviousPage} 
                    onClick={() => {previousPage()}}
                >
                    Previous
                </button>
                <button 
                    className="btn btn-primary" 
                    style={{width: "8em"}} 
                    disabled={!canNextPage} 
                    onClick={() => {nextPage()}}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default PokemonTable;