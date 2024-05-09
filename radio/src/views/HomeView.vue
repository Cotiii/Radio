<template>
<div class="radio-list">
    <v-text-field
      v-model="searchTerm"
      label="Search stations"
      outlined
    ></v-text-field>
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <v-row v-else>
      <v-col
        v-for="station in filteredStations"
        :key="station.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="elevation-2">
          <v-img
            :src="getStationIcon(station)"
            :alt="station.name"
            class="radio-image"
          ></v-img>
          <v-card-title>{{ station.name }}</v-card-title>
          <v-card-text>
            <p>Country: {{ station.country }}</p>
            <p>Genre: {{ Array.isArray(station.tags) ? station.tags.join(', ') : '' }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addToFavorites(station)" color="primary">Add to Favorites</v-btn>
            <v-btn @click="playStation(station)" color="primary">Play</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
    },filterStations() {
  this.filteredStations = this.stations.filter(station => {
    return (
      (station.country.toLowerCase() === 'italy') &&
      (
        station.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (Array.isArray(station.tags) &&
          station.tags.some(tag =>
            tag.toLowerCase().includes(this.searchTerm.toLowerCase())
          ))
      )
    );
  });
},
    addToFavorites(station) {
      // Implementa la logica per aggiungere la stazione radio ai preferiti
      console.log('Aggiungi ai preferiti:', station);
    },
 playStation(station) {
  if (this.currentAudio) {
    // Interrompi la riproduzione della stazione radio corrente
    this.currentAudio.pause();
  }

  // Crea un nuovo elemento audio per la stazione radio selezionata
  this.currentAudio = new Audio(station.url);

  // Aggiungi un evento 'ended' per ripulire l'elemento audio corrente quando la riproduzione è finita
  this.currentAudio.addEventListener('ended', () => {
    this.currentAudio = null;
  });

  // Avvia la riproduzione della nuova stazione radio
  this.currentAudio.play();
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

.radio-image {
  height: 200px; /* Altezza desiderata per le immagini */
  object-fit: cover; /* Scala l'immagine per adattarla al contenitore mantenendo l'aspect ratio */
}
</style>
