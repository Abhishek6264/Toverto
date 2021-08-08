import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


export class USER {
  id: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }

  createUser(user: USER) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  create(user: USER) {
    return this.ngFirestore.collection('employees').add(user);
  }

  getUsers() {
    return this.ngFirestore.collection('employees').snapshotChanges();
  }

  getUser(id) {
    return this.ngFirestore.collection('employees').doc(id).valueChanges();
  }

  update(id, user: USER) {
    this.ngFirestore.collection('employees').doc(id).update(user)
      .then(() => {
        this.router.navigate(['/home']);
      }).catch(error => console.log(error));;
  }

  delete(id: string) {
    this.ngFirestore.doc('employees/' + id).delete();
  }

}
