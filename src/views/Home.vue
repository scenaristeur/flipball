<template>
  <div class="home">
    <TableSelector />
    <Flipball id="content" />
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    'Flipball': () => import('@/views/Flipball'),
    'TableSelector': () => import('@/views/TableSelector')
  },

}
</script>
