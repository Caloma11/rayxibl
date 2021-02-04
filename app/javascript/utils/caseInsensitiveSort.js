export const caseInsensitiveSort = array =>
	array.sort((a, b) =>
		a.title.toLowerCase().localeCompare(b.title.toLowerCase())
	);
