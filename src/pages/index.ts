import type { APIRoute } from 'astro';
import { json } from '../lib/json';

export const GET: APIRoute = ({ request }) =>
	json(
		{
			name: 'apis',

			ysws: {
				you_ship: "A project using an external service like Mapbox, OpenAI or Geocode",
				we_ship: "$5 Grant Card for every hour you work on your project for any service you need for your projects! (OpenAI, Hetzner, Claude, Mapbox, Geocode)"
			},

			starts: "September 8th, 2026 12:00 AM EDT",
			ends: "September 10th, 2026 12:00 AM EDT",

			slack_channel: "https://hackclub.enterprise.slack.com/archives/C0C0J3J3KSQ",
			submission_link: "https://forms.hackclub.com/apis-submission-link",
		},

		{ request, gaps: ['ysws', 'starts', 'slack_channel'] }
	);
