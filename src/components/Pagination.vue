<template>
  <div class="pagination">
    <font-awesome-icon :icon="['fas', 'angles-left']"
                       class="hover-icon icon-arrow"
                       :disabled="currentPage === 1"
                       @click="changePage(1)" />

    <font-awesome-icon :icon="['fas', 'angle-left']"
                       class="hover-icon icon-arrow"
                       :disabled="currentPage === 1"
                       @click="changePage(currentPage - 1)" />

    <template v-for="page in displayedPages" :key="page">
      <button
          class="pagination-button"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
      >
        {{ page }}
      </button>
    </template>

    <font-awesome-icon :icon="['fas', 'angle-right']"
                       class="hover-icon icon-arrow"
                       :disabled="currentPage === totalPages"
                       @click="changePage(currentPage + 1)"/>

    <font-awesome-icon :icon="['fas', 'angles-right']"
                       class="hover-icon icon-arrow"
                       :disabled="currentPage === totalPages"
                       @click="changePage(totalPages)"/>
  </div>
</template>

<script>
export default {
  name: 'PaginationSelector',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    show: {
      type: Number,
      default: 5
    }
  },
  computed: {
    displayedPages() {
      const pages = []
      if(this.totalPages <= this.show){
        for(let i = 1; i <= this.totalPages; i++){
          pages.push(i)
        }
      }else {
        let start = Math.min(Math.max(1, this.currentPage - Math.floor(this.show / 2)), this.totalPages - this.show + 1)
        for(let i = start; i < start + this.show;i++){
          pages.push(i)
        }
      }
      return pages
    }
  },
  methods: {
    changePage(page) {
      console.log(page)
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit('page-changed', page)
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.icon-arrow {
  color: var(--secondary-color);
}
.icon-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button {
  width: 2.5em;
  height: 2.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-weight: 600;
  background-color: var(--white);
}

.pagination-button:hover:not(:disabled):not(.active) {
  background-color: var(--grey1);
}

.pagination-button.active {
  background-color: color-mix(in srgb, var(--quaternary-color) 80%, transparent);
  color: var(--secondary-color);
}
</style>