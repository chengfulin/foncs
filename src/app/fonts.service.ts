import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { IFontItem } from './models/FontItem';
import { FontSortingType, Trending, Popular, DateAdded, Alpha } from './models/FontSortingType';

@Injectable()
export class FontsService {
  private fontsUrl = 'https://www.googleapis.com/webfonts/v1/webfonts';
  private params: Map<string, string>;

  constructor(private http: Http) {
    this.params = new Map<string, string>();
    /* change yout KEY */
    this.params.set('key', 'AIzaSyCJ6nyGQseJZlqm_-hucTL1Fh_48K_4jNk');
    this.params.set('subset', 'latin');
  }

  getFonts(sorting?: FontSortingType): Promise<IFontItem[]> {
    this.params.set('sort', sorting ? sorting.value() : Trending.value());
    let url = this.fontsUrl;
    let paramIndex = 0;
    this.params.forEach((val, key) => {
      if (paramIndex === 0) {
        url += `?${key}=${val}`;
      } else {
        url += `&${key}=${val}`;
      }
      ++paramIndex;
    });

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().items)
      .then(items => this.mapFontItems(items))
      .catch(this.handleError);
  }

  private mapFontItems(responseFonts: any[]): IFontItem[] {
    if (!responseFonts) {
      return [];
    }
    const items: IFontItem[] = [];
    responseFonts.forEach((val, index) => {
      items.push({ family: val.family, category: val.category, lastModified: val.lastModified });
    });
    return items;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
