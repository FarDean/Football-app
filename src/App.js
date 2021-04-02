import { useState, useEffect } from "react";
import { selectAllUsers, fetchUsers } from "./redux/slice";
import { useSelector, useDispatch } from "react-redux";

function App() {
	const dispatch = useDispatch();
	const users = useSelector(selectAllUsers);

	const shit = useSelector(state => state.users);

	const usersStatus = useSelector(state => state.status);

	useEffect(() => {
		if (usersStatus === "idle") {
			dispatch(fetchUsers());
		}
	}, [dispatch, usersStatus]);

	console.log(shit);

	return (
		<div>
			{shit.map(user => (
				<h1 key={user.id}>{user.name}</h1>
			))}
		</div>
	);
}

export default App;
