// Static release checks only. Does not replace browser/device testing.
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const cp=require('node:child_process');
const root=__dirname;
const files=fs.readdirSync(root).filter(f=>fs.statSync(path.join(root,f)).isFile());
const js=files.filter(f=>f.endsWith('.js')||f.endsWith('.cjs'));
for(const f of js){const r=cp.spawnSync(process.execPath,['--check',path.join(root,f)],{encoding:'utf8'});assert.equal(r.status,0,`${f}: ${r.stderr}`);}
const html=files.filter(f=>f.endsWith('.html'));
let references=0;
for(const f of html){const s=fs.readFileSync(path.join(root,f),'utf8');for(const match of s.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)){
  const ref=match[1];if(!ref||/^(?:https?:|data:|mailto:|tel:|#|\/\/)/i.test(ref))continue;
  const target=decodeURIComponent(ref.split(/[?#]/)[0]);if(!target)continue;
  assert(!target.startsWith('/'),`${f}: unexpected absolute reference ${ref}`);
  const resolved=path.resolve(root,target);assert(resolved.startsWith(root+path.sep),`${f}: reference escapes project ${ref}`);
  assert(fs.existsSync(resolved),`${f}: missing ${ref}`);references++;
}}
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const assetsMatch=sw.match(/const ASSETS=(\[[^;]+\]);/);assert(assetsMatch,'Service worker asset list not found');
const vm=require('node:vm');const assets=vm.runInNewContext(assetsMatch[1]);
assert.equal(assets.length,new Set(assets).size,'Duplicate cached assets');
for(const a of assets){assert(a.startsWith('./'),'Unexpected cached URL');if(a==='./')continue;assert(fs.existsSync(path.join(root,a)),`Missing offline asset ${a}`);}
assert(!assets.some(a=>/api|token|session/i.test(a)),'Potentially private cached asset');
console.log(`Static release checks passed: ${js.length} JS/CJS syntax checks, ${references} local HTML references, ${assets.length} offline assets.`);
console.log('Not tested: browser interactions, audio recording, cloud synchronization, semantic correctness of all lessons.');
