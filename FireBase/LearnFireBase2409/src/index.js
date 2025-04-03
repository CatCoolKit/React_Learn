import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "fir-240901.firebaseapp.com",
  projectId: "fir-240901",
  storageBucket: "fir-240901.appspot.com",
  messagingSenderId: "518672397869",
  appId: "1:518672397869:web:0e6aed8b56f8e6ee51eaa4",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, "books");

// query
const q = query(colRef, orderBy("createdAt"));
// where("author", "==", "bandon sanderson"),

// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((error) => {
//     console.log("Error getting documents: ", error);
//   });

// real-time listener
const unsubCol = onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// get a single document
const docRef = doc(db, "books", "QgrMMItaQvxQ0sP3rXl8");

// getDoc(docRef).then((doc) => {
//   if (doc.exists()) {
//     console.log(doc.data());
//   } else {
//     console.log("No such document!");
//   }
// });

const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data());
});

// updating a document
const updateBookForm = document.querySelector(".update");
updateBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateBookForm.id.value);
  updateDoc(docRef, {
    title: "updateBookForm.title.value",
  }).then(() => {
    updateBookForm.reset();
  });
});

// signing users up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("user created: ", userCredential.user);
      signupForm.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// logging in and out
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("user logged in: ", userCredential.user);
      loginForm.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

const logout = document.querySelector(".logout");
logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("user signed out");
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// auth state change
const unsubAuth = onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user logged in: ", user);
  } else {
    console.log("user logged out");
  }
});

// unsubscribing from auth changes (auth & db)
const unsubButton = document.querySelector(".unsub");
unsubButton.addEventListener("click", () => {
  unsubCol();
  unsubDoc();
  unsubAuth();
  console.log("unsubscribed from all");
});
