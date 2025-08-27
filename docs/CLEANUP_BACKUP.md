# MenuSparks Folder Structure Cleanup Backup

Created: 2025-08-21

## Current Structure (BEFORE CLEANUP)
```
menspk-main/ (repository root)
├── menspk-main/ (duplicate folder)
│   ├── menspk-main/ (Next.js app - triple nested!)
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json (actual Next.js app)
│   └── package.json (also Next.js)
├── backend/ (separate Express backend)
├── claude-flow/ (unrelated project)
└── many other files...
```

## Files Being Moved
- Moving menspk-main/menspk-main/* to root
- Keeping backend/ folder separate
- Removing claude-flow and other unrelated projects

## Backup Command
If cleanup fails, you can restore with:
```bash
git checkout -- .
```