
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCVtbroAThVB6dbJR-gbUdETjzFtt8Wmbw",
    authDomain: "test-a2ada.firebaseapp.com",
    projectId: "test-a2ada",
    storageBucket: "test-a2ada.appspot.com",
    messagingSenderId: "136683821158",
    appId: "1:136683821158:web:ef3a2b9e5d370894f4f5a7",
    measurementId: "G-W107L6LBHW"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const auth =  firebase.auth();

function signUp(){
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    alert("Signed Up!");

}
function signIn(){
		
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message)); 
    window.location.href="stock.html"   
    alert("Signed In!");
}
