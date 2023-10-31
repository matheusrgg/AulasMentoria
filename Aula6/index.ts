// Muito boa ficamos a maioria fazemdo
// o metodo do Map

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { Observable, Subject, takeUntil, map, BehaviorSubject, filter } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FornecedorService {

    //mudar nome aqui
    // private tableSubject$ = new Subject<any>();
    private tableSubject$ = new BehaviorSubject<any>([]);

    // private aprendendoTakeUntil = new Subject<any>();
    private getUnsubsribe$ = new Subject<void>();
    private deleteUnsubsribe$ = new Subject<void>();
    private fornecedorObservable$ = new Subject<void>();

    constructor(
        public http: HttpClient,
    ) {

    }

    //fonte de verdade
    public setTable(value: any) {
        this.tableSubject$.next(value);
    }

    public get table$() {
        return this.tableSubject$.asObservable();
    }

    public mapFornecedorGetIdTentaiva2(id: number): Observable<Array<any>> {
        return this.tableSubject$.asObservable().pipe(
            // o que estou retornando?
            //nada por isso void 
            //ele sabe que não está retornando nada
            //e por isso não aceitou nem o <any>
            map((data) => {
                console.log("dentri di componenentnntnt", data);

                const meuIdIndex = data.findIndex((elemento: any) => {

                    return elemento.id == id
                })

                // if (meuIdIndex === -1) {
                //     return alert("não existe")
                // }


                return data[meuIdIndex]

            }
            ),
            // filter((elemento) => !!elemento)
        )
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

    public mapFornecedorGetIdTentaiva1() {
        //tá difícil aqui pq, se eu não chamo esse this.getFornecedor()
        //não roda o console.log lá no final
        //ai do que adianta eu chamar 2x o endpoint ao invés 
        //de chamar um getId?

        //até por que as informações estão no table.component
        //e preciso renderizar elas no form.component
        //-------------só se eu emitir um evento pra outro componente
        //no caso do table.component -> form.component com as informações que preciso
        this.getFornecedor()
        const fornecedorObserve = this.tableSubject$
        console.log("chamadno o obserber", fornecedorObserve);
        const soNome = fornecedorObserve.pipe(
            map(({ data }) => {
                console.log("Bom Trabalho", data);
            })
        )

        const vai = soNome.subscribe(val => console.log("nadA??", val))
        return vai
    }





}