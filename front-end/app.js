// Leaflet map initialization
const map = L.map('map').setView([13.011129, 80.234869], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Form submission handling for sending requests to the backend
document.getElementById('route-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    
    try {
        const response = await fetch('/findRoute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ start, end })
        });
        
        const data = await response.json();
        // Process data and display the received route on the map
        // For Leaflet, this might involve drawing a polyline between route points
    } catch (error) {
        console.error('Error:', error);
    }
});
// Function to fetch coordinates from the backend and add markers to the map
async function fetchAndAddMarkers() {
    try {
        const response = await fetch('/getCoordinates'); // Fetch coordinates from the backend
        const data = await response.json();
        
        const map = L.map('map').setView([51.505, -0.09], 13); // Initialize Leaflet map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Add tile layer
        
        // Add markers to the map using fetched coordinates
        data.forEach(coord => {
            L.marker([coord.latitude, coord.longitude]).addTo(map);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function when the page loads
window.onload = fetchAndAddMarkers;
