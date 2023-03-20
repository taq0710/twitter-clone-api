import { Injectable } from '@nestjs/common';
// import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SearchService {
  search(query: string): string {
    // Xử lý logic tìm kiếm ở đây
    return `Kết quả tìm kiếm cho '${query}'`;
  }
}
