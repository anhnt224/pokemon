<template>
  <p class="copy-right">
    This game owned by AnhNT in vue3 course
    <a href="#">view here</a>
  </p>
</template>

<script>
export default {
  methods: {
    click() {
      console.log("click");
    },
  },
};
</script>

<style scoped>
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
