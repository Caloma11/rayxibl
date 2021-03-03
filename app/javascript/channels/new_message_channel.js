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

					const conversationContainer = document.querySelector(
						`[data-conversation-id="${data.conversation_id}"]`
					);

					if (conversationContainer) {
						const textContent = conversationContainer.querySelector(
							".text-content"
						);
						const rightSide = conversationContainer.querySelector(".right");
						const template = `
              <span class="notification no-absolute mr-3">${data.count}</span>
            `;
						const notification = conversationContainer.querySelector(
							".notification"
						);

						textContent.innerText = data.new_text_content;
						rightSide.classList.remove("justify-content-end");
						rightSide.classList.add("justify-content-between");
						if (notification) {
							console.log(notification);
							notification.innerText = data.count;
						} else {
							rightSide.insertAdjacentHTML("afterbegin", template);
						}
					}
				}
			}
		);
	}
};

export { initNewMessageCable };
