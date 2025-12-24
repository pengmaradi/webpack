import Alpine from 'alpinejs';


const MultiDirectional = () => {

    Alpine.data('multi_directional', () => ({
      direction: 'ltr',
      init() {
        if (localStorage.getItem('direction') === 'rtl') {
          this.direction = 'rtl';
          document.documentElement.dir = this.direction;
        }
    },
    ltrDirection() {
        this.direction = 'ltr';
        document.documentElement.dir = this.direction;
        localStorage.setItem('direction', this.direction);
    },
    rtlDirection() {
        this.direction = 'rtl';
        document.documentElement.dir = this.direction;
        localStorage.setItem('direction', this.direction);
    },
    changeDirection() {
        this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.dir = this.direction;
        localStorage.setItem('direction', this.direction);
      }
    }));
}

export default MultiDirectional;