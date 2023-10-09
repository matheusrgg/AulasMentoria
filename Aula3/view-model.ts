this.isLoadingRequest = true;
this.channelFranchiseEditUseCase
    .save(payload)
    .pipe(finalize(() => ((this.isLoadingRequest = false), this.channelFranchiseForm.reset())))
    .subscribe();

    // exemplo do cano e da mangueira
    //o pipe é o cano que leva a água até mangueira
    

    //tem observables com um tempo de vida maior
    //não é o caso do observable HTTP
    //vc quer que o finalize acontece após uma requisição
    //quando vc está com o stream de dados, vc trata dentro do subscribe


    