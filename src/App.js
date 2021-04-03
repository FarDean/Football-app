import { useState, useEffect } from "react";
import { selectAllUsers, fetchUsers } from "./redux/slice";
import { useSelector, useDispatch } from "react-redux";

function App() {
	const dispatch = useDispatch();
	const users = useSelector(selectAllUsers);

	const [user, setUser] = useState({
		id: 4,
		name: "",
	});

	// const shit = useSelector(state => state.users);

	const usersStatus = useSelector(state => state.status);

	useEffect(() => {
		if (usersStatus === "idle") {
			dispatch(fetchUsers());
		}
	}, [dispatch, usersStatus]);

	console.log(users);

	async function postRequest() {
		const res = await fetch("/api/users", {
			method: "POST",
			body: JSON.stringify(user),
		});
		return res.json();
	}

	return (
		<div>
			{users.map(user => (
				<h1 key={user.id}>{user.name}</h1>
			))}
			<input type="text" onChange={e => setUser({ ...user, name: e.target.value })} />
			<button onClick={postRequest}>Submit</button>
		</div>
	);
}

export default App;
