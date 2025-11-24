<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <span>AWS Services</span>
      </router-link>
      
      <div class="search-container">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            class="search-input"
            @input="handleSearch"
            @keydown.enter="handleEnter"
            @keydown.escape="closeResults"
          />
        </div>
        <div v-if="searchQuery && showResults" class="search-results">
          <div
            v-for="result in searchResults"
            :key="`${result.categoryId}-${result.service.name}`"
            class="search-result-item"
            @mousedown="navigateToService(result)"
          >
            <div class="result-name">{{ result.service.name }}</div>
            <div class="result-category">{{ result.categoryName }}</div>
          </div>
          <div v-if="searchResults.length === 0" class="no-results">
            Không tìm thấy dịch vụ nào
          </div>
        </div>
      </div>

      <ul class="nav-menu">
        <li 
          v-for="category in categories" 
          :key="category.id"
          class="nav-item"
        >
          <router-link 
            :to="`/category/${category.id}`"
            class="nav-link"
            :class="{ active: isActive(category.id) }"
          >
            {{ category.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import servicesData from '../data/services.json'

const route = useRoute()
const router = useRouter()
const categories = computed(() => servicesData.categories)

const searchQuery = ref('')
const showResults = ref(false)
const searchResults = ref([])

const isActive = (categoryId) => {
  return route.params.categoryId === categoryId
}

const handleSearch = () => {
  const query = searchQuery.value.trim()
  
  if (!query) {
    searchResults.value = []
    showResults.value = false
    return
  }

  showResults.value = true
  const queryLower = query.toLowerCase()
  const results = []

  categories.value.forEach(category => {
    category.services.forEach(service => {
      const serviceName = service.name.toLowerCase()
      const serviceType = service.type?.toLowerCase() || ''
      const servicePurpose = service.purpose?.toLowerCase() || ''
      
      if (
        serviceName.includes(queryLower) ||
        serviceType.includes(queryLower) ||
        servicePurpose.includes(queryLower)
      ) {
        results.push({
          service,
          categoryId: category.id,
          categoryName: category.name
        })
      }
    })
  })

  searchResults.value = results.slice(0, 10) // Giới hạn 10 kết quả
}

const handleEnter = () => {
  if (searchResults.value.length > 0) {
    navigateToService(searchResults.value[0])
  }
}

const navigateToService = (result) => {
  router.push(`/category/${result.categoryId}`)
  searchQuery.value = ''
  showResults.value = false
}

const closeResults = () => {
  searchQuery.value = ''
  showResults.value = false
  searchResults.value = []
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #232f3e 0%, #1a252f 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  height: auto;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.nav-logo {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff9900;
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
}

.nav-logo:hover {
  color: #ffaa22;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.2rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex: 1;
  min-width: 0;
}

.nav-item {
  position: relative;
  flex-shrink: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.7rem;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.active {
  background-color: rgba(255, 153, 0, 0.15);
  color: #ff9900;
}

.search-container {
  position: relative;
  flex: 0 0 auto;
  margin: 0 1rem;
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  min-width: 200px;
  transition: all 0.3s ease;
}

.search-box:focus-within {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px rgba(255, 153, 0, 0.3);
}

.search-icon {
  font-size: 1rem;
  margin-right: 0.5rem;
  color: #ffffff;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 0.85rem;
  width: 100%;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1001;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-result-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.search-result-item:hover {
  background-color: #f5f5f5;
}

.search-result-item:last-child {
  border-bottom: none;
}

.result-name {
  font-weight: 600;
  color: #232f3e;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.result-category {
  font-size: 0.75rem;
  color: #666;
}

.no-results {
  padding: 1rem;
  text-align: center;
  color: #999;
  font-size: 0.85rem;
}

@media (max-width: 1200px) {
  .nav-link {
    padding: 0.5rem 0.6rem;
    font-size: 0.75rem;
  }

  .nav-logo {
    font-size: 1.2rem;
  }

  .search-box {
    min-width: 150px;
  }
}

@media (max-width: 1024px) {
  .nav-container {
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.45rem 0.55rem;
    font-size: 0.7rem;
  }

  .nav-logo {
    font-size: 1.1rem;
  }

  .search-container {
    margin: 0 0.5rem;
  }

  .search-box {
    min-width: 120px;
    padding: 0.3rem 0.6rem;
  }

  .search-input {
    font-size: 0.75rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .search-container {
    width: 100%;
    margin: 0;
    order: 2;
  }

  .search-box {
    width: 100%;
    min-width: auto;
  }

  .nav-menu {
    flex-direction: column;
    width: 100%;
    gap: 0.25rem;
    margin-top: 0;
    order: 3;
  }

  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }

  .nav-logo {
    font-size: 1.2rem;
    width: 100%;
    justify-content: center;
    order: 1;
  }
}
</style>

