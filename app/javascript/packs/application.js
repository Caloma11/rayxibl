// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import { initConversationCable } from "../channels/conversation_channel";
import { initFlatpickr } from "../plugins/newBookingFlatpickr";
import { initDurationToggler } from "../components/durationToggler";
import { bindBillableCheckbox } from "../components/billable";
import { stepForm } from "../components/stepForm";
import { moreToggler } from "../components/moreToggler";
import { previewImage } from "../components/previewImage";
import { filtering, jobApplicationFilter } from "../components/filtering";
import { initTomSelect } from "../plugins/tomSelect";
import { jobFlatpickr } from "../plugins/jobFlatpickr";

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
	jobFlatpickr();
});
