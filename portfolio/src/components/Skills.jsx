import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiHtml5,
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiPostman,
  SiGit,
  SiLinux,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { Users, Zap, Clock } from "lucide-react";
import Reveal from "./Reveal";
import OrbitPlanet from "./OrbitPlanet";
import SkillsGraph from "./SkillsGraph";

const ICONS = {
  Python: SiPython,
  JavaScript: SiJavascript,
  "C++": SiCplusplus,
  HTML: SiHtml5,
  CSS: FaCss3Alt,
  "React.js": SiReact,
  "Node.js": SiNodedotjs,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Postman: SiPostman,
  Git: SiGit,
  "VS Code": VscVscode,
  Linux: SiLinux,
  "Scikit-learn": SiScikitlearn,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  "Team collaboration": Users,
  "Fast learner": Zap,
  "Time management": Clock,
};

const SKILLS = [
  { group: "Languages", items: ["Python", "JavaScript", "C++"] },
  { group: "Web", items: ["HTML", "CSS", "React.js", "Node.js"] },
  { group: "Data & ML", items: ["Scikit-learn", "Pandas", "NumPy"] },
  { group: "Databases", items: ["MySQL", "MongoDB"] },
  { group: "Tools", items: ["Postman", "Git", "VS Code", "Linux"] },
  { group: "Working style", items: ["Team collaboration", "Fast learner", "Time management"] },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
      <OrbitPlanet />
      <p className="mono-tag mb-3">{"// skills"}</p>
      <h2 className="font-display italic text-3xl mb-10">What I reach for.</h2>

      <SkillsGraph />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14">
        {SKILLS.map((s) => (
          <div key={s.group}>
            <h3 className="font-mono text-xs uppercase tracking-wide text-circuit mb-3">
              {s.group}
            </h3>
            <ul className="space-y-2.5">
              {s.items.map((item) => {
                const Icon = ICONS[item];
                return (
                  <li key={item} className="flex items-center gap-2.5 text-sm opacity-85">
                    {Icon && <Icon size={16} className="text-signal shrink-0" />}
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
    </section>
  );
}