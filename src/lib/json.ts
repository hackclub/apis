import { FOOTER_HTML, FOOTER_STYLES } from './footer';

type JsonInit = ResponseInit & {
	request?: Request;
	title?: string;
	
	gaps?: readonly string[]; // bun be like "um this is readonly", yo bro SHUT THE
};

type Style = {
	punct: (text: string) => string;
	key: (quoted: string) => string;
	string: (body: string, href: string | null) => string;
	number: (text: string) => string;
	keyword: (text: string) => string;
};

const esc = (text: string) =>
	text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const URL_RE = /^https?:\/\/\S+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hrefFor = (value: string) =>
	URL_RE.test(value)
		? value
		: EMAIL_RE.test(value)
			? `mailto:${value}`
			: null;

const PLAIN: Style = {
	punct: (text) => text,
	key: (quoted) => quoted,
	string: (body) => `"${body}"`,
	number: (text) => text,
	keyword: (text) => text
};

const HTML: Style = {
	punct: (text) => `<span class="p">${text}</span>`,
	key: (quoted) => `<span class="key">${esc(quoted)}</span>`,
	string: (body, href) =>
		`<span class="str">"${
			href ? `<a href="${esc(href)}">${esc(body)}</a>` : esc(body)
		}"</span>`,
	number: (text) => `<span class="num">${text}</span>`,
	keyword: (text) => `<span class="kw">${text}</span>`
};

const serialize = (
	data: unknown,
	style: Style,
	gaps: ReadonlySet<string>
): string => {
	const walk = (value: unknown, indent: string): string => {
		if (value === null) return style.keyword('null');

		switch (typeof value) {
			case 'string':
				return style.string(
					JSON.stringify(value).slice(1, -1),
					hrefFor(value)
				);
			case 'number':
				return Number.isFinite(value)
					? style.number(String(value))
					: style.keyword('null');
			case 'boolean':
				return style.keyword(String(value));
		}

		const pad = `${indent}  `;
		const comma = `${style.punct(',')}\n`;

		if (Array.isArray(value)) {
			if (value.length === 0) return style.punct('[]');

			const items = value.map((item) => pad + walk(item, pad));
			return `${style.punct('[')}\n${items.join(comma)}\n${indent}${style.punct(']')}`;
		}

		const entries = Object.entries(value as object).filter(
			([, item]) => item !== undefined
		);
		if (entries.length === 0) return style.punct('{}');

		const rows = entries.map(([key, item], index) => {
			const gap = index > 0 && gaps.has(key) ? '\n' : '';
			const name = style.key(JSON.stringify(key));

			return `${gap}${pad}${name}${style.punct(':')} ${walk(item, pad)}`;
		});

		return `${style.punct('{')}\n${rows.join(comma)}\n${indent}${style.punct('}')}`;
	};

	return walk(data, '');
};

// please dont do what im doing here, im just making something in a day there's definitively better ways to do this
const page = (body: string, title: string) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<link rel="icon" href="/favicon.ico">
<link rel="preconnect" href="https://assets.hackclub.com" crossorigin>
<style>
	:root { color-scheme: dark; }
	body {
		margin: 0;
		background: #0e0e11;
		color: #d3d6dc;
	}
	/* A full viewport tall, so the footer always starts below the fold and
	   only comes into view once you scroll. */
	main {
		box-sizing: border-box;
		min-height: 100vh;
		min-height: 100dvh;
		padding: 1rem;
	}
	pre {
		margin: 0;
		font: 400 15px/1.55 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		white-space: pre-wrap;
		word-break: break-word;
	}
	.key { color: #77b6da; }
	.str { color: #bd8168; }
	.num { color: #9bb68e; }
	.kw  { color: #4a86bb; }
	.p   { color: #787f86; }
	pre a {
		color: #7099dd;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	pre a:hover { color: #94b7ef; }
${FOOTER_STYLES}
</style>
</head>
<body>
<main><pre>${body}</pre></main>
${FOOTER_HTML}
</body>
</html>
`;

export const json = (data: unknown, init: JsonInit = {}) => {
	const { request, title = 'Hack Club APIs YSWS', gaps = [], headers, ...rest } = init;
	const wantsHtml = request?.headers.get('accept')?.includes('text/html');
	const body = serialize(data, wantsHtml ? HTML : PLAIN, new Set(gaps));

	return new Response(wantsHtml ? page(body, title) : `${body}\n`, {
		...rest,
		headers: {
			'content-type': wantsHtml
				? 'text/html; charset=utf-8'
				: 'application/json; charset=utf-8',
			vary: 'Accept',
			...headers
		}
	});
};
