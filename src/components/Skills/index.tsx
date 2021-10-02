import C from "../../icons/C";
import Design from "../../icons/Design";
import HTMLTag from "../../icons/HTMLTag";
import Java from "../../icons/Java";
import MATLAB from "../../icons/MATLAB";
import Python from "../../icons/Python";
import ReactIcon from "../../icons/ReactIcon";
import CircularProgress from "../CircularProgress";
import styles from "./index.module.css";
import MLBrain from "../../icons/MLBrain";
import DataScience from "../../icons/Data";

interface Skillset {
  name: string;
  percent: Array<number>;
  icon: JSX.Element;
}

const SKILLSET: Array<Skillset> = [
  { name: "Python", percent: [0, 80], icon: <Python /> },
  { name: "Java", percent: [0, 70], icon: <Java /> },
  { name: "C", percent: [0, 60], icon: <C /> },
  { name: "HTML/CSS", percent: [0, 75], icon: <HTMLTag /> },
  { name: "MATLAB", percent: [0, 70], icon: <MATLAB /> },
  { name: "REACT", percent: [0, 40], icon: <ReactIcon /> },
];

const Skills = () => {
  return (
    <div className={styles.container}>
      <div className={styles.skillBar}>
        {SKILLSET.map(({ name, icon: Icon, percent }) => (
          <div key={name} className={styles.skillItem}>
            <CircularProgress values={percent}>
              <span className={styles.icon}>{Icon}</span>
            </CircularProgress>

            <span className={styles.skillName}>{name}</span>
          </div>
        ))}
      </div>

      <div className={styles.columns}>
        <div className={styles.column}>
          <span className={styles.domainIcon}>
            <MLBrain />
          </span>

          <h2 className={styles.title}>Machine Learning</h2>

          {/* <p className={styles.description}>
          I value simple content structure, clean design patterns, and thoughtful interactions.
          </p> */}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Problems I like solving:</h3>

            <span className={styles.subsetValues}>
              Object Detection, Object Segmentation, Genetic Algorithms, Q-Learning
            </span>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Machine Learning Tools</h3>

            <ul className={styles.toolList}>
              <li className={styles.toolListItem}>Computer Vision</li>
              <li className={styles.toolListItem}>Reinforcement Learning</li>
              <li className={styles.toolListItem}> Natural Language Processing (NLP)</li>
              <li className={styles.toolListItem}>Deep Learning</li>
              <li className={styles.toolListItem}>Neural Networks</li>
              <li className={styles.toolListItem}>Halfspaces</li>
              <li className={styles.toolListItem}>Naive Bayes</li>
              <li className={styles.toolListItem}>Logistic Regression</li>
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <span className={styles.domainIcon}>
            <DataScience />
          </span>

          <h2 className={styles.title}>Data Science</h2>

          {/* <p className={styles.description}>
          I believe that pairing any massive dataset with the effective analysis can offer tremendous insights.
          </p> */}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Problems I like solving:</h3>

            <span className={styles.subsetValues}>
              Model Selection, Predictive Modelling, EDA, Decisions with Data 
            </span>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Data Science Tools</h3>

            <ul className={styles.toolList}>
              <li className={styles.toolListItem}>Regression</li>
              <li className={styles.toolListItem}>Decision Trees & Random Forest</li>
              <li className={styles.toolListItem}>Support Vector Machines (SVM)</li>
              <li className={styles.toolListItem}>Principal Component Analysis (PCA)</li>
              <li className={styles.toolListItem}>K-Nearest Neighbours</li>
              <li className={styles.toolListItem}>K-Means Clustering</li>
              <li className={styles.toolListItem}>Database Pipelines</li>
              
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <span className={styles.domainIcon}>
            <Design />
          </span>

          <h2 className={styles.title}>Software Engineering</h2>

          {/* <p className={styles.description}>
          I like developing from scratch and value the integration of inelligence with software to elevate the user's experience.
          </p> */}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Things I enjoy designing:</h3>

            <span className={styles.subsetValues}>
              UI/UX, Websites, WebApps, Game Applications 
            </span>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Software Design Tools</h3>

            <ul className={styles.toolList}>
              <li className={styles.toolListItem}>Full-Stack Development</li>
              <li className={styles.toolListItem}>Atom</li>
              <li className={styles.toolListItem}>GitHub</li>
              <li className={styles.toolListItem}>Terminal</li>
              <li className={styles.toolListItem}>CodePen</li>
              <li className={styles.toolListItem}>Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
