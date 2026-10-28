# Dezi

![Dezi, a cica](media/cica.png)

A cica a jobb alsó sarokban jelenik meg, külön panel, fül és bezárógomb nélkül.

Helyi CSS-kiegészítést használ, mert ezt a VS Code API nem támogatja. A workbench.desktop.main.css eredetijéről .dezi-backup másolat készül.
A módszer a VS Code belső működésére támaszkodik, ezért frissítések után a módosítás újbóli alkalmazására lehet szükség. A VS Code a módosított telepítés miatt figyelmeztetést jeleníthet meg.

A cica megjelenítése:

-Telepítsd a bővítményt.

-Nyisd meg a parancspalettát a Ctrl + Shift + P billentyűkombinációval.

-Futtasd a Dezi: Cica megjelenítése parancsot.

-Zárd be az összes VS Code-ablakot, majd indítsd újra az alkalmazást.

A teljes újraindítás szükséges lehet a módosított stíluslap megfelelő betöltéséhez.

Eltávolítás:

-**Dezi: Cica eltávolítása**, majd teljes VS Code-újraindítás. 
 Ezt a bővítmény eltávolítása előtt futtasd; a bővítmény letiltása nem távolítja el a CSS-t. A parancs csak a jelölt Dezi-blokkot veszi ki.

Fejlesztés:

 `npm test`, `npm run package`. Csomag: `dist/dezi-0.0.9.vsix`.

A Reload Window önmagában nem mindig frissíti a gyorsítótárazott stíluslapot. A kép közvetlenül az ablakhoz rögzített rétegen jelenik meg.
