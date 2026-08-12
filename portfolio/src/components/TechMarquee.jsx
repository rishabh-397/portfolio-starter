import {
  SiPython, SiJavascript, SiCplusplus, SiHtml5, SiReact, SiNodedotjs,
  SiMysql, SiMongodb, SiPostman, SiGit, SiLinux, SiScikitlearn, SiPandas, SiNumpy,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

const ICONS = [
  SiPython, SiJavascript, SiCplusplus, SiHtml5, FaCss3Alt, SiReact,
  SiNodedotjs, SiMysql, SiMongodb, SiPostman, SiGit, VscVscode,
  SiLinux, SiScikitlearn, SiPandas, SiNumpy,
];

export default function TechMarquee() {
  // Render the icon set twice back-to-back so the CSS animation can loop
  // seamlessly from -50% back to 0% with no visible jump.
  const strip = [...ICONS, ...ICONS];

  return (
    <div
      className="w-full overflow-hidden border-y hairline py-6"
      aria-hidden="true"
    >
      <div className="flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {strip.map((Icon, i) => (
          <div key={i} className="flex items-center justify-center px-8 shrink-0">
            <Icon size={28} className="opacity-40 hover:opacity-90 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}
