// Import the functions you need from the SDKs you need
import initializeApp  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, push, set, orderByChild, equalTo, get, query, update, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_SkZymJBi7YnZopipYl1TnvXTF5AR6LI",
    authDomain: "nsproj-222ff.firebaseapp.com",
    databaseURL: "https://nsproj-222ff-default-rtdb.firebaseio.com",
    projectId: "nsproj-222ff",
    storageBucket: "nsproj-222ff.appspot.com",
    messagingSenderId: "639734167455",
    appId: "1:639734167455:web:565a5efe77ff7286036faa",
    measurementId: "G-CNK9LCYMGD"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const name = document.getElementById("name").val;
const email =  document.getElementById("email");
const adhNum =  document.getElementById("adhNum");
const mob = document.getElementById("mob");
const certDoct = document.getElementById("certDoct");
const pwd = document.getElementById("pwd");


const subBtn = document.getElementById('submit');
async function signIn() {
    try {
        const usersRef = ref(db, 'nsproj'); 
        const usersSnapshot = await get(usersRef);
                  const nodePath = `https://nsproj-222ff-default-rtdb.firebaseio.com/`;
                  const newData = {
                    docName: name.val,
                    emailID:email.val,
                    adhaarNum: adhNum.val,
                    mobile:mob.val,
                    certificateID:certDoct.val
                };
                update(ref(db, nodePath), newData)
                    .then(() => {
                        console.log("Attribute updated successfully!");
                        fetch();
                    })
                    .catch((error) => {
                        console.error("Error updating attribute:", error);
                    });
                }
            
       
      catch (error) {
        console.error("Error retrieving user data:", error);
      }
    
}
// Add click event listener
subBtn.addEventListener('click', function() {
    // Call your function here
    signIn();
    createUserWithEmailAndPassword(auth, email, pwd)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    alert( error.code, error.message);
    // ..
  });
});