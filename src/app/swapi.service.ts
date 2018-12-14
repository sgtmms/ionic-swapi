import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, empty, merge } from 'rxjs';
import { expand } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private httpSvc: HttpClient) { }

  public getListOfPlanets() {
    //console.log('getListOfPlanets()');

    // let p1 = this.httpSvc.get('https://swapi.co/api/planets/?page=1');
    // let p2 = this.httpSvc.get('https://swapi.co/api/planets/?page=2');
    // let p3 = this.httpSvc.get('https://swapi.co/api/planets/?page=3');
    // let p4 = this.httpSvc.get('https://swapi.co/api/planets/?page=4');
    // let p5 = this.httpSvc.get('https://swapi.co/api/planets/?page=5');
    // let p6 = this.httpSvc.get('https://swapi.co/api/planets/?page=6');
    // let p7 = this.httpSvc.get('https://swapi.co/api/planets/?page=7');

    // return merge(p1, p2, p3, p4, p5, p6, p7);


    return this.getPage('https://swapi.co/api/planets').pipe(expand((data, i) => (<any> data).next ? this.getPage((<any> data).next) : empty()))
  }

  private getPage(pageUrl) {

    let h = new HttpHeaders({
      'Origin': 'https://2018-fall-mjs-th.github.io'
    });

    // return this.httpSvc.get(pageUrl);

    return this.httpSvc.get(pageUrl, {
      headers: h
    });
  }
}
