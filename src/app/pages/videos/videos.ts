import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-videos',
  imports: [RouterLink],
  templateUrl: './videos.html',
})
export class Videos {
  videos = [
    "F5_1_1_1",
    "F5_1_1_2",
    "F5_1_2_1",
    "F5_1_2_2",
    "F5_1_3_1",
    "F5_2_1_1",
    "F5_2_1_2",
    "F5_2_2_1",
    "F5_2_2_2",
    "F5_2_3_1"
  ]
}
