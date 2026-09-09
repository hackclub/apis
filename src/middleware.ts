import type { MiddlewareHandler } from 'astro';
import { json } from './lib/json';

export const onRequest: MiddlewareHandler = async (context, next) => {
	const response = await next();

	if (response.status === 404) {
		return json(
			{ error: 'not_found', path: context.url.pathname },
			{ request: context.request, status: 404, title: '404 · APIs' }
		);
	}

	return response;
};
