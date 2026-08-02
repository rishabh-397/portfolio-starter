// Simple in-memory rate limiter (per server instance -- fine for a portfolio site).
const requestLog = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

// Replace this with real content about you: your resume text, project
// descriptions, skills, etc. This is what makes the chatbot's answers
// accurate instead of generic.
const RESUME_CONTEXT = `
You are a helpful assistant embedded in a developer's portfolio site.
Answer questions about this person based ONLY on the context below.
If you don't know something, say so honestly instead of making it up.

Name: Rishabh Chaturvedi
Education: B.Tech in Computer Science and Engineering, VIT Bhopal University (expected May 2027)
Summary: Computer Science undergraduate interested in software development,
API testing, and machine learning. Active open-source contributor, fast
learner, values collaborative growth.

Experience:
- Summer Android Development Intern, Imarticus Learning

Involvement:
- Campus Ambassador, GirlScript Summer of Code
- Contributor, Social Summer of Code (open-source development, collaborating
  on projects and contributing to codebases)

Skills:
- Languages: Python, JavaScript, C++
- Web: HTML, CSS, React.js, Node.js
- Databases: MySQL, MongoDB
- Tools: Postman, Git, VS Code, Linux
- Data/ML: Scikit-learn, Pandas, NumPy
- Working style: team collaboration, fast learner, time management

Certifications: Postman API Fundamentals Student Expert, Website Development
Tutorial (Infosys Springboard), Introduction to Machine Learning (NPTEL),
Introduction to Large Language Models (Udacity), Insights on Computational
Data Science (Indiana University Indianapolis), Problem Solving
(HackerRank), MATLAB Certificate, Cybersecurity Essentials (IBM SkillsBuild)

Languages spoken: English (fluent), Hindi (native)

Availability: Open to full-time placements / internships.
`;

function rateLimited(ip) {
  const now = Date.now();
  const entry = requestLog.get(ip) || [];
  const recent = entry.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (rateLimited(ip)) {
    return Response.json(
      { reply: "Too many messages -- please wait a moment before trying again." },
      { status: 429 }
    );
  }

  const { messages } = await req.json();

  if (!process.env.GROQ_API_KEY) {
    return Response.json({
      reply:
        "The chatbot isn't fully configured yet -- add GROQ_API_KEY to your .env.local file.",
    });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 400,
        stream: true,
        messages: [
          { role: "system", content: RESUME_CONTEXT },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (!groqRes.ok || !groqRes.body) {
      return Response.json(
        { reply: "The chatbot is temporarily unavailable. Please try again shortly." },
        { status: 502 }
      );
    }

    // Pass the streamed response straight through to the browser --
    // the client reads it chunk-by-chunk for the typewriter effect.
    return new Response(groqRes.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    return Response.json(
      { reply: "The chatbot is temporarily unavailable. Please try again shortly." },
      { status: 500 }
    );
  }
}
