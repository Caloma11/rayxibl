import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import personAdd from "../images/person-add-white";
import mail from "../images/mail-white";
import search from "../images/search-white";
import brief from "../images/brief-white";
import rightArrowPurple from "../images/right-arrow-purple";
import crossWhite from "../images/cross.svg";


const ActionButton = () => {
	const [open, setOpen] = useState(false);
	const [ob, setOb] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false);

	const checkParams = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		if (urlParams.get("ob") === "t") {
			setOb(true);
		}
	};

	const handleClick = async () => {
    setClickedOnce(true);
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
			{ob && !(clickedOnce) && (
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
						className="action-link flex items-center justify-content-start"
						href="#" onClick={triggerModal}
					>
						<img className="mr-3" src={mail} alt="mail" width={24} height={24} />
						Email invite
					</a>
					<a
						className="action-link flex items-center justify-content-start"
						href="/profiles?all=true"
					>
						<img
							className="mr-3"
							src={search}
							alt="search"
							width={24}
							height={24}
						/>
						Browse flxibl
					</a>
					<a
						className="action-link flex items-center justify-content-start"
						href="/jobs/new"
					>
						<img className="mr-3" src={brief} alt="brief" width={24} height={24} />
						Post a job
					</a>
				</div>
			)}

			<button className={open ? 'trigger bg-gray' : 'trigger'} onClick={handleClick}>
				<img
					className="toggler"
					src={open ? crossWhite : personAdd}
					alt="action button"
					width={open ? 16 : 22}
					height={open ? 16 : 22}
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
