import { Test } from '@nestjs/testing'
import { RestDataService } from './rest-data.service'
import { HttpService, InternalServerErrorException } from '@nestjs/common'
import { of, throwError } from 'rxjs'

const mockHttpService = {
    get: jest.fn(),
}

const mockGetResponse = {
    data: ''
}

describe('RestDataService', () => {
    let restDataService: RestDataService
    let httpService
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                RestDataService,
                { provide: HttpService, useValue: mockHttpService },
            ],
        }).compile()

        restDataService = module.get<RestDataService>(RestDataService)
        httpService = module.get<HttpService>(HttpService)
    })

    describe('getCall', () => {   
        it('should call the GET method of the HttpService', async () => {
            const expectedUrl = 'myUrl'
            const expectedAdditionalHeaders = null
            httpService.get.mockImplementation(() => of(mockGetResponse))
            const response = await restDataService.getCall('myUrl',null )

            expect(mockHttpService.get).toHaveBeenCalledWith(expectedUrl, expectedAdditionalHeaders)
            expect(response).toEqual('')
        })
        it('should throw an InternalServerErrorException when the Httpservice throwns an error', async () => {
            httpService.get.mockImplementation(() => throwError('error'))
            await expect(restDataService.getCall('myUrl',null )).rejects.toThrow(InternalServerErrorException)
        })
    })
})
