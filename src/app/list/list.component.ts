import { Component, OnInit } from '@angular/core';

import { IFontItem } from '../models/FontItem';
import { FontSortingType, Trending, Popular, DateAdded, Alpha } from '../models/FontSortingType';

import { FontsService } from '../fonts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private fonts: IFontItem[];
  private keyword: string;
  private categorySerif: boolean;
  private categorySansSerif: boolean;
  private categoryHandwriting: boolean;
  private categoryMonospace: boolean;
  private sortingType: FontSortingType;
  private trendingSorting = Trending;
  private popularSorting = Popular;
  private dateSorting = DateAdded;
  private alphaSorting = Alpha;

  constructor(private fontsService: FontsService) {
    this.fonts = [];
    this.categorySerif = true;
    this.categorySansSerif = true;
    this.categoryHandwriting = true;
    this.categoryMonospace = true;
    this.sortingType = Trending;
  }

  ngOnInit() {
    this.fontsService.getFonts()
        .then((data) => {
          this.fonts = this.fonts.concat(data);
        });
  }

  /**
   * onclick handler of ".fonts-list-item"
   * @param ev Event
   * @param itemId attribute id
   */
  showEditableContent(ev: Event, itemId: string) {
    ev.preventDefault();
    const item = document.querySelector(`#${itemId}`);
    if (item && item.classList.contains('active')) {
      item.classList.remove('active');
    } else {
      const lastActive = document.querySelector(`.fonts-list-item.active`);
      if (lastActive) {
        lastActive.classList.remove('active');
      }
      item.classList.add('active');
    }
  }

  /**
   * Check if the item would passed the filter
   * @param item fonts list item
   */
  isValid(item: IFontItem): boolean {
    const valid = (!this.keyword || (this.keyword && item.family.toLowerCase().indexOf(this.keyword.toLowerCase()) >= 0))
      && ((this.categorySerif && item.category === 'serif')
      || (this.categorySansSerif && item.category === 'sans-serif')
      || (this.categoryHandwriting && item.category === 'handwriting')
      || (this.categoryMonospace && item.category === 'monospace'));
    return !!valid;
  }

  sortByTrending() {
    this.sortingType = Trending;
    this.fontsService.getFonts(Trending)
        .then((data) => {
          this.fonts = data;
        });
  }

  sortByPopular() {
    this.sortingType = Popular;
    this.fontsService.getFonts(Popular)
        .then((data) => {
          this.fonts = data;
        });
  }

  sortByDate() {
    this.sortingType = DateAdded;
    this.fontsService.getFonts(DateAdded)
        .then((data) => {
          this.fonts = data;
        });
  }

  sortByAlpha() {
    this.sortingType = Alpha;
    this.fontsService.getFonts(Alpha)
        .then((data) => {
          this.fonts = data;
        });
  }
}
