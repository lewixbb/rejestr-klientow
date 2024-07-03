import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function HeaderFnInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const newReq = request.clone({
    setHeaders: {
      'X-Test': 'test',
    },
  });
  return next(newReq);
}
