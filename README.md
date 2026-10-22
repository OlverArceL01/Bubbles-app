# Froth Flotation Bubble Segmentation Web App

## File System
The current repository keeps the following structure.
```
bubbles-app/
├── src/
│   ├── app/
│   │   ├── components/
|   |   |   └── navbar/ # Navigation bar
│   │   ├── interfaces/
│   │   ├── pages/
│   │   |   ├── images/ # Image segmentation
│   │   |   ├── video/ # Video segmentation by frame
│   │   |   └── videos/ # Froth flotation video gallery
│   │   ├── services/
│   │   |   └── segmentation.ts # Segmentation service to connect to the API
│   │   └── app.routes.ts # Application routes
│   └── environment/ # API URL
├── Dockerfile # Docker configuration for deployment
├── nginx.conf # Redirect requests to index.html for for Angular routing
└── package.json
```

## Installation
Use `npm install` to install all necesssary packages. Then you can run the application using `ng serve` or build it using `npm run build`.

This project uses Node.js `22.23.2` and Angular `22.2.0`.

## Links
You can also use the API directly or view its documentation.

API Docs: https://api.bubbles.olver.site/docs

You can also view the Deep Learning repository on GitHub: https://github.com/OlverArceL01/Bubbles-ml