import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form (submit)="filterResults($event, filter.value)">
        <input type="text" placeholder="Filter by city" #filter (input)="emptyFilter(filter.value)" />
        <button class="primary" type="submit">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService)
  housingLocationList: HousingLocation[] = []
  filteredLocationList: HousingLocation[] = []
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList
      this.filteredLocationList = this.housingLocationList
    })
  }
  filterResults = (event: Event, text: string) => {
    event.preventDefault()
    if (!text) this.filteredLocationList = this.housingLocationList
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => {
      return housingLocation.city.toLowerCase().includes(text.toLowerCase()) || housingLocation.name.toLowerCase().includes(text.toLowerCase())
    })
  }

  emptyFilter = (text: string) => {
    if (text == "") this.filteredLocationList = this.housingLocationList
  }
}