import { Component, OnInit } from '@angular/core';
import { IFontItem } from '../models/FontItem';
import { FontsService } from '../fonts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  fonts: IFontItem[];
  constructor(private fontsService: FontsService) {
    this.fonts = [];
  }

  ngOnInit() {
    this.fontsService.getFonts()
        .then((data) => {
          this.fonts = this.fonts.concat(data);
        });
  }

  showEditableContent(ev: Event, itemId: string) {
    ev.preventDefault();
    const lastActive = document.querySelector(`.fonts-list-item.active`);
    if (lastActive) {
      lastActive.classList.remove('active');
    }

    const item = document.querySelector(`#${itemId}`);
    if (item) {
      item.classList.add('active');
    }
  }
}
