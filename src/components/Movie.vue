<script setup lang="ts">
import { computed, type PropType } from 'vue';
import Button from '@/components/UI/Button.vue';
import type { IMovie } from '@/types/types';
import { useMovieStore } from '@/stores/Movie';
import { useSearchStore } from '@/stores/Search';
import { storeToRefs } from 'pinia';

const props = defineProps({
  movie: {
    required: true,
    type: Object as PropType<IMovie>,
    default: () => {},
  },
  isSearch: {
    type: Boolean,
    default: false,
  },
});

const movieStore = useMovieStore();
const searchStore = useSearchStore();

const { toggleWatch, deleteMovie } = movieStore;
const { addToFavorites } = searchStore;

const { favoriteMovies } = storeToRefs(movieStore);

const isFavorite = computed(() => {
  if (props.isSearch) {
    return favoriteMovies.value.some((item) => item.id === props.movie.id);
  }
})

const isWatched = computed(() => {
  if(props.movie.isWatched) {
    return 'Watched';
  }      

  return 'Unwatched';
})

</script>

<template>
  <div class="flex gap-6 mb-8">
    <div class=" shrink-0 basis-[33%] min-h-80">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title">
    </div>
    <div>
      <h3 class="mb-4 text-xl font-bold text-center">{{ movie.title }}</h3>
      <p class="mb-4">{{ movie.overview }}</p>
      <p class="mb-4 italic">Release date: {{ movie.release_date }}</p>
      <div
        v-if="!isSearch"
        class="flex gap-5"
      >
        <Button
          btnType="watch"
          @click="toggleWatch(movie.id as number)"
        >{{ isWatched }}</Button>
        <Button 
          btnType="delete"
          @click="deleteMovie(movie.id as number)"
        >Delete</Button>
      </div>
      <div v-else>
        <Button
          v-if="!isFavorite"
          @click="addToFavorites(movie)"
        >Add</Button>
        <p
          v-else
          class="font-bold underline"
        >Added</p>
      </div>
    </div>
  </div>
</template>
