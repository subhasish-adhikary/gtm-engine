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

  // Preferred: platform rewrite (no subrequest, no body re-encoding).
  try {
    const rewrite = (Response as unknown as { rewrite?: (u: string, init?: ResponseInit) => Response })
      .rewrite;
    if (typeof rewrite === 'function') {
      return rewrite.call(Response, target.href);
    }
  } catch {
    /* fall through to subrequest */
  }

  // Fallback: internal subrequest. fetch() transparently decompresses the
  // body but keeps the original content-encoding header, which breaks browser
  // decoding — so the stale encoding/length headers must be dropped.
  try {
    const headers = new Headers(request.headers);
    headers.delete('accept-encoding');
    const res = await fetch(new Request(target, { method: 'GET', headers, redirect: 'manual' }));
    const out = new Headers(res.headers);
    out.delete('content-encoding');
    out.delete('content-length');
    out.set('x-middleware-source', 'fetch');
    return new Response(res.body, { status: res.status, headers: out });
  } catch {
    return undefined;
  }
}

export const config = {
  matcher: '/:path*',
};
