import Alpine from 'alpinejs'
import GLightbox from 'glightbox'
import { glightboxControl } from '../template/slideControl'

const Lightbox = () => {
    Alpine.data('glightbox', () => ({
        lightbox: null,
        
        gallery: [
            {
                type:'image',
                video: '',
                img: 'https://mdbcdn.b-cdn.net/img/new/slides/086.webp',
                alt: 'the first image',
                tite: 'hallo welt',
                description: 'this is about glightbox',
            },
            {
                type:'video',
                video: 'https://www.youtube.com/watch?v=Ga6RYejo6Hk',
                img: 'https://mdbcdn.b-cdn.net/img/new/slides/006.webp',
                alt: 'the second test',
                tite: 'hallo welt again',
                description: 'this is about glightbox',
            },
            {
                type:'image',
                video: '',
                img: 'https://mdbcdn.b-cdn.net/img/new/slides/087.webp',
                alt: 'the first image',
                tite: 'hallo nina',
                description: 'this is about glightbox',
            },
            {
                type:'image',
                video: '',
                img: 'https://mdbcdn.b-cdn.net/img/new/slides/088.webp',
                alt: 'the first image',
                tite: 'hallo youtube',
                description: 'this is about glightbox',
            },
            {
                type:'video',
                video: 'https://vimeo.com/115041822',
                img: 'https://mdbcdn.b-cdn.net/img/new/slides/007.webp',
                alt: '007',
                tite: '007',
                description: 'just testing',
            }
        ],

        init() {
            this.$nextTick(() => {
                GLightbox({
                    lightboxHTML: glightboxControl,
                    loop: true,
                    touchNavigation: true,
                    autoplayVideos: true,
                    keyboardNavigation: true,
                    openEffect: "zoom",
                    closeEffect: "zoom",
                    autofocusVideos: true,
                    draggable: true,
                })
                // fix for html aria-hidden issue
                .on('open', () => {
                    const lightboxEl = document.querySelector('.glightbox2') as HTMLElement;
                    if (lightboxEl) {
                        let parent = lightboxEl.parentElement;
                        while (parent && parent !== document.body) {
                            if (parent.getAttribute('aria-hidden') === 'true') {
                                parent.removeAttribute('aria-hidden');
                            }
                            parent = parent.parentElement;
                        }
                    }

                    setTimeout(() => {
                        (document.querySelector('.gcontainer') as HTMLElement)?.focus();
                    }, 50);
                })

                // const lb = GLightbox();
                // lb.on('close', () => {})
                
            })
        }

    }))
}

export default Lightbox