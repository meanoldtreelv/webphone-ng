import crypto from "crypto";

export function limitCharacter(sentence: string, maxLength: number): string {
	if (sentence?.length <= maxLength) {
		return sentence;
	} else if (sentence?.length >= maxLength) {
		return sentence?.slice(0, maxLength) + "...";
	} else if (sentence === "undefine" || sentence === null) {
		return "";
	}
}

export const convertByteIntoKbMb = (byte: number) => {
	const kb = byte / 1000;
	if (kb > 1000) {
		return (kb / 1000).toFixed(2) + " " + "mb";
	} else {
		return kb.toFixed(2) + " " + "kb";
	}
};

export function generateRandomId(length) {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let randomId = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomId += characters.charAt(randomIndex);
	}
	return randomId;
}

// Usage
const randomId = generateRandomId(10); // Generates a random ID of length 10
console.log(randomId);

// export function filterUnreadMessagesToTop(data) {
// 	const unreadMsgs = data.filter((item) => item.last_msg?.is_unread === true);
// 	const readMsgs = data.filter((item) => item.last_msg?.is_unread !== true);

// 	return [...unreadMsgs, ...readMsgs];
// }

// export const sortConversationsByLastMessage = (conversations) => {
// 	// Create a new array to avoid directly modifying the original one
// 	const sortedConversations = conversations.slice();

// 	sortedConversations.sort((a, b) => {
// 		const dateA = new Date(a?.last_message_created_at);
// 		const dateB = new Date(b?.last_message_created_at);
// 		return dateB - dateA;
// 	});

// 	return sortedConversations;
// };
