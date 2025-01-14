<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMovieStore } from './stores/Movie';
import Movie from './components/Movie.vue';
import Button from './components/UI/Button.vue';
import { ActiveTabEnum } from '@/types/types';
import Search from './components/Search.vue';

const movieStore = useMovieStore();

const { setActiveTab } = movieStore;

const { favoriteMovies, activeTab, watchedMovies } = storeToRefs(movieStore);

const tabButtons = [
  {
    id: 1,
    title: ActiveTabEnum.Favorite,
  },
  {
    id: 2,
    title: ActiveTabEnum.Search, 
  },
  {
    id: 3,
    title: ActiveTabEnum.Watched, 
  },
]

</script>

<template>
  <header class="my-6">
    <h2 class="text-2xl font-bold text-center">My favorite movies</h2>
  </header>
  <div class="max-w-[940px] w-full mx-auto px-5">
    <div 
      class="flex justify-center gap-5 mb-5"
    >
      <Button 
        v-for="tabButton in tabButtons"
        :isActive="activeTab === tabButton.title"
        @click="setActiveTab(tabButton.title)"
        :key="tabButton.id" 
      >{{ tabButton.title }}</Button>
    </div>
    <div v-if="activeTab === ActiveTabEnum.Watched">
      <h2 class="mb-7 text-2xl font-bold">Watched Movies (count: {{ watchedMovies.length }})</h2>
      <Movie 
        v-for="watchedMovie in watchedMovies"
        :movie="watchedMovie"
        :key="watchedMovie.id"
      />
    </div>
    <div v-else-if="activeTab === ActiveTabEnum.Favorite">
      <h2 class="mb-7 text-2xl font-bold">All Movies (count: {{ favoriteMovies.length }})</h2>
      <Movie
        v-for="favoriteMovie in favoriteMovies" 
        :movie="favoriteMovie" 
        :key="favoriteMovie.id" 
      />    
    </div>
    <Search v-else />
  </div>
</template>
