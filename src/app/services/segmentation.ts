import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Prediction } from '../interfaces/prediction.interface';

@Service()
export class Segmentation {
    environment = environment;
    private http = inject(HttpClient);

    getPrediction(image: File): Observable<Prediction>{
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);

        return this.http
        .post<Prediction>(`${environment.apiUrl}/predict-bubble-segmentation`, formData);
    }

}