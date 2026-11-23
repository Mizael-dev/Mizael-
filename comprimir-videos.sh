#!/usr/bin/env bash
# Comprime os vídeos de img/Motion para a web e salva em img/Motion-web (os originais ficam intactos).
# Lado maior até 1280 px, H.264 (toca em qualquer navegador), som AAC 96k,
# "faststart" para começar a tocar antes de baixar tudo.
# Uso (Git Bash):  bash comprimir-videos.sh
set -u
FF="${FFMPEG:-ffmpeg}"
cd "$(dirname "$0")"
mkdir -p img/Motion-web
for f in img/Motion/*.mp4; do
  name="$(basename "$f")"
  out="img/Motion-web/$name"
  [ -s "$out" ] && { echo "pulando (já existe): $name"; continue; }
  echo "comprimindo: $name"
  "$FF" -hide_banner -loglevel error -y -i "$f" \
    -vf "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'" \
    -c:v libx264 -preset slow -crf 28 -maxrate 1100k -bufsize 2200k -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart "$out" || echo "ERRO: $name"
done
du -sh img/Motion-web
