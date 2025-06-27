import "./App.css";
import { useEffect, useState } from "react";
import { Select } from "antd";
import BusinessTable from "./components/BusinessTable";
import type { Business } from "./components/BusinessTable";

const API = "http://localhost:3000/api/boba";

const LOCATIONS = [
	{ label: "Los Gatos", value: "121 Albright Wy, Los Gatos, CA 95032" },
	{ label: "New York", value: "888 Broadway, New York, NY 10003" },
	{
		label: "Los Angeles",
		value: "5808 Sunset Blvd, Los Angeles, CA 90028 Jose",
	},
];

const RADIUS_OPTIONS = [
	{ label: "1 mile", value: "1610" },
	{ label: "2 miles", value: "3220" },
	{ label: "3 miles", value: "4830" },
	{ label: "6 miles", value: "9660" },
	// { label: "10 miles", value: "16100" },
];

const SORTING_OPTIONS = [
	{ label: "Best Match", value: "best_match" },
	{ label: "Rating", value: "rating" },
	{ label: "Review Count", value: "review_count" },
	{ label: "Distance", value: "distance" },
];

const PAGE_SIZE = 10;

function App() {
	const [location, setLocation] = useState(LOCATIONS[0].value);
	const [radius, setRadius] = useState(RADIUS_OPTIONS[3].value);
	const [sortBy, setSortBy] = useState(SORTING_OPTIONS[0].value);
	const [data, setData] = useState<Business[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, [location, sortBy, page, radius]);

	const fetchData = async () => {
		setLoading(true);
		const offset = (page - 1) * PAGE_SIZE;
		const params = new URLSearchParams({
			location,
			limit: PAGE_SIZE.toString(),
			offset: offset.toString(),
			sort_by: sortBy,
			radius: radius.toString(),
		});
		const res = await fetch(`${API}?${params.toString()}`);
		const json = await res.json();
		setData(
			json.businesses.map((biz: any) => ({
				key: biz.id,
				name: biz.name,
				rating: biz.rating,
				distance: Math.round(biz.distance * 0.00062 * 100) / 100, // This multiplication is to transform the data in meters to miles. And to have 2 decimals.
				address: biz.location?.display_address?.join(", ") || "",
				review_count: biz.review_count,
			}))
		);
		setTotal(json.total);
		setLoading(false);
	};

	return (
		<div>
			<h2>🍿 Netflix loves boba 🍿</h2>
			<div className="selections-row">
				<div className="selection-combo">
					<label>Whats your office? </label>
					<Select
						style={{ width: 200, marginBottom: 16 }}
						options={LOCATIONS}
						value={location}
						onChange={(val) => {
							setLocation(val);
							setPage(1);
						}}
					/>
				</div>

				<div className="selection-combo">
					<label>How far are you willing to go? </label>
					<Select
						style={{ width: 150, marginBottom: 16 }}
						options={RADIUS_OPTIONS}
						value={radius}
						onChange={(val) => {
							setRadius(val);
							setPage(1);
						}}
					/>
				</div>

				<div className="selection-combo">
					<label>Sort by: </label>
					<Select
						style={{ width: 150, marginBottom: 16 }}
						options={SORTING_OPTIONS}
						value={sortBy}
						onChange={(val) => {
							setSortBy(val);
							setPage(1);
						}}
					/>
				</div>
			</div>
			<BusinessTable
				data={data}
				loading={loading}
				total={total}
				page={page}
				pageSize={PAGE_SIZE}
				onPageChange={(newPage) => setPage(newPage)}
			/>
		</div>
	);
}

export default App;
