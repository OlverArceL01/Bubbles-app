import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Segmentation } from '../../services/segmentation';
import { Prediction } from '../../interfaces/prediction.interface';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-video',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './video.html',
})
export class Video implements OnInit, OnDestroy{
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  segmentationService = inject(Segmentation);
  private route = inject(ActivatedRoute);
  name = this.route.snapshot.paramMap.get('name');
  private intervalId?: ReturnType<typeof setInterval>;
  currentPrediction = signal<Prediction | null>(null);
  lastUpdate = signal<Date | null>(null);

  ngOnInit(): void {
    this.intervalId = setInterval(()=>{
      this.updateResults();
    }, 2000)
  }

  updateResults() {

    const video = this.videoPlayer.nativeElement;

    if (!video.videoWidth || !video.videoHeight) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const image = new File([blob], 'frame.png', {
        type: 'image/png'
      });

      this.segmentationService.getPrediction(image).subscribe({
        next: (res) => {
          this.currentPrediction.set(res);
          this.lastUpdate.set(new Date())
        },
        error: (err) => console.error('Error:', err.error.detail)
      });
    }, 'image/png');
  }

  ngOnDestroy(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
  }
}
