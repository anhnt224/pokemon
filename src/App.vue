<template>
  <main-screen
    v-if="statusMatch == 'default'"
    @onStart="handleBeforeStart($event)"
  />
  <interaction-screen
    v-if="statusMatch == 'match'"
    :cardsContext="settings.cardsContext"
    @onFinish="finish"
  />
  <result-screen
    :time="time"
    v-if="statusMatch == 'finish'"
    @onStartAgain="onStartAgain"
  />
  <p class="copyright">
    This game owned by AnhNT -
    <a href="">view here</a>
  </p>
</template>

<script>
import MainScreen from "./components/MainScreen.vue";
import InteractionScreen from "./components/InteractionScreen.vue";
import { shuffled } from "./utils.js/array";
import ResultScreen from "./components/ResultScreen.vue";
export default {
  name: "App",
  components: {
    MainScreen,
    InteractionScreen,
    ResultScreen,
  },
  data() {
    return {
      statusMatch: "default",
      settings: {
        totalOfBlocks: 0,
        cardsContext: [],
        startedAt: null,
      },
      time: 0,
    };
  },
  methods: {
    handleBeforeStart(config) {
      console.log("run before start", config);
      this.settings.totalOfBlocks = config.totalOfBlocks;
      const firstCards = Array.from(
        { length: this.settings.totalOfBlocks / 2 },
        (_, i) => i + 1
      );
      const secondCards = [...firstCards];
      const cards = [...firstCards, ...secondCards];
      this.settings.cardsContext = shuffled(
        shuffled(shuffled(shuffled(cards)))
      );
      this.settings.startedAt = new Date().getTime();

      //data is ready
      this.statusMatch = "match";
    },
    finish() {
      // get time
      const endTime = new Date().getTime();
      const time = endTime - this.settings.startedAt;
      // push to result component
      this.time = time;
      this.statusMatch = "finish";
    },
    onStartAgain() {
      this.statusMatch = "default";
    },
  },
};
</script>

<style lang="css" scoped>
.copyright {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1.5rem;
  color: var(--light);
  z-index: 3;
  font-size: 1.5rem;
}

.copyright a {
  color: #f4dc26;
}
</style>
