import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

// export const authSignInUser =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     try {
//       const auth = getAuth();
//       const user = await signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await getAuth().currentUser;

      await updateProfile(user, { displayName: nickname });

      const { displayName, uid } = await getAuth().currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authStateChanged = () => async (dispatch) => {
  const auth = getAuth();

  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  await signOut(auth);

  dispatch(authSlice.actions.authSignOut());
};
