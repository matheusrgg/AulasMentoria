onClickSave() {
    let formValues = this.channelFranchiseForm.value;
    let payload = {
        versionEndDatetime: `${this.formatData(formValues.validityPeriod.end)} 13:00:00`,
        enableBestOffer: formValues['checkboxGroup']['best-offer'],
        enableCancellation: formValues['checkboxGroup']['cancellation'],
        enablePayOff: formValues['checkboxGroup']['full-early-settlement'],
        enableParcialPayOff: formValues['checkboxGroup']['partial-early-settlement'],
        enableInstallmentValueChange: formValues['checkboxGroup']['change-plan-amount-installment'],
        enableInstallmentQuantityChange: formValues['checkboxGroup']['change-value-number-installment'],
        enableReversePayOff: formValues['checkboxGroup']['reversal-total-settlement'],
        installmentProductCode: 'rj',
        franchiseCode: 35,
        versionStartDatetime: `${this.formatData(formValues.validityPeriod.start)} 14:00:00`,
    };
    this.isLoadingRequest = true;
    this.channelFranchiseEditUseCase
        .save(payload)
        .then(() => {
            this.channelFranchiseForm.reset();
        })
        .finally(() => (this.isLoadingRequest = false));
}

onClickSave() {
    let formValues = this.channelFranchiseForm.value;

    let payload = {
        versionEndDatetime: `${this.formatData(formValues.validityPeriod.end)} 13:00:00`,
        enableBestOffer: formValues['checkboxGroup']['best-offer'],
        enableCancellation: formValues['checkboxGroup']['cancellation'],
        enablePayOff: formValues['checkboxGroup']['full-early-settlement'],
        enableParcialPayOff: formValues['checkboxGroup']['partial-early-settlement'],
        enableInstallmentValueChange: formValues['checkboxGroup']['change-plan-amount-installment'],
        enableInstallmentQuantityChange: formValues['checkboxGroup']['change-value-number-installment'],
        enableReversePayOff: formValues['checkboxGroup']['reversal-total-settlement'],
        installmentProductCode: 'rj',
        franchiseCode: 55,
        versionStartDatetime: `${this.formatData(formValues.validityPeriod.start)} 14:00:00`,
    };

    this.isLoadingRequest = true;
    this.channelFranchiseEditUseCase.save(payload).subscribe({
        next: () => ((this.isLoadingRequest = false), this.channelFranchiseForm.reset()),
        error: () => ((this.isLoadingRequest = false), this.channelFranchiseForm.reset()),
        complete: () => ({})
    });
}


    public fetchDataChannelFranchise() {
    return this.channelFranchiseEditUseCase.fetchAll().subscribe((x) => {
        // this.franchiseCode = x.result.data.map((code: any) => code.franchiseCode);
        this.installmentProductCode = x.result.data.map((code: any) => code.installmentProductCode);
        // this.setTranslationFranchise();
        this.setTranslationInstallment();
    });
}
