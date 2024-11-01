import React from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';

const Table = ({ data, sortColumn, onSort, columns }: any) => {
	return (
		<table className='table col table-striped table-rounded'>
			<TableHeader
				columns={columns}
				sortColumn={sortColumn}
				onSort={onSort}
			></TableHeader>
			<TableBody 
				columns={columns} 
				data={data}
			></TableBody>
		</table>
	);
};

export default Table;
