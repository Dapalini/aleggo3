import React from 'react';

interface TablePropTypes {
	sortColumn: any;
	columns: any;
	onSort: (sortColumn: any) => void;

}


function TableHeader({ sortColumn, columns, onSort}: TablePropTypes) {

	const raiseSort = (path: any) => {

		if (path === sortColumn.path)
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}
		onSort(sortColumn);
	};

	const renderSortIcon = (column: any) => {
		if (column !== sortColumn.path) return null;
		if (sortColumn.order === 'asc') return <span>▼</span>;
		return <span>▲</span>;
	};

	return (
		<thead className='clickable'>
			<tr>
				{columns.map((column: any) => (
					<th
						key={column.path}
						style={{ cursor: 'pointer' }}
						onClick={() => raiseSort(column.path)}
					>
						{column.label} {renderSortIcon(column.path)}
					</th>
				))}
			</tr>
		</thead>
	);
}

export default TableHeader;
