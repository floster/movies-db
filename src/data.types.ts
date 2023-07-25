export interface Part {
    id: number;
    title: string;
    label: number;
    favorite: boolean;
    rating: number;
}

export interface HeroData {
    poster: string;
    backdrop: string;
    title: string;
    subtitle?: string;
    tags?: string[],
    description: string;
    rating: number;
    favorite: boolean;
    extra_info: {
        label: string;
        icon: string;
        light: boolean;
    },
    part_of?: string;
}