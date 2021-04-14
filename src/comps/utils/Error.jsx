export const Error = ({ text = "Something went Wrong, Try Refreshing!" }) => {
	return (
		<div className="flex">
			<div>{text}</div>
		</div>
	);
};
