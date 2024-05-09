<template>
  <div class="Favorites">
    <h1>FAVORITE</h1>
    <v-row>
      <v-col
        v-for="station in favoriteStations"
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
          </v-card-text>
          <v-card-actions>
            <v-btn @click="removeFromFavorites(station)" color="error">Remove from Favorites</v-btn>
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
  name: 'FavoritesView',
  data() {
    return {
      favoriteStations: [], // Stazioni preferite
      defaultImage: defaultImage, // URL dell'immagine di default
      currentAudio: null // Elemento audio corrente
    };
  },
  methods: {
    // Recupera le stazioni preferite dal local storage
    fetchFavoriteStations() {
      const favorites = localStorage.getItem('favoriteStations');
      if (favorites) {
        this.favoriteStations = JSON.parse(favorites);
      }
    },
    // Aggiunge una stazione alle preferite e salva nel local storage
    addToFavorites(station) {
      this.favoriteStations.push(station);
      localStorage.setItem('favoriteStations', JSON.stringify(this.favoriteStations));
    },
    // Rimuove una stazione dalle preferite e aggiorna il local storage
    removeFromFavorites(station) {
      this.favoriteStations = this.favoriteStations.filter(item => item.id !== station.id);
      localStorage.setItem('favoriteStations', JSON.stringify(this.favoriteStations));
    },
    // Riproduce una stazione
    playStation(station) {
      // Implementa la logica per riprodurre la stazione radio
    },
    // Ottiene l'icona della stazione
    getStationIcon(station) {
      return station.favicon || this.defaultImage;
    }
  },
  created() {
    // Carica le stazioni preferite al caricamento della pagina
    this.fetchFavoriteStations();
  }
};
</script>

<style>
/* Stili per le card, se necessario */
</style>
