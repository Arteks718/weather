<template>
  <main :class="theme">
    <router-link v-bind:to="'/'"><button>Back</button></router-link>
    <div class="container" v-if="this.city?.name">
      <div class="item">
        <div class="table-local-weather">
          <div class="table-item">
            <p>{{ city.name }}</p>
            <p><i class="fas fa-cloud-rain"></i></p>
            <p><i class="fas fa-temperature-low"></i></p>
            <p><i class="fas fa-cloud-sun"></i></p>
            <p><i class="fas fa-smog"></i></p>
            <p><i class="fas fa-cloud-moon"></i></p>
          </div>
          <div class="table-item">
            <p>{{ city.sys.country }}</p>
            <p>вологість</p>
            <p>температура</p>
            <p>погода</p>
            <p>тиск</p>
            <p>опис</p>
          </div>
          <div class="table-item">
            <p>[{{ city.coord.lon }};{{ city.coord.lat }}]</p>
            <p>{{ city.main.humidity }}</p>
            <p>{{ city.main.temp }}</p>
            <p>{{ city.weather[0].main }}</p>
            <p>{{ city.main.pressure }} hpa</p>
            <p>{{ city.weather[0].description }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  props: {
    id: "",
  },
  data() {
    return {
      city: {},
      theme: "",
      API_KEY: "7914d5a440960cfd5df3bd0388a7ad0f",
    };
  },
  mounted() {
    this.theme = localStorage.getItem("theme");
    this.axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.id}&appid=${this.API_KEY}&lang=ua&units=metric`
      )
      .then((response) => {
        this.city = { ...response.data };
      });
  },
};
</script>
<style>
@import "../assets/weather-style.css";
</style>
