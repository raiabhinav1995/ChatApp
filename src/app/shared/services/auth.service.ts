import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from './user';
import { env } from 'process';
//import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;// We will be saving user Data here
  private serviceBase: string = env.serverBaseUrl;// To be added
  // authenticate(username: string) {
  //   return this.http.get(`${this.serviceBase}/token/${username}`);
  // }

  // refreshToken() {
  //   this.authenticate(localStorage.getItem('twackUsername')).subscribe( (auth: any) => {
  //     localStorage.setItem('twackToken', auth.token);
  //   });
  // }

  constructor
  (
    //public http: HttpClient,
    public afs:AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  )
  {
    this.afAuth.authState.subscribe
    (
      user=>
      {
        if(user)
        {
          this.userData=user;
          localStorage.setItem('user',JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        }
        else
        {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      }
    );

  }
  signIn(email, password)
  {
    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then((result)=>
    {
      this.ngZone.run(()=>
      {
        this.router.navigate(['dashboard']);
      }
      );
      this.setUserData(result.user);
    }).catch((error)=>{
      window.alert(error.message);
    })
  }
    signUp(email, password)
    {
      return this.afAuth.createUserWithEmailAndPassword(email,password)
      .then((result)=>
      {
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error)=>
      {
        window.alert(error.message);
      });

    }
    sendVerificationMail()
    {
      console.log('sent');
    }
    forgotPassword(passwordResetEmail)
    {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(()=>
      {
        window.alert('Password reset email sent, please check inbox and spam');
      }).catch((error)=>
      {
        window.alert(error);
      });

    }
    get isLogged():boolean
    {
      const user=JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;

    }
    googleAuth()
    {
      return this.authLogin(new auth.GoogleAuthProvider());
    }

    authLogin(provider)
    {
      return this.afAuth.signInWithPopup(provider)
      .then((result)=>
      {
        this.ngZone.run(()=>
        {
          this.router.navigate(['dashboard']);
        })
      this.setUserData(result.user);
    }).catch((error)=>
    {
      window.alert(error);
    });
  }
  setUserData(user)
  {
    const userRef: AngularFirestoreDocument<any>=this.afs.doc('users/${user.uid}');
    const userData: User=
    {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData,
      {
        merge: true
      })
  }

  signOut()
  {
    return this.afAuth.signOut().then(()=>
    {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}

