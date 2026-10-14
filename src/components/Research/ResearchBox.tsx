import React, {useLayoutEffect, useRef, useState } from "react";
import Github from "../../icons/Github";
// import Project_Tag_Bar from "./Project_Tags";

//importing the CSS styling for the project box element
import "./ResearchBox.css";
export interface Filters {
  id: Number;
  name: string;
  color: string;
}
export interface LinkFilters {
  id: Number;
  name: string;
  color: string;
  link: any;
}



interface Props {
  submission_links: Array<LinkFilters>;
  filters: Array<Filters>;
  icon: string;
  alt_icon_name: string;
  name: string;
  catchphrase: string;
  description: string;
  github_link: string;
  aside?: string;
  aside_alt?: string;
  icon_drop?: number;
  icon_scale?: number;
}


//Research Box class containing all the elements for a single research box
const ResearchBox: React.FC<Props> = ({submission_links, filters, icon, alt_icon_name, name, catchphrase, description, github_link, aside, aside_alt, icon_drop = 0, icon_scale}) => {
  const [selectedPackages] = useState<Array<Filters>>([]);
  const [selectedFilters] = useState<Array<Filters>>([]);
  const iconRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const iconEl = iconRef.current;
    const titleEl = titleRef.current;
    if (!iconEl || !titleEl) return;

    const alignIconToTitle = () => {
      const titleHeight = titleEl.getBoundingClientRect().height;
      const iconHeight = iconEl.getBoundingClientRect().height;
      const drop = titleHeight * 0.015;
      const header = iconEl.parentElement;
      const padTop = header ? parseFloat(getComputedStyle(header).paddingTop) || 0 : 0;
      const raw = (titleHeight - iconHeight) / 2 + drop;
      iconEl.style.marginTop = `${Math.max(raw, -padTop) + icon_drop}px`;
    };

    alignIconToTitle();
    const observer = new ResizeObserver(alignIconToTitle);
    observer.observe(titleEl);
    observer.observe(iconEl);
    window.addEventListener("resize", alignIconToTitle);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", alignIconToTitle);
    };
  }, [icon_drop]);

  const submissionTags = (
    <ul className="research-tags">
      {submission_links.map((submission: LinkFilters) => (
            <li
              key={submission.name}
              className={`filter ${
                selectedPackages.some((item) => item.name === submission.name)
                  ? "active-filter"
                  : ""
              }`}
              style={{ background: submission.color }}
            > {submission.link ? (
              <a href={submission.link} target="_blank" rel="noreferrer" style={{color:"white"}}>
                {submission.name}
              </a>
            ) : (
              <span style={{color:"white"}}>{submission.name}</span>
            )}
            </li>
        ))}
    </ul>
  );

  return (
    //div containing the project box
    <div className="research-box">
      <div className="header">
        <img ref={iconRef} src={icon} alt={alt_icon_name} style={icon_scale ? { height: `calc(9vh * ${icon_scale})` } : undefined} />
        <h3>
          <span className="title" ref={titleRef}>{name}</span>
          <span className="subtitle">{catchphrase}</span>
          <span className="description">
            {aside && (
              <img className="aside-figure" src={aside} alt={aside_alt || ""} />
            )}
            {description}
          </span>
        </h3>
      </div>
      {submissionTags}

      <div className="research-packages">
        <a href={github_link} className="github">
          <Github />
        </a>
        <ul>
          {filters.map((filter: Filters) => (
            <li
              key={filter.color}
              className={`filter filter-package${
                selectedFilters.some((item) => item.name === filter.name)
                  ? "active-filter"
                  : ""
              }`}
              style={{ background: filter.color }}
            >
              {filter.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResearchBox;
