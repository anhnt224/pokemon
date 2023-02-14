<template>
  <div
    class="card"
    :style="{
      height: `${(920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16}px`,
      width: `${
        (((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4
      }px`,
      perspective: `${
        ((((920 - 16 * 4) / Math.sqrt(card.length) - 16) * 3) / 4) * 2
      }px`,
    }"
  >
    <div
      class="card__inner"
      :class="{ 'is-flipped': isFlipped }"
      @click="onToggleFlipCard"
    >
      <div class="card__face card__face--front">
        <div
          class="card_content"
          :style="{
            'background-size': `${
              (((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) /
              4 /
              3
            }px ${
              (((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) /
              4 /
              3
            }px`,
          }"
        ></div>
      </div>
      <div class="card__face card__face--back">
        <div
          class="card_content"
          :style="{
            backgroundImage: `url('${'src/assets/' + imgBackUrl}')`,
          }"
        >
          Back
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgBackUrl: {
      type: String,
      required: true,
    },
    card: {
      type: [String, Number, Array, Object],
      required: true,
    },
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  emits: ["onFlip"],
  methods: {
    onToggleFlipCard() {
      if (this.isDisabled) {
        return;
      }
      this.isFlipped = !this.isFlipped;
      if (this.isFlipped == true) {
        this.$emit("onFlip", this.card);
      }
    },
    onFlipBackCard() {
      if (this.isDisabled) {
        return false;
      }
      this.isFlipped = false;
    },
    onDisableCard() {
      this.isDisabled = true;
    },
  },
  data() {
    return {
      isFlipped: false,
      isDisabled: false,
    };
  },
};
</script>

<style scoped>
.card {
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.card__inner {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card__inner.is-flipped {
  transform: rotateY(-180deg);
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0px 3px 10px 4px rgba(0, 0, 0, 0.2);
}

.card__face--back {
  background-color: var(--light);
  transform: rotateY(-180deg);
}

.card__face--front .card_content {
  background: url("../assets/images/icon_back.png") no-repeat center center;
  background-size: 40px 40px;
  height: 100%;
  width: 100%;
}

.card__face--back .card_content {
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
</style>
