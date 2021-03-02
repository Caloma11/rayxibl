import consumer from "./consumer";

const initNewMessageCable = () => {
	const inboxLink = document.getElementById("inbox-user");
	const inboxTitle = document.getElementById("inbox-title");

	if (inboxLink) {
		const id = inboxLink.dataset.currentUserId;

		consumer.subscriptions.create(
			{ channel: "MessageChannel", user_id: id },
			{
				received(data) {
					const currentContent = inboxLink.innerHTML;
					inboxLink.innerHTML = `
            <div class="flex relative">
              ${currentContent}
              <span class="notification">${data.count}</span>
            </div>
          `;

					if (inboxTitle) {
						inboxTitle.innerText = `INBOX (${data.count})`;
					}
				}
			}
		);
	}
};

export { initNewMessageCable };
