import FireBase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
 //your config
};

const firebaseapp = FireBase.initializeApp(firebaseConfig);
const timestamp = FireBase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseapp.firestore();