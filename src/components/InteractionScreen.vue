<template>
  <div class="screen">
    <div
      class="screen__inner"
      :style="{
        width: `${
          ((((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 +
            16) *
          Math.sqrt(cardsContext.length)
        }px`,
      }"
    >
      <card-flip
        v-for="(card, index) in cardsContext"
        :key="index"
        :imgBackUrl="`images/${card}.png`"
        :card="{ index: index, value: card }"
        :cardsContext="cardsContext"
        ref="cardsContext"
        @onFlip="checkRule($event)"
      ></card-flip>
    </div>
  </div>
</template>

<script>
import CardFlip from "./CardFlip.vue";
export default {
  props: {
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  emits: ["onFinish"],
  components: {
    CardFlip,
  },
  data() {
    return {
      rules: [],
      cardCorrect: 0,
    };
  },
  methods: {
    checkRule(card) {
      if (this.rules.length == 2) return false;
      this.rules.push(card);
      if (
        this.rules.length == 2 &&
        this.rules[0].value == this.rules[1].value
      ) {
        //disable card
        const index0 = this.rules[0].index;
        const index1 = this.rules[1].index;
        this.$refs.cardsContext[index0].onDisableCard();
        this.$refs.cardsContext[index1].onDisableCard();

        // reset rules to []
        this.rules = [];
        this.cardCorrect += 2;
        console.log(this.cardCorrect);
        if (this.cardCorrect == this.cardsContext.length) {
          console.log("DONE");
          this.$emit("onFinish");
        }
      } else if (
        this.rules.length == 2 &&
        this.rules[0].value != this.rules[1].value
      ) {
        //close card
        const index0 = this.rules[0].index;
        const index1 = this.rules[1].index;
        setTimeout(() => {
          this.$refs.cardsContext[index0].onFlipBackCard();
          this.$refs.cardsContext[index1].onFlipBackCard();
        }, 800);

        // reset rules to []
        this.rules = [];
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  /* background-color: var(--dark); */
  color: var(--light);
}

.screen__inner {
  width: calc(100%);
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
}
</style>
