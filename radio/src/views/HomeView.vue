<template>
  <div class="radio-list">
    <input
      type="text"
      placeholder="Search stations..."
      v-model="searchTerm"
    />
    <div v-if="loading">Loading...</div>
    <div v-else class="card-container">
      <div v-for="station in filteredStations" :key="station.id" class="card">
        <img :src="getStationIcon(station)" :alt="station.name" class="radio-image" />
        <h2>{{ station.name }}</h2>
        <p>Country: {{ station.country }}</p>
        <p>Genre: {{ Array.isArray(station.tags) ? station.tags.join(', ') : '' }}</p>
        <button @click="addToFavorites(station)" class="favorite-button">Aggiungi ai preferiti</button>
        <button @click="playStation(station)" class="play-button">Riproduci</button>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImage from '@/assets/radio.avif'; // Importa l'immagine di default da assets

export default {
  name: 'RadioList',
  data() {
    return {
      loading: true,
      stations: [],
      searchTerm: '',
      filteredStations: [],
      defaultImage: defaultImage, // URL dell'immagine di default
      currentAudio: null // Elemento audio corrente
    };
  },
  methods: {
    fetchStations() {
      fetch('https://de1.api.radio-browser.info/json/stations')
        .then(response => response.json())
        .then(data => {
          this.stations = data;
          this.loading = false;
          this.filterStations();
        })
        .catch(error => {
          console.error('Error fetching stations:', error);
          this.loading = false;
        });
    },
    filterStations() {
      this.filteredStations = this.stations.filter(station => {
        return (
          station.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          station.country.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          (Array.isArray(station.tags) &&
            station.tags.some(tag =>
              tag.toLowerCase().includes(this.searchTerm.toLowerCase())
            ))
        );
      });
    },
    addToFavorites(station) {
      // Implementa la logica per aggiungere la stazione radio ai preferiti
      console.log('Aggiungi ai preferiti:', station);
    },
    playStation(station) {
      if (this.currentAudio) {
        // Se c'è già un'audio in riproduzione, interrompilo prima di riprodurre uno nuovo
        this.currentAudio.pause();
      }

      // Crea un nuovo elemento audio per la stazione radio selezionata
      this.currentAudio = new Audio(station.url);
      this.currentAudio.play(); // Avvia la riproduzione
    },
    getStationIcon(station) {
      return station.favicon || this.defaultImage; // Utilizza l'icona della stazione o l'immagine di default
    }
  },
  watch: {
    searchTerm() {
      this.filterStations();
    }
  },
  mounted() {
    this.fetchStations();
  }
};
</script>

<style>
/* Component styles */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}

.radio-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.favorite-button,
.play-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 5px;
}

.favorite-button:hover,
.play-button:hover {
  background-color: #0056b3;
}
</style>
