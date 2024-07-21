import { Injectable } from '@angular/core';
import { HousingLocation } from '../housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly url = 'http://localhost:3000/locations';
  housingLocationList: HousingLocation[] = [];
  constructor() {}

  async getAllHousingLocations(): Promise<HousingLocation[]> { 
    const data = await fetch(this.url)
    return await data.json() ?? []
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(this.url)
    const json = await data.json() ?? []
    return json.find((h: HousingLocation) => h.id == id)
    }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
