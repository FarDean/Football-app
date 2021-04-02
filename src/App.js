import { useState, useEffect } from "react";

function App() {
	const [shit, setShit] = useState(null);

	useEffect(() => {
		async function getShit() {
			const res = await fetch("/api/users");
			const data = await res.json();
			setShit(data);
		}
		getShit();
	}, []);

	console.log(shit);

	return <div>hi</div>;
}

export default App;
