import Alpine from 'alpinejs'

const SearchBox = () => {
    Alpine.data('search_box', () => ({
        showModal: false,
        init() {
            this.registerKeydownEvent();
        },
        registerKeydownEvent() {
      document.addEventListener('keydown', this.handleKeydown.bind(this));
    },
    handleKeydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        this.openSearchBox();
      }
    },
    openSearchBox() {
      this.showModal = true;
      this.$nextTick(() => {
        this.$refs.search.focus();
      });
    },

    }))
}

export default SearchBox