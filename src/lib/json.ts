export const json = (data: unknown, init?: ResponseInit) =>
	new Response(JSON.stringify(data, null, 2) + '\n', {
		...init,
		headers: {
			'content-type': 'application/json; charset=utf-8',
			...init?.headers
		}
	});
