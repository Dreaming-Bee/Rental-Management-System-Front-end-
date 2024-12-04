import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [RouterLink, NgFor, FormsModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {


    public itemList: any = [];

    public item: any = {
      itemId: "",
      itemName: "",
      rentalPerDay: 0,
      finePerDay: 0,
      availability: ""
    };

    constructor(private http: HttpClient) {
      this.loadTable();
    }

    loadTable() {
      this.http.get("http://localhost:8080/item/get-all").subscribe(data => {
        console.log(data);
        this.itemList = data;
      });
    }

    public addItem() {
      this.http.post("http://localhost:8080/item/add-item", this.item).subscribe((data) => {
        alert("Item added successfully!");
        this.clearAll();
      });
    }

    public deleteItem() {
      this.http.delete(`http://localhost:8080/item/delete-id/${this.item.itemId}`, { responseType: 'text' }).subscribe(data => {
        alert("Item successfully deleted!");
        this.clearAll();
      });
    }
    public searchItem(): void {
      if (!this.item.itemId) {
        alert('Please enter an item ID to search.');
        return;
      }
    
      this.http.get<any>(`http://localhost:8080/item/searchById/${this.item.itemId}`).subscribe((data) => {
        if (data) {
          console.log(data);
          this.item = data;  
        } else {
          alert('No item found with the provided ID.');
        }
      }, error => {
        console.error('Error searching item:', error);
        alert('An error occurred while searching for the item.');
      });
    }
    
    updateItem(): void {
      if (!this.item.itemId) {
        alert('Please provide a valid item ID.');
        return;
      }
    
      this.http.put("http://localhost:8080/item/update", this.item).subscribe((response) => {
        alert('Item updated successfully!');
        this.clearAll();
      }, (error) => {
        console.error('Error updating item:', error);
        alert('An error occurred while updating the item.');
      });
    }
    

    clearAll() {
      this.item.itemId = "";
      this.item.itemName = "";
      this.item.rentalPerDay = 0;
      this.item.finePerDay = 0;
      this.item.availability = "";
    }

}
