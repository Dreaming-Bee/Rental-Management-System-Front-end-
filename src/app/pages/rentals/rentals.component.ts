import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [RouterLink, NgFor, FormsModule, CommonModule],
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent {

  public rentalList: any = [];

  public rental: any = {
    id: "",
    dueDate: "",
    startDate: "",
    endDate: "",
    rental: 0,
    fine: 0,
    totalCost: 0
  };

  constructor(private http: HttpClient) {
    this.loadTable();
  }

  loadTable() {
    this.http.get("http://localhost:8080/rental/get-all").subscribe(data => {
      console.log(data);
      this.rentalList = data;
    });
  }

  public addRental() {
    this.http.post("http://localhost:8080/rental/add-rental", this.rental).subscribe((data) => {
      alert("Rental added successfully!");
      this.clearAll();
    });
  }

  public deleteRental() {
    if (!this.rental.id) {
      alert('Please enter a rental ID to delete.');
      return;
    }

    this.http.delete(`http://localhost:8080/rental/delete-id/${this.rental.id}`, { responseType: 'text' }).subscribe(data => {
      alert("Rental successfully deleted!");
      this.clearAll();
    });
  }

  public searchRental(): void {
    if (!this.rental.id) {
      alert('Please enter a rental ID to search.');
      return;
    }

    this.http.get<any>(`http://localhost:8080/rental/searchById/${this.rental.id}`).subscribe((data) => {
      if (data) {
        console.log(data);
        this.rental = data; // Assign the fetched rental data to the rental object
      } else {
        alert('No rental found with the provided ID.');
      }
    });
  }

  public updateRental() {
    if (!this.rental.id) {
      alert('Please enter a rental ID to update.');
      return;
    }

    this.http.put(`http://localhost:8080/rental/update-rental/${this.rental.id}`, this.rental).subscribe((data) => {
      alert("Rental updated successfully!");
      this.clearAll();
    });
  }

  clearAll() {
    this.rental.id = "";
    this.rental.dueDate = "";
    this.rental.startDate = "";
    this.rental.endDate = "";
    this.rental.rental = 0;
    this.rental.fine = 0;
    this.rental.totalCost = 0;
  }

}
