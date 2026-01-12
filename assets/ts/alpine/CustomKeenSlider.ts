import Alpine from 'alpinejs'
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'

const CustomKeenSlider = () => {
    Alpine.data('keenSlider', () => ({
        init() {
            let slider = new KeenSlider(this.$el, {
                loop: true,
                defaultAnimation: {
                    duration: 1000,
                },

                // breakpoints: {
                //     '(min-width: 500px)': {
                //         loop: false,
                //     },
                // },
                created: () => {
                    console.log('created slider');
                }
            })
        }
    }))
}

export default CustomKeenSlider