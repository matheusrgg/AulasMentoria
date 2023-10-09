It appears that you have an issue with asynchronous code execution in
    your Angular code.The code you provided is using Angular's 
`HttpClient` to make an HTTP request, and you are trying to
 log the result of the subscription.However, due to the 
 asynchronous nature of HTTP requests,
    the`console.log("eaeraer", this.fornecedores);` line is executed before the subscription callback is called.

        Here's a breakdown of the code execution:

1. You make an HTTP request using`this.fornecedorSerivce.getFornecedor().subscribe(...)`.
2. The `subscribe` method registers a callback to be executed when the HTTP response is received.
3. Immediately after subscribing, `console.log("eaeraer", this.fornecedores);` is executed, but at this point, `this.fornecedores`
 has not been updated because the HTTP response has not been received yet.

To fix this issue, you should move the `console.log("eaeraer", this.fornecedores);` statement inside the subscription callback.Here's the corrected code:

    ```javascript
this.fornecedorSerivce.getFornecedor().subscribe(datas => {
  console.log("cadeeeeeeeeeeee", this.fornecedores = datas);
  console.log("eaeraer", this.fornecedores);
});
```

By doing this, the "eaeraer" log statement will be executed only after the HTTP response is received, and`this.fornecedores` is updated with the data from the response.