# Skills Section — Architecture & Conventions

> Read this file when working on: certifications, skills grid, certification
> filters, or adding new issuers/domains. Skip it for unrelated features.

---

## File Structure

```
src/
  types/
    certification.ts     # Certification, CertificationIssuer, CertificationDomain
  data/common/certifications/
    epamCertifications.ts   # EPAM certifications
    fccCertifications.ts    # freeCodeCamp certifications
    awsCertifications.ts    # AWS certifications
    index.tsx               # Barrel — exports certificationList, certifications (grouped), linkedin
  utils/
    certificationLabels.ts  # ISSUER_LABEL_MAP + DOMAIN_LABEL_MAP
    filterCertifications.ts # Pure filter + sort function
    groupCertificationsByIssuer.tsx  # Cert[] → grouped-by-issuer (CV page format)
    issuerIcons.tsx         # ISSUER_ICON_MAP — single issuer→brand icon registry
  hooks/certifications/
    useCertificationFilters.ts  # Filter state, derived options, sort, resetFilters()
  components/skills/
    CertificationCard.tsx      # Presentational card — no data imports
    CertificationFilter.tsx    # Thin wiring — three MultiSelectDropdown + sort toggle
    SkillsGrid.tsx             # Tech skill category cards + soft skills chip list
  styles/skills/
    certificationCard.module.css
    certificationFilter.module.css
    skillsGrid.module.css
```

---

## Data Model — `Certification` (see `src/types/certification.ts`)

| Field          | Type                             | Role                                                        |
| -------------- | -------------------------------- | ----------------------------------------------------------- |
| `id`           | `string`                         | Unique, kebab-case identifier                               |
| `title`        | `string`                         | Certificate display name                                    |
| `issuer`       | `'epam'\|'freecodecamp'\|'aws'`  | Issuer brand — drives icon + filter dropdown                |
| `issuedYear`   | `number`                         | Year issued — drives sort order                             |
| `domain`       | `'frontend'\|…`                  | Architecture domain — multi-select dropdown filter          |
| `technologies` | `string[]`                       | **Must match TECH_ICON_MAP keys**. Drives tech badge icons  |
| `description`  | `string`                         | 1-2 sentence summary shown on the card                      |
| `link`         | `string`                         | External URL to the certificate                             |

### `Domain` values

```
'frontend' | 'backend' | 'fullstack' | 'testing' | 'devops' | 'cloud'
```

Add new values by extending the `CertificationDomain` union in `src/types/certification.ts`
and adding a label to `DOMAIN_LABEL_MAP` in `src/utils/certificationLabels.ts`.

---

## Data-Driven Filter Convention

All filters (issuer, domain, technologies) are fully data-driven — the `useCertificationFilters`
hook derives available options from the actual `certificationList` data,
mirroring the `useProjectFilters` pattern exactly.

```ts
const allIssuers = useMemo(
  () =>
    ([...new Set(certificationList.map(c => c.issuer))] as CertificationIssuer[]).sort(
      (a, b) => ISSUER_LABEL_MAP[a].localeCompare(ISSUER_LABEL_MAP[b]),
    ),
  [],
);
```

**Consequence:** Adding a new certification to any data file automatically adds
its issuer, domain, and technologies to the filter dropdowns.
**No filter code, component, or CSS ever needs to change.**

### Adding a new certification

1. Add an entry to the appropriate file under `src/data/common/certifications/`
2. All downstream consumers (CV page, Skills page, filters) update automatically

### Adding a new issuer (e.g. `'google'`)

1. Add `'google'` to the `CertificationIssuer` union in `src/types/certification.ts`
2. Add `google: 'Google'` to `ISSUER_LABEL_MAP` in `src/utils/certificationLabels.ts`
3. Add the brand icon to `src/components/common/icons/brands.tsx`
4. Add `google: GoogleIcon` to `ISSUER_ICON_MAP` in `src/utils/issuerIcons.tsx`
5. Create `src/data/common/certifications/googleCertifications.ts` with at least one cert
6. Import and spread into `certificationList` in the barrel `index.tsx`

---

## Filter Logic

- **All filters** — multi-select dropdowns; **OR logic** — a cert passes if it matches
  *at least one* of the selected values. Empty selection = no restriction.
- **Sort** — Newest/Oldest toggle, applied after filtering. Sorts by `issuedYear`.
- `MultiSelectDropdown` is the same generic component used by the Projects section.
- Filter state lives in `useCertificationFilters`; filter logic in `filterCertifications.ts`.

---

## Certifications — Single Source of Truth

Certification data is defined **once** under `src/data/common/certifications/`.
Both the CV page and the Skills page derive their display data from the same
canonical `certificationList` array.

```
canonical: Certification[]
    │
    ├── groupCertificationsByIssuer()  →  CV page  (grouped by issuer, with brand icons)
    │
    └── useCertificationFilters()      →  Skills page  (flat, filterable, sortable)
```

The CV page's grouped format is derived by `src/utils/groupCertificationsByIssuer.tsx`.
It is exported from the barrel `index.tsx` as `certifications` so the CV page
doesn't need to call the utility itself.

---

## Skills Grid

The skills grid reuses `skills.ts` data that the CV sidebar already consumes.
Each skill group renders as a bordered card with `TECH_ICON_MAP`-backed badges.
`softSkills` are rendered separately as a plain chip list below the grid.

### Border assignation per category

```
programmingSkills    → border-dual-spin
frontendSkills       → border-rainbow
backendAndDatabase   → border-gradient
testingAndQA         → border-shimmer
devOpsAndCICD        → border-pulse
cloudPlatforms       → border-dual-spin
developmentTools     → border-light-trail
```

---

## TECH_ICON_MAP key conventions

The `TECH_ICON_MAP` in `src/components/common/icons/tech.tsx` is the single
registry for technology icons. Keys must **exactly match** the strings used in:

- `skills.ts` skill arrays
- Certification `technologies[]` arrays
- Project `languages[]` and `technologies[]` arrays

Common mismatches to avoid:
- `NodeJs` → use `Node.js`
- `WebDriver IO` → use `WebDriverIO`
- `Eslint` → use `ESLint`

Technologies not present in the map render as a text-only fallback badge.
