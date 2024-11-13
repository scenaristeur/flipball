<template>
  <div>
    <label>rotation speed</label>
    <input type="range" min="0.1" max="0.5" step="0.1" v-model="speed" @change="setrotationSpeed()" />
  </div>
</template>

<script>
export default {
  name: "ConfigView",
  data() {
    return {
      speed: 0.3,
    };
  },

  methods: {
    setrotationSpeed() {
      console.log(this.speed);
      this.$store.commit("setRotationSpeed", this.speed);
      const event = new CustomEvent('configChanged', { detail: { rotationSpeed: this.rotationSpeed }});
      window.dispatchEvent(event);
    },
  },
  watch: {
    rotationSpeed() {
      this.speed = this.rotationSpeed;
    },
  },
  computed: {
    rotationSpeed() {
      return this.$store.state.rotationSpeed;
    },
  },
};
</script>

<style scoped></style>
