import styles from "./index.module.css";
import WorkExpBox, { Filters } from "./Work_Exp_Box";

interface WorkExperience{
  icon_path: string;
  alt_name:string;
  position_and_dates: string;
  name: React.ReactNode;
  bulletpoints: Array<React.ReactNode>;
  language: Array<Filters>;
}


const FILTERS: Array<Filters> = [
  {
    id: 0,
    name: "Python",
    color: "#6BB243",
  },
  {
    id: 1,
    name: "Perl",
    color: "#F76906",
  },

  {
    id: 2, 
    name: "JavaScript",
    color: "#D73ADE",
  },
  {
    id: 3, 
    name: "Solidity",
    color: "#3D95CB",
  },
  {
    id: 4,
    name: "C",
    color: "#003970",
  },
  {
    id: 5,
    name: "SQLite",
    color: "#9619C9",
  },
  {
    id: 6,
    name: "Reviewer",
    color: "#D53633",
  },
  {
    id: 7,
    name: "HTML/CSS",
    color: "#d10d0d",
  },
  {
    id: 8,
    name: "AI Consulting",
    color: "#003970",
  },
  {
    id: 9,
    name: "Robotics",
    color: "#9619C9",
  },
  {
    id: 10,
    name: "C++",
    color: "#00599C",
  },
  {
    id: 11,
    name: "PyTorch",
    color: "#EE4C2C",
  },
  {
    id: 12,
    name: "TensorFlow",
    color: "#FF6F00",
  }

];


