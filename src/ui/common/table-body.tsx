import React from 'react';
import _ from 'lodash'
import { nanoid } from 'nanoid';

function TableBody(props: any) {

	const { data, columns } = props;


	const renderCell = (item: any, column: any) => {
		if (column.content) {
			return column.content(item);
		}
		return _.get(item, column.path);
	};

	const createKey = (column: any, item: any, index: any) => {
		return column + item + index;
	};

	const uniqueId = nanoid();
	
	return (
		<tbody>
			{data.map((item: any, rowIndex: any) => (
				<tr key={`${item._id}-${rowIndex}`}>
					{columns.map((column: any, cellIndex: any) => 
						{
							const id = createKey(column.path, item._id, cellIndex)

							return (
								<td key={id} id={id}>
									{renderCell(item, column)}
								</td>
							)

						}
					)}
				</tr>
			))}
		</tbody>
	);
}

export default TableBody;
