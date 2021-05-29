import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLeagues } from "../redux/leagueSlice";
import { useAppSelector, useAppDispatch } from "./../redux/hooks";
import styles from "./../styles/Wrapper.module.css";
import { Error } from "./utils/Error";
import { Loader } from "./utils/Loader";
import React from "react";
import slugify from "slugify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export const Wrapper: React.FC = React.memo((): JSX.Element => {
	const dispatch = useAppDispatch();

	const leagues = useAppSelector(state => state.league.leagues);
	const leaguesStatus = useAppSelector(state => state.league.status);
	const error = useAppSelector(state => state.league.error);

	const [dropown, setDropown] = useState<boolean>(false);

	useEffect(() => {
		if (leaguesStatus === "idle") {
			dispatch(fetchLeagues());
		}
	}, [dispatch, leaguesStatus]);

	const toggleDropdown = (): void => {
		setDropown(prev => !prev);
	};

	if (leaguesStatus === "loading") return <Loader />;

	if (leaguesStatus === "failed" || leagues[0] === undefined) return <Error />;

	if (leaguesStatus === "succeeded")
		return (
			<>
				<header>
					<nav className={styles.nav}>
						<div className={styles.left}>
							<div className={styles.pulse}></div>
							<Link to="/">Live Scores</Link>
						</div>
						<div className={styles.center}>
							<img
								src="https://image.freepik.com/free-vector/king-football-logo_21010-8.jpg"
								alt=""
							/>
						</div>
						<div className={styles.right}>
							<div className={styles.navItem} onClick={toggleDropdown} key="leagues">
								<p>Leagues</p>
								{dropown ? (
									<FontAwesomeIcon icon={faCaretUp} />
								) : (
									<FontAwesomeIcon icon={faCaretDown} />
								)}
								<div
									className={
										dropown
											? `${styles.dropdown} ${styles.active}`
											: styles.dropdown
									}
								>
									{leagues.map((league, i) => (
										<div key={i} className={styles.dropdownItem}>
											<div className={styles.img}>
												<img
													className={styles.leagueIcon}
													src={league.league.logo}
													alt=""
												/>
											</div>
											<div>
												<Link
													to={`/leagues/${slugify(
														league.league.name
													)}/standing`}
												>
													{league.league.name}
												</Link>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className={styles.navItem}>Home</div>
							<div className={styles.navItem}>Transfers</div>
						</div>
					</nav>
				</header>
			</>
		);

	return <Error text={error} />;
});
