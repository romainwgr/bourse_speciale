<template>
  <div>
    <button class="theme-button" @click="toggleTheme">
      <span>{{ userTheme === 'dark-theme' ? '🌙' : '☀️' }}</span>
    </button>
  </div>
</template>

<script>
export default {
  mounted() {
    const initUserTheme = this.getTheme() || this.getMediaPreference();
    this.setTheme(initUserTheme);
  },

  data() {
    return {
      userTheme: "light-theme",
    };
  },

  methods: {
    toggleTheme() {
      const newTheme = this.userTheme === "light-theme" ? "dark-theme" : "light-theme";
      this.setTheme(newTheme);
    },

    getTheme() {
      return localStorage.getItem("user-theme");
    },

    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return hasDarkPreference ? "dark-theme" : "light-theme";
    },
  },
};
</script>

<style scoped>
/* Style du bouton */
.theme-button {
  background-color: var(--ui-bg, #ccc); /* Couleur de fond dynamique */
  color: var(--text-high-contrast, #000); /* Couleur du texte dynamique */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.theme-button:hover {
  background-color: var(--ui-bg-hover, #bbb);
  color: var(--text-low-contrast, #fff);
}
</style>
