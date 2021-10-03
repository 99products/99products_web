import firebaseDB from "../firebase";

const IDEAS_COLLECTION = "ideas";
const USERS_COLLECTION = "users";

const insertDataToFirebase = async (content) => {
  await firebaseDB
    .collection(IDEAS_COLLECTION)
    .add({
      AppStore: content.appStore,
      Title: content.title,
      Description: content.description,
      Category: content.category,
      EffortSize: content.effortSize,
      TechStack: content.techStack,
      Status: content.status,
      Remarks: content.remarks,
      Github: content.github,
      PlayStoreLink: content.playstoreLink,
      Web: content.web,
    })
    .then((obj) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

const getIdeasList = async () => {
  const response = firebaseDB.collection(IDEAS_COLLECTION);
  const data = await response.get();
  const ideasList = [];
  data.docs.forEach((item) => {
    ideasList.push(item.data());
  });
  return ideasList;
};

const getUserPermissions = async (user) => {
  const response = firebaseDB.collection(USERS_COLLECTION).doc(user);
  const data = await response.get();
  
  return (
    data.data() ||
    new Promise((resolve, reject) => {
      reject("No user match found");
    })
  );
};

export default {
  insertDataToFirebase,
  getIdeasList,
  getUserPermissions,
};
