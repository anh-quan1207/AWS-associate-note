<template>
  <div class="service-category">
    <ServiceTable
      v-if="category"
      :services="category.services"
      :category-name="category.name"
      :category-description="category.description"
    />
    <div v-else class="not-found">
      <h2>Không tìm thấy danh mục</h2>
      <p>Danh mục bạn đang tìm không tồn tại.</p>
      <router-link to="/" class="back-link">← Quay về trang chủ</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ServiceTable from '../components/ServiceTable.vue'
import servicesData from '../data/services.json'

const route = useRoute()

const category = computed(() => {
  const categoryId = route.params.categoryId
  return servicesData.categories.find(cat => cat.id === categoryId)
})
</script>

<style scoped>
.service-category {
  min-height: calc(100vh - 200px);
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.not-found h2 {
  color: #232f3e;
  font-size: 2rem;
  margin: 0 0 1rem 0;
}

.not-found p {
  color: #666;
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
}

.back-link {
  display: inline-block;
  color: #ff9900;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #ffaa22;
}
</style>

