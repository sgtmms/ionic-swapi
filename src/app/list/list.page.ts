import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private swapiSvc: SwapiService, public appStateSvc: AppStateService) {
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  ngOnInit() {
    
    this.swapiSvc.getListOfPlanets().subscribe(
      data => {
        console.log(data);
       // this.items = (<any> data).reduce((acc, x) => [...acc, ...x.results.map(y => ({title: y.name}))], []);
        this.items = [...this.items, ...(<any>data).results
          //.filter(x => x.films.length > 0)
          .map(x => ({ title: x.name, ...x }))];
        //this.items = this.items.filter(x => x.title.startsWith('E'));
        console.log(this.items);
        this.items.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));
      }
      , error => console.log(error)
    );
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
