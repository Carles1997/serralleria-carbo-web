# Fase 7 · Font web reduïda (indicació del director, 01/10/2026).
#
# Genera src/assets/fonts/CarboText-VF.woff2 a partir de la font validada de la Fase 2
# (design/fonts/SourceSans3VF-Upright.woff2, que no es modifica): mateix eix de pes variable i
# mateixes funcions tipogràfiques per defecte, però només amb els caràcters que necessiten el
# català, el castellà i l'anglès, la puntuació tipogràfica, el símbol de l'euro i les fletxes de
# la interfície.
#
# Llicència: Source Sans 3 és SIL Open Font License 1.1 amb el nom reservat «Source». Una versió
# modificada (un subconjunt ho és) no pot fer servir aquest nom com a nom principal: la font
# resultant es diu «Carbo Text» i conserva el copyright i la llicència (vegeu el fitxer de
# llicència al costat de la font).
#
# Requisits (eina local, no és dependència del projecte): python -m pip install fonttools brotli
# Ús: python scripts/subset-font.py
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'design' / 'fonts' / 'SourceSans3VF-Upright.woff2'
TARGET = ROOT / 'src' / 'assets' / 'fonts' / 'CarboText-VF.woff2'
FAMILY = 'Carbo Text'

UNICODES = [
    *range(0x0020, 0x007F),  # ASCII imprimible
    *range(0x00A0, 0x0100),  # Latin-1: à é í ï ò ó ú ü ç ñ · « » ¿ ¡ º ª …
    *range(0x0100, 0x0180),  # Latin Extended-A (Ŀ ŀ per a la ela geminada, Œ œ)
    *range(0x2010, 0x2028),  # guions, cometes tipogràfiques, punts suspensius
    0x2030, 0x2039, 0x203A, 0x2044, 0x20AC, 0x2116, 0x2122, 0x2212, 0x00D7, 0x00F7,
    *range(0x2190, 0x219A),  # fletxes de la interfície (↑ ↗ ↘ ↖)
]

options = subset.Options()
options.flavor = 'woff2'
options.layout_features = ['*']  # conserva les funcions tipogràfiques de la font
options.name_IDs = ['*']
options.name_languages = ['*']
options.notdef_outline = True
options.recalc_bounds = True

font = TTFont(SOURCE)
subsetter = subset.Subsetter(options)
subsetter.populate(unicodes=UNICODES)
subsetter.subset(font)

# Nom nou (OFL, nom reservat «Source»): família, nom complet, PostScript i variacions.
names = font['name']
for record in list(names.names):
    if record.nameID in (1, 16):
        record.string = FAMILY
    elif record.nameID == 4:
        record.string = FAMILY
    elif record.nameID == 6:
        record.string = 'CarboText-VF'
    elif record.nameID == 25:
        record.string = 'CarboText'
    elif record.nameID == 3:
        record.string = f'{FAMILY};subset;Serralleria Carbo'

TARGET.parent.mkdir(parents=True, exist_ok=True)
font.save(TARGET)
before = SOURCE.stat().st_size
after = TARGET.stat().st_size
print(f'{TARGET.relative_to(ROOT)}: {after / 1024:.0f} KB (abans {before / 1024:.0f} KB, -{100 - after * 100 / before:.0f} %)')
