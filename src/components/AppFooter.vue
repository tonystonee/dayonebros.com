<template>
  <v-footer
    height="auto"
    color="grey"
  >
    <v-row justify="center">
      <v-btn
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        color="white"
        class="text-caption"
        variant="text"
        size="small"
      >
        {{ link.name }}
      </v-btn>
      <v-col
        cols="12"
        class="bg-grey-lighten-2 py-1 text-center text-black"
      >
        &copy;2019 — <strong>Day One Bros</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        {
          name: 'Home',
          path: '/',
        },
        {
          name: 'Terms',
          path: '/terms',
        },
        {
          name: 'Copyright',
          path: '/copyright',
        },
        {
          name: 'Privacy',
          path: '/privacy',
        }
      ],
    })
  }
</script>
