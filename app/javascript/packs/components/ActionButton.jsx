import React, { useState } from "react";
import ReactDOM from "react-dom";
import crossSvg from "../images/cross.svg";

const ActionButton = () => {
	const [open, setOpen] = useState(false);

	const handleClick = async () => {
		setOpen(prevState => !prevState);
	};

	return (
		<div className="relative">
			{open && (
				<div className="actions flex flex-column">
					<a className="action-link" href="/users/invitations/new">
						Email invite
					</a>
					<a className="action-link" href="/profiles">
						Browse flxibl
					</a>
					<a className="action-link" href="/jobs/new">
						Post a job
					</a>
				</div>
			)}

			<button className="trigger" onClick={handleClick}>
				<img className="toggler" src={crossSvg} alt="action button" />
			</button>
		</div>
	);
};

document.addEventListener("DOMContentLoaded", () => {
	const div = document.createElement("div");
	div.classList.add("action-button");

	ReactDOM.render(
		<ActionButton />,
		document.querySelector(".profiles-index").appendChild(div)
	);
});
