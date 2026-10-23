/**
 * Comparação objetiva protótipo × app (frente 8 do plano de acurácia).
 * Para cada tela do registro: abre protótipo e rota do app na mesma viewport/tema e compara
 * (1) diff de pixels com máscara e limite por tela e (2) geometria dos elementos `data-ref`.
 *
 *   mkdir -p /tmp/proto-pw && (cd /tmp/proto-pw && npm init -y && npm i playwright-core pngjs pixelmatch)  # scratch, fora do package.json
 *   node scripts/comparar-prototipo.mjs --registro docs/design/prototipos/<m>/telas.json \
 *        --proto http://localhost:4000 --app http://localhost:3000 [--saida docs/design/evidence/<m>/fidelidade] \
 *        [--vps 390x844,1280x800] [--temas claro,escuro] [--tela qi.pergunta.matriz] [--scratch /tmp/proto-pw]
 *
 * Registro (JSON): [{ "id": "qi.pergunta.matriz", "proto": "/app.html#qi.pergunta.matriz", "app": "/qi/pergunta",
 *   "mascara": [".norton"], "limitePixels": 0.02, "toleranciaPx": 4, "refs": ["titulo","opcoes","cta"] }]
 *   - proto: pode ter `{tema}`, trocado pelo tema da rodada (ex.: `/app.html?dock=0&tema={tema}#/home`); use os parâmetros
 *     do protótipo para tirar menu/aviso/movimento em vez de mascarar o que é só do protótipo.
 *   - Primeiro uso real (Norton M9, 2026-10-23): o script exige app e protótipo servidos (banco local descartável se o app
 *     consultar banco), e `playwright-core pngjs pixelmatch` no scratch. Rodou com Brave headless.
 *   - mascara: seletores ocultados nos dois lados (partes animadas).
 *   - limitePixels: fração máxima de pixels diferentes (default 0.02).
 *   - toleranciaPx: desvio máximo de posição/tamanho por data-ref (default 4).
 *   - refs: data-ref que precisam existir nos dois lados com a mesma geometria.
 * Saída: PNGs (protótipo, app, diff), relatorio.json, relatorio.md e comparacao.html (lado a lado),
 * com passou/falhou por tela × resolução × tema. Código de saída 1 se alguma tela falhar.
 * Navegador: Brave (nunca Chrome). Ajuste a chave de tema (`TEMA_KEY`) ao mecanismo do produto.
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const BRAVE = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const TEMA_KEY = 'tema';
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d; };

const registro = JSON.parse(readFileSync(resolve(arg('registro', 'telas.json')), 'utf8'));
const protoBase = arg('proto', '').replace(/\/$/, '');
const appBase = arg('app', 'http://localhost:3000').replace(/\/$/, '');
const saida = resolve(arg('saida', 'docs/design/evidence/fidelidade'));
const scratch = arg('scratch', '/tmp/proto-pw');
const vps = arg('vps', '390x844,1280x800').split(',').map((v) => { const [w, h] = v.split('x').map(Number); return { w, h }; });
const temas = arg('temas', 'claro,escuro').split(',');
const so = arg('tela', '');
if (!protoBase) { console.error('Informe --proto <url do protótipo>'); process.exit(2); }
if (!existsSync(BRAVE)) { console.error(`Brave indisponível em ${BRAVE}; não vou trocar de navegador.`); process.exit(2); }

const req = createRequire(`${scratch}/package.json`);
const { chromium } = req('playwright-core');
const { PNG } = req('pngjs');
const pm = req('pixelmatch');
const pixelmatch = pm.default ?? pm;   // v7 é ESM: require devolve { default }
mkdirSync(saida, { recursive: true });

/** Compara caixas {x,y,w,h} por data-ref; devolve as violações. */
function compararGeometria(proto, app, tol) {
  const falhas = [];
  for (const ref of Object.keys(proto)) {
    const a = app[ref];
    if (!a) { falhas.push({ ref, motivo: 'ausente no app' }); continue; }
    const p = proto[ref];
    const d = Math.max(Math.abs(p.x - a.x), Math.abs(p.y - a.y), Math.abs(p.w - a.w), Math.abs(p.h - a.h));
    if (d > tol) falhas.push({ ref, motivo: `desvio ${Math.round(d)}px > ${tol}px` });
  }
  return falhas;
}

