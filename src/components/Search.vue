<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/stores/Search';
import Loader from './UI/Loader.vue';
import Button from './UI/Button.vue';
import Movie from './Movie.vue';

const searchStore = useSearchStore();

const { getMovies } = searchStore;
const { searchedMovies, loader } = storeToRefs(searchStore);

const searchMovie = ref('');  
</script>

<template>
  <form @submit.prevent="getMovies(searchMovie)">
    <div class="flex items-center gap-4 mb-5">
      <input type="text" class="w-full h-10 px-3 border border-solid border-gray-400 rounded-lg" v-model="searchMovie"
        placeholder="Search movie">
      <Button>Search</Button>
    </div>
  </form>
  <Loader v-if="loader" />
  <div v-else>
    <Movie
      v-for="searchedMovie in searchedMovies"
      :key="searchedMovie.id"
      :isSearch="true"
      :movie="searchedMovie"
    />
  </div>
</template>

<style scoped></style>
