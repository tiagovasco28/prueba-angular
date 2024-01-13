export interface Serie {
    show: SerieDetails;
}
export interface SerieDetails {
    id: number;
    name: string;
    image: {
        medium: string;
        original?: string;
    };
    rating: {
        average: number;
    };
    summary: string;
    genres?: string[];
}


