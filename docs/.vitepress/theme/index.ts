import DefaultTheme from 'vitepress/theme';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import { enhanceTabs } from './tabs.mjs';
import WorkshopLayout from './WorkshopLayout.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: WorkshopLayout,
  setup() {
    const route = useRoute();
    const enhance = async () => {
      await nextTick();
      enhanceTabs(document, window);
    };
    onMounted(enhance);
    watch(() => route.path, enhance);
  },
};
