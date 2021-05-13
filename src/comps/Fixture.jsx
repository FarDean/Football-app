import { fetchSingleFixture } from "./../redux/singleFixtureSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";
import style from "./../styles/Fixture.module.css";
import { Back } from "./utils/Back";
import { formatRelative } from "date-fns";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const Fixture = React.memo(() => {
	const dispatch = useDispatch();
	const fixture = useSelector(state => state.singleFixture.fixture);
	const fixtureStatus = useSelector(state => state.singleFixture.status);
	const error = useSelector(state => state.singleFixture.error);

	let { fixtureId } = useParams();

	useEffect(() => {
		dispatch(fetchSingleFixture(fixtureId));
	}, [dispatch, fixtureId]);

	console.log(fixture);

	if (fixtureStatus === "succeeded")
		return (
			<>
				<Back />
				{fixtureStatus === "loading" && <Loader />}
				{fixtureStatus === "failed" && <Error text={error} />}
				<div className={style.box}>
					<div className={style.top}>
						<div>{fixture.league.name}</div>
						<div>Match Day: {fixture.league.round.slice(17)}</div>
						<div>{formatRelative(new Date(fixture.fixture.date), new Date())}</div>
						{fixture.fixture.status.long === "Match Finished" ||
						fixture.fixture.status.long === "Not Started" ? (
							<div>{fixture.fixture.status.long}</div>
						) : fixture.fixture.status.long === "Halftime" ? (
							<div>
								{fixture.fixture.status.long}
								<div className={style.container}>
									<div className={style.loader}>
										<span></span>
										<span></span>
										<span></span>
										<span></span>
									</div>
								</div>
							</div>
						) : (
							<div>
								{fixture.fixture.status.elapsed}
								<span>`</span>
								<div className={style.container}>
									<div className={style.loader}>
										<span></span>
										<span></span>
										<span></span>
										<span></span>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className={style.teams}>
						<div className={style.team}>
							<div>
								<img src={fixture.teams.home.logo} alt="" />
							</div>
							<div>{fixture.teams.home.name}</div>
						</div>
						<div className={style.score}>
							<div>{fixture.goals.home}</div>
							<div>-</div>
							<div>{fixture.goals.away}</div>
						</div>
						<div className={style.team}>
							<div>
								<img src={fixture.teams.away.logo} alt="" />
							</div>
							<div>{fixture.teams.away.name}</div>
						</div>
					</div>
					<div className={style.tabs}>
						<Tabs>
							<TabList className={style.tablist}>
								<Tab>Statistics</Tab>
								<Tab>Events</Tab>
								<Tab>Line Ups</Tab>
							</TabList>

							<TabPanel>
								{fixture.statistics.length === 0 ? (
									<h2 className={style.h2}>No Statistics!</h2>
								) : (
									<div className={style.grid}>
										<div className={style.div1}>
											{fixture.statistics[0].statistics.map((stat, i) => (
												<div key={i}>{stat.type}</div>
											))}
										</div>
										<div className={style.div2}>
											{fixture.statistics[0].statistics.map((stat, i) => (
												<div key={i}>{stat.value ?? "0"}</div>
											))}
										</div>
										<div className={style.div3}>
											{fixture.statistics[1].statistics.map((stat, i) => (
												<div key={i}>{stat.value ?? "0"}</div>
											))}
										</div>
									</div>
								)}
							</TabPanel>
							<TabPanel>
								<div>
									{fixture.events.map((event, i) => (
										<div>
											<div>
												<div>{event.detail}</div>
												<div>{event.team.name}</div>
												<div>{event.time.elapsed}`</div>
											</div>
											<div>
												<div>{event.player.name}</div>
												<div>{event.assist.name ?? ""}</div>
											</div>
										</div>
									))}
								</div>
							</TabPanel>
							<TabPanel>
								<h2>Any content 3</h2>
							</TabPanel>
						</Tabs>
					</div>
				</div>
			</>
		);
	return <Loader />;
});
