import React, { useEffect, useRef, useState } from 'react';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';

const App = () => {
	const [data, setData] = useState([]);
	const tableRef = useRef();

	useEffect(() => {
		fetch('https://dummyjson.com/products')
			.then((res) => res.json())
			.then(async (data) => {
				setData(data);
			})
			.then((json) => console.log(json));
	}, []);

	const table = tableRef.current;
	const handlePrint = useReactToPrint({
		content: () => table,
	});

	return (
		<div style={{ padding: '30px' }}>
			<button onClick={handlePrint} className="btn btn-primary">
				Export
			</button>
			<h3>Table Data:</h3>
			<table ref={tableRef} className="table table-bordered" id="my-table">
				<thead style={{ background: 'yellow' }}>
					<tr>
						<th scope="col">Id</th>
						<th scope="col">Title</th>
						<th scope="col">Brand</th>
						<th scope="col">Category</th>
						<th scope="col">Price</th>
						<th scope="col">Rating</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data?.products) &&
						data?.products?.map((row) => (
							<tr key={row?.id}>
								<td>{row?.id}</td>
								<td>{row?.title}</td>
								<td>{row?.brand}</td>
								<td>{row?.category}</td>
								<td>${row?.price}</td>
								<td>{row?.rating}/5</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default App;
