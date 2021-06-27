import { screen, render } from "@testing-library/react";
import { Footer } from "../comps/Footer";

test("should show the footer", () => {
	render(<Footer />);
	expect(screen.getByText("FarDean")).toBeInTheDocument();
});
