"use client";

import { useEffect, useState } from "react";
import { SiGithub, SiLeetcode, SiHackerrank } from "react-icons/si";
import Reveal from "./Reveal";

const GITHUB_USERNAME = "rishabh-397";
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const LEETCODE_URL = "https://leetcode.com/u/h4dcxOA0Pj/";
const HACKERRANK_URL = "https://www.hackerrank.com/profile/rishabh_cha2005";

export default function CodingProfiles() {
  const [imgFailed, setImgFailed] = useState(false);
  const [repos, setRepos] = useState(null);
  const [reposError, setReposError] = useState(false);

  useEffect(() => {
    fetch("/api/github-repos")
      .then((res) => {
        if (!res.ok) throw new Error("GitHub route error");
        return res.json();
      })
      .then((data) => setRepos(data.repos || []))
      .catch(() => setReposError(true));
  }, []);

  return (
    <section id="profiles" className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
      <p className="mono-tag mb-3">// coding activity dashboard</p>
      <h2 className="font-display italic text-3xl mb-10">Where the practice shows.</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border hairline p-5 hover:border-signal transition-colors"
        >
          <h3 className="font-mono text-xs uppercase tracking-wide text-circuit mb-4 flex items-center gap-2">
            <SiGithub size={16} /> GitHub
          </h3>
          {!imgFailed ? (
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true`}
              alt="GitHub stats"
              onError={() => setImgFailed(true)}
              className="w-full h-auto"
            />
          ) : (
            <p className="text-sm opacity-80">View my repos & contributions →</p>
          )}
        </a>

        <a
          href={LEETCODE_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border hairline p-5 hover:border-signal transition-colors flex flex-col justify-between"
        >
          <h3 className="font-mono text-xs uppercase tracking-wide text-circuit mb-4 flex items-center gap-2">
            <SiLeetcode size={16} /> LeetCode
          </h3>
          <p className="text-sm opacity-80">View my submissions & rating →</p>
        </a>

        <a
          href={HACKERRANK_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border hairline p-5 hover:border-signal transition-colors flex flex-col justify-between"
        >
          <h3 className="font-mono text-xs uppercase tracking-wide text-circuit mb-4 flex items-center gap-2">
            <SiHackerrank size={16} /> HackerRank
          </h3>
          <p className="text-sm opacity-80">View my badges & certifications →</p>
        </a>
      </div>

      <div className="rounded-xl border hairline p-5">
        <h3 className="font-mono text-xs uppercase tracking-wide text-circuit mb-4">
          Top repositories (live from GitHub)
        </h3>

        {reposError && (
          <p className="text-sm opacity-60">Couldn't load repos right now.</p>
        )}
        {!repos && !reposError && (
          <div className="grid sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg border hairline p-4 animate-pulse space-y-3"
              >
                <div className="h-4 w-2/3 bg-line/50 rounded" />
                <div className="h-3 w-full bg-line/30 rounded" />
                <div className="h-3 w-1/3 bg-line/30 rounded" />
              </div>
            ))}
          </div>
        )}
        {repos && repos.length === 0 && (
          <p className="text-sm opacity-60">No public repos yet.</p>
        )}

        <div className="grid sm:grid-cols-3 gap-4">
          {repos?.map((r) => (
            <a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg border hairline p-4 hover:border-signal transition-colors"
            >
              <p className="font-mono text-sm mb-1">{r.name}</p>
              <p className="text-xs opacity-70 mb-2 line-clamp-2">
                {r.description || "No description provided."}
              </p>
              <p className="text-xs text-circuit">★ {r.stargazers_count}</p>
            </a>
          ))}
        </div>
      </div>
    </Reveal>
    </section>
  );
}