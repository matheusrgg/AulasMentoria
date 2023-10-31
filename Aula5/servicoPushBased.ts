import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { Observable, Subject, takeUntil } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FornecedorService {

    //mudar nome aqui
    private tableSubject = new Subject<any>();


    // private aprendendoTakeUntil = new Subject<any>();
    private getUnsubsribe$ = new Subject<void>();
    private deleteUnsubsribe$ = new Subject<void>();


    constructor(
        public http: HttpClient,
    ) {

    }


    public setTable(value: any) {
        this.tableSubject.next(value);
    }

    public get table$() {
        return this.tableSubject.asObservable();
    }



    public createFornecedor(email, nome, cnpj, descricao): Observable<any[]> {
        return this.http.post<any>('http://localhost:4000/fornecedor/create', {
            email: email,
            nome: nome,
            cnpj: cnpj,
            descricao: descricao
        })

    }

    // public getFornecedor(): Observable<any[]> {
    //com o void é a Arquitura Push Based- trabalhando com um estado 
    public getFornecedor(): void {
        //cancelando qlqr subscription pendente
        this.getUnsubsribe$.next()

        //criei o observable
        const request$ = this.http.get<any[]>('http://localhost:4000/fornecedor/list')

        //fiz o subsribe
        request$
            .pipe(takeUntil(this.getUnsubsribe$))
            .subscribe((data) => {

                this.setTable(data)
            })

    }

    public deleteFornecedor(id: any): void {
        this.deleteUnsubsribe$.next()
        const request$ = this.http.delete<any[]>(`http://localhost:4000/fornecedor/delete/${id}`);
        request$
            .pipe(takeUntil(this.deleteUnsubsribe$))
            .subscribe((data) => {
                this.getFornecedor()
            })
    }


    public updateFornecedor(id, email, nome, cnpj, descricao): Observable<any[]> {
        return this.http.put<any>(`http://localhost:4000/fornecedor/update/${id}`, {
            email: email,
            nome: nome,
            cnpj: cnpj,
            descricao: descricao
        })
    }








}