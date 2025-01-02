const isGitHubPages = window.location.hostname.includes('github.io');
const BASE_URL = isGitHubPages ? '/jy_yyf' : '';

export const PATHS = {
    images: {
        products: `${BASE_URL}/assets/images/products`,
        reports: `${BASE_URL}/assets/images/reports`,
        timeline: `${BASE_URL}/assets/images/timeline`,
        team: `${BASE_URL}/assets/images/team`,
        process: `${BASE_URL}/assets/images/process`
    },
    videos: {
        process: `${BASE_URL}/assets/videos`
    }
};

export const CONFIG = {
    baseUrl: BASE_URL,
    apiEndpoint: isGitHubPages ? 'https://api.example.com' : '/api'
};
