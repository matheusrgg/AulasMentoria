

//---Promise e Resolve
const value: Promise<HttpRequestResult<any>> = Promise.resolve({
    result: [
        {
            versionEndDatetime: '2023-10-08 13:42:47',
            enableBestOffer: true,
            enableCancellation: true,
            enablePayOff: true,
            enableParcialPayOff: true,
            enableInstallmentValueChange: true,
            enableInstallmentQuantityChange: true,
            enableReversePayOff: true,

            installmentProductCode: 'rj  ',

            franchiseCode: 33,

            versionStartDatetime: '2023-09-22 13:00:00',
        },
    ],
    status: { details: [], message: '', messageId: 'PM0002' },
});

//---Observable  e of
// O Observable não é apenas a observação do dados
// ele tem uma porrada de métodos embutidos nele,
// se eu tentar retornar um observable, não vou poder
// usar o subscribe por exemplo

const value: Observable<HttpRequestResult<any>> = of({
    result: {
        data: [
            {
                versionEndDatetime: '2023-10-08 13:42:47',
                enableBestOffer: true,
                enableCancellation: true,
                enablePayOff: true,
                enableParcialPayOff: true,
                enableInstallmentValueChange: true,
                enableInstallmentQuantityChange: true,
                enableReversePayOff: true,
                installmentProductCode: 'rj',
                franchiseCode: 33,
                versionStartDatetime: '2023-09-22 13:00:00',
            },
        ],
    },

    status: { details: [], message: '', messageId: 'PM0002' },
});

