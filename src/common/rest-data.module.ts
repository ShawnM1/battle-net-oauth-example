import { Module, HttpModule } from "@nestjs/common";
import { RestDataService } from "./rest-data.service";

@Module({
    imports: [HttpModule],
    providers: [RestDataService],
    exports: [RestDataService]
})
export class RestDataModule {}