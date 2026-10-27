import * as assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { updateOverlay } from '../overlay';
test('Repeat install and removal preserve existing CSS and backup', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dezi-test-'));
    try {
        const directory = join(root, 'out', 'vs', 'workbench');
        await mkdir(directory, { recursive: true });
        const path = join(directory, 'workbench.desktop.main.css');
        const original = 'body { color: red; }\n';
        await writeFile(path, original);
        assert.equal(await updateOverlay(root, Buffer.from('image')), true);
        assert.equal(await updateOverlay(root, Buffer.from('image')), false);
        assert.equal(await readFile(path + '.dezi-backup', 'utf8'), original);
        assert.ok((await readFile(path, 'utf8')).includes('pointer-events: none'));
        assert.ok((await readFile(path, 'utf8')).includes('body:has(> .monaco-workbench)::after'));
        assert.ok((await readFile(path, 'utf8')).includes('position: fixed'));
        assert.equal(await updateOverlay(root, Buffer.from('updated image')), true);
        assert.equal((await readFile(path, 'utf8')).split('/* DEZI OVERLAY START */').length, 2);
        assert.equal(await readFile(path + '.dezi-backup', 'utf8'), original);
        assert.equal(await updateOverlay(root), true);
        assert.equal(await readFile(path, 'utf8'), original);
        assert.equal(await updateOverlay(root), false);
    } finally { await rm(root, { recursive: true, force: true }); }
});
