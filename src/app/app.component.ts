import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cars';
  carForm: FormGroup;
  carsList: [];
  carDetailList: string[] = [];

  constructor(private rForm: FormBuilder) {}

  ngOnInit(): void {
    this.carForm = this.rForm.group({
      carMake: ['', Validators.required],
      carModel: ['', Validators.required],
      carYear: ['', [Validators.required, Validators.min(1000)]],
    });
  }

  submit(carForm): void {
    if (this.carForm.valid) {
      const newCar = this.carForm.value;
      const carDetail = newCar.carYear + newCar.carMake + newCar.carModel;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.carDetailList.length; i++) {
        if (this.carDetailList[i] === carDetail) {
          alert('Car already Exists');
          this.saveComplete();
          return;
        }
      }

      if (localStorage.getItem('newCar') == null) {
        localStorage.setItem('newCar', '[]');
      }

      const savedData = JSON.parse(localStorage.getItem('newCar'));
      savedData.push(newCar);
      localStorage.setItem('newCar', JSON.stringify(savedData));
      this.carDetailList.push(carDetail);
      this.saveComplete();
      this.carsList = JSON.parse(localStorage.getItem('newCar'));
    }
  }

  saveComplete(): void {
    this.carForm.reset();
  }
}
