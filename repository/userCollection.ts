// This file is optional and can be used for more complex database interactions
// For this example, we are directly interacting with Firestore in the controller
import { db } from '../config/firebaseConfig';

const usersCollection = db.collection('USERS');

export default usersCollection;