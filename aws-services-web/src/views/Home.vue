<template>
  <div class="home">
    <div class="hero-section">
      <h1>AWS Services Reference</h1>
    </div>
  </div>
</template>

<script setup>
// Home page chỉ hiển thị title
</script>

<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section h1 {
  font-size: 3.5rem;
  color: #232f3e;
  margin: 0;
  font-weight: 700;
}

@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem 0;
    min-height: 50vh;
  }

  .hero-section h1 {
    font-size: 2rem;
  }
}
</style>

