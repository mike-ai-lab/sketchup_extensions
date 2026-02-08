@echo off
cd /d "C:\Users\Administrator\sketchup_extensions----MAIN"
git add shared/extensions.ts
git add client/src/pages/ConstructLMDetail.tsx
git add CONSTRUCTLM_INTEGRATION.md
git commit -m "Add SPECBASE integration - tool card, detail page, and routing"
git push origin main
pause
