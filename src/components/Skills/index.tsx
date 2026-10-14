import C from "../../icons/C";
import Design from "../../icons/Design";
// import HTMLTag from "../../icons/HTMLTag";
import Java from "../../icons/Java";
import MATLAB from "../../icons/MATLAB";
import Python from "../../icons/Python";
import Go from "../../icons/Go";
import Solidity from "../../icons/Solidity";
import ReactIcon from "../../icons/ReactIcon";
import CircularProgress from "../CircularProgress";
import styles from "./index.module.css";
import MLBrain from "../../icons/MLBrain";
// import DataScience from "../../icons/Data";
import Robotics from "../../icons/Robotics";

import { useState } from 'react';

interface Skillset {
  name: string;
  percent: Array<number>;
  icon: JSX.Element;
  lines: string;
}

const SKILLSET: Array<Skillset> = [
  { name: "Python", percent: [0, 85], icon: <Python />, lines:"> 800k"},
  { name: "Java", percent: [0, 70], icon: <Java />, lines:"~300k" },
  { name: "Go", percent: [0,75], icon: <Go />, lines:"~20k"},
  { name: "Solidity", percent: [0, 60], icon: <Solidity />, lines:"~50k"},
  { name: "C", percent: [0, 50], icon: <C />, lines:"~30k" },
  // { name: "HTML/CSS", percent: [0, 75], icon: <HTMLTag /> },
  { name: "MATLAB", percent: [0, 70], icon: <MATLAB />, lines:"~250k" },
  { name: "React", percent: [0, 40], icon: <ReactIcon />, lines:"~10k" },
];

const Skills = () => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
    <div className={styles.skillsPage}>
      <div className={styles.skillBar}>
        {SKILLSET.map(({ name, icon: Icon, percent, lines}) => (
          <div key={name} className={styles.skillItem}>
            <CircularProgress values={percent}>
              <span className={styles.icon} onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>{Icon}</span>
            </CircularProgress>
            <span className={styles.skillName}>{<b>{name}</b>} {<br />} {`${lines} lines`}</span>
          </div>
        ))}
      </div>

      <div className={styles.columns}>
        <div className={styles.column}>
          <span className={styles.domainIcon}>
            <MLBrain />
          </span>

          <h2 className={styles.title}>Representation Learning for Embodied Multimodal AI</h2>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Problems I like tackling:</h3>

            <span className={styles.subsetValues}>
              Skill Learning, Causal Reasoning, Planning, Object Segmentation, Multimodal Representations, Dynamics Learning
            </span>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Subfields of Interest</h3>

            <ul className={styles.toolList}>
              <li className={styles.toolListItem}>Computer Vision</li>
              <li className={styles.toolListItem}>Reinforcement Learning</li>
              <li className={styles.toolListItem}> Natural Language Processing (NLP)</li>
              <li className={styles.toolListItem}>Foundation Models (LLMs & VLMs)</li>
              <li className={styles.toolListItem}>World Modelling</li>
              <li className={styles.toolListItem}>Self-Supervised Learning</li>
              <li className={styles.toolListItem}>Action-Chunking</li>
              <li className={styles.toolListItem}>World Action Models</li>
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <span className={styles.domainIcon}>
            <Robotics />
          </span>

          <h2 className={styles.title}>Robotics</h2>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Problems I like tackling:</h3>

            <span className={styles.subsetValues}>
              Policy Diffusion, Localization, Mapping, Mobile Manipulation, Navigation, Optical Flow, Hardware Projects
            </span>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Robotics Tools</h3>

            <ul className={styles.toolList}>
              <li className={styles.toolListItem}>Robotics Operating System (ROS)</li>
              <li className={styles.toolListItem}>Boston Dynamics SPOT SDK</li>
              <li className={styles.toolListItem}>PID Controllers</li>
              <li className={styles.toolListItem}>Arduino & Raspberry Pi (MCU)</li>
              <li className={styles.toolListItem}>Foundation Models (LLMs & VLMs)</li>
              <li className={styles.toolListItem}>3D Point-Cloud Representations</li>
              <li className={styles.toolListItem}>3D Printing (AutoCAD)</li>
              
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <span className={styles.domainIcon}>
            <Design />
          </span>

          <h2 className={styles.title}>Software Development</h2>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Things I enjoy developing:</h3>

            <span className={styles.subsetValues}>
              AI-powered Software, Websites, WebApps 
            </span>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Software Development Tools</h3>

            <ul className={styles.toolList}>
              <li className={styles.toolListItem}>CodePen</li>
              <li className={styles.toolListItem}>JavaFX</li>
              <li className={styles.toolListItem}>Tailwind CSS</li>
              <li className={styles.toolListItem}>Java Applets</li>
              <li className={styles.toolListItem}>Google ML Kit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Skills;