async function capturar(page, url, tema, mascara, refs) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(([k, t]) => { try { localStorage.setItem(k, t); } catch { /* storage bloqueado */ } document.documentElement.dataset.tema = t; }, [TEMA_KEY, tema]);
  await page.evaluate(() => document.fonts && document.fonts.ready);
  if (mascara.length) await page.addStyleTag({ content: `${mascara.join(',')}{visibility:hidden!important}` });
  await page.waitForTimeout(500);
  const caixas = await page.evaluate((rs) => Object.fromEntries(rs.map((r) => {
    const el = document.querySelector(`[data-ref="${r}"]`);
    if (!el) return [r, null];
    const b = el.getBoundingClientRect();
    return [r, { x: b.x, y: b.y + scrollY, w: b.width, h: b.height }];
  }).filter(([, v]) => v)), refs);
  return { png: await page.screenshot({ type: 'png' }), caixas };
}

const browser = await chromium.launch({ executablePath: BRAVE, headless: true });
const linhas = []; let falhas = 0;
for (const tela of registro.filter((t) => !so || t.id === so)) {
  const mascara = tela.mascara || []; const refs = tela.refs || [];
  const limite = tela.limitePixels ?? 0.02; const tol = tela.toleranciaPx ?? 4;
  for (const tema of temas) for (const vp of vps) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1, locale: 'pt-BR', reducedMotion: 'reduce' });
    const P = await capturar(await ctx.newPage(), protoBase + tela.proto.replace('{tema}', tema), tema, mascara, refs);
    const A = await capturar(await ctx.newPage(), appBase + tela.app, tema, mascara, refs);
    const a = PNG.sync.read(P.png); const b = PNG.sync.read(A.png);
    const dif = new PNG({ width: a.width, height: a.height });
    const mesmo = a.width === b.width && a.height === b.height;
    const pixels = mesmo ? pixelmatch(a.data, b.data, dif.data, a.width, a.height, { threshold: 0.1 }) : a.width * a.height;
    const fracao = pixels / (a.width * a.height);
    const ausentes = refs.filter((r) => !P.caixas[r]).map((r) => ({ ref: r, motivo: 'ausente no protótipo' }));
    const geo = [...ausentes, ...compararGeometria(P.caixas, A.caixas, tol)];
    const ok = fracao <= limite && geo.length === 0;
    if (!ok) falhas++;
    const base = `${tela.id.replace(/\//g, '__')}_${vp.w}x${vp.h}_${tema}`;
    writeFileSync(resolve(saida, `${base}_proto.png`), P.png);
    writeFileSync(resolve(saida, `${base}_app.png`), A.png);
    writeFileSync(resolve(saida, `${base}_diff.png`), PNG.sync.write(dif));
    linhas.push({ tela: tela.id, viewport: `${vp.w}x${vp.h}`, tema, ok, pixelsDiferentes: +(fracao * 100).toFixed(2), limite: limite * 100, geometria: geo, base });
    console.log(`${ok ? 'ok   ' : 'FALHA'} ${tela.id} ${vp.w}x${vp.h} ${tema} px=${(fracao * 100).toFixed(2)}% geo=${geo.length}`);
    await ctx.close();
  }
}
await browser.close();

writeFileSync(resolve(saida, 'relatorio.json'), JSON.stringify(linhas, null, 2));
writeFileSync(resolve(saida, 'relatorio.md'), `${['| Tela | Viewport | Tema | Resultado | Pixels | Geometria |', '|---|---|---|---|---|---|',
  ...linhas.map((l) => `| ${l.tela} | ${l.viewport} | ${l.tema} | ${l.ok ? 'passou' : '**falhou**'} | ${l.pixelsDiferentes}% (máx ${l.limite}%) | ${l.geometria.map((g) => `${g.ref}: ${g.motivo}`).join('; ') || 'ok'} |`)].join('\n')}\n`);
writeFileSync(resolve(saida, 'comparacao.html'), `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fidelidade ao protótipo</title><style>body{font:14px system-ui;margin:16px}section{margin:0 0 32px}.f{color:#b00020}.r{display:flex;gap:8px;flex-wrap:wrap}img{max-width:32%;border:1px solid #ccc}</style>${linhas.map((l) => `<section><h3 class="${l.ok ? '' : 'f'}">${l.ok ? 'passou' : 'FALHOU'} · ${l.tela} · ${l.viewport} · ${l.tema} · ${l.pixelsDiferentes}%</h3><div class="r"><img src="${l.base}_proto.png" alt="protótipo"><img src="${l.base}_app.png" alt="app"><img src="${l.base}_diff.png" alt="diferença"></div></section>`).join('')}`);
console.log(`${linhas.length - falhas}/${linhas.length} passaram. Relatório: ${saida}/relatorio.md`);
process.exit(falhas ? 1 : 0);
