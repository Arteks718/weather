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
        <table >
          <tr >
            <td>{{ localWeather.name }}</td>
            <td>{{ localT.name }}</td>
            <td v-if="testD">{{ localT.weather[0].main }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
const LOCAL_DATA_WEATHER = {
  coord: {
    lon: "",
    lat: "",
  },
  weather: {
    id: "",
    main: "",
    description: "",
    icon: "",
  },
  base: "",
  main: {
    temp: "",
    feels_like: "",
    temp_min: "",
    temp_max: "",
    pressure: "",
    humidity: "",
  },
  wind: {
    speed: "",
    deg: "",
    gust: "",
  },
  dt: "",
  sys: {
    country: "",
    sunrise: "",
    sunset: "",
  },
  name: "",
};

export default {
  props: {
    id: "",
  },
  data() {
    return {
      API_KEY: "7914d5a440960cfd5df3bd0388a7ad0f",
      localWeather: { ...LOCAL_DATA_WEATHER },
      localT: {},
      theme: "",
      testD: true,
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
            this.localT = { ...response.data };
            console.log(this.localWeather.coord);
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
