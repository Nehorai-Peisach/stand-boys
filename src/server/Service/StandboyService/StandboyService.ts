import { Repository } from "@/server/Repositories/RepositoryService";
import { IStandboy, IStandboyService } from "./IStandboyService";

export class StandboyService implements IStandboyService {
    private repository: Repository<IStandboy>;

    constructor() {
        this.repository = new Repository<IStandboy>("combinations");
    }

    searchStandboy(filter: Partial<IStandboy>, page: number, limit: number): Promise<{ data: IStandboy[]; totalCount: number; }> {
        return this.repository.find(filter, page, limit);
    }
}
