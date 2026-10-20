import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'videos',
                loadComponent: () =>
                    import("./pages/videos/videos").then(m => m.Videos)
            },
            {
                path: 'video/:name',
                loadComponent: () =>
                    import("./pages/video/video").then(m => m.Video)
            },
            {
                path: 'images',
                loadComponent: () =>
                    import("./pages/images/images").then(m => m.Images)
            },
            {
                path: '**',
                redirectTo: 'videos'
            }
        ]
    }
];
