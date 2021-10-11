<template>
  <div class="cascading-dropdown">
    
    <div class="dropdown">
      <h2>Build a reusable dropdown vue component</h2>
      <span>Country:</span>
      <select v-model="selectedCountry" @change="onChangeCountry">
        <option value="">Select a Country</option>
        <option
          v-for="(country, index) in listCountry"
          :value="country.country_name"
          :key="index"
        >
          {{ country.country_name }}
        </option>
      </select>
    </div>
    <div class="dropdown">
      <span>State:</span>
      <select
        :disabled="listState.length == 0"
        v-model="selectedState"
        @change="onChangeState"
      >
        <option value="">Select a State</option>
        <option
          v-for="(state, index) in listState"
          :key="index"
          :value="state.state_name"
        >
          {{ state.state_name }}
        </option>
      </select>
    </div>
    <div class="dropdown">
      <span>City:</span>
      <select multiple="true" :disabled="listCities.length == 0" v-model="selectedCity">
        <option value="">Select a City</option>
        <option
          v-for="(city, index) in listCities"
          :key="index"
          :value="city.city_name"
        >
          {{ city.city_name }}
        </option>
      </select>
    </div>

    <p v-if="selectedCountry">Selected Country - {{ this.selectedCountry }}</p>
    <p v-if="selectedState">Selected State - {{ this.selectedState }}</p>
    <p v-if="selectedCity[0]">Selected City - {{ this.selectedCity }}<br>
    Number of selected cities is - {{this.selectedCity.length}}</p>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "App",
  data() {
    return {
      listCountry: [],
      listState: [],
      listCities: [],
      selectedCountry: "",
      selectedState: "",
      selectedCity: [],
      authToken: "",
     
    };
  },
  created() {
    this.generateAccessToken();
  },
  methods: {
    generateAccessToken() {
      axios
        .get("https://www.universal-tutorial.com/api/getaccesstoken", {
          headers: {
            Accept: "application/json",
            "api-token":
              "fg0h_Zera8BKRwtaZlN9790B2KQdPOeyh2JlbMCIw0OYOqupB4x2JxRDkJBMAMnceEk",
            "user-email": "prashant.otpl@gmail.com",
          },
        })
        .then((res) => {
          this.authToken = res.data.auth_token;
          this.loadCountry();
        });
    },
    loadCountry() {
      this.isLoading = true;
      axios
        .get("https://www.universal-tutorial.com/api/countries", {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.listCountry = res.data;
          this.isLoading = false;
        });
    },
    onChangeCountry() {
      this.isLoading = true;
      axios
        .get(
          `https://www.universal-tutorial.com/api/states/${this.selectedCountry}`,
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          this.listState = res.data;
          this.isLoading = false;
        });
    },
    onChangeState() {
      this.isLoading = true;
      axios
        .get(
          `https://www.universal-tutorial.com/api/cities/${this.selectedState}`,
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          this.listCities = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>
<style scoped>
select {
  width: 250px;
  padding:5px;
  margin:5px;
}
span{
  padding:5px;
  margin:5px;
  display:grid;
}

</style>
