<div id="menu">
    <button onclick="aff_action(1)">Enregistrer un transfert de cuve</button>
    <button onclick="aff_action(2)">Enregistrer un apport de vendanges</button>
    <button onclick="aff_action(3)">Enregistrer une mise en bouteille</button>
    <button onclick="aff_action(4)">Enregistrer une sortie lie</button>
    <button onclick="aff_action(5)">Enregistrer un ajout d'intrant</button>
</div>
<form class="action" id="action1" action="post-data.php" method="post"><input type="hidden" name="nom_table" value="transfert_de_cuve">
    <div><p>Date du transfert</p><input type="date" name="date" required></div>
    <div><p>Cuve de départ</p><select class="select-cuves" name="cuve_départ" required><option value="">-- Choisir une cuve --</option></select></div>
    <div><p>Volume transféré [HI]</p><input type="number" name="volume" required></div>
    <div><p>Cuve d'arrivée</p><select class="select-cuves" name="cuve_arrivée" required><option value="">-- Choisir une cuve --</option></select></div>
    <div><input type="submit" value="valider"></div>
</form>
<form class="action" id="action2" action="post-data.php" method="post"><input type="hidden" name="nom_table" value="apport_de_vendanges">
    <div><p>Date d'appport</p><input type="date" name="date" required></div>
    <div><p>Parcelle</p><input type="text" name="parcelle" required></div>
    <div><p>Quantité [kg]</p><input type="number" name="quantité"required></div>
    <div><p>Cuve apport</p><select class="select-cuves" name="cuve_apport" required><option value="">-- Choisir une cuve --</option></select></div>
    <div><p>Appelation</p><input type="text" name="appelation" required></div>
    <div><p>Cépage</p><input type="text" name="cépage" required></div>
    <div><input type="submit" value="valider"></div>
</form>
<form class="action" id="action3" action="post-data.php" method="post"><input type="hidden" name="nom_table" value="mise_en_bouteille">
    <div><p>Date du transfert</p><input type="date" name="date" required></div>
    <div><p>Cuve de départ</p><select class="select-cuves" name="cuve_départ" required><option value="">-- Choisir une cuve --</option></select></div>
    <div><p>Volume transféré [HI]</p><input type="number" name="volume" required></div>
    <div><p>Numéro de lot</p><input type="number" name="numéro_lot"></div>
    <div><input type="submit" value="valider"></div>
</form>
<form class="action" id="action4" action="post-data.php" method="post"><input type="hidden" name="nom_table" value="sortie_lie">
    <div><p>Date du transfert</p><input type="date" name="date" required></div>
    <div><p>Cuve de départ</p><select class="select-cuves" name="cuve_départ" required><option value="">-- Choisir une cuve --</option></select></div>
    <div><p>Volume transféré [HI]</p><input type="number" name="volume" required></div>
    <div><input type="submit" value="valider"></div>
</form>
<form class="action" id="action5" action="post-data.php" method="post"><input type="hidden" name="nom_table" value="ajout_intrant">
    <div><p>Date d'appport</p><input type="date" name="date" required></div>
    <div><p>Cuve d'apport</p><select class="select-cuves" name="cuve_apport" required><option value="">-- Choisir une cuve --</option></select></div>
    <div><p>Libellé de l'intrant : Nom/Prénom</p><input type="text" name="libellé" required></div>
    <div><p>Quantité apportée [HI]</p><input type="number" name="quantité" required></div>
    <div><input type="submit" value="valider"></div>
</form>
<div id="all-cuves">
    <div class="cuves" id="I0">
        <p class="nom">I0</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120   </p>
    </div>
    <div class="cuves" id="I1">
        <p class="nom">I1</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I2">
        <p class="nom">I2</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I3">
        <p class="nom">I3</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I4">
        <p class="nom">I4</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I5">
        <p class="nom">I5</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I6">
        <p class="nom">I6</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I7">
        <p class="nom">I7</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I8">
        <p class="nom">I8</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I9">
        <p class="nom">I9</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I10">
        <p class="nom">I10</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="I11">
        <p class="nom">I11</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="F1">
        <p class="nom">F1</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="F2">
        <p class="nom">F2</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="F3">
        <p class="nom">F3</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="F4">
        <p class="nom">F4</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="F5">
        <p class="nom">F5</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="F6">
        <p class="nom">F6</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="F7">
        <p class="nom">F7</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="F8">
        <p class="nom">F8</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="F9">
        <p class="nom">F9</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B1">
        <p class="nom">B1</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B2">
        <p class="nom">B2</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B3">
        <p class="nom">B3</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B4">
        <p class="nom">B4</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B5">
        <p class="nom">B5</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B6">
        <p class="nom">B6</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B7">
        <p class="nom">B7</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B8">
        <p class="nom">B8</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B9">
        <p class="nom">B9</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B10">
        <p class="nom">B10</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="B11">
        <p class="nom">B11</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
    <div class="cuves" id="C1">
        <p class="nom">C1</p>
        <div class="fill_indicator">
            <div class="rate"></div>
        </div>
        <div class="appelation">
            <div class='titre'>Appelation</div>
            <p class="textAppelation">sirra</p>
            <div class='titre'>Millesime</div>
            <p class="textMillesime"></p>
            <div class='titre'>Cépage</div>
            <p class="textCépage"></p>
        </div>
        <p class="volume">120</p>
    </div>
</main>
