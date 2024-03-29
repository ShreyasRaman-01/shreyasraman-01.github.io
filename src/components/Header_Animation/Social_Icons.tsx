//array of menu iterms in the social links icon bar: preserve centralized record of menu names

export const SOCIAL_ICONS: {
  name: string;
  icon_pic: string;
  url: string;
  cName: string;
}[] = [
  { name:"github",icon_pic: "fab fa-github", url: "https://github.com/ShreyasRaman-01", cName: "social-icon" },
  { name:"linkedin", icon_pic: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/shreyas-raman-167a2a142/", cName: "social-icon" },
  { name:"facebook",icon_pic: "fab fa-facebook-f", url: "https://www.facebook.com/people/Shreyas-Raman/100007747637174/", cName: "social-icon" },
  { name:"email",icon_pic: "far fa-envelope", url: "shreyas_sundara_raman@brown.edu", cName: "social-icon" },
  { name:"resume",icon_pic: "far fa-clipboard", url: "../../data/Shreyas_Raman_Resume_PhD.pdf", cName: "social-icon" },
];
