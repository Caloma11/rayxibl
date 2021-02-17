import consumer from "./consumer";

const initNewMessageCable = () => {
	const inboxLink = document.getElementById("inbox-user");

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
				}
			}
		);
	}
};

export { initNewMessageCable };
