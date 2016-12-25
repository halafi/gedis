import firebase from "firebase"

const firebaseConf = {
	apiKey: "AIzaSyAu-2VOFmnwWP30cGjzbr41Xm8eu4iGSeo",
	authDomain: "speakmind-50ff8.firebaseapp.com",
	databaseURL: "https://speakmind-50ff8.firebaseio.com",
	storageBucket: "speakmind-50ff8.appspot.com",
	messagingSenderId: "1081217280172",
}

export default () => firebase.initializeApp(firebaseConf)
