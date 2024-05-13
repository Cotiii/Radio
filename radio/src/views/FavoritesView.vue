<template>
  <div class="Favorites">
    <h1>Preferiti</h1>
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
            <link href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css" rel="stylesheet">
            <v-btn @click="removeFromFavorites(station)" :color="station.favorite ? 'error' : 'primary'">
            <v-icon>{{ station.favorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          </v-btn>
         <v-btn @click="playStation(station)" color="primary">Play</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import defaultImage from '@/assets/radio.avif';

export default {
  name: 'FavoritesView',
  data() {
    return {
      favoriteStations: [],
      defaultImage: defaultImage,
      currentAudio: null
    };
  },
  methods: {
    fetchFavoriteStations() {
      const favorites = localStorage.getItem('favoriteStations');
      if (favorites) {
        this.favoriteStations = JSON.parse(favorites).map(station => ({
          ...station,
          favorite: true // Imposta la proprietà 'favorite' su true per ciascuna stazione
        }));
      }
    },
    addToFavorites(station) {
      let favorites = JSON.parse(localStorage.getItem('favoriteStations')) || [];

      if (!this.isFavorite(station)) {
        favorites.push(station);
        localStorage.setItem('favoriteStations', JSON.stringify(favorites));
        this.favoriteStations = favorites.map(station => ({
          ...station,
          favorite: true // Imposta la proprietà 'favorite' su true per ciascuna stazione
        }));
      } else {
        console.log('Stazione già presente nei preferiti');
      }
    },
    removeFromFavorites(station) {
      this.favoriteStations = this.favoriteStations.filter(item => item.id !== station.id);
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem('favoriteStations', JSON.stringify(this.favoriteStations));
    },
    playStation(station) {
      if (this.currentAudio && this.currentAudio.src === station.url) {
        this.currentAudio.pause();
        this.currentAudio = null;
      } else {
        if (this.currentAudio) {
          this.currentAudio.pause();
        }
        this.currentAudio = new Audio(station.url);
        this.currentAudio.addEventListener('ended', () => {
          this.currentAudio = null;
        });
        this.currentAudio.play();
      }
    },
    getStationIcon(station) {
      return station.favicon || this.defaultImage;
    },
    isFavorite(station) {
      return this.favoriteStations.some(favorite => favorite.id === station.id);
    }
  },
  created() {
    this.fetchFavoriteStations();
  }
};
</script>


<style>
/* Stili per le card, se necessario */
</style>
