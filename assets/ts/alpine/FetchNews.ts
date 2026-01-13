import Alpine from 'alpinejs'

const FetchNews = () => {
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY

    Alpine.data('fetchNews', () => ({
        url: `//newsapi.org/v2/top-headlines/sources?language=en&apiKey=${API_KEY}`,
        news: {},
        init() {
            this.news = this.fetchData(this.url)
        },
        async fetchData(url: string) {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()

                return data.sources
            } catch (error) {
                console.error('Error fetching data:', error)
                return null
            }
        },
    }))

    
}

export default FetchNews