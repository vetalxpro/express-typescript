declare namespace ChaiHttp {
  interface Response {
    text: string;
    headers: any;
  }
  interface Request {
    redirects( count: number ): Request;
  }
}
