// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import { initConversationCable } from "../channels/conversation_channel";
import { initFlatpickr } from "../plugins/newBookingFlatpickr";
import { initDurationToggler } from "../components/durationToggler";
import { bindBillableCheckbox } from "../components/billable";
import { stepForm } from "../components/stepForm";
import {
	moreToggler,
	moreTogglerMultiple,
	toBindMoreTogglerMultiple
} from "../components/moreToggler";
import { previewImage } from "../components/previewImage";
import { editAndNewPreviewImage } from "../components/editProfilePreviewImage";
import {
	filtering,
	jobApplicationFilter,
	conversationFilter
} from "../components/filtering";
import { initTomSelect } from "../plugins/tomSelect";
import { initEditLinksAndDocuments } from "../components/editLinksAndDocuments";
import { jobFlatpickr } from "../plugins/jobFlatpickr";
import { editBookingFlatpickr } from "../plugins/editBookingFlatpickr";
import { initNewManagerPreviews } from "../components/newManagerPreviews";
import { bookingCardLink } from "../components/bookingCardLink";
import { initModal } from "../components/modal";
import { freelancerJobCardLink } from "../components/freelancerJobCardLinkage";
import { error, registerError } from "../components/error";
import { starRating } from "../components/starRating";
import { initFirefoxFixer } from "../components/firefoxFixer";
import { initNewMessageCable } from "../channels/new_message_channel";
import { initDismissAlert } from "../components/dismissAlert";
import { updateUser } from "../components/updateUser";
import { liveBookingPrice } from "../components/liveBookingPrice";
import { initUploadCSV } from "../components/uploadCSV";
import { initFormsOverlay } from "../components/formsOverlay";
import { fetchMoreMessages } from "../components/fetchMoreMessages";
import { invitationModal } from "../components/invitationPage";
import { initPrefill } from "../components/widgetMessage";
import { archive } from "../components/archive";
import { initContinueReading } from "../components/continueReading";
import { initSkillPillShow } from "../components/skillPillShow";
// import { initSendMessage } from "../components/sendMessage";

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

document.addEventListener("turbolinks:load", () => {
	initConversationCable();
	initFlatpickr();
	initDurationToggler();
	bindBillableCheckbox();
	stepForm();
	moreToggler();
	previewImage();
	filtering();
	initTomSelect();
	jobApplicationFilter();
	editAndNewPreviewImage();
	initEditLinksAndDocuments();
	jobFlatpickr();
	editBookingFlatpickr();
	conversationFilter();
	initNewManagerPreviews();
	initDismissAlert();
	liveBookingPrice();
	if (/profiles\/\d+\/edit/.test(window.location.href)) {
		toBindMoreTogglerMultiple();
	} else {
		moreTogglerMultiple();
	}
	bookingCardLink();
	initModal();
	freelancerJobCardLink();
	error();
	initFirefoxFixer();
	initNewMessageCable();
	registerError();
	initUploadCSV();
	updateUser();
	initFormsOverlay();
	fetchMoreMessages();
	invitationModal();
	initPrefill();
	archive();
  initContinueReading();
  // initSendMessage();
  initSkillPillShow();

  window.initContinueReading = initContinueReading;
	window.archive = archive;
	window.starRating = starRating;
	// For bookings/index.js.erb
	window.moreTogglerMultiple = moreTogglerMultiple;
	window.toBindMoreTogglerMultiple = toBindMoreTogglerMultiple;
});
