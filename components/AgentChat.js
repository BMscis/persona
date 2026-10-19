import React, { useEffect, useRef, useState } from 'react';

// Floating "Ask about Melvin" assistant. Talks to /api/agent, which answers from
// the same data as the CV. Open it from anywhere with:
//   window.dispatchEvent(new Event('open-agent'))

const SUGGESTIONS = [
  'What has he built in digital health?',
  'How does he make payments safe to retry?',
  "I'll paste a job description. Is he a fit?",
];

const TOOL_LABELS = {
  get_profile_section: 'read the CV',
  search_portfolio: 'searched the portfolio',
  match_job_description: 'compared the job description',
};

// showLauncher: whether the floating button is shown. The page hides it while the
// hero (which has its own "Ask my AI assistant" button) is on screen.
const AgentChat = ({ email, showLauncher = true }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const openPanel = () => setOpen(true);
    window.addEventListener('open-agent', openPanel);
    return () => window.removeEventListener('open-agent', openPanel);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const send = async (text) => {
    const content = text.trim();
    if (!content || busy) return;
    const history = [...messages, { role: 'user', content }];
    setMessages(history);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.filter((m) => !m.error).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessages([...history, { role: 'assistant', content: data.reply, toolsUsed: data.toolsUsed }]);
      } else {
        const msg =
          data.error === 'offline'
            ? `The assistant is offline right now. You can email ${email} or download the CV.`
            : data.error || 'Something went wrong. Please try again.';
        setMessages([...history, { role: 'assistant', content: msg, error: true }]);
      }
    } catch {
      setMessages([
        ...history,
        { role: 'assistant', content: 'Network error. Please try again.', error: true },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <>
      {!open && showLauncher ? (
        <button
          onClick={() => setOpen(true)}
          className="fixed z-40 flex items-center px-5 py-3 text-sm font-semibold text-white transform -translate-x-1/2 rounded-full shadow-lg bottom-6 left-1/2 bg-brand hover:bg-brandAlt focus:outline-none"
          aria-label="Ask my AI assistant about Melvin"
        >
          <span className="w-2 h-2 mr-2 bg-green-300 rounded-full"></span>
          Ask my AI assistant
        </button>
      ) : null}

      {open ? (
        <section
          role="dialog"
          aria-label="Assistant"
          className="fixed z-50 flex flex-col overflow-hidden border rounded-md shadow-2xl bottom-4 right-4 left-4 sm:left-auto sm:w-96 bg-darker border-mid"
          style={{ height: 'min(560px, calc(100vh - 2rem))' }}
        >
          <header className="flex items-center justify-between px-4 py-3 border-b border-mid">
            <div>
              <p className="mb-0 font-bold text-white">Ask about Melvin</p>
              <p className="mb-0 text-xs text-light">Answers come only from his CV and portfolio.</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 text-xl text-light hover:text-white focus:outline-none"
              aria-label="Close assistant"
            >
              ×
            </button>
          </header>

          <div ref={listRef} className="flex-1 px-4 py-3 overflow-y-auto">
            {messages.length === 0 ? (
              <div>
                <p className="text-sm">
                  Ask about his experience, or paste a job description and I'll say honestly how well
                  he fits.
                </p>
                <div className="flex flex-col items-start">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => (s.startsWith("I'll paste") ? inputRef.current?.focus() : send(s))}
                      className="px-3 py-2 mb-2 text-sm text-left text-white rounded-sm bg-mid hover:bg-brand focus:outline-none"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((m, i) => (
              <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-md text-sm whitespace-pre-wrap font-body ${
                    m.role === 'user' ? 'bg-brand text-white' : 'bg-mid text-soft'
                  }`}
                >
                  {m.content}
                  {m.toolsUsed && m.toolsUsed.length > 0 ? (
                    <span className="block mt-2 text-xs text-light">
                      {[...new Set(m.toolsUsed)].map((t) => TOOL_LABELS[t] || t).join(' · ')}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
            {busy ? <p className="text-sm text-light">Looking that up…</p> : null}
          </div>

          <form
            className="p-3 border-t border-mid"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              maxLength={12000}
              placeholder="Ask a question, or paste a job description"
              className="text-sm resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-light">Enter to send · Shift+Enter for a new line</span>
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="px-4 py-2 text-sm text-white rounded-sm bg-brand hover:bg-brandAlt disabled:opacity-40 focus:outline-none"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </>
  );
};

export default AgentChat;
