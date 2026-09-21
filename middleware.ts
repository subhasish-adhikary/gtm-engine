/*
 * Vercel Routing Middleware — serves the Sanity Studio at
 * cms.subhasishadhikary.com from the main site's deployment.
 *
 * Runs BEFORE filesystem matching (unlike vercel.json rewrites), which is
 * what allows the bare cms root ("/") to serve the Studio instead of the
 * main homepage. The Studio build lives under /studio/ in the deployment.
 *
 * Mapping for the cms host:
 *   /            -> /studio/index.html
 *   /static/*    -> /studio/static/*   (Studio's root-relative asset refs)
 *   /studio/*    -> passthrough         (real files)
 *   anything else -> /studio/index.html (SPA deep links, e.g. /desk/...)
 */
export default function middleware(request: Request): Response | undefined {
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '')
    .split(':')[0]
    .toLowerCase();

  if (host !== 'cms.subhasishadhikary.com') return;

  const { pathname } = new URL(request.url);

  if (pathname.startsWith('/studio')) return;

  if (pathname.startsWith('/static/')) {
    return Response.rewrite(new URL(`/studio${pathname}`, request.url));
  }

  const target = pathname === '/' ? '/studio/index.html' : '/studio/index.html';
  return Response.rewrite(new URL(target, request.url));
}

export const config = {
  matcher: '/:path*',
};
