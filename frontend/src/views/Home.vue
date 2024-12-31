<template>

<div>
    <ImageSlider />
  </div>

  <div class="main-content">
    <h2>Liste des films</h2>
    <div class="film-container">
      <div v-for="film in films" :key="film._id" class="film-item">
        <h3>{{ film.originalTitle }} ({{ film.startYear }})</h3>
        <router-link :to="{ name: 'FilmDetail', params: { id: film._id } }" class="film-card">
          <img :src="film.poster_url" :alt="film.originalTitle" class="poster" />
        </router-link>
      </div>
    </div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>



<script>
import ImageSlider from "@/components/ImageSlider.vue";

export default {
  data() {
    return {
      films: [],
      errorMessage: "",
      backgroundImages: [
        "https://alarencontreduseptiemeart.com/wp-content/uploads/2014/12/Citizen-Kane-3.jpg",
        "https://i.redd.it/the-shawshank-redemption-1994-v0-89w86dd84lpd1.jpg?width=1280&format=pjpg&auto=webp&s=8b1123e48aa750065503b7d5e91df3be66c92fb0",
        "https://media.vanityfair.fr/photos/60d34fef828a7f42e233bd09/16:9/w_1280,c_limit/vf_casablanca_slider_9411.jpeg",
        "https://www.ecranlarge.com/content/uploads/2020/04/le-parrain-photo-marlon-brando-1173783.jpg",
        "https://thepoly.org/assets/uploads/events/pulp_fiction.jpg",
        "https://www.slate.fr/uploads/store/story_105531/large_landscape_105531.jpg",
        "https://preview.redd.it/blade-runner-1982-is-incredible-v0-oxrysr9nll7d1.jpg?width=1280&format=pjpg&auto=webp&s=776c81943332f03b8cb757fedd8ad9b925bd019a",
        "https://focus.telerama.fr/2024/09/25/21/0/1486/990/1600/1067/60/0/64ae7e0_1727271695334-capture-da-ei-cran-2024-09-25-ai-15-41-29.png",
        "https://static.films-horreur.com/2015/06/kaaDA8tNOvTOuUxyQ5SVRDHNGfe.jpg",
        "https://www.radiofrance.fr/s3/cruiser-production/2020/01/d5233f35-83c7-4fd6-9ced-c9d16a0bfede/1200x680_smith.jpg",
        "https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2019/07/16/node_613915/40404351/public/2019/07/16/B9720279716Z.1_20190716103716_000%2BGMKE2U29I.1-0.jpg?itok=aThyEBmQ1563270185",
        "https://i.ytimg.com/vi/IvAoQAt1WBM/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-DoACuAiKAgwIABABGDEgZChyMA8=&rs=AOn4CLDacyJC5bIWxjgrT90Yxea-aGsj5w",
        "https://ekladata.com/1azW2R_uuiv_QguyKBB0WFdfIo8.png",
        "https://media.senscritique.com/media/000019422667/0/the_big_lebowski.jpg",
        "https://www.racinecafe.fr/wp-content/uploads/2024/11/MSDFOGU_EC011.jpg",
        "https://www.critikat.com/wp-content/uploads/fly-images/202548/382523.jpg-r_1920_1080-f_jpg-q_x-xxyxx-1450x800-c.jpg",
        "https://media.senscritique.com/media/000008256223/0/mad_max_fury_road.jpg",
        "https://assets.mubicdn.net/images/film/204/image-w1280.jpg?1607625735",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3ugX6nKTpjpuZZSj4fS4wgjhyNqB0aihQaSFAUyhzM3hIDRfkSAYHVBu5pgQbbSW-DAMZpGRXbHrG6YB3-NlI8G5YZdVFdvlURxPrVvcAxzTz6ZB9XXu_KOLPayFMjlXkzomj4ThfTuU/s1600/vlcsnap-2013-02-13-22h04m27s69.jpg",
        "https://laac-auvergnerhonealpes.org/wp-content/uploads/2017/03/OverlookHotelShining.png",
      ],
      currentImageIndex: 0,
    };
  },

  
  async created() {
    try {
      const response = await fetch("http://localhost:3000/api/films");
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      const data = await response.json();
      this.films = data;
    } catch (error) {
      this.errorMessage = "Erreur lors de la récupération des films : " + error.message;
    }
  },

  components: {
    ImageSlider,
  },
};
</script>

      



<style scoped>
/* Wrapper pour contenir les deux images */
.dynamic-background-wrapper {
  position: relative;
  height: 50vh; /* Occupe la moitié de la hauteur de la fenêtre */
  overflow: hidden;
}

/* Style de base pour les images de fond */
.dynamic-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* Transition fluide pour le mouvement */
  transition: transform 1s ease-in-out;
}

/* Style spécifique pour l'image suivante */
.dynamic-background.next {
  z-index: 1; /* Toujours au-dessus de l'image actuelle */
}

.main-content {
  background-color: black; /* Fond noir */
  color: white; /* Texte en blanc */
  padding: 20px;
  min-height: 50vh; /* Reste au moins aussi haut que la demi-page restante */
}

.film-container {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  gap: 20px;
}

.film-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px;
  max-width: 200px;
}

.poster {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

h2, h3, p {
  color: white;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  color: #d1d1d1;
}
</style>

      


