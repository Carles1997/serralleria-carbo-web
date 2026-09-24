"""Comprova l'estructura editorial abans de revisar o publicar continguts."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
    "/", "/empresa/", "/particulars/", "/particulars/urgencies/",
    "/particulars/estructures/", "/particulars/automatismes/",
    "/particulars/mobiliari/", "/particulars/projectes/", "/industrial/",
    "/industrial/capacitats/", "/industrial/sectors/",
    "/industrial/series-curtes/", "/industrial/proces/",
    "/industrial/projectes/", "/contacte/", "/legal/avis-legal/",
    "/legal/privacitat/", "/legal/cookies/", "/404",
}
LEGAL = {"/legal/avis-legal/", "/legal/privacitat/", "/legal/cookies/"}


def frontmatter(text: str) -> tuple[dict[str, str], str]:
    match = re.match(r"\A---\n(.*?)\n---\n(.*)\Z", text, re.S)
    if not match:
        return {}, text
    fields = {}
    for line in match.group(1).splitlines():
        item = re.match(r"^([A-Za-z][A-Za-z0-9]*):\s*(.*)$", line)
        if item:
            fields[item.group(1)] = item.group(2).strip().strip('"')
    return fields, match.group(2)


def check_locale(lang: str) -> list[str]:
    errors = []
    folder = ROOT / "content" / lang
    if not folder.exists():
        return [f"{lang}: carpeta absent"]
    routes = {}
    pages = []
    project_refs = {}
    for file in sorted(folder.glob("*.md")):
        fields, body = frontmatter(file.read_text(encoding="utf-8"))
        if not fields:
            errors.append(f"{file.name}: frontmatter absent")
            continue
        if fields.get("lang") != lang:
            errors.append(f"{file.name}: idioma incorrecte")
        route = fields.get("route")
        if route:
            if route in routes:
                errors.append(f"{file.name}: ruta duplicada amb {routes[route]}")
            routes[route] = file.name
            pages.append((file, fields, body))
            if fields.get("projectIds"):
                project_refs[route] = fields["projectIds"].split(",")
            if route not in LEGAL:
                for key in ("seoTitle", "seoDescription"):
                    if not fields.get(key):
                        errors.append(f"{file.name}: {key} buit")
                if len(re.findall(r"(?m)^# [^#]", body)) != 1:
                    errors.append(f"{file.name}: cal exactament un H1")
            else:
                if fields.get("publishReady") != "false":
                    errors.append(f"{file.name}: legal pendent sense bloqueig de publicació")
        for href in re.findall(r"\[[^]]+\]\((/[^)]+)\)", body):
            if href not in EXPECTED:
                errors.append(f"{file.name}: enllaç fora del sitemap: {href}")
    missing = EXPECTED - set(routes)
    extra = set(routes) - EXPECTED
    if missing:
        errors.append(f"{lang}: rutes absents: {sorted(missing)}")
    if extra:
        errors.append(f"{lang}: rutes addicionals: {sorted(extra)}")
    project_files = list((folder / "projects").glob("*.md"))
    projects = {}
    for file in project_files:
        fields, body = frontmatter(file.read_text(encoding="utf-8"))
        project_id = fields.get("projectId")
        if not project_id or project_id in projects:
            errors.append(f"{file.name}: projectId absent o duplicat")
        projects[project_id] = fields
        if not fields.get("title") or not fields.get("year") or not body.strip():
            errors.append(f"{file.name}: títol, any o descripció absent")
    for route, ids in project_refs.items():
        branch = "industrial" if route.startswith("/industrial/") else "particulars"
        for project_id in ids:
            project = projects.get(project_id)
            if not project:
                errors.append(f"{route}: projecte absent: {project_id}")
            elif project.get("branch") != branch:
                errors.append(f"{route}: branca incorrecta: {project_id}")
    referenced = [project_id for ids in project_refs.values() for project_id in ids]
    if set(referenced) != set(projects):
        errors.append(f"{lang}: projectes sense ús o referències absents")
    if lang == "ca" and (len(project_refs.get("/particulars/projectes/", [])) != 5 or len(project_refs.get("/industrial/projectes/", [])) != 1):
        errors.append("ca: repartiment de projectes diferent de 5 particulars + 1 industrial")
    if lang == "ca":
        seo = (ROOT / "fases" / "fase-3" / "SEO-F3.md").read_text(encoding="utf-8")
        assignment = seo.split("## Assignació per pàgina", 1)[1].split("## Cinc expressions", 1)[0]
        assigned = []
        term_counts = [0, 0, 0]
        for line in assignment.splitlines():
            if not line.startswith("| `/"):
                continue
            cells = [cell.strip() for cell in line.strip("|").split("|")]
            if len(cells) != 5:
                errors.append("SEO-F3.md: fila d'assignació incompleta")
                continue
            assigned.append(cells[0].strip("`"))
            for index, cell in enumerate(cells[2:]):
                term_counts[index] += len(cell.split(" · "))
        commercial = EXPECTED - LEGAL - {"/404"}
        if len(assigned) != len(set(assigned)) or set(assigned) != commercial:
            errors.append("SEO-F3.md: les 15 rutes comercials no tenen una assignació única")
        support = seo.split("## Cinc expressions de suport per idioma", 1)[1].split("## Exclusions", 1)[0]
        support_rows = [line for line in support.splitlines() if line.startswith("| `/")]
        if len(support_rows) != 5:
            errors.append("SEO-F3.md: calen cinc expressions de suport per idioma")
        for line in support_rows:
            cells = [cell.strip() for cell in line.strip("|").split("|")]
            if len(cells) != 4 or cells[0].strip("`") not in commercial:
                errors.append("SEO-F3.md: expressió de suport sense pàgina vàlida")
            else:
                term_counts = [count + 1 for count in term_counts]
        if term_counts != [50, 50, 50]:
            errors.append(f"SEO-F3.md: recompte d'expressions incorrecte: {term_counts}")
        for file, fields, body in pages:
            if "900 m²" in body or "900 m²" in fields.get("seoDescription", ""):
                errors.append(f"{file.name}: dada obsoleta de 900 m²")
    print(f"{lang}: {len(pages)} pàgines, {len(projects)} projectes, {len(LEGAL)} legals bloquejades, {len(errors)} incidències")
    return errors


if __name__ == "__main__":
    language = sys.argv[1] if len(sys.argv) > 1 else "ca"
    problems = check_locale(language)
    for problem in problems:
        print("-", problem)
    raise SystemExit(bool(problems))
