import firebaseDB from "../firebase";

const IDEAS_COLLECTION = "ideas";
const USERS_COLLECTION = "users";

const insertDataToFirebase = async (content) => {
  await firebaseDB
    .collection(IDEAS_COLLECTION)
    .add(content)
    .then((obj) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

const updateDataToFirebase = async (content) => {
  await firebaseDB
    .collection(IDEAS_COLLECTION)
    .doc(content.id)
    .update(content)
    .then((obj) => {
      console.log("UPDATE:::", obj);
    })
    .catch((err) => {
      console.log("ERROR:::", JSON.stringify(err));
    });
};

const getIdeasList = async () => {
  const response = firebaseDB.collection(IDEAS_COLLECTION);
  const data = await response.get();
  const ideasList = [];
  data.docs.forEach((doc) => {
    const ideaObj = doc.data();
    ideaObj["id"] = doc.id;
    ideasList.push(ideaObj);
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
  updateDataToFirebase,
  getIdeasList,
  getUserPermissions,
};
