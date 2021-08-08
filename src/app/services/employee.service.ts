import { Injectable } from '@angular/core';
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
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }
  create(user: USER) {
    return this.ngFirestore.collection('employees').add(user);
  }

  getTasks() {
    return this.ngFirestore.collection('employees').snapshotChanges();
  }

  getTask(id) {
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
