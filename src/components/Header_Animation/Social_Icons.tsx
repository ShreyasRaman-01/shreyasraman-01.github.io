//array of menu iterms in the social links icon bar: preserve centralized record of menu names

export const SOCIAL_ICONS: {
  name: string;
  icon_pic: string;
  url: string;
  cName: string;
}[] = [
  { name:"github",icon_pic: "fab fa-github", url: "https://github.com/Shreyas-S-Raman", cName: "social-icon" },
  { name:"linkedin", icon_pic: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com/in/shreyas-raman-167a2a142/", cName: "social-icon" },
  { name:"facebook",icon_pic: "fa-brands fa-x-twitter", url: "https://twitter.com/raman_shreyas", cName: "social-icon" },
  {name: "scholar", icon_pic: "fa-brands fa-google-scholar", url: "https://scholar.google.com/citations?user=F--ov6gAAAAJ&hl=en&authuser=1", cName: "social-icon" },
  { name:"email",icon_pic: "far fa-envelope", url: "shreyas_sundara_raman@brown.edu", cName: "social-icon" },
  { name:"resume",icon_pic: "far fa-clipboard", url: "../data/Shreyas_Raman_Resume.pdf", cName: "social-icon"},
];

