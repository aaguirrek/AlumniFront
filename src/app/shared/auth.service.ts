import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

import { Observable, from } from 'rxjs';
export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICreateCredentials {
  email: string;
  password: string;
  displayName: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  signIn(credentials: ISignInCredentials): Observable<auth.UserCredential> {

   let emailModel:string = credentials.email ;
   let passwordModel:string = credentials.password;


    return from(this.afAuth.auth.signInWithEmailAndPassword( emailModel, passwordModel));
  }

  signInGoogle(): Observable<auth.UserCredential> {
    //https://lh3.googleusercontent.com/a/AGNmyxbQ_Ub433tpzU1OO2n1x9jrSrBvZcOh76Whl8nAFfo=s96-c


     return from(this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() ));
   }
  signOut() {
    localStorage.removeItem("email")
    return from(this.afAuth.auth.signOut());
  }

  register(credentials: ICreateCredentials) {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(
        () => {
          this.afAuth.auth.currentUser.updateProfile({ displayName: credentials.displayName });
          this.afAuth.auth.updateCurrentUser(this.afAuth.auth.currentUser);
        }
      )
    );
  }

  sendPasswordEmail(email) {
    return from(this.afAuth.auth.sendPasswordResetEmail(email));
  }

  resetPassword(credentials: IPasswordReset) {
    return from(this.afAuth.auth.confirmPasswordReset(credentials.code, credentials.newPassword));
  }

  get user(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

}
