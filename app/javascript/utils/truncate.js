const TEXT_LENGTH_CUT = 8;

export const truncate = (text, { scale } = { scale: 1 }) => {
	if (scale === 1) {
		return `${text.slice(0, TEXT_LENGTH_CUT)}...`;
	}

	if (text.length > TEXT_LENGTH_CUT * scale + 6) {
		return `${text.slice(0, TEXT_LENGTH_CUT * scale)}...`;
	}

	return text;
};
