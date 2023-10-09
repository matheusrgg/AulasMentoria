//jeito antigo
public exportToExcelChannelFranchise(filters: IFilterInput): void {
    this.isLoadingRequestChannelFranchise = true;
    this.excelServiceChannelFranchise
        .exportToExcel(
            this.channelFranchiseListUseCase.fetchAll(filters),
            this.translationServiceChannelFranchise.translate('channel-franchise:excel-title'),
            this.pageTableService.dataSource.cols,
        )
        .finally(() => {
            this.isLoadingRequestChannelFranchise = false;
        });
}  

public exportToExcel(filters: IFilterInput): void {
    this.isLoadingRequestAPR = true;

    this.excelService
        .exportToExcel(
            this.additionalParametersRenegatiationListUseCase.fetchAllAddParameterRenegotiation().toPromise(),
            this.translationService.translate('additional-parameters-renegotiation:title'),
            this.pageTableService.dataSource.cols,
        )
        .finally(() => (this.isLoadingRequestAPR = false));
}
