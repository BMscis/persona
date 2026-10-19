// A stateless MCP server (Streamable HTTP transport, JSON responses only) so AI
// agents can query the portfolio directly. Connect a client to POST /api/mcp.
// Spec: https://modelcontextprotocol.io/specification/2025-06-18/basic/transports

import { profile } from '../../data/profile';
import { tools, runTool, LINKS } from '../../lib/portfolio-tools';

const SUPPORTED_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05'];

const result = (id, value) => ({ jsonrpc: '2.0', id, result: value });
const error = (id, code, message) => ({ jsonrpc: '2.0', id, error: { code, message } });

const handle = (msg) => {
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') {
    return error(msg?.id ?? null, -32600, 'Invalid request');
  }
  const isNotification = msg.id === undefined || msg.id === null;
  if (isNotification) return null;

  switch (msg.method) {
    case 'initialize': {
      const requested = msg.params?.protocolVersion;
      return result(msg.id, {
        protocolVersion: SUPPORTED_VERSIONS.includes(requested) ? requested : SUPPORTED_VERSIONS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'melvin-wafula-portfolio', title: `${profile.name} portfolio`, version: '1.0.0' },
        instructions: `Read-only tools over the CV of ${profile.name}, ${profile.title}. The CV PDF is at ${LINKS.cv_pdf}.`,
      });
    }
    case 'ping':
      return result(msg.id, {});
    case 'tools/list':
      return result(msg.id, {
        tools: tools.map(({ name, title, description, inputSchema }) => ({
          name,
          title,
          description,
          inputSchema,
          annotations: { readOnlyHint: true, openWorldHint: false },
        })),
      });
    case 'tools/call': {
      const { name, arguments: args } = msg.params || {};
      if (!tools.some((t) => t.name === name)) return error(msg.id, -32602, `Unknown tool: ${name}`);
      try {
        const data = runTool(name, args);
        return result(msg.id, {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
          structuredContent: data,
          isError: false,
        });
      } catch (e) {
        return result(msg.id, { content: [{ type: 'text', text: e.message }], isError: true });
      }
    }
    default:
      return error(msg.id, -32601, `Method not found: ${msg.method}`);
  }
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    // No server-initiated stream is offered, so GET is not supported (allowed by the spec).
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json(error(null, -32000, 'Use POST with a JSON-RPC message.'));
  }

  const body = req.body;
  if (Array.isArray(body)) {
    const replies = body.map(handle).filter(Boolean);
    return replies.length ? res.status(200).json(replies) : res.status(202).end();
  }
  const reply = handle(body);
  return reply ? res.status(200).json(reply) : res.status(202).end();
}
