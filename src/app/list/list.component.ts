import { Component, OnInit } from '@angular/core';

import { IFontItem } from '../models/FontItem';
import { FontSortingType, Trending, Popular, DateAdded, Alpha } from '../models/FontSortingType';
import { FontSize, Px, Pt, Em, Ex, Percent } from '../models/FontSize';
import { Color } from '../models/Color';

import { FontsService } from '../fonts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  fonts: IFontItem[];
  keyword: string;
  categorySerif: boolean;
  categorySansSerif: boolean;
  categoryHandwriting: boolean;
  categoryMonospace: boolean;
  sortingType: FontSortingType;
  trendingSorting = Trending;
  popularSorting = Popular;
  dateSorting = DateAdded;
  alphaSorting = Alpha;
  fontSizes: FontSize[];
  currentFontSize: FontSize;
  currentFontColor: Color;

  constructor(private fontsService: FontsService) {
    this.fonts = [];
    this.categorySerif = true;
    this.categorySansSerif = true;
    this.categoryHandwriting = true;
    this.categoryMonospace = true;
    this.sortingType = Trending;
    this.fontSizes = [ Px, Pt, Em, Ex, Percent ];
    this.currentFontSize = Px;
    this.currentFontColor = new Color(200, 200, 200);
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
    this.resetEditContentStyles();
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

  /**
   * onchange handler for fontsize radio buttons
   * @param size font size
   */
  showFontSizeSlider(size: FontSize) {
    this.currentFontSize = size;
  }

  /**
   * onchange handler for font size slider
   */
  changeEditContentFontSize() {
    const editable = document.querySelector('.fonts-list-item.active .fonts-list-editable') as HTMLElement;
    if (!editable) {
      return;
    }
    editable.style.fontSize = `${this.currentFontSize.value}${this.currentFontSize.unit}`;
  }

  /**
   * onchange handler for font colro sliders
   */
  changeEditContentFontColor() {
    const editable = document.querySelector('.fonts-list-item.active .fonts-list-editable') as HTMLElement;
    if (!editable) {
      return;
    }
    editable.style.color = `rgb(${this.currentFontColor.red},${this.currentFontColor.green}, ${this.currentFontColor.blue})`;
  }

  /**
   * Reset styles of the active editable content
   */
  resetEditContentStyles() {
    const editable = document.querySelector('.fonts-list-item.active .fonts-list-editable') as HTMLElement;
    if (!editable) {
      return;
    }
    editable.style.fontSize = 'unset';
    editable.style.color = 'unset';
    editable.style.backgroundColor = 'unset';
  }
}
