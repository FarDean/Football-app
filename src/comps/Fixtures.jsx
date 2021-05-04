import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSchedule } from "./../redux/scheduleSlice";

export const Fixtures = ({ leagueId }) => {
	const dispatch = useDispatch();
	const schedule = useSelector(state => state.schedule.schedule);
	const scheduleStatus = useSelector(state => state.schedule.status);
	const error = useSelector(state => state.schedule.error);

	const lastWeek = getLastWeek();

	const nextWeek = getNextWeek();

	useEffect(() => {
		if (scheduleStatus === "idle") {
			dispatch(fetchSchedule({ leagueId, lastWeek, nextWeek }));
		}
	}, [dispatch, leagueId, lastWeek, nextWeek, scheduleStatus]);

	console.log(schedule);

	return <h1>Fixtures</h1>;
};

function getLastWeek() {
	const today = new Date();
	const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
	const lastWeekMonth = lastWeek.getMonth() + 1;
	const lastWeekDay = lastWeek.getDate();
	const lastWeekYear = lastWeek.getFullYear();
	return (
		("0000" + lastWeekYear.toString()).slice(-4) +
		"-" +
		("00" + lastWeekMonth.toString()).slice(-2) +
		"-" +
		("00" + lastWeekDay.toString()).slice(-2)
	);
}

function getNextWeek() {
	const today = new Date();
	const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
	const lastWeekMonth = lastWeek.getMonth() + 1;
	const lastWeekDay = lastWeek.getDate();
	const lastWeekYear = lastWeek.getFullYear();
	return (
		("0000" + lastWeekYear.toString()).slice(-4) +
		"-" +
		("00" + lastWeekMonth.toString()).slice(-2) +
		"-" +
		("00" + lastWeekDay.toString()).slice(-2)
	);
}
