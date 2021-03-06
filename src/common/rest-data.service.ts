import { Injectable, HttpService, InternalServerErrorException } from "@nestjs/common";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class RestDataService {
    constructor(private readonly httpService: HttpService) {}

    async getCall<R>(url: string, config: AxiosRequestConfig): Promise<R> {
        return this.httpService.get(url, config)
        .pipe(
            catchError(error => {
                console.log(JSON.stringify(error))
                throw new InternalServerErrorException(error)
            }),
            map((response: AxiosResponse) => {
                return response.data
            }),
        ).toPromise()
    }
}