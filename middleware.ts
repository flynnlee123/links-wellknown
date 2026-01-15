export const config = {
  // 这里的正则意思是：匹配所有路径，但排除括号里列出的这些
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .well-known (加了这一行！让中间件放过它)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.well-known).*)",
  ],
};
