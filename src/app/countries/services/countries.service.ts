import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from '@angular/core';
import {combineLatest, map, Observable, of, tap} from "rxjs";
import {Country, Region, SmallCountry} from "../interfaces/country.interfaces";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private http = inject(HttpClient);
  private baseUrl = `https://restcountries.com/v3.1`;

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Europe, Region.Oceania];

  constructor() {
  }

  get regions(): Region[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    // /region/americas?fields=cca3,name,borders`

    if (!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }))),
        // tap( countries => console.log({countries }))
      );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url)
      .pipe(
        map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }))
      );
  }


  getCountriesBordersByCode(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return  of([]);

    const countriesRequests: Observable<SmallCountry>[] = [];

    borders.forEach( code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });

    return combineLatest( countriesRequests)

  }


}
