import Alpine from 'alpinejs';
import Plyr from 'plyr';

const PlyrContainer = (): void => {
    Alpine.data('plyrContainer', () => ({
        plyr: null as Plyr | null,
        init(): void {
            this.$nextTick(() => {
                this.plyr = new Plyr(this.$refs.custom_audio as HTMLAudioElement, {
                  controls: [
                      'play',
                      'progress',
                      'current-time',
                      'mute',
                      'volume',
                  ],
                  autoplay: false,
                  hideControls: true,
                  resetOnEnd: true,
                });
            })
        }
    }))
}

export default PlyrContainer;