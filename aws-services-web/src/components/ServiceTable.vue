<template>
  <div class="service-table-container">
    <div class="table-header">
      <h2>{{ categoryName }}</h2>
      <p class="category-description">{{ categoryDescription }}</p>
      <div class="table-controls">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm dịch vụ..."
          class="search-input"
        />
      </div>
    </div>
    
    <div class="table-wrapper">
      <table class="service-table">
        <thead>
          <tr>
            <th @click="sortBy('name')" class="sortable">
              Tên dịch vụ
              <span class="sort-icon">{{ getSortIcon('name') }}</span>
            </th>
            <th @click="sortBy('type')" class="sortable">
              Loại
              <span class="sort-icon">{{ getSortIcon('type') }}</span>
            </th>
            <th>Mục đích sử dụng</th>
            <th>Use Case</th>
            <th>Đặc điểm nổi bật</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in filteredAndSortedServices" :key="service.name">
            <td class="service-name">
              <strong>{{ service.name }}</strong>
            </td>
            <td>
              <span class="type-badge" :class="getTypeClass(service.type)">
                {{ service.type }}
              </span>
            </td>
            <td>{{ service.purpose }}</td>
            <td>{{ service.useCase }}</td>
            <td class="features">{{ service.features }}</td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="filteredAndSortedServices.length === 0" class="no-results">
        <p>Không tìm thấy dịch vụ nào phù hợp với từ khóa "{{ searchQuery }}"</p>
      </div>
    </div>
    
    <div class="table-footer">
      <p class="service-count">
        Hiển thị {{ filteredAndSortedServices.length }} / {{ services.length }} dịch vụ
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  services: {
    type: Array,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  categoryDescription: {
    type: String,
    default: ''
  }
})

const searchQuery = ref('')
const sortField = ref('name')
const sortDirection = ref('asc')

const filteredAndSortedServices = computed(() => {
  let filtered = props.services

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(service => 
      service.name.toLowerCase().includes(query) ||
      service.type.toLowerCase().includes(query) ||
      service.purpose.toLowerCase().includes(query) ||
      service.useCase.toLowerCase().includes(query) ||
      service.features.toLowerCase().includes(query)
    )
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    const aValue = a[sortField.value]?.toLowerCase() || ''
    const bValue = b[sortField.value]?.toLowerCase() || ''
    
    if (sortDirection.value === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  return filtered
})

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (field) => {
  if (sortField.value !== field) return '⇅'
  return sortDirection.value === 'asc' ? '↑' : '↓'
}

const getTypeClass = (type) => {
  const typeMap = {
    'IaaS': 'type-iaas',
    'PaaS': 'type-paas',
    'SaaS': 'type-saas',
    'Serverless': 'type-serverless',
    'Object Storage': 'type-storage',
    'Block Storage': 'type-storage',
    'File Storage': 'type-storage',
    'Archive Storage': 'type-storage',
    'DNS': 'type-networking',
    'Container Orchestration': 'type-container',
    'Serverless Container': 'type-container',
    'Relational Database': 'type-database',
    'NoSQL Database': 'type-database',
    'Document Database': 'type-database',
    'Graph Database': 'type-database',
    'Wide-Column Database': 'type-database',
    'Ledger Database': 'type-database',
    'Data Warehouse': 'type-database',
    'In-Memory Cache': 'type-database',
    'Big Data Processing': 'type-database',
    'Business Intelligence': 'type-database',
    'ETL Service': 'type-database',
    'Query Service': 'type-database',
    'Data Lake Management': 'type-database',
    'Batch Processing': 'type-batch',
    'Encryption': 'type-security',
    'Framework': 'type-framework'
  }
  return typeMap[type] || 'type-default'
}
</script>

<style scoped>
.service-table-container {
  width: 100%;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.table-header {
  margin-bottom: 2rem;
}

.table-header h2 {
  color: #232f3e;
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
}

.category-description {
  color: #666;
  font-size: 1rem;
  margin: 0 0 1.5rem 0;
}

.table-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #ff9900;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
}

.service-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.service-table thead {
  background: linear-gradient(135deg, #232f3e 0%, #1a252f 100%);
  color: white;
}

.service-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.service-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}

.service-table th.sortable:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sort-icon {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
}

.service-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.service-table tbody tr:hover {
  background-color: #f9f9f9;
}

.service-table tbody tr:last-child {
  border-bottom: none;
}

.service-table td {
  padding: 1rem;
  color: #333;
  font-size: 0.95rem;
  vertical-align: top;
}

.service-name {
  font-weight: 600;
  color: #232f3e;
}

.type-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
}

.type-iaas {
  background-color: #e3f2fd;
  color: #1976d2;
}

.type-paas {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.type-saas {
  background-color: #e8f5e9;
  color: #388e3c;
}

.type-serverless {
  background-color: #fff3e0;
  color: #f57c00;
}

.type-storage {
  background-color: #e0f2f1;
  color: #00796b;
}

.type-networking {
  background-color: #e1bee7;
  color: #8e24aa;
}

.type-container {
  background-color: #c5e1a5;
  color: #558b2f;
}

.type-database {
  background-color: #b3e5fc;
  color: #0277bd;
}

.type-batch {
  background-color: #ffe0b2;
  color: #e65100;
}

.type-security {
  background-color: #ffcdd2;
  color: #c62828;
}

.type-framework {
  background-color: #d1c4e9;
  color: #512da8;
}

.type-default {
  background-color: #f5f5f5;
  color: #616161;
}

.features {
  color: #666;
  line-height: 1.6;
}

.no-results {
  padding: 3rem;
  text-align: center;
  color: #999;
}

.table-footer {
  margin-top: 1.5rem;
  text-align: right;
}

.service-count {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .service-table-container {
    padding: 1rem;
  }

  .table-header h2 {
    font-size: 1.5rem;
  }

  .service-table {
    font-size: 0.85rem;
  }

  .service-table th,
  .service-table td {
    padding: 0.75rem 0.5rem;
  }

  .service-table th {
    font-size: 0.8rem;
  }

  .features {
    max-width: 200px;
    word-wrap: break-word;
  }
}
</style>

