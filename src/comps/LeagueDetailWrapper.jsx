export const LeagueDetailWrapper = ({ children }) => {
	return (
		<main>
			<div className="tabs">
				<div className="tab">Standing</div>
				<div className="tab">Fixtures</div>
				<div className="tab">Teams</div>
			</div>
			{children}
		</main>
	);
};
