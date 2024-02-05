import { type IMovie } from "@/types/types";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useMovieStore } from "./Movie";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWRlNjgwMGUyN2VjNTgyYmI4NmQyMzRkZmY2ZTJhMyIsInN1YiI6IjY1YmM4YmJkY2ZmZWVkMDE3Y2FmM2FmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTbF2_HV9qyKVUyQUHPNld7Xd_AI4RScp8sJZJG9fPQ',
  }
};

const URL = `https://api.themoviedb.org/3/search/movie?query=`;

export const useSearchStore = defineStore('search', () => {
  const searchedMovies = ref<IMovie[]>([]);
  const loader = ref(false);

  const getMovies = async (search: string) => {
    loader.value = true;
    const res = await fetch(URL + search, options);
    const data = await res.json();

    searchedMovies.value = data.results;
    loader.value = false;
  }

  const addToFavorites = (movie: IMovie) => {
    const movieStore = useMovieStore();

    const { favoriteMovies } = storeToRefs(movieStore);

    const isInFavorite = favoriteMovies.value.some((item) => {
      return item.id === movie.id;
    })

    if (!isInFavorite) {
      favoriteMovies.value.push({ ...movie, isWatched: false });
    }
  }

  return { searchedMovies, loader, getMovies, addToFavorites };
})
