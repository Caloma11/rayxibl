import consumer from "./consumer";

const initConversationCable = () => {
	const messagesContainer = document.getElementById("messages");
	if (messagesContainer) {
		const { conversationId, currentUserId } = messagesContainer.dataset;
		consumer.subscriptions.create(
			{ channel: "ConversationChannel", id: conversationId },
			{
				received(data) {
					if (data.sender_id != currentUserId) {
						messagesContainer.insertAdjacentHTML("beforeend", data.partial);
					}
				}
			}
		);
	}
};

export { initConversationCable };
