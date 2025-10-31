(function(){
    
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Journey</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        header {
            background-color: #333;
            color: #fff;
            padding: 1em 0;
            text-align: center;
        }

        main {
            padding: 20px;
        }

        #map {
            height: 500px; /* Adjust height as needed */
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .dot {
            background-color: steelblue;
            border-radius: 50%;
            width: 8px;
            height: 8px;
            position: absolute;
            opacity: 0.7;
        }
    </style>
</head>
<body>

    <header>
        <h1>My Journey</h1>
    </header>

    <main>
        <section id="map">
            <h2>Places Visited</h2>
        </section>
    </main>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
        const map = L.map('map').setView([20, 0], 2); // Center the map and set zoom level

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Sample data (latitude, longitude, count)
        const places = [
            { lat: 34.0522, lng: -118.2437, count: 5 }, // Los Angeles
            { lat: 40.7128, lng: -74.0060, count: 8 }, // New York
            { lat: 37.7749, lng: -122.4194, count: 3 }, // San Francisco
            { lat: 51.5074, lng: -0.1278, count: 6 },  // London
            { lat: 48.8566, lng: 2.3522, count: 4 },   // Paris
            { lat: 35.6895, lng: 139.6917, count: 7 }, // Tokyo
            { lat: -33.8688, lng: 151.2093, count: 2 }, // Sydney
            { lat: 41.8781, lng: -87.6298, count: 4 }, // Chicago
            { lat: 39.9526, lng: -75.1652, count: 3 }, // Philadelphia
            { lat: 30.2672, lng: -97.7431, count: 5 }  // Austin
        ];

        places.forEach(place => {
            for (let i = 0; i < place.count; i++) {
                const marker = L.circleMarker([place.lat + (Math.random() - 0.5) * 0.1, place.lng + (Math.random() - 0.5) * 0.1], {
                    radius: 5,
                    color: 'steelblue',
                    fillOpacity: 0.7
                }).addTo(map);
            }
        });

  })();
