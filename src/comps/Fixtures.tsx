import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./../redux/hooks";
import { fetchSchedule } from "../redux/scheduleSlice";
import styles from "./../styles/Fixtures.module.css";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";
import { formatRelative } from "date-fns";
import { Link } from "react-router-dom";

interface Props {
	leagueId: string | number;
}

export const Fixtures: React.FC<Props> = ({ leagueId }): JSX.Element => {
	const dispatch = useAppDispatch();
	const schedule = useAppSelector(state =>
		[...state.schedule.schedule].sort((a, b) => {
			return new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime();
		})
	);
	const scheduleStatus = useAppSelector(state => state.schedule.status);
	const error = useAppSelector(state => state.schedule.error);

	const lastWeek = getLastWeek();

	const nextWeek = getNextWeek();

	useEffect(() => {
		dispatch(fetchSchedule({ leagueId, lastWeek, nextWeek }));
	}, [dispatch, leagueId, lastWeek, nextWeek]);

	console.log(schedule);

	// comps
	const loader = (
		<div className={styles.container}>
			<div className={styles.loader}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	);

	if (scheduleStatus === "loading") return <Loader />;
	if (scheduleStatus === "succeeded")
		return (
			<div className={styles.parent}>
				{error && <Error text={error} />}
				{schedule.map((fixture, i) => (
					<Link key={i} to={`/fixture/${fixture.fixture.id}`} className={styles.flexitem}>
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
							{fixture.fixture.status.long === "Match Finished" ||
							fixture.fixture.status.long === "Not Started" ? (
								<div>{fixture.fixture.status.long}</div>
							) : fixture.fixture.status.long === "Halftime" ? (
								<div>
									<div>{fixture.fixture.status.long}</div>
									{loader}
								</div>
							) : (
								<div>
									{fixture.fixture.status.elapsed}
									<span>`</span>
									{loader}
								</div>
							)}
							<div>{formatRelative(new Date(fixture.fixture.date), new Date())}</div>
						</div>
					</Link>
				))}
			</div>
		);
	return <Loader />;
};

function getLastWeek(): string {
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

function getNextWeek(): string {
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
