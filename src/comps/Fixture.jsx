import { fetchSingleFixture } from "./../redux/singleFixtureSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";

export const Fixture = React.memo(() => {
	const dispatch = useDispatch();
	const fixture = useSelector(state => state.singleFixture.fixture);
	const fixtureStatus = useSelector(state => state.singleFixture.status);
	const error = useSelector(state => state.singleFixture.error);

	let { fixtureId } = useParams();

	// useEffect(() => {
	// 	if (fixtureStatus === "idle") {
	// 		dispatch(fetchSingleFixture(fixtureId));
	// 	}
	// }, [dispatch, fixtureId, fixtureStatus]);

	console.log(fixture);

	if (fixtureStatus === "loading") return <Loader />;

	if (fixtureStatus === "failed") return <Error text={error} />;
	if (fixtureStatus === "succeeded")
		return (
			<>
				<div>
					<span>&#8249;</span> Back
				</div>
			</>
		);
});
