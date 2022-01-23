import FireBase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt2XkSzMNfHwlb2u803o5Ky5ijuPTzk8A",
  authDomain: "vue2firebaseblog.firebaseapp.com",
  projectId: "vue2firebaseblog",
  storageBucket: "vue2firebaseblog.appspot.com",
  messagingSenderId: "712698613218",
  appId: "1:712698613218:web:6055c82d991c247d267dbb",
};

const firebaseapp = FireBase.initializeApp(firebaseConfig);
const timestamp = FireBase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default FireBase.firestore();

