export function limitCharacter(sentence: string, maxLength: number): string {
	if (sentence?.length <= maxLength) {
		return sentence;
	} else if (sentence?.length >= maxLength) {
		return sentence?.slice(0, maxLength) + "...";
	} else if (sentence === "undefine" || sentence === null) {
		return "";
	}
}

export function filterUnreadMessagesToTop(data) {
	const unreadMsgs = data.filter((item) => item.last_msg?.is_unread === true);
	const readMsgs = data.filter((item) => item.last_msg?.is_unread !== true);

	return [...unreadMsgs, ...readMsgs];
}

export const sortConversationsByLastMessage = (conversations) => {
	// Create a new array to avoid directly modifying the original one
	const sortedConversations = conversations.slice();

	sortedConversations.sort((a, b) => {
		const dateA = new Date(a?.last_message_created_at);
		const dateB = new Date(b?.last_message_created_at);
		return dateB - dateA;
	});

	return sortedConversations;
};
