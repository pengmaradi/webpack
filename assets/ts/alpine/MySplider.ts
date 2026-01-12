import Alpine from 'alpinejs'
import Splide from '@splidejs/splide'
import { splideControl } from '../template/slideControl'
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css'

const MySplider = () => {
    Alpine.data('imageSlider', () => ({
        init() {
            this.$el.insertAdjacentHTML('afterbegin', splideControl)
            this.$nextTick(() => {
            new Splide(this.$el, {
                type: 'loop',
                perPage: 1,
                gap: '1rem',
                pagination: true,
                interval: 5000,
                direction: 'ltr',
                autoplay: true,
                breakpoints: {
                1200: {
                    perPage: 1,
                    gap: '0.5rem',
                },
                640: {
                    perPage: 1,
                    arrows: false,
                },
                },
            }).mount();
            })
        },
    }))
}

export default MySplider