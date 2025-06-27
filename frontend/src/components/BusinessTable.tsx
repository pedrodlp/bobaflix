import { Table } from "antd";
import type { TableColumnsType } from "antd";

export interface Business {
	key: string;
	name: string;
	address: string;
	rating: number;
	distance: number;
}

interface Props {
	data: Business[];
	loading: boolean;
	total: number;
	page: number;
	pageSize: number;
	onPageChange: (page: number, pageSize: number) => void;	
}

const columns: TableColumnsType<Business> = [
	{ title: "Name", dataIndex: "name", key: "name" },
	{ title: "Rating", dataIndex: "rating", key: "rating" },
	{
		title: "Distance (mi)", // This title takes too much space, but felt necessary.
		dataIndex: "distance",
		key: "distance",
	},
	{ title: "Review Count", dataIndex: "review_count", key: "review_count" },
	{ title: "Address", dataIndex: "address", key: "address" },
];

export default function BusinessTable({
	data,
	loading,
	total,
	page,
	pageSize,
	onPageChange,
}: Props) {
	return (
		<Table
			columns={columns}
			dataSource={data}
			loading={loading}
			pagination={{
				current: page,
				pageSize,
				total,
				showSizeChanger: false,
				onChange: onPageChange,
			}}
			rowKey="key"
		/>
	);
}
