import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { IMovie } from '@/types/types'
import { ActiveTabEnum } from '@/types/types';

export const useMovieStore = defineStore('movie', () => {
  const favoriteMovies = ref<IMovie[]>([]);
  const activeTab = ref<ActiveTabEnum>(ActiveTabEnum.Favorite);

  const favoriteMoviesLocalStorage = localStorage.getItem('favoriteMovies');
  if (favoriteMoviesLocalStorage) {
    favoriteMovies.value = JSON.parse(favoriteMoviesLocalStorage);
  }

  const watchedMovies = computed(() => {
    return favoriteMovies.value.filter((item) => item.isWatched); 
  })

  function setActiveTab(selectedTab: ActiveTabEnum) {
    activeTab.value = selectedTab;    
  }

  function toggleWatch(id: number) {
    const movieId = favoriteMovies.value.findIndex((item) => item.id === id);
    favoriteMovies.value[movieId].isWatched = !favoriteMovies.value[movieId].isWatched;
  }

  function deleteMovie(id: number) {
    favoriteMovies.value = favoriteMovies.value.filter((item) => item.id !== id)
  }

  watch(favoriteMovies, (state) => {    
    localStorage.setItem('favoriteMovies', JSON.stringify(state));
  }, {deep: true})

  return { favoriteMovies, activeTab, watchedMovies, setActiveTab, toggleWatch, deleteMovie };
})
