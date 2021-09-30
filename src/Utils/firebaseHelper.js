import firebaseDB from "../firebase";

const COLLECTION_NAME = "ideas";

const insertDataToFirebase = async(content) => {
  await firebaseDB
    .collection(COLLECTION_NAME)
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
  const response = firebaseDB.collection(COLLECTION_NAME);
  const data = await response.get();
  const ideasList = [];
  data.docs.forEach((item) => {
    ideasList.push(item.data());
  });
  return ideasList;
};

export default {
  insertDataToFirebase,
  getIdeasList,
};
