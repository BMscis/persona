// The whole CV as JSON, for agents and scripts that prefer one request to an MCP session.

import * as data from '../../data/profile';
import { LINKS } from '../../lib/portfolio-tools';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json({ ...data, links: LINKS });
}
