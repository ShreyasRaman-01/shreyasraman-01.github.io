import React, { useCallback, useState } from "react";
// import Project_Tag_Bar from "./Project_Tags";

//importing the CSS styling for the project box element
import "./Work_Exp_Box.css";
export interface Filters {
  id: Number;
  name: string;
  color: string;
}



interface Props {
  filters: Array<Filters>;
  icon: string;
  alt_icon_name: string;
  name: React.ReactNode;
  description: Array<React.ReactNode>;
  position_and_dates: string
}


//Project Box class containing all the elements for a single project box
const WorkExpBox: React.FC<Props> = ({ filters, icon, alt_icon_name, name, description, position_and_dates}) => {
  // const [selectedPackages, setPackages] = useState<Array<Filters>>([]);
  const [selectedFilters, setFilters] = useState<Array<Filters>>([]);

  const onPillClick = useCallback(
    (filter: Filters) => {
      const currentItemIndex = selectedFilters.findIndex(
        (item) => item.name === filter.name
      );

      if (currentItemIndex > -1) {
        const newPackages = [...selectedFilters];
        newPackages.splice(currentItemIndex, 1);

        setFilters(newPackages);
      } else {
        const newPackages = [...selectedFilters, filter];
        setFilters(newPackages);
      }
    },
    [selectedFilters]
  );

  return (
    //div containing the project box
    <div className="work-exp-box">
      <div className="header">
        <img src={icon} alt={alt_icon_name} />
        <h3>
          <span className="title">{name}</span>
          <span className="subtitle">{position_and_dates}</span>
        </h3>
      </div>

      <div className="work-exp-content">
        <ul>

          {description.map((item, index) => {
            return (
              <li key={index}>
                {item}
              </li>
            );
          })}

        </ul>
      </div>

      <ul className="work-exp-tags">
        {filters.map((filter) => (
          <li
            key={filter.color}
            className={`filter ${
              selectedFilters.some((item) => item.name === filter.name)
                ? "active-filter"
                : ""}`}
            style={{ background: filter.color }}
            onClick={() => onPillClick(filter)}
          >
            {filter.name}
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default WorkExpBox;
