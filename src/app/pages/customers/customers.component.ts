import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterLink, NgFor, FormsModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  public customerList :any =[];

  public customer : any={
    customerId:"",
    customerName:"",
    contact: "",
    city : ""
  };

  constructor(private http: HttpClient){
    this.loadTable();
  }

  loadTable(){
    this.http.get("http://localhost:8080/customer/get-all").subscribe(data =>{
      console.log(data);
      this.customerList = data;
    })
  }

  
  public addCustomer(){
    this.http.post("http://localhost:8080/customer/add-customer",this.customer).subscribe((data)=>{
      alert("customer added succeessfully!!!")
      this.clearAll();
    })
  }

  deleteCustomer() {
    this.http.delete(`http://localhost:8080/customer/delete-id/${this.customer.customerId}`, { responseType: 'text' }).subscribe(data => {
      alert("customer succeessfully Deleted!!!"); 
      this.clearAll();
    });
  }

  searchCustomer(): void {
    if (!this.customer.customerId) {
      alert('Please enter a customer ID to search.');
      return;
    }
  
    this.http.get<any>(`http://localhost:8080/customer/searchById/${this.customer.customerId}`).subscribe((data) => {
      if (data) {
        console.log(data);
        this.customer = data;  
      } else {
        alert('No customer found with the provided ID.');
      }
    }, error => {
      console.error('Error searching customer:', error);
      alert('An error occurred while searching for the customer.');
    });
  }
  

  updateCustomer(): void {
    if (!this.customer.customerId) {
      alert('Please provide a valid customer ID.');
      return;
    }
  
    this.http.put("http://localhost:8080/customer/update", this.customer).subscribe((response) => {
      alert('Customer updated successfully!');
      this.clearAll();
    }, (error) => {
      console.error('Error updating customer:', error);
      alert('An error occurred while updating the customer.');
    });
  }
  
  

  clearAll(){
    this.customer.customerId = null;
    this.customer.customerName=null;
    this.customer.contact= null;
    this.customer.city=null;
  }


}
