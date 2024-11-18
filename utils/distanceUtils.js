// Function to calculate the distance between two locations (lat, lng) in kilometers
const calculateDistance = (location1, location2) => {
    const R = 6371; // Radius of the Earth in km
    const lat1 = location1.lat * Math.PI / 180;
    const lat2 = location2.lat * Math.PI / 180;
    const deltaLat = (location2.lat - location1.lat) * Math.PI / 180;
    const deltaLng = (location2.lng - location1.lng) * Math.PI / 180;
  
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };
  
  module.exports = { calculateDistance };
  