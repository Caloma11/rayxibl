import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import personAdd from "../images/person-add-white";
import mail from "../images/mail-white";
import search from "../images/search-white";
import brief from "../images/brief-white";
import rightArrowPurple from "../images/right-arrow-purple";

const ActionButton = () => {
	const [open, setOpen] = useState(false);
	const [ob, setOb] = useState(false);

	const checkParams = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		if (urlParams.get("ob") === "t") {
			setOb(true);
		}
	};

	const handleClick = async () => {
		setOpen(prevState => !prevState);
	};

  const triggerModal = (e) => {
    e.preventDefault();
    const modal = document.querySelector(".invitationsWrapper");
    modal.classList.remove("none");
    setOpen(false);
  }

	useEffect(() => {
		checkParams();
	}, []);

	return (
		<div className={ob ? "relative flex" : "relative"}>
			{ob && (
				<div className="flex items-center justify-content-center" id="addfree">
					<p className="textBlue textLg bold">Add freelancers </p>
					<img
						className=""
						src={rightArrowPurple}
						alt="right-arrow-purple"
						width={48}
						height={48}
					/>
				</div>
			)}
			{open && (
				<div className="actions flex flex-column">
					<a
						className="action-link flex items-center justify-content-between"
						href="#" onClick={triggerModal}
					>
						<img className="" src={mail} alt="mail" width={28} height={28} />
						Email invite
					</a>
					<a
						className="action-link flex items-center justify-content-between"
						href="/profiles"
					>
						<img
							className=""
							src={search}
							alt="search"
							width={24}
							height={24}
						/>
						Browse flxibl
					</a>
					<a
						className="action-link flex items-center justify-content-between"
						href="/jobs/new"
					>
						<img className="" src={brief} alt="brief" width={24} height={24} />
						Post a job
					</a>
				</div>
			)}

			<button className="trigger" onClick={handleClick}>
				<img
					className="toggler"
					src={personAdd}
					alt="action button"
					width={22}
					height={22}
				/>
			</button>
		</div>
	);
};

const div = document.createElement("div");
div.classList.add("action-button");

ReactDOM.render(
	<ActionButton />,
	document.querySelector(".profiles-index").appendChild(div)
);
