<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { withBase } from 'vitepress';
</script>

<template>
  <DefaultTheme.Layout class="workshop-layout">
    <template #layout-top>
      <a class="workshop-skip-link" href="#VPContent">Skip to guide</a>
      <header class="workshop-hero">
        <div class="workshop-hero-inner">
          <p class="workshop-eyebrow">A hands-on customization workshop</p>
          <p class="workshop-title">
            <a :href="withBase('/')">Copilot customization workshop</a>
          </p>
          <p class="workshop-subtitle">Build a portable toolkit. Put it to work in your own copy.</p>
          <nav class="workshop-shortcuts" aria-label="Workshop shortcuts">
            <a :href="withBase('/start.html')">Set up your own copy</a>
            <a :href="withBase('/#progressive-route')">Explore the labs</a>
            <a :href="withBase('/clients.html')">Choose your client</a>
          </nav>
          <p class="workshop-hero-note">Author, load, use, inspect, and improve. One route across three clients.</p>
        </div>
      </header>
    </template>
    <template #sidebar-nav-before>
      <p class="workshop-eyebrow workshop-route-label">Your route</p>
    </template>
    <template #sidebar-nav-after>
      <p class="workshop-navigation-tip">
        Client tabs: Left / Right, Home / End. Your selection follows you between labs when browser storage is available.
      </p>
    </template>
    <template #doc-before>
      <noscript>
        <p class="workshop-notice">
          JavaScript is off. All client instructions are visible.
          <a :href="withBase('/#progressive-route')">Browse every lab</a> and select command text manually to copy.
        </p>
      </noscript>
    </template>
    <template #layout-bottom>
      <footer class="workshop-footer">
        Your work stays in your own copy.
        <a :href="withBase('/reference/publication.html')">Publication requires separate approval.</a>
      </footer>
    </template>
  </DefaultTheme.Layout>
</template>
