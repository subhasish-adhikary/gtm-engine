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
 *
 * Rewriting prefers the platform's Response.rewrite and falls back to an
 * internal subrequest; any failure degrades to normal routing rather than
 * erroring.
 */
export default async function middleware(request: Request): Promise<Response | undefined> {
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '')
    .split(':')[0]
    .toLowerCase();

  if (host !== 'cms.subhasishadhikary.com') return;

  const { pathname } = new URL(request.url);
  if (pathname.startsWith('/studio')) return;

  const target =
    pathname.startsWith('/static/')
      ? new URL(`/studio${pathname}`, request.url)
      : new URL('/studio/index.html', request.url);

  try {
    const rewrite = (Response as unknown as { rewrite?: (u: URL) => Response }).rewrite;
    if (typeof rewrite === 'function') {
      return rewrite.call(Response, target);
    }
  } catch {
    /* fall through to subrequest */
  }

  try {
    return await fetch(new Request(target, request));
  } catch {
    return undefined;
  }
}

export const config = {
  matcher: '/:path*',
};
