<template>
  <main :class="theme" v-if="this.localWeather?.name">
    <button @click="changeTheme">Змінити тему</button>

    <div class="container">
      <div class="item">
        <div class="item-add-city">
          <h3>ДОДАВАННЯ МІСТА</h3>
          <label>ВВЕДІТЬ НАЗВУ МІСТА:</label>
          <input type="text" v-model="city" />
          <button @click="addCity">Додати</button>
          <div class="msg" v-if="msg">{{ msg }}</div>
        </div>
        <div class="item-choose-city">
          <h3>ВИБІР МІСТА</h3>
          <label>ОБЕРІТЬ МІСТО:</label>
          <select v-model="selectCity">
            <option v-for="city in cities" v-bind:key="city">
              {{ city }}
            </option>
          </select>
          <router-link v-bind:to="'/weatherinfo/' + selectCity"
            ><button>Погода</button></router-link
          >
        </div>
      </div>
      <div class="item">
        <div class="table-local-weather">
          <div class="table-item">
            <p>{{ localWeather.name }}</p>
            <p><i class="fas fa-cloud-rain"></i></p>
            <p><i class="fas fa-temperature-low"></i></p>
            <p><i class="fas fa-cloud-sun"></i></p>
            <p><i class="fas fa-smog"></i></p>
            <p><i class="fas fa-cloud-moon"></i></p>
          </div>
          <div class="table-item">
            <p>{{ localWeather.sys.country }}</p>
            <p>вологість</p>
            <p>температура</p>
            <p>погода</p>
            <p>тиск</p>
            <p>опис</p>
          </div>
          <div class="table-item">
            <p>[{{ localWeather.coord.lon }};{{ localWeather.coord.lat }}]</p>
            <p>{{ localWeather.main.humidity }}</p>
            <p>{{ localWeather.main.temp }}</p>
            <p>{{ localWeather.weather[0].main }}</p>
            <p>{{ localWeather.main.pressure }} hpa</p>
            <p>{{ localWeather.weather[0].description }}</p>
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
      API_KEY: "7914d5a440960cfd5df3bd0388a7ad0f",
      localWeather: {},
      theme: "",
      selectCity: "",
      city: "",
      cities: [],
      msg: "",
    };
  },
  mounted() {
    this.theme = localStorage.getItem("theme");
    this.cities = JSON.parse(localStorage.getItem("cities"));
    if (!this.theme) this.theme = "white";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${this.API_KEY}&lang=ua&units=metric`
          )
          .then((response) => {
            this.localWeather = response.data;
            console.log(this.localWeather);
          });
      });
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  },
  methods: {
    changeTheme() {
      if (this.theme == "white") {
        this.theme = "black";
        localStorage.setItem("theme", this.theme);
      } else {
        this.theme = "white";
        localStorage.setItem("theme", this.theme);
      }
    },
    addCity() {
      this.axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.API_KEY}`
        )
        .then((response) => {
          this.cities = this.cities || [];
          this.cities.push(this.city);
          localStorage.setItem("cities", JSON.stringify(this.cities));
          this.city = "";
          console.log(response.data);
        })
        .catch((er) => {
          this.msg = "Такого міста не існує";
          this.city = "";
          setTimeout(() => {
            this.msg = "";
          }, 5000);
        });
    },
    changeWeather() {},
  },
};
</script>

<style scoped>
@import "../assets/weather-style.css";
</style>
