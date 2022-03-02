<template>
  <div class="home">
    <Flipball />
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    'Flipball': () => import('@/views/Flipball'),
  },

}
</script>
