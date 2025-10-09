import projects, {
  FlagTypeConvert,
  TagTypeConvert,
  ProjectData,
  FlagType,
} from "@/components/Projects";
import ProjectDrawer from "@/components/Drawers/ProjectDrawer";
import React, { useEffect, useState } from "react";
import Translate from "@/components/translation";
import ToolTip from "@/components/ToolTipCover";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  data: string;
}

const darkenColor = (color: string): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) * 0.7;
  const g = parseInt(hex.substring(2, 4), 16) * 0.7;
  const b = parseInt(hex.substring(4, 6), 16) * 0.7;
  return `#${Math.floor(r).toString(16).padStart(2, "0")}${Math.floor(g)
    .toString(16)
    .padStart(2, "0")}${Math.floor(b).toString(16).padStart(2, "0")}`;
};

export const renderButtons = (
  href: string | null,
  text: string
): JSX.Element => (
  <Link href={href || "#"} target="_blank">
    <button className="tooltipButton" disabled={!href}>
      {text}
    </button>
  </Link>
);

const ProjectCards: React.FC<ProjectProps> = ({ data }) => {
  const translate = new Translate();
  const projectList = projects(data);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );

  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 869);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderProject = (project: ProjectData) => {
    const projectDesc = translate.get(
      data,
      `Projects.list.${project.target}.desc`
    );
    const projectFooterEnd =
      project.footer.end || translate.get(data, "Projects.footer.endPresent");

    const renderFlags = project.flags.map((flag) => (
      <span
        key={flag.name}
        style={{
          color: flag.color,
          fontWeight: 1000,
          position: "absolute",
          right: "0.75rem",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          padding: "0.15rem 0.4rem",
          borderRadius: "4px",
          fontSize: "0.7rem",
          top: flag.name === FlagType.Contribution ? "0.75rem" : undefined,
          bottom: flag.name === FlagType.Discontinued ? "0.75rem" : undefined,
        }}
      >
        {translate.get(data, `Projects.flags.${FlagTypeConvert(flag.name)}`)}
      </span>
    ));
    return (
      <div
        onClick={() => handleProjectClick(project)}
        key={project.target}
        className="projectCard flex relative"
      >
        <div className="projectTitle">
          {project.image && (
            <Image
              className="img"
              src={project.image}
              height={25}
              width={25}
              draggable={false}
              alt="ProjectName"
              priority
            />
          )}
          <span style={{ marginLeft: 0.7, marginTop: 1.3 }}>
            {project.title}
          </span>
        </div>
        <div className="projectDesc">{projectDesc}</div>
        <div className="tags">
          {project.tags.map((tag) => (
            <div
              key={TagTypeConvert(tag.name)}
              style={{
                backgroundColor: darkenColor(tag.color),
                padding: "0.35rem",
                borderRadius: "5px",
              }}
              className="projectTags"
            >
              {translate.get(data, `Projects.tags.${TagTypeConvert(tag.name)}`)}
            </div>
          ))}
        </div>
        <div className="projectFooter">
          {project.footer.start} <span className="projectDivider">-</span>{" "}
          <span className="projectFooterEnd">{projectFooterEnd}</span>
        </div>
        {project.flags.length > 0 && renderFlags}
      </div>
    );
  };

  const renderProjectWithTooltip = (project: ProjectData) => (
    <ToolTip
      key={project.target}
      placement="top"
      content={
        <div className="tooltip">
          {renderButtons(project.github, "GitHub")}
          {renderButtons(
            project.community,
            translate.get(data, "Projects.buttons.community")
          )}
          {renderButtons(
            project.website,
            translate.get(data, "Projects.buttons.website")
          )}
        </div>
      }
    >
      {renderProject(project)}
    </ToolTip>
  );

  return (
    <>
      {projectList.map((project) =>
        isMobile ? renderProject(project) : renderProjectWithTooltip(project)
      )}
      {isMobile && (
        <ProjectDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          selectedProject={selectedProject}
          translate={data}
        />
      )}
    </>
  );
};

export default ProjectCards;
