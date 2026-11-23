// Monta a pasta pronta para subir na Vercel, só com os arquivos que o site usa.
// Uso:  node montar-deploy.js
// Resultado: pasta "deploy" ao lado deste arquivo (pode arrastar/subir essa pasta).
const fs = require("fs"), path = require("path");
const root = __dirname, out = path.join(root, "deploy");

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);

const copy = (rel) => {
  const dst = path.join(out, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(path.join(root, rel), dst);
};

// 1) Páginas, estilo e scripts
const pages = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
[...pages, "css/style.css", "js/data.js", "js/main.js"].forEach(copy);

// 2) Só as imagens e vídeos citados no código
const src = [...pages, "css/style.css", "js/data.js", "js/main.js"].map((f) => fs.readFileSync(path.join(root, f), "utf8")).join("\n");
const refs = [...new Set([...src.matchAll(/["'(](img\/[^"'()?#]+)/g)].map((m) => m[1]))]
  .filter((r) => fs.existsSync(path.join(root, r)));
refs.forEach(copy);

// 3) Configuração da Vercel (cache longo para imagens e vídeos)
fs.writeFileSync(path.join(out, "vercel.json"), JSON.stringify({
  cleanUrls: false,
  headers: [{ source: "/img/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }] }]
}, null, 2));

// Resumo + lista de arquivos
let total = 0;
const all = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); const st = fs.statSync(p); st.isDirectory() ? walk(p) : (total += st.size, all.push(p)); } })(out);
console.log(`Pasta "deploy" criada: ${all.length} arquivos, ${(total / 1048576).toFixed(1)} MB`);

// 4) Zip pronto para subir (barras "/" e nomes com acento em UTF-8, que funcionam em qualquer sistema)
const zlib = require("zlib");
const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (buf) => { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const zipPath = path.join(root, "miza-creative-vercel.zip");
const parts = [], central = [];
let offset = 0;
for (const file of all) {
  const name = Buffer.from(path.relative(out, file).split(path.sep).join("/"), "utf8");
  const data = fs.readFileSync(file);
  const isMedia = /\.(mp4|webm|jpe?g|png|webp)$/i.test(file); // já comprimidos: só armazena
  const body = isMedia ? data : zlib.deflateRawSync(data, { level: 9 });
  const method = isMedia ? 0 : 8, crc = crc32(data);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6); // 0x0800 = nomes em UTF-8
  local.writeUInt16LE(method, 8); local.writeUInt32LE(0, 10); local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(name.length, 26); local.writeUInt16LE(0, 28);
  parts.push(local, name, body);
  const cen = Buffer.alloc(46);
  cen.writeUInt32LE(0x02014b50, 0); cen.writeUInt16LE(20, 4); cen.writeUInt16LE(20, 6); cen.writeUInt16LE(0x0800, 8);
  cen.writeUInt16LE(method, 10); cen.writeUInt32LE(0, 12); cen.writeUInt32LE(crc, 16); cen.writeUInt32LE(body.length, 20);
  cen.writeUInt32LE(data.length, 24); cen.writeUInt16LE(name.length, 28); cen.writeUInt32LE(0, 30); cen.writeUInt32LE(0, 34);
  cen.writeUInt32LE(0, 38); cen.writeUInt32LE(offset, 42);
  central.push(cen, name);
  offset += local.length + name.length + body.length;
}
const cenSize = central.reduce((a, b) => a + b.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(all.length, 8); end.writeUInt16LE(all.length, 10);
end.writeUInt32LE(cenSize, 12); end.writeUInt32LE(offset, 16);
fs.writeFileSync(zipPath, Buffer.concat([...parts, ...central, end]));
console.log(`Zip criado: miza-creative-vercel.zip (${(fs.statSync(zipPath).size / 1048576).toFixed(1)} MB)`);
