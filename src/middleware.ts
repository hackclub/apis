import type { MiddlewareHandler } from 'astro';
import { json } from './lib/json';

export const onRequest: MiddlewareHandler = async (context, next) => {
	const response = await next();

	if (response.status === 404) {
		return json(
			{ error: 'not_found', path: context.url.pathname },
			{ status: 404 }
		);
	}

	return response;
};
