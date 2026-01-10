<template>
  <v-footer
    height="auto"
    class="footer"
  >
    <v-container class="py-3">
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <div class="footer-brand">
            <span class="footer-mark">▶</span>
            <span class="footer-name">Day One Bros</span>
          </div>
          <p class="footer-tagline text-caption">
            Fresh top‑ten video picks, updated daily.
          </p>
        </v-col>
        <v-col cols="12" md="6" class="text-center text-md-right">
          <v-btn
            v-for="link in links"
            :key="link.name"
            :to="link.path"
            class="footer-link"
            variant="text"
            size="small"
          >
            {{ link.name }}
          </v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-2" />
      <div class="footer-meta text-caption text-center">
        &copy;2019 — <strong>Day One Bros</strong>. All rights reserved.
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
type FooterLink = {
  name: string
  path: string
}

const links: FooterLink[] = [
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
]
</script>

<style scoped lang="scss">
.footer{
  background: rgb(var(--v-theme-surface));
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}
.footer-brand{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.footer-mark{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 8px;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  font-size: 10px;
}
.footer-name{
  font-size: 15px;
}
.footer-tagline{
  margin: 4px 0 0;
  opacity: 0.75;
}
.footer-link{
  margin: 0 4px;
  font-weight: 600;
  letter-spacing: 0.2px;
  min-width: 0;
}
.footer-meta{
  opacity: 0.7;
}
</style>
