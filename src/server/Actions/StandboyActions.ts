'use server';

import { StandboyService } from "../Service/StandboyService/StandboyService";

export const fetchMovies = async (pageNumber: number) => {
    const standboyService = new StandboyService();
    return await standboyService.searchStandboy({}, pageNumber, 10);
};
