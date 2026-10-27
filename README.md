# Dezi

![Dezi, a cica](media/cica.png)

A cica a jobb alsó sarokban jelenik meg, külön panel, fül és bezárógomb nélkül. Átengedi az egérkattintásokat.

Helyi CSS-kiegészítést használ, mert ezt a VS Code API nem támogatja. A workbench.desktop.main.css eredetijéről .dezi-backup másolat készül. A VS Code módosított telepítésre figyelmeztethet.

Telepítés vagy VS Code-frissítés után: **Dezi: Cica megjelenítése**, majd **az összes VS Code-ablak bezárása és a VS Code újraindítása**.

Eltávolítás: **Dezi: Cica eltávolítása**, majd teljes VS Code-újraindítás. Ezt a bővítmény eltávolítása előtt futtasd; a bővítmény letiltása nem távolítja el a CSS-t. A parancs csak a jelölt Dezi-blokkot veszi ki.

Fejlesztés: `npm test`, `npm run package`. Csomag: `dist/dezi-0.0.8.vsix`.

A Reload Window önmagában nem mindig frissíti a gyorsítótárazott stíluslapot. A kép közvetlenül az ablakhoz rögzített rétegen jelenik meg.
