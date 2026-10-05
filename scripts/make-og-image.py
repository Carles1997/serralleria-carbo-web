"""Genera la imatge per defecte per compartir enllaços (Open Graph, 1200 x 630).

Logotip de marca (src/assets/branding/carbo-logo.png) centrat sobre el color paper del sistema
visual (--color-paper, design/tokens.css). No fa servir cap fotografia: les imatges per branca amb
fotos reals queden pendents de validació (fases/fase-6/FASE6-pla-accio.md).

Ús: python scripts/make-og-image.py   (requereix Pillow)
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PAPER = (0xF6, 0xF5, 0xF2)
WIDTH, HEIGHT, LOGO_WIDTH = 1200, 630, 760

logo = Image.open(ROOT / "src/assets/branding/carbo-logo.png").convert("RGBA")
logo = logo.resize((LOGO_WIDTH, round(logo.height * LOGO_WIDTH / logo.width)), Image.LANCZOS)
card = Image.new("RGB", (WIDTH, HEIGHT), PAPER)
card.paste(logo, ((WIDTH - logo.width) // 2, (HEIGHT - logo.height) // 2), logo)

out = ROOT / "public/og/serralleria-carbo.png"
out.parent.mkdir(parents=True, exist_ok=True)
card.save(out, optimize=True)
print(f"{out.relative_to(ROOT)}: {card.size[0]} x {card.size[1]}, {out.stat().st_size // 1024} KB")
