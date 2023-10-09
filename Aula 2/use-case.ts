@Injectable()
export class ChannelFranchiseEditRepositoryService implements ChannelFranchiseEditRepository {
    constructor(private _httpService: CustomHttpService, private getChannelFranchiseGQL: GetChannelFranchiseEditGQL) { }

    //------------------ ANtigo
    public save(channelFranchise: Partial<ChannelFranchiseInterface>): Promise<HttpRequestResult<ChannelFranchiseInterface>> {
        return new Promise((resolve, reject) => {
            const _http = this._httpService
                .save<HttpRequestResult<ChannelFranchiseInterface>>(API_URLS.ChannelFranchise.Save, channelFranchise)
                .pipe(
                    finalize(() => {
                        _http.unsubscribe();
                    }),
                )
                .subscribe(
                    (httpResult) => resolve(httpResult),
                    (err) => reject(err),
                );
        });
    }
    // não precisa do catchError s[o se vc for fazer uma tratativa desse erro
    public saveObser(channelFranchise: Partial<ChannelFranchiseInterface>): Observable<HttpRequestResult<ChannelFranchiseInterface>> {
        return this._httpService.save<HttpRequestResult<ChannelFranchiseInterface>>(API_URLS.ChannelFranchise.Save, channelFranchise).pipe(
            catchError((err) => {
                return throwError(err);
            }),
        );
    }
    public getAllChannelFranchisesEdit(filters: IFilterInput): Promise<HttpRequestResult<any>> {
        return new Promise((resolve, reject) => {
            this._getChannelFranchiseGQL.fetch({ filters: { size: 100, page: 1 } }).subscribe(
                (result) => {
                    resolve({
                        result: {
                            data: result.data.installments.franchiseChannels.data.map((e) => {
                                return {
                                    installmentProductCode: e.installmentProductChannelOperation.installmentProductCode,
                                    franchiseCode: e.installmentProductChannelOperation.franchiseCode,
                                    enableBestOffer: e.installmentProductChannelOperation.enableBestOffer,
                                    enableCancellation: e.installmentProductChannelOperation.enableCancellation,
                                    enablePayOff: e.installmentProductChannelOperation.enablePayOff,
                                    enableParcialPayOff: e.installmentProductChannelOperation.enableParcialPayOff,
                                    enableInstallmentValueChange: e.installmentProductChannelOperation.enableInstallmentValueChange,
                                    enableInstallmentQuantityChange: e.installmentProductChannelOperation.enableInstallmentQuantityChange,
                                    enableReversePayOff: e.installmentProductChannelOperation.enableReversePayOff,
                                };
                            }),
                        },
                        status: {
                            details: [],
                            message: '',
                            messageId: '',
                        },
                    });
                },
                (err) => reject(err),
            );
        });
    }

    //método pluck()
    //ao invés de usar o pipe, esse primeiro map não faz muito sentido, posso tentar ver uma forma melhor.
    //pluck("data")
    //https://www.learnrxjs.io/learn-rxjs/operators/transformation/pluck
    public getAllChannelObservable(): Observable<any> {
        return this.getChannelFranchiseGQL.fetch({ filters: { size: 100, page: 1 } }).pipe(
            map((result) => {
                return {
                    result: {
                        //cortar o resto da query
                        data: result.data.installments.franchiseChannels.data.map((e) => ({
                            installmentProductCode: e.installmentProductChannelOperation.installmentProductCode,

                        })),
                    },
                    status: {
                        details: [],
                        message: '',
                        messageId: '',
                    },
                };
            }),
            catchError((err) => {
                return throwError(err);
            }),
        );
    }
}

