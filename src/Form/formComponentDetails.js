export const formInputIds = [
  "title",
  "description",
  "techStack",
  "category",
  "effortSize",
  "github",
  "playstoreLink",
  "appStore",
  "status",
  "remarks",
  "web"
];
const categoryArr = ["App", "Game", "Web", "Bot", "Utility", "Other"];
const effortSizeArr = [
  "Small (1-2 weeks)",
  "Medium ( 1 to 2 months)",
  "Large ( 3 to 6 months)",
];
export const componentDetails = {
  title: {title: "Whats your idea?", type: 1, hintText: "Your answer"},
  description: {
    title: "You want to tell us more about it?",
    type: 2,
    hintText: "Your answer",
  },
  techStack: {
    title: "Anything else to share, like execution plan, tech stack etc?",
    type: 1,
    hintText: "Your answer",
  },
  category: {
    title: "Category",
    type: 3,
    hintText: "Your answer",
    options: categoryArr,
  },
  effortSize: {
    title: "How much approx time to execute the idea?",
    type: 3,
    hintText: "Your answer",
    options: effortSizeArr,
  },
  github: {
    title: "Github link",
    type: 1,
    hintText: "Your answer",
  },
  playstoreLink: {
    title: "Play store link",
    type: 1,
    hintText: "Your answer",
  },
  playstoreLink: {
    title: "Play store link",
    type: 1,
    hintText: "Your answer",
  },
  remarks:{
    title: "Remarks",
    type: 1,
    hintText: "Your answer",
  },
  web:{
    title: "Web Link",
    type: 1,
    hintText: "Your answer",
  },
  appStore:{
    title: "App Store Link",
    type: 1,
    hintText: "Your answer",
  },
  status:{
    title: "Project current status",
    type: 1,
    hintText: "Your answer",
  }
};
