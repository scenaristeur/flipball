<template>
  <div class="home">
    <TableSelector />
    <ConfigView />
    <Flipball id="content" />
  </div>
</template>

<script>
// import ConfigView from './ConfigView.vue';

// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    'Flipball': () => import('@/views/Flipball'),
    'TableSelector': () => import('@/views/TableSelector'),
    'ConfigView': () => import('@/views/ConfigView')

    
  },

}
</script>
