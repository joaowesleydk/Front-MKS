@echo off
echo === Corrigindo chaves de API no Git ===
echo.

echo 1. Removendo arquivo do cache...
git rm --cached BACKEND_ENDPOINT_EXAMPLE.py

echo 2. Adicionando arquivo corrigido...
git add BACKEND_ENDPOINT_EXAMPLE.py

echo 3. Fazendo commit da correção...
git commit --amend --no-edit

echo 4. Forçando push (CUIDADO: isso reescreve o histórico)...
git push --force-with-lease

echo.
echo === Concluído! ===
pause
