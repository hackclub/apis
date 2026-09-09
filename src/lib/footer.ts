// Hack Club footer. No background of its own — it sits directly on the page.

export const FOOTER_STYLES = `
	@font-face {
		font-family: 'Phantom Sans';
		src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Regular.woff2') format('woff2');
		font-weight: 400;
		font-display: swap;
	}
	@font-face {
		font-family: 'Phantom Sans';
		src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Bold.woff2') format('woff2');
		font-weight: 700;
		font-display: swap;
	}

	.footer {
		padding: 0 1.25rem 3.5rem;
		font-family: 'Phantom Sans', system-ui, -apple-system, sans-serif;
		font-size: 17px;
		line-height: 1.6;
		color: #b7bcc5;
	}
	.footer__inner {
		max-width: 1000px;
		margin: 0 auto;
		padding: 3rem 0 0;
	}

	.footer__title {
		margin: 0 0 1.5rem;
		font-size: 27px;
		font-weight: 700;
		color: #e6e9ee;
	}
	.footer__title a {
		color: #ec3750;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.footer__title a:hover { color: #ff5c72; }

	.footer p {
		margin: 0 0 1.5rem;
		max-width: 68ch;
	}
	.footer p:not(.footer__title) a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.footer p:not(.footer__title) a:hover { color: #e6e9ee; }

	.footer__columns {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem 4.5rem;
		margin-top: 3rem;
	}
	.footer__column h2 {
		margin: 0 0 1rem;
		font-size: 18px;
		font-weight: 700;
	}
	.footer__column--resources h2 { color: #338eda; }
	.footer__column--hackclub h2 { color: #ec3750; }
	.footer__column ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.footer__column a {
		color: #b7bcc5;
		text-decoration: none;
	}
	.footer__column a:hover {
		color: #e6e9ee;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	@media (max-width: 700px) {
		.footer { padding: 0 1rem 2.5rem; }
		.footer__inner { padding: 2.25rem 0 0; }
		.footer__title { font-size: 23px; }
		.footer__columns { gap: 2rem 3rem; margin-top: 2.5rem; }
	}
`;

export const FOOTER_HTML = `<footer class="footer">
<div class="footer__inner">
	<p class="footer__title">A project by <a href="https://hackclub.com">Hack Club</a>, built by <a href="https://github.com/sbeltranc">santi</a></p>

	<p>Hack Club is a 501(c)(3) nonprofit and network of 100k+ technical high schoolers. We believe you learn best by building, so we're creating community and providing grants so you can make awesome projects. In the past few years, we've <a href="https://www.youtube.com/watch?v=ufMUJ9D1fi8">sent 30 teen hackers hiking the Pacific Crest Trail</a>, <a href="https://www.youtube.com/watch?v=8iM1W8kXrQA">hosted a hackathon for the worst ideas</a>, and <a href="https://www.youtube.com/watch?v=kaEFv7e49mo">ran the largest hardware hackathon at GitHub HQ</a>.</p>

	<p>At Hack Club, students aren't just learning, they're shipping.</p>

	<div class="footer__columns">
		<div class="footer__column footer__column--resources">
			<h2>Resources</h2>
			<ul>
				<li><a href="https://hackclub.com/slack/">Join our Slack</a></li>
				<li><a href="https://events.hackclub.com/">Community Events</a></li>
				<li><a href="https://workshops.hackclub.com/">Workshops</a></li>
				<li><a href="https://hackclub.com/conduct">Code of Conduct</a></li>
				<li><a href="https://forms.hackclub.com/bounty">Fulfillment Bounty</a></li>
			</ul>
		</div>
		<div class="footer__column footer__column--hackclub">
			<h2>Hack Club</h2>
			<ul>
				<li><a href="https://hackclub.com/philosophy">Philosophy</a></li>
				<li><a href="https://hackclub.com/team">Our Team &amp; Board</a></li>
				<li><a href="https://hackclub.com/brand">Branding</a></li>
				<li><a href="https://hackclub.com/philanthropy">Donate</a></li>
			</ul>
		</div>
	</div>
</div>
</footer>`;
