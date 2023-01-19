<template>
  <main :class="theme">
    <button @click="changeTheme">Змінити тему</button>

    <div class="container">
      <div class="item">
        <div class="item-add-city">
          <h3>ДОДАВАННЯ МІСТА</h3>
          <p>ВВЕДІТЬ НАЗВУ МІСТА:</p>
          <input type="text" v-model="city" />
          <button @click="addCity">Додати</button>
          <div class="msg" v-if="msg">{{ msg }}</div>
        </div>
        <div class="item-choose-city">
          <h3>ВИБІР МІСТА</h3>
          <p>ОБЕРІТЬ МІСТО:</p>
          <select name="" id="">
            <option v-for="c in cities">{{ c }}</option>
          </select>
          <button>
            <router-link v-bind:to="'/weatherinfo/' + localWeather.name"
              >Погода</router-link
            >
          </button>
        </div>
      </div>
      <div class="item">
        <div>
          <p>{{ sys.country }}</p>
          <i class=""></i>
          <i class="fas fa-temperature-low" style="font-size: 24px"></i>
          <p>{{ weather.id }}</p>
          <p>{{ weather.main }}</p>
          <p>{{ weather.description }}</p>
        </div>
        <div></div>
        <div></div>
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
      coord: {},
      weather: {},
      main: {},
      wind: {},
      sys: {},
      theme: "",
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
            this.localWeather = { ...response.data };
            this.weather = response.data.weather[0];
            this.coord = response.data.coord;
            this.main = response.data.main;
            this.wind = response.data.wind;
            this.clound = response.data.clound;
            this.sys = response.data.sys;
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
@import "../assets/app-style.css";
</style>
