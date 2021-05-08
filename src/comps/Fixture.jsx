import { fetchSingleFixture } from "./../redux/singleFixtureSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";
import style from "./../styles/Fixture.module.css";

export const Fixture = React.memo(() => {
	const dispatch = useDispatch();
	const fixture = useSelector(state => state.singleFixture.fixture);
	const fixtureStatus = useSelector(state => state.singleFixture.status);
	const error = useSelector(state => state.singleFixture.error);

	let { fixtureId } = useParams();
	let history = useHistory();

	useEffect(() => {
		dispatch(fetchSingleFixture(fixtureId));
	}, [dispatch, fixtureId]);

	console.log(fixtureStatus);

	if (fixtureStatus === "succeeded")
		return (
			<>
				<div className={style.back}>
					<div onClick={() => history.goBack()} className={style.mark}>
						<i className="fas fa-arrow-left"></i>
					</div>
				</div>
				{fixtureStatus === "loading" && <Loader />}
				{fixtureStatus === "failed" && <Error text={error} />}
				<div>
					<div>
						<div>{fixture.league.name}</div>
						<div>Match Day: {fixture.league.round.slice(17)}</div>
						{fixture.fixture.status.long === "Match Finished" || "Not Started" ? (
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
				</div>
			</>
		);
	return <Error />;
});