const WORK_EXPERIENCE_DETAILS:  Array<WorkExperience> = [
  {
    icon_path: "media/nuro_icon.png",
    alt_name: "Nuro",
    position_and_dates: "Software Engineer, ML - Representation Learning [Fall 2025 - Now]",
    name: <a href="https://www.nuro.ai/" target="_blank" rel="noreferrer" style={{color:"black", textDecoration:"none"}}>Nuro</a>,
    bulletpoints: [
      <>
        Learned driving representations that transfer and scale — cross-attention, closed-loop training, cross-platform transfer, auxiliary tasks, and large-scale curricula — for the <a href="https://www.nuro.ai/nuro-lucid-uber-robotaxi" target="_blank" rel="noreferrer" style={{color:"black", textDecoration:"none"}}>Nuro-Uber-Lucid robotaxi deployment</a>.
      </>,
      "Unblocked 2.5× training on harder scenes: 30% more nudges around unmapped vehicles and debris, and 15% better occlusion creeping."
    ],
    language: [FILTERS[0], FILTERS[10], FILTERS[11], FILTERS[12], FILTERS[9]]
  },
  {
    icon_path: "media/irl_icon.png",
    alt_name: "Intelligent Robot Lab",
    position_and_dates: "Research Engineer, Robot & Representation Learning [2023 - 2025]",
    name: <a href="http://irl.cs.brown.edu/" target="_blank" rel="noreferrer" style={{color:"black", textDecoration:"none"}}>Intelligent Robot Lab, Brown</a>,
    bulletpoints: [
      <>
        <a href="https://openreview.net/pdf?id=5z8AJP5G8c" target="_blank" rel="noreferrer" style={{color:"black", textDecoration:"none"}}>Symbolic skill abstraction</a> (co-first author, LEAP @ CoRL 2024, best poster ICRA 2025): learned skill descriptions from vision, reaching 75% success, within 6% of an expert, on SPOT and Franka.
      </>,
      "Factorized representations (first author): separated factors that matter for decisions, giving policies 30% more generalizable than DreamerV2 and 3× faster training."
    ],
    language: [FILTERS[0], FILTERS[10], FILTERS[11], FILTERS[9]]
  },
  {
    icon_path: "media/mck_icon.jpeg",
    alt_name: "McKinsey & Co",
    position_and_dates: "Business Analyst Intern [Winter 2023/2024]",
    name: "McKinsey & Co.",
    bulletpoints: ["Set the AI strategy and operating model for the B2B arm of the largest telecom in MENA, valued at $2B."],
    language: [FILTERS[8]]
  },
  {
    icon_path: "media/brown_icon.png",
    alt_name: "Humans-to-Robots Lab",
    position_and_dates: "Research Engineer, Vision-Language Reasoning & Planning [2022 - 2024]",
    name: <a href="https://h2r.cs.brown.edu/" target="_blank" rel="noreferrer" style={{color:"black", textDecoration:"none"}}>Humans-to-Robots Lab, Brown</a>,
    bulletpoints: [
      <>
        <a href="https://ieeexplore.ieee.org/document/10611376" target="_blank" rel="noreferrer" style={{color:"black", textDecoration:"none"}}>CAPE</a> (first author, oral ICRA 2024, 250+ citations): a planner that repairs its own failed preconditions from language feedback — 10× fewer interventions, 20% more correct, and 100× faster than SayCan.
      </>,
      <>
        <a href="https://ieeexplore.ieee.org/document/10611447" target="_blank" rel="noreferrer" style={{color:"black", textDecoration:"none"}}>Safety Chip</a> (second author, oral ICRA 2024, 150+ citations): turned open-ended language rules into LTL constraints, so SPOT followed them 15–40% more reliably.
      </>
    ],
    language: [FILTERS[0], FILTERS[9]]
  },
  {
    icon_path: "media/bigai_icon.png",
    alt_name: "BigAI",
    position_and_dates: "Reinforcement Learning Research Engineer [2023 - 2024]",
    name: <a href="https://www.littmania.com/" target="_blank" rel="noreferrer" style={{color:"black", textDecoration:"none"}}>BigAI, Brown</a>,
    bulletpoints: [
      <>
        <a href="https://openreview.net/pdf?id=tSFkQGu0HA" target="_blank" rel="noreferrer" style={{color:"black", textDecoration:"none"}}>Tiered Reward</a> (RLC 2024): an environment-independent reward that still guarantees goal visits, converging 3× faster than standard reward shaping across 500+ MiniGrid runs.
      </>
    ],
    language: [FILTERS[0], FILTERS[11]]
  },
  {
    icon_path: "media/brown_icon.png",
    alt_name: "CS1410 HTA",
    position_and_dates: "Head Teaching Assistant [Fall 2022]",
    name: "Artificial Intelligence Course, CS1410",
    bulletpoints: ["Head TA with Prof. George Konidaris, leading 20 TAs for 120+ students.", "Automated grading and logistics, and mentored 10+ final projects."],
    language: [FILTERS[0], FILTERS[1], FILTERS[11], FILTERS[12]]
  },
  {
    icon_path: "media/wisdomise_icon.jpeg",
    alt_name: "Wisdomise",
    position_and_dates: "Machine Learning Engineer [Summer 2022]",
    name: "Wisdomise",
    bulletpoints: ["Used ML to set Uniswap v3 liquidity ranges, predicting tick bounds at >95% accuracy and >98% utility."],
    language: [FILTERS[0], FILTERS[3], FILTERS[2], FILTERS[7], FILTERS[5]]
  },
  {
    icon_path: "media/rario_icon.jpeg",
    alt_name: "Rario",
    position_and_dates: "Blockchain Developer [Summer 2022]",
    name: "Rario",
    bulletpoints: ["Built a peer-to-peer chat and NFT exchange, with the backend in smart contracts on Polygon."],
    language: [FILTERS[3], FILTERS[2], FILTERS[7]]
  },
  {
    icon_path: "media/brown_icon.png",
    alt_name: "DATA1030 TA",
    position_and_dates: "Teaching Assistant [Fall 2020]",
    name: "Hands-on Data Science, DATA1030 (Graduate Level)",
    bulletpoints: ["Supported 50+ students under Prof. Andras Zsom, and mentored 14 graduate students on ML final projects."],
    language: [FILTERS[0], FILTERS[12]]
  }
  
  
]




const Projects = () => (
  <div className={styles.container}>
    <h2 className={styles.projectsTitle}>Engineering Experience</h2>

    {Array.from(WORK_EXPERIENCE_DETAILS.keys()).map((val, index) => (
      <WorkExpBox key={index} filters={WORK_EXPERIENCE_DETAILS[val].language} icon={WORK_EXPERIENCE_DETAILS[val].icon_path} alt_icon_name = {WORK_EXPERIENCE_DETAILS[val].alt_name} position_and_dates = {WORK_EXPERIENCE_DETAILS[val].position_and_dates} name = {WORK_EXPERIENCE_DETAILS[val].name} description = {WORK_EXPERIENCE_DETAILS[val].bulletpoints}/>
    ))}


  </div>
);

export default Projects;
