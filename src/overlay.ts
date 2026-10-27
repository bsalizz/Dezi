import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';
const start = '/* DEZI OVERLAY START */';
const end = '/* DEZI OVERLAY END */';
export async function updateOverlay(appRoot: string, image?: Buffer): Promise<boolean> {
    const path = join(appRoot, 'out', 'vs', 'workbench', 'workbench.desktop.main.css');
    const current = await readFile(path, 'utf8');
    const first = current.indexOf(start);
    const last = current.indexOf(end);
    if ((first < 0) !== (last < 0) || (first >= 0 && last < first)) {
        throw new Error('Hiányos Dezi stílusblokk; a fájl változatlan maradt.');
    }
    const original = first < 0 ? current : current.slice(0, first) + current.slice(last + end.length);
    const selector = 'body:has(> .monaco-workbench)::after';
    // Keep the 96 x 89 source at native device-pixel size on HiDPI displays.
    const densityRules = Array.from({ length: 13 }, (_, index) => {
        const density = 1 + index / 4;
        return `@media (min-resolution: ${density}dppx) { ${selector} { width: ${96 / density}px; height: ${89 / density}px; } }`;
    }).join('\n');
    const css = image ? start + '\n' + selector + ' { content: ""; display: block; position: fixed; right: 18px; bottom: 34px; width: 96px; height: 89px; z-index: 2540; pointer-events: none; background: url("data:image/png;base64,' + image.toString('base64') + '") bottom right / contain no-repeat; }\n' + densityRules + '\n' + end : '';
    const updated = original + css;
    if (updated === current) { return false; }
    try { await copyFile(path, path + '.dezi-backup', constants.COPYFILE_EXCL); }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== 'EEXIST') { throw error; } }
    await writeFile(path, updated, 'utf8');
    return true;
}
