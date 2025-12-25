
const IconClose = `<svg viewBox="0 0 512 512">
    <title>icons</title>
    <polygon fill="currentColor"
            points="482.808 504 256 277.193 29.192 504 8 482.808 234.808 256.001 8 29.191 29.192 8 256 234.807 482.808 8 504 29.191 277.192 256.001 504 482.808 482.808 504"/>
</svg>`;

const IconChevronLeft = `
<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" fill-rule="evenodd" d="M5.976 23.984l-.96-1.03L15.212 12 5.017 1.047l.959-1.03L17.129 12 5.976 23.984z" clip-rule="evenodd"/>
</svg>
`;

const IconChevronRight = `
<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" fill-rule="evenodd" d="M5.976 23.984l-.96-1.03L15.212 12 5.017 1.047l.959-1.03L17.129 12 5.976 23.984z" clip-rule="evenodd"/>
</svg>
`;

const styleClass = `
flex flex-column justify-center items-center bg-white transition bg-opacity-60 hover:bg-opacity-100 text-xl sm:text-2xl w-10 h-8 sm:w-16 sm:h-12 text-center
`;
const prevClass = `-left-1.5 md:-left-3`;
const nextClass = `-right-1.5 md:-right-3`;

export const splideControl = `<div class="splide__arrows w-full">
        <button
            class="splide__arrow splide__arrow--prev z-20 absolute vertical-center ${styleClass} ${prevClass}">
            <div class="w-6 h-6 text-primary pointer-events-none">
               ${IconChevronLeft}
            </div>
        </button>
        <button
            class="splide__arrow splide__arrow--next z-20 absolute vertical-center ${styleClass} ${nextClass}">
            <div class="w-6 h-6 text-primary pointer-events-none">
                ${IconChevronRight}
            </div>
        </button>
    </div>`;

export const glightboxControl = `<div id="glightbox-body" class="glightbox-container">
        <div class="gloader visible"></div>
        <div class="goverlay"></div>
        <div class="gcontainer">
            <div id="glightbox-slider" class="gslider"></div>
            <button class="gprev z-20 absolute vertical-center ${styleClass} ${prevClass}" tabindex="1" aria-label="Previous">
            <div class="w-6 h-6 text-primary pointer-events-none rotate-180">${IconChevronRight}</div>
            </button>
            <button class="gnext z-20 absolute vertical-center ${styleClass} ${nextClass}" tabindex="0" aria-label="Next">
            <div class="w-6 h-6 text-primary pointer-events-none">${IconChevronRight}</div>
            </button>
            <button class="gclose text-primary w-12 h-12 bg-white transition bg-opacity-60 hover:bg-opacity-100 transition absolute top-3 right-6 text-2xl" tabindex="2" aria-label="Close">
                ${IconClose}
            </button>
        </div>
    </div>`;
