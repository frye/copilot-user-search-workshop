import DefaultTheme from 'vitepress/theme';
import { onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import { enhanceTabs } from './tabs.mjs';
import WorkshopLayout from './WorkshopLayout.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: WorkshopLayout,
  setup() {
    const route = useRoute();
    let mounted = false;
    let cleanup: (() => void) | undefined;
    const enhance = async () => {
      await nextTick();
      if (!mounted) return;
      cleanup?.();
      cleanup = enhanceTabs(document, window);
    };
    onMounted(() => {
      mounted = true;
      void enhance();
    });
    onBeforeUnmount(() => {
      mounted = false;
      cleanup?.();
    });
    watch(() => route.path, enhance);
  },
};
