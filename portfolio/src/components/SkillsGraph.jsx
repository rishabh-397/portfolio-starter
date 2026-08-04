"use client";

import { useState } from "react";
import {
  SiPython, SiJavascript, SiCplusplus, SiHtml5, SiReact, SiNodedotjs,
  SiMysql, SiMongodb, SiPostman, SiGit, SiLinux, SiScikitlearn, SiPandas, SiNumpy,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { Users, Zap, Clock } from "lucide-react";

const ICONS = {
  Python: SiPython, JavaScript: SiJavascript, "C++": SiCplusplus, HTML: SiHtml5,
  CSS: FaCss3Alt, "React.js": SiReact, "Node.js": SiNodedotjs, MySQL: SiMysql,
  MongoDB: SiMongodb, Postman: SiPostman, Git: SiGit, "VS Code": VscVscode,
  Linux: SiLinux, "Scikit-learn": SiScikitlearn, Pandas: SiPandas, NumPy: SiNumpy,
  "Team collaboration": Users, "Fast learner": Zap, "Time management": Clock,
};

const CATEGORIES = [
  { id: "lang", label: "Languages", items: ["Python", "JavaScript", "C++"] },
  { id: "web", label: "Web", items: ["HTML", "CSS", "React.js", "Node.js"] },
  { id: "data", label: "Data & ML", items: ["Scikit-learn", "Pandas", "NumPy"] },
  { id: "db", label: "Databases", items: ["MySQL", "MongoDB"] },
  { id: "tools", label: "Tools", items: ["Postman", "Git", "VS Code", "Linux"] },
  { id: "style", label: "Working style", items: ["Team collaboration", "Fast learner", "Time management"] },
];

const RADIUS = 150;
const CENTER = 200;

function nodePosition(index, total) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function SkillsGraph() {
  const [active, setActive] = useState(null);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 400 400" className="w-full max-w-md">
        {CATEGORIES.map((cat, i) => {
          const pos = nodePosition(i, CATEGORIES.length);
          const isActive = active === cat.id;
          return (
            <line
              key={`line-${cat.id}`}
              x1={CENTER}
              y1={CENTER}
              x2={pos.x}
              y2={pos.y}
              stroke={isActive ? "var(--accent)" : "#1E293B"}
              strokeWidth={isActive ? 2 : 1}
              className="transition-all duration-200"
            />
          );
        })}

        <circle cx={CENTER} cy={CENTER} r={34} fill="#0B1220" stroke="var(--accent)" strokeWidth={2} />
        <text
          x={CENTER}
          y={CENTER + 4}
          textAnchor="middle"
          className="fill-current"
          style={{ fontSize: 11, fontFamily: "monospace", fill: "#F7F5F0" }}
        >
          skills
        </text>

        {CATEGORIES.map((cat, i) => {
          const pos = nodePosition(i, CATEGORIES.length);
          const isActive = active === cat.id;
          return (
            <g
              key={cat.id}
              onMouseEnter={() => setActive(cat.id)}
              onFocus={() => setActive(cat.id)}
              onClick={() => setActive(isActive ? null : cat.id)}
              tabIndex={0}
              className="cursor-pointer outline-none"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 30 : 26}
                fill={isActive ? "var(--accent)" : "#0B1220"}
                stroke="var(--accent)"
                strokeWidth={2}
                className="transition-all duration-200"
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  fill: isActive ? "#0B1220" : "#F7F5F0",
                  pointerEvents: "none",
                }}
              >
                {cat.label.split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="min-h-[70px] flex flex-wrap justify-center gap-2 mt-2 max-w-md">
        {(active ? CATEGORIES.find((c) => c.id === active).items : []).map((item) => {
          const Icon = ICONS[item];
          return (
            <span
              key={item}
              className="flex items-center gap-1.5 text-xs border hairline rounded-full px-3 py-1.5 animate-[fadeIn_0.2s_ease-out]"
            >
              {Icon && <Icon size={13} className="text-signal" />}
              {item}
            </span>
          );
        })}
        {!active && (
          <p className="text-xs opacity-50 font-mono">hover or tap a node to see skills</p>
        )}
      </div>
    </div>
  );
}