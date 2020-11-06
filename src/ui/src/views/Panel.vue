<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Control Panel</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2>Brands</h2>
        <v-row>
          <template v-for="(group, index) in availableBrandsGrouped">
            <v-col :key="index" cols="12" sm="4" md="4">
              <v-checkbox
                v-for="brand in group"
                v-model="brands"
                :label="brand"
                :value="brand"
                hide-details
                :key="brand"
              ></v-checkbox>
            </v-col>
          </template>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2>Models</h2>
        <div
          class="brand-group ma-4 pl-8 pr-8 pb-8"
          v-for="group in availableModelsGrouped"
          :key="group.brand"
        >
          <v-row class="text-center">
            <v-col class="mb-4">
              <h3>{{ group.brand }}</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="model in group.models"
              :key="model"
              cols="12"
              sm="4"
              md="4"
            >
              <v-checkbox
                v-model="models"
                :label="model"
                :value="model"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2>Series</h2>

        <v-row class="text-center">
          <v-col
            v-for="serie in supportedSeries"
            :key="serie"
            cols="12"
            sm="4"
            md="4"
          >
            <v-checkbox
              v-model="series"
              :label="serie"
              :value="serie"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn depressed color="primary" @click="saveConfig">
          Save Config
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
const BRANDS_PER_COL = 3;
const MODELS_PER_COL = 2;
const SUPPORTED_LIST = {
  asus: ['dual', 'dual oc', 'rog strix', 'rog strix oc', 'tuf', 'tuf oc'],
  evga: ['ftw3', 'ftw3 ultra', 'xc3', 'xc3 black', 'xc3 ultra'],
  gainward: ['phantom gs', 'phoenix', 'phoenix gs', 'phoenix gs oc'],
  gigabyte: [
    'aorus master',
    'aorus xtreme',
    'eagle',
    'eagle oc',
    'gaming',
    'gaming oc',
    'turbo',
    'vision',
    'vision oc',
  ],
  inno3d: ['gaming x3', 'ichill x3', 'ichill x4', 'twin x2 oc'],
  kfa2: ['sg oc'],
  msi: ['gaming x trio', 'ventus 2x oc', 'ventus 3x', 'ventus 3x oc'],
  nvidia: ['founders edition'],
  palit: ['gamerock oc', 'gaming pro', 'gaming pro oc'],
  pny: ['dual fan', 'xlr8', 'xlr8 rgb'],
  zotac: [
    'amp holo',
    'amp extreme holo',
    'trinity',
    'trinity oc',
    'twin edge',
    'twin edge oc',
  ],
};
const SUPPORTED_SERIES = ['3070', '3080', '3090'];

export default {
  data: () => {
    return {
      config: {},
      brands: [],
      series: [],
      models: [],
    };
  },
  methods: {
    async saveConfig() {
      let config = this.$store.state.config;
      config.brands = this.brands;
      config.models = this.models;
      config.series = this.series;

      await fetch('/api/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
    },
  },
  computed: {
    ...mapState(['stores']),
    availableBrandsGrouped() {
      let availableBrands = Object.keys(SUPPORTED_LIST);
      let result = [];
      let groupNumber = Math.ceil(availableBrands.length / BRANDS_PER_COL);
      for (let i = 0; i < groupNumber; i++) {
        result.push(
          availableBrands.slice(i * BRANDS_PER_COL, (i + 1) * BRANDS_PER_COL)
        );
      }
      return result;
    },
    availableModelsGrouped() {
      let result = [];
      this.brands.forEach((brand) => {
        if (SUPPORTED_LIST[brand]) {
          result.push({
            brand: brand,
            models: SUPPORTED_LIST[brand],
          });
        }
      });
      return result;
    },
    supportedSeries() {
      return SUPPORTED_SERIES;
    },
  },
  mounted() {
    this.brands = this.$store.state.brands;
    this.models = this.$store.state.models;
    this.series = this.$store.state.series;
    // const configResp = await fetch('/api/config');
    // const config = await configResp.json();
    // this.data.config = config;
    // await fetch('/api/config', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(config),
    // });
    // console.log(config);
  },
};
</script>

<style lang="scss" scoped>
.brand-group {
  border-radius: 5px;
  &:nth-of-type(odd) {
    background-color: #fff;
  }
  &:nth-of-type(even) {
    background-color: #fafcff;
  }
}
</style>