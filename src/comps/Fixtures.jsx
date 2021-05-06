import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSchedule } from "./../redux/scheduleSlice";
import styles from "./../styles/Fixtures.module.css";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";

export const Fixtures = ({ leagueId }) => {
	const dispatch = useDispatch();
	const schedule = useSelector(state =>
		[...state.schedule.schedule].sort((a, b) => {
			return new Date(a.fixture.date) - new Date(b.fixture.date);
		})
	);
	const scheduleStatus = useSelector(state => state.schedule.status);
	const error = useSelector(state => state.schedule.error);

	const lastWeek = getLastWeek();

	const nextWeek = getNextWeek();

	useEffect(() => {
		dispatch(fetchSchedule({ leagueId, lastWeek, nextWeek }));
	}, [dispatch, leagueId, lastWeek, nextWeek]);

	console.log(schedule);
	if (scheduleStatus === "loading") return <Loader />;
	if (scheduleStatus === "succeeded")
		return (
			<div className={styles.parent}>
				{schedule.map((fixture, i) => (
					<div className={styles.flexitem} key={i}>
						<div className={styles.teams1}>
							<div className={styles.team}>
								<img className={styles.img} src={fixture.teams.home.logo} alt="" />
								{fixture.teams.home.name}
							</div>
							<div>{fixture.goals.home ?? ` `}</div>
						</div>
						<div className={styles.teams2}>
							<div className={styles.team}>
								<img className={styles.img} src={fixture.teams.away.logo} alt="" />
								{fixture.teams.away.name}
							</div>
							<div>{fixture.goals.away ?? ` `}</div>
						</div>
						<div className={styles.date}>
							<div>{fixture.fixture.status.long}</div>
						</div>
					</div>
				))}
			</div>
		);
	return <Error text={error} />;
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
