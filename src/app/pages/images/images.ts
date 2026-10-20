import { Component, inject, signal } from '@angular/core';
import { form, FormRoot, required } from '@angular/forms/signals';
import { Prediction } from '../../interfaces/prediction.interface';
import { Segmentation } from '../../services/segmentation';

@Component({
  selector: 'app-images',
  imports: [FormRoot],
  templateUrl: './images.html',
})
export class Images {
  segmentationService = inject(Segmentation);
  model = signal<{image: File | null}>({
    image: null
  })
  currentPrediction = signal<Prediction | null>(null);
  segmentationForm = form(this.model, (schemaPath)=>{required(schemaPath.image)}, 
    { 
      submission: {
        action: async (field) => {
          const image = field().value().image;
          if (!image) return;
          const formData = new FormData();

          formData.append('image', image);
          this.segmentationService.getPrediction(image).subscribe({
            next: (res) => {
              this.currentPrediction.set(res);
            },
            error: (err) => console.error('Error:', err.error.detail)
          });

        }
      }
    }
  )

  changeImage(event: Event){
    const input = event.target as HTMLInputElement;
    const image = input.files?.[0] ?? null;
    this.segmentationForm.image().value;
    this.model.set({image});
    this.currentPrediction.set(null);
  }
}