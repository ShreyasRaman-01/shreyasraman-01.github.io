//array of menu iterms in the navigation bar: preserve centralized record of menu names
//exporting the navbar data: to be imported in Navbar.tsx
export const MenuItems: {
  page_name: string;
  url: string;
}[] = [
  { page_name: "About", url: "/about" },
  { page_name: "Research", url: "/research"},
  { page_name: "Experience", url: "/work_experiences" },
  { page_name: "Projects", url: "/projects" },
  { page_name: "Skills", url: "/skills" },
  { page_name: "Room", url: "/room" },
  { page_name: "Blog", url: "https://medium.com/@shreyas_sundara_raman" },
  // { page_name: "Contact Me", url: "/contact-me" },
];
