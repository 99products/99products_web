export const formInputIds = [
  "title",
  "description",
  "techStack",
  "category",
  "effortSize",
  "github",
  "playStore",
  "appStore",
  "status",
  "remarks",
  "web",
];
const category = ["App", "Game", "Web", "Bot", "Utility","Server","Blockchain", "Other"];
const effortSizeDisplay = [
  "Small (1 - 2 weeks)",
  "Medium (1 - 2 months)",
  "Large (3 - 6 months)",
  "Extra Large (More than 6 months)",
];

const effortSize = ["S", "M", "L", "XL"];

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
    displayLabels: category,
    options: category,
  },
  effortSize: {
    title: "How much approx time to execute the idea?",
    type: 3,
    hintText: "Your answer",
    displayLabels: effortSizeDisplay,
    options: effortSize,
  },
  github: {
    title: "Github link",
    type: 1,
    hintText: "Your answer",
  },
  playStore: {
    title: "Play store link",
    type: 1,
    hintText: "Your answer",
  },
  remarks: {
    title: "Remarks",
    type: 1,
    hintText: "Your answer",
  },
  web: {
    title: "Web Link",
    type: 1,
    hintText: "Your answer",
  },
  appStore: {
    title: "App Store Link",
    type: 1,
    hintText: "Your answer",
  },
  status: {
    title: "Project current status",
    type: 1,
    hintText: "Your answer",
  },
};
