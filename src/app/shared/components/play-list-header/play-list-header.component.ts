import { Component, Input, OnInit } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-play-list-header',
  templateUrl: './play-list-header.component.html',
  styleUrls: ['./play-list-header.component.css']
})
export class PlayListHeaderComponent implements OnInit {

  @Input()title: string = '';
  @Input()nsong: Number = 0;
  @Input()iconFavorite: boolean = true;

  constructor(private multimediaService: MultimediaService) { }


  ngOnInit(): void {
  }

  playListFavorite(): void {
    this.multimediaService.setSongListFavoriteToPlaylist()
  }

}
