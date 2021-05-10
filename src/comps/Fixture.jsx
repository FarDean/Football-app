import { fetchSingleFixture } from "./../redux/singleFixtureSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";
import style from "./../styles/Fixture.module.css";
import { Back } from "./utils/Back";

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
					<div>
						<div>
							<img src={fixture.teams.home.logo} alt="" />
							{fixture.teams.home.name}
						</div>
						<div>
							{fixture.goals.home}-{fixture.goals.away}
						</div>
						<div>
							<img src={fixture.teams.away.logo} alt="" />
							{fixture.teams.away.name}
						</div>
					</div>
				</div>
			</>
		);
	return <Loader />;
});
