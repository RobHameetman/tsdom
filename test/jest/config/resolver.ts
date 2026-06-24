import fs from 'node:fs';
import path from 'node:path';
import type { ResolverOptions } from 'jest-resolve';

const findPackageRoot = (startDir: string) => {
  let dir = startDir;

  while (true) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }

    const parent = path.dirname(dir);

    if (parent === dir) {
      return null;
    }

    dir = parent;
  }
};

export const sync = (request: string, options: ResolverOptions) => {
  const { defaultResolver, basedir, rootDir } = options;

  if (request.startsWith('@/')) {
    const pkgRoot = findPackageRoot(basedir) || rootDir as string;

    const subPath = request.slice(2);
    const candidate = path.join(pkgRoot, 'src', subPath);

    return defaultResolver(candidate, {
      ...options,
      basedir: pkgRoot,
    });
  }

  return defaultResolver(request, options);
};
