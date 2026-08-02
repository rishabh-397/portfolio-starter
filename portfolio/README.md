# Portfolio Starter

A Next.js + Tailwind portfolio scaffold: hero, about, skills, coding-profile
stats (GitHub/LeetCode/HackerRank), filterable projects, resume, contact form,
an AI chatbot backed by the Anthropic API, and a VS Code-style status bar.

## Design direction

- **Palette**: deep ink background (`#0B1220`), warm amber signal color
  (`#E8A33D`), muted teal accent (`#5EC8B8`) — a code-editor feel rather than
  a generic gradient hero.
- **Type**: Fraunces (display/italic headlines) + Inter (body) + JetBrains
  Mono (data, tags, code).
- **Signature element**: the fixed bottom status bar that mimics VS Code's
  status bar and tracks which section you're viewing — ties the whole site
  back to "built by a developer, in a code editor."

Treat this as a starting point, not a finished product — swap in your own
copy, projects, and take the design further once the structure feels right.

## Getting started (in VS Code)

1. Open this folder in VS Code.
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the env file and add your Anthropic API key (only needed for the
   chatbot — everything else works without it):
   ```
   cp .env.example .env.local
   ```
4. Run the dev server:
   ```
   npm run dev
   ```
5. Open http://localhost:3000

## Where to put your real content

- `/public/resume.pdf` — your resume file
- `src/components/About.jsx` — your bio + timeline
- `src/components/Skills.jsx` — your real skill list
- `src/components/CodingProfiles.jsx` — your GitHub/LeetCode/HackerRank usernames
- `src/components/Projects.jsx` — your real projects
- `src/app/api/chat/route.js` — `RESUME_CONTEXT` (what the chatbot knows about you)

## Next steps (Month 2-3, from the roadmap)

- Wire the contact form to a real database + email notification
- Add dark/light-mode-aware code screenshots to project cards
- Add a `/api/leetcode` route that proxies a community LeetCode GraphQL API
  server-side, so the LeetCode card shows live stats instead of just a link
- Add tests, CI/CD (GitHub Actions), and a Lighthouse pass before deploying
- Deploy on Vercel: `vercel.com/new` → import this repo → add
  `ANTHROPIC_API_KEY` as an environment variable in the dashboard
