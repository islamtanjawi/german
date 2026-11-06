/* German verb practice: uses the existing 1,350-verb curriculum. */
(()=>{'use strict';
const M=window.DATA.months,PER=15,KEY='deutsch-conjugation-v1',PROGRESS='deutsch-progress-v1';
const pron=['ich','du','er/sie/es','wir','ihr','sie/Sie'];
const irregular={
sein:['bin','bist','ist','sind','seid','sind'],haben:['habe','hast','hat','haben','habt','haben'],werden:['werde','wirst','wird','werden','werdet','werden'],wissen:['weiß','weißt','weiß','wissen','wisst','wissen'],
können:['kann','kannst','kann','können','könnt','können'],müssen:['muss','musst','muss','müssen','müsst','müssen'],wollen:['will','willst','will','wollen','wollt','wollen'],dürfen:['darf','darfst','darf','dürfen','dürft','dürfen'],sollen:['soll','sollst','soll','sollen','sollt','sollen'],mögen:['mag','magst','mag','mögen','mögt','mögen'],
gehen:['gehe','gehst','geht','gehen','geht','gehen'],stehen:['stehe','stehst','steht','stehen','steht','stehen'],rufen:['rufe','rufst','ruft','rufen','ruft','rufen'],kommen:['komme','kommst','kommt','kommen','kommt','kommen'],sehen:['sehe','siehst','sieht','sehen','seht','sehen'],lesen:['lese','liest','liest','lesen','lest','lesen'],sprechen:['spreche','sprichst','spricht','sprechen','sprecht','sprechen'],essen:['esse','isst','isst','essen','esst','essen'],nehmen:['nehme','nimmst','nimmt','nehmen','nehmt','nehmen'],geben:['gebe','gibst','gibt','geben','gebt','geben'],fahren:['fahre','fährst','fährt','fahren','fahrt','fahren'],schlafen:['schlafe','schläfst','schläft','schlafen','schlaft','schlafen'],laufen:['laufe','läufst','läuft','laufen','lauft','laufen'],halten:['halte','hältst','hält','halten','haltet','halten'],tragen:['trage','trägst','trägt','tragen','tragt','tragen'],fallen:['falle','fällst','fällt','fallen','fallt','fallen'],waschen:['wasche','wäschst','wäscht','waschen','wascht','waschen'],treffen:['treffe','triffst','trifft','treffen','trefft','treffen'],helfen:['helfe','hilfst','hilft','helfen','helft','helfen'],vergessen:['vergesse','vergisst','vergisst','vergessen','vergesst','vergessen'],brechen:['breche','brichst','bricht','brechen','brecht','brechen'],werfen:['werfe','wirfst','wirft','werfen','werft','werfen'],sterben:['sterbe','stirbst','stirbt','sterben','sterbt','sterben'],empfehlen:['empfehle','empfiehlst','empfiehlt','empfehlen','empfehlt','empfehlen'],stehlen:['stehle','stiehlst','stiehlt','stehlen','stehlt','stehlen'],lassen:['lasse','lässt','lässt','lassen','lasst','lassen'],heißen:['heiße','heißt','heißt','heißen','heißt','heißen'],tun:['tue','tust','tut','tun','tut','tun'],bringen:['bringe','bringst','bringt','bringen','bringt','bringen'],denken:['denke','denkst','denkt','denken','denkt','denken'],kennen:['kenne','kennst','kennt','kennen','kennt','kennen'],nennen:['nenne','nennst','nennt','nennen','nennt','nennen'],rennen:['renne','rennst','rennt','rennen','rennt','rennen'],brennen:['brenne','brennst','brennt','brennen','brennt','brennen'],
};
// Verified high-frequency stem-changing and separable verbs (six-person Präsens).
const verifiedPresent={
'anfangen':['fange an','fängst an','fängt an','fangen an','fangt an','fangen an'],
'einladen':['lade ein','lädst ein','lädt ein','laden ein','ladet ein','laden ein'],
'mitnehmen':['nehme mit','nimmst mit','nimmt mit','nehmen mit','nehmt mit','nehmen mit'],
'aussehen':['sehe aus','siehst aus','sieht aus','sehen aus','seht aus','sehen aus'],
'aufwachen':['wache auf','wachst auf','wacht auf','wachen auf','wacht auf','wachen auf'],
'mitbringen':['bringe mit','bringst mit','bringt mit','bringen mit','bringt mit','bringen mit'],
'ankommen':['komme an','kommst an','kommt an','kommen an','kommt an','kommen an'],
'ausgehen':['gehe aus','gehst aus','geht aus','gehen aus','geht aus','gehen aus'],
'zurückkommen':['komme zurück','kommst zurück','kommt zurück','kommen zurück','kommt zurück','kommen zurück'],
'antworten':['antworte','antwortest','antwortet','antworten','antwortet','antworten'],
'bezahlen':['bezahle','bezahlst','bezahlt','bezahlen','bezahlt','bezahlen'],
'erzählen':['erzähle','erzählst','erzählt','erzählen','erzählt','erzählen'],
'besuchen':['besuche','besuchst','besucht','besuchen','besucht','besuchen'],
'verstehen':['verstehe','verstehst','versteht','verstehen','versteht','verstehen'],
'verkaufen':['verkaufe','verkaufst','verkauft','verkaufen','verkauft','verkaufen'],
'einkaufen':['kaufe ein','kaufst ein','kauft ein','kaufen ein','kauft ein','kaufen ein'],
'aufräumen':['räume auf','räumst auf','räumt auf','räumen auf','räumt auf','räumen auf'],
'zumachen':['mache zu','machst zu','macht zu','machen zu','macht zu','machen zu'],
'abholen':['hole ab','holst ab','holt ab','holen ab','holt ab','holen ab'],
'aufmachen':['mache auf','machst auf','macht auf','machen auf','macht auf','machen auf'],
'vorbereiten':['bereite vor','bereitest vor','bereitet vor','bereiten vor','bereitet vor','bereiten vor'],
'vorstellen':['stelle vor','stellst vor','stellt vor','stellen vor','stellt vor','stellen vor'],
'aufstehen':['stehe auf','stehst auf','steht auf','stehen auf','steht auf','stehen auf'],
'anrufen':['rufe an','rufst an','ruft an','rufen an','ruft an','rufen an'],
'beginnen':['beginne','beginnst','beginnt','beginnen','beginnt','beginnen'],
'finden':['finde','findest','findet','finden','findet','finden'],
'trinken':['trinke','trinkst','trinkt','trinken','trinkt','trinken'],
'schreiben':['schreibe','schreibst','schreibt','schreiben','schreibt','schreiben'],
'bleiben':['bleibe','bleibst','bleibt','bleiben','bleibt','bleiben'],
'schwimmen':['schwimme','schwimmst','schwimmt','schwimmen','schwimmt','schwimmen'],
'singen':['singe','singst','singt','singen','singt','singen'],
'springen':['springe','springst','springt','springen','springt','springen'],
'fliegen':['fliege','fliegst','fliegt','fliegen','fliegt','fliegen'],
'ziehen':['ziehe','ziehst','zieht','ziehen','zieht','ziehen'],
'gewinnen':['gewinne','gewinnst','gewinnt','gewinnen','gewinnt','gewinnen'],
'verlieren':['verliere','verlierst','verliert','verlieren','verliert','verlieren'],
'schließen':['schließe','schließt','schließt','schließen','schließt','schließen'],
'bitten':['bitte','bittest','bittet','bitten','bittet','bitten'],
'bieten':['biete','bietest','bietet','bieten','bietet','bieten'],
'sitzen':['sitze','sitzt','sitzt','sitzen','sitzt','sitzen'],
'liegen':['liege','liegst','liegt','liegen','liegt','liegen']
};
// Extra manually reviewed high-frequency six-person present-tense tables.
const extendedPresent={
'machen':['mache','machst','macht','machen','macht','machen'],
'sagen':['sage','sagst','sagt','sagen','sagt','sagen'],
'wohnen':['wohne','wohnst','wohnt','wohnen','wohnt','wohnen'],
'lernen':['lerne','lernst','lernt','lernen','lernt','lernen'],
'spielen':['spiele','spielst','spielt','spielen','spielt','spielen'],
'kaufen':['kaufe','kaufst','kauft','kaufen','kauft','kaufen'],
'hören':['höre','hörst','hört','hören','hört','hören'],
'brauchen':['brauche','brauchst','braucht','brauchen','braucht','brauchen'],
'fragen':['frage','fragst','fragt','fragen','fragt','fragen'],
'warten':['warte','wartest','wartet','warten','wartet','warten'],
'öffnen':['öffne','öffnest','öffnet','öffnen','öffnet','öffnen'],
'lieben':['liebe','liebst','liebt','lieben','liebt','lieben'],
'kochen':['koche','kochst','kocht','kochen','kocht','kochen'],
'zeigen':['zeige','zeigst','zeigt','zeigen','zeigt','zeigen'],
'suchen':['suche','suchst','sucht','suchen','sucht','suchen'],
'legen':['lege','legst','legt','legen','legt','legen'],
'stellen':['stelle','stellst','stellt','stellen','stellt','stellen'],
'setzen':['setze','setzt','setzt','setzen','setzt','setzen'],
'holen':['hole','holst','holt','holen','holt','holen'],
'kosten':['koste','kostest','kostet','kosten','kostet','kosten'],
'arbeiten':['arbeite','arbeitest','arbeitet','arbeiten','arbeitet','arbeiten'],
'bestellen':['bestelle','bestellst','bestellt','bestellen','bestellt','bestellen'],
'aufhören':['höre auf','hörst auf','hört auf','hören auf','hört auf','hören auf'],
'zuhören':['höre zu','hörst zu','hört zu','hören zu','hört zu','hören zu'],
'abfahren':['fahre ab','fährst ab','fährt ab','fahren ab','fahrt ab','fahren ab'],
'einsteigen':['steige ein','steigst ein','steigt ein','steigen ein','steigt ein','steigen ein'],
'aussteigen':['steige aus','steigst aus','steigt aus','steigen aus','steigt aus','steigen aus'],
'umsteigen':['steige um','steigst um','steigt um','steigen um','steigt um','steigen um'],
'mitkommen':['komme mit','kommst mit','kommt mit','kommen mit','kommt mit','kommen mit'],
'mitfahren':['fahre mit','fährst mit','fährt mit','fahren mit','fahrt mit','fahren mit'],
'nachfragen':['frage nach','fragst nach','fragt nach','fragen nach','fragt nach','fragen nach'],
'vorlesen':['lese vor','liest vor','liest vor','lesen vor','lest vor','lesen vor'],
'ausfallen':['falle aus','fällst aus','fällt aus','fallen aus','fallt aus','fallen aus'],
'zunehmen':['nehme zu','nimmst zu','nimmt zu','nehmen zu','nehmt zu','nehmen zu'],
'anreisen':['reise an','reist an','reist an','reisen an','reist an','reisen an'],
'abreisen':['reise ab','reist ab','reist ab','reisen ab','reist ab','reisen ab']
};
Object.assign(verifiedPresent,extendedPresent);
// Reviewed tables for representative A2 and B1 verbs; keep the UI precise about coverage.
const upperLevelPresent={
'besichtigen':['besichtige','besichtigst','besichtigt','besichtigen','besichtigt','besichtigen'],
'erkunden':['erkunde','erkundest','erkundet','erkunden','erkundet','erkunden'],
'stornieren':['storniere','stornierst','storniert','stornieren','storniert','stornieren'],
'erstatten':['erstatte','erstattest','erstattet','erstatten','erstattet','erstatten'],
'versichern':['versichere','versicherst','versichert','versichern','versichert','versichern'],
'bestätigen':['bestätige','bestätigst','bestätigt','bestätigen','bestätigt','bestätigen'],
'operieren':['operiere','operierst','operiert','operieren','operiert','operieren'],
'schonen':['schone','schonst','schont','schonen','schont','schonen'],
'leiden':['leide','leidest','leidet','leiden','leidet','leiden'],
'rauchen':['rauche','rauchst','raucht','rauchen','raucht','rauchen'],
'schnarchen':['schnarche','schnarchst','schnarcht','schnarchen','schnarcht','schnarchen'],
'gähnen':['gähne','gähnst','gähnt','gähnen','gähnt','gähnen'],
'niesen':['niese','niest','niest','niesen','niest','niesen'],
'einstellen':['stelle ein','stellst ein','stellt ein','stellen ein','stellt ein','stellen ein'],
'entlassen':['entlasse','entlässt','entlässt','entlassen','entlasst','entlassen'],
'vereinbaren':['vereinbare','vereinbarst','vereinbart','vereinbaren','vereinbart','vereinbaren'],
'absagen':['sage ab','sagst ab','sagt ab','sagen ab','sagt ab','sagen ab'],
'zusagen':['sage zu','sagst zu','sagt zu','sagen zu','sagt zu','sagen zu'],
'kassieren':['kassiere','kassierst','kassiert','kassieren','kassiert','kassieren'],
'ausdrucken':['drucke aus','druckst aus','druckt aus','drucken aus','druckt aus','drucken aus'],
'sortieren':['sortiere','sortierst','sortiert','sortieren','sortiert','sortieren'],
'reinigen':['reinige','reinigst','reinigt','reinigen','reinigt','reinigen'],
'produzieren':['produziere','produzierst','produziert','produzieren','produziert','produzieren'],
'exportieren':['exportiere','exportierst','exportiert','exportieren','exportiert','exportieren'],
'importieren':['importiere','importierst','importiert','importieren','importiert','importieren'],
'begrüßen':['begrüße','begrüßt','begrüßt','begrüßen','begrüßt','begrüßen'],
'gratulieren':['gratuliere','gratulierst','gratuliert','gratulieren','gratuliert','gratulieren'],
'argumentieren':['argumentiere','argumentierst','argumentiert','argumentieren','argumentiert','argumentieren'],
'plädieren':['plädiere','plädierst','plädiert','plädieren','plädiert','plädieren'],
'appellieren':['appelliere','appellierst','appelliert','appellieren','appelliert','appellieren'],
'vorbringen':['bringe vor','bringst vor','bringt vor','bringen vor','bringt vor','bringen vor'],
'einräumen':['räume ein','räumst ein','räumt ein','räumen ein','räumt ein','räumen ein'],
'erwidern':['erwidere','erwiderst','erwidert','erwidern','erwidert','erwidern'],
'bekräftigen':['bekräftige','bekräftigst','bekräftigt','bekräftigen','bekräftigt','bekräftigen'],
'bestreiten':['bestreite','bestreitest','bestreitet','bestreiten','bestreitet','bestreiten'],
'befürworten':['befürworte','befürwortest','befürwortet','befürworten','befürwortet','befürworten'],
'verteidigen':['verteidige','verteidigst','verteidigt','verteidigen','verteidigt','verteidigen'],
'beschuldigen':['beschuldige','beschuldigst','beschuldigt','beschuldigen','beschuldigt','beschuldigen'],
'auswandern':['wandere aus','wanderst aus','wandert aus','wandern aus','wandert aus','wandern aus'],
'einwandern':['wandere ein','wanderst ein','wandert ein','wandern ein','wandert ein','wandern ein'],
'integrieren':['integriere','integrierst','integriert','integrieren','integriert','integrieren'],
'ausgrenzen':['grenze aus','grenzt aus','grenzt aus','grenzen aus','grenzt aus','grenzen aus'],
'diskriminieren':['diskriminiere','diskriminierst','diskriminiert','diskriminieren','diskriminiert','diskriminieren'],
'benachteiligen':['benachteilige','benachteiligst','benachteiligt','benachteiligen','benachteiligt','benachteiligen'],
'unterdrücken':['unterdrücke','unterdrückst','unterdrückt','unterdrücken','unterdrückt','unterdrücken'],
'verfolgen':['verfolge','verfolgst','verfolgt','verfolgen','verfolgt','verfolgen'],
'abschieben':['schiebe ab','schiebst ab','schiebt ab','schieben ab','schiebt ab','schieben ab'],
'einreisen':['reise ein','reist ein','reist ein','reisen ein','reist ein','reisen ein'],
'ausreisen':['reise aus','reist aus','reist aus','reisen aus','reist aus','reisen aus'],
'zusammenleben':['lebe zusammen','lebst zusammen','lebt zusammen','leben zusammen','lebt zusammen','leben zusammen'],
'aufsteigen':['steige auf','steigst auf','steigt auf','steigen auf','steigt auf','steigen auf'],
'absteigen':['steige ab','steigst ab','steigt ab','steigen ab','steigt ab','steigen ab'],
'pensionieren':['pensioniere','pensionierst','pensioniert','pensionieren','pensioniert','pensionieren'],
'mobben':['mobbe','mobbst','mobbt','mobben','mobbt','mobben'],
'recherchieren':['recherchiere','recherchierst','recherchiert','recherchieren','recherchiert','recherchieren'],
'zitieren':['zitiere','zitierst','zitiert','zitieren','zitiert','zitieren'],
'zensieren':['zensiere','zensierst','zensiert','zensieren','zensiert','zensieren'],
'überwachen':['überwache','überwachst','überwacht','überwachen','überwacht','überwachen'],
'bloggen':['blogge','bloggst','bloggt','bloggen','bloggt','bloggen'],
'streamen':['streame','streamst','streamt','streamen','streamt','streamen'],
'synchronisieren':['synchronisiere','synchronisierst','synchronisiert','synchronisieren','synchronisiert','synchronisieren'],
'aufdecken':['decke auf','deckst auf','deckt auf','decken auf','deckt auf','decken auf']
};
Object.assign(verifiedPresent,upperLevelPresent);
// Additional manually reviewed six-person Präsens forms in the existing A1–B1 curriculum.
Object.assign(verifiedPresent, {"erklären": ["erkläre", "erklärst", "erklärt", "erklären", "erklärt", "erklären"], "wiederholen": ["wiederhole", "wiederholst", "wiederholt", "wiederholen", "wiederholt", "wiederholen"], "übersetzen": ["übersetze", "übersetzt", "übersetzt", "übersetzen", "übersetzt", "übersetzen"], "erinnern": ["erinnere", "erinnerst", "erinnert", "erinnern", "erinnert", "erinnern"], "einführen": ["führe ein", "führst ein", "führt ein", "führen ein", "führt ein", "führen ein"], "teilnehmen": ["nehme teil", "nimmst teil", "nimmt teil", "nehmen teil", "nehmt teil", "nehmen teil"], "vorschlagen": ["schlage vor", "schlägst vor", "schlägt vor", "schlagen vor", "schlagt vor", "schlagen vor"], "ausgeben": ["gebe aus", "gibst aus", "gibt aus", "geben aus", "gebt aus", "geben aus"], "aufgeben": ["gebe auf", "gibst auf", "gibt auf", "geben auf", "gebt auf", "geben auf"], "erhalten": ["erhalte", "erhältst", "erhält", "erhalten", "erhaltet", "erhalten"], "entscheiden": ["entscheide", "entscheidest", "entscheidet", "entscheiden", "entscheidet", "entscheiden"], "empfangen": ["empfange", "empfängst", "empfängt", "empfangen", "empfangt", "empfangen"], "gelten": ["gelte", "giltst", "gilt", "gelten", "geltet", "gelten"], "entwickeln": ["entwickle", "entwickelst", "entwickelt", "entwickeln", "entwickelt", "entwickeln"], "vergleichen": ["vergleiche", "vergleichst", "vergleicht", "vergleichen", "vergleicht", "vergleichen"], "vermeiden": ["vermeide", "vermeidest", "vermeidet", "vermeiden", "vermeidet", "vermeiden"], "beschweren": ["beschwere", "beschwerst", "beschwert", "beschweren", "beschwert", "beschweren"], "interessieren": ["interessiere", "interessierst", "interessiert", "interessieren", "interessiert", "interessieren"]});

// V50: explicitly enumerated six-person forms for common A1–B1 verbs.
Object.assign(verifiedPresent,window.ACADEMY_REVIEWED_V50||{});
Object.assign(verifiedPresent,window.ACADEMY_REVIEWED_V76||{});
// V87: fixed six-person Präsens paradigms for 60 further curriculum verbs (40 A1 + 20 A2).
// Keep these explicit; do not silently classify unreviewed irregular forms as verified.
Object.assign(verifiedPresent,{"erlauben":["erlaube","erlaubst","erlaubt","erlauben","erlaubt","erlauben"],"loben":["lobe","lobst","lobt","loben","lobt","loben"],"leiten":["leite","leitest","leitet","leiten","leitet","leiten"],"verhandeln":["verhandle","verhandelst","verhandelt","verhandeln","verhandelt","verhandeln"],"husten":["huste","hustest","hustet","husten","hustet","husten"],"schwitzen":["schwitze","schwitzt","schwitzt","schwitzen","schwitzt","schwitzen"],"bluten":["blute","blutest","blutet","bluten","blutet","bluten"],"schlucken":["schlucke","schluckst","schluckt","schlucken","schluckt","schlucken"],"korrigieren":["korrigiere","korrigierst","korrigiert","korrigieren","korrigiert","korrigieren"],"berichten":["berichte","berichtest","berichtet","berichten","berichtet","berichten"],"diskutieren":["diskutiere","diskutierst","diskutiert","diskutieren","diskutiert","diskutieren"],"lösen":["löse","löst","löst","lösen","löst","lösen"],"rechnen":["rechne","rechnest","rechnet","rechnen","rechnet","rechnen"],"forschen":["forsche","forschst","forscht","forschen","forscht","forschen"],"anmachen":["mache an","machst an","macht an","machen an","macht an","machen an"],"ausmachen":["mache aus","machst aus","macht aus","machen aus","macht aus","machen aus"],"schälen":["schäle","schälst","schält","schälen","schält","schälen"],"mischen":["mische","mischst","mischt","mischen","mischt","mischen"],"füllen":["fülle","füllst","füllt","füllen","füllt","füllen"],"reparieren":["repariere","reparierst","repariert","reparieren","repariert","reparieren"],"bauen":["baue","baust","baut","bauen","baut","bauen"],"packen":["packe","packst","packt","packen","packt","packen"],"kleben":["klebe","klebst","klebt","kleben","klebt","kleben"],"hängen":["hänge","hängst","hängt","hängen","hängt","hängen"],"wischen":["wische","wischst","wischt","wischen","wischt","wischen"],"schmecken":["schmecke","schmeckst","schmeckt","schmecken","schmeckt","schmecken"],"spüren":["spüre","spürst","spürt","spüren","spürt","spüren"],"bemerken":["bemerke","bemerkst","bemerkt","bemerken","bemerkt","bemerken"],"dauern":["dauere","dauerst","dauert","dauern","dauert","dauern"],"fehlen":["fehle","fehlst","fehlt","fehlen","fehlt","fehlen"],"genügen":["genüge","genügst","genügt","genügen","genügt","genügen"],"nützen":["nütze","nützt","nützt","nützen","nützt","nützen"],"mitteilen":["teile mit","teilst mit","teilt mit","teilen mit","teilt mit","teilen mit"],"ablehnen":["lehne ab","lehnst ab","lehnt ab","lehnen ab","lehnt ab","lehnen ab"],"warnen":["warne","warnst","warnt","warnen","warnt","warnen"],"behaupten":["behaupte","behauptest","behauptet","behaupten","behauptet","behaupten"],"heizen":["heize","heizt","heizt","heizen","heizt","heizen"],"lüften":["lüfte","lüftest","lüftet","lüften","lüftet","lüften"],"kühlen":["kühle","kühlst","kühlt","kühlen","kühlt","kühlen"],"wärmen":["wärme","wärmst","wärmt","wärmen","wärmt","wärmen"],"befördern":["befördere","beförderst","befördert","befördern","befördert","befördern"],"lagern":["lagere","lagerst","lagert","lagern","lagert","lagern"],"aufbewahren":["bewahre auf","bewahrst auf","bewahrt auf","bewahren auf","bewahrt auf","bewahren auf"],"ausleeren":["leere aus","leerst aus","leert aus","leeren aus","leert aus","leeren aus"],"überzeugen":["überzeuge","überzeugst","überzeugt","überzeugen","überzeugt","überzeugen"],"überreden":["überrede","überredest","überredet","überreden","überredet","überreden"],"anvertrauen":["vertraue an","vertraust an","vertraut an","vertrauen an","vertraut an","vertrauen an"],"respektieren":["respektiere","respektierst","respektiert","respektieren","respektiert","respektieren"],"unterstützen":["unterstütze","unterstützt","unterstützt","unterstützen","unterstützt","unterstützen"],"ermutigen":["ermutige","ermutigst","ermutigt","ermutigen","ermutigt","ermutigen"],"begründen":["begründe","begründest","begründet","begründen","begründet","begründen"],"andeuten":["deute an","deutest an","deutet an","deuten an","deutet an","deuten an"],"zusammenfassen":["fasse zusammen","fasst zusammen","fasst zusammen","fassen zusammen","fasst zusammen","fassen zusammen"],"hinzufügen":["füge hinzu","fügst hinzu","fügt hinzu","fügen hinzu","fügt hinzu","fügen hinzu"],"bezweifeln":["bezweifle","bezweifelst","bezweifelt","bezweifeln","bezweifelt","bezweifeln"],"bevorzugen":["bevorzuge","bevorzugst","bevorzugt","bevorzugen","bevorzugt","bevorzugen"],"rechtfertigen":["rechtfertige","rechtfertigst","rechtfertigt","rechtfertigen","rechtfertigt","rechtfertigen"],"fördern":["fördere","förderst","fördert","fördern","fördert","fördern"],"benoten":["benote","benotest","benotet","benoten","benotet","benoten"],"zurückbringen":["bringe zurück","bringst zurück","bringt zurück","bringen zurück","bringt zurück","bringen zurück"]});
// Reviewed reflexive dative verb stems from A2/B1 (six-person Präsens).
Object.assign(verifiedPresent,{
 'merken':['merke','merkst','merkt','merken','merkt','merken'],
 'einbilden':['bilde ein','bildest ein','bildet ein','bilden ein','bildet ein','bilden ein'],
 'vornehmen':['nehme vor','nimmst vor','nimmt vor','nehmen vor','nehmt vor','nehmen vor']
});
// V88: 60 additional B1 six-person Präsens tables. Reflexive pronouns are inserted by present().
Object.assign(verifiedPresent,{"umschulen":["schule um","schulst um","schult um","schulen um","schult um","schulen um"],"ausspionieren":["spioniere aus","spionierst aus","spioniert aus","spionieren aus","spioniert aus","spionieren aus"],"ängstigen":["ängstige","ängstigst","ängstigt","ängstigen","ängstigt","ängstigen"],"verdrängen":["verdränge","verdrängst","verdrängt","verdrängen","verdrängt","verdrängen"],"bewältigen":["bewältige","bewältigst","bewältigt","bewältigen","bewältigt","bewältigen"],"täuschen":["täusche","täuschst","täuscht","täuschen","täuscht","täuschen"],"irren":["irre","irrst","irrt","irren","irrt","irren"],"verzweifeln":["verzweifle","verzweifelst","verzweifelt","verzweifeln","verzweifelt","verzweifeln"],"resignieren":["resigniere","resignierst","resigniert","resignieren","resigniert","resignieren"],"düngen":["dünge","düngst","düngt","düngen","düngt","düngen"],"versiegen":["versiege","versiegst","versiegt","versiegen","versiegt","versiegen"],"vermehren":["vermehre","vermehrst","vermehrt","vermehren","vermehrt","vermehren"],"entgiften":["entgifte","entgiftest","entgiftet","entgiften","entgiftet","entgiften"],"ausdehnen":["dehne aus","dehnst aus","dehnt aus","dehnen aus","dehnt aus","dehnen aus"],"abbauen":["baue ab","baust ab","baut ab","bauen ab","baut ab","bauen ab"],"regenerieren":["regeneriere","regenerierst","regeneriert","regenerieren","regeneriert","regenerieren"],"verklagen":["verklage","verklagst","verklagt","verklagen","verklagt","verklagen"],"ahnden":["ahnde","ahndest","ahndet","ahnden","ahndet","ahnden"],"vollstrecken":["vollstrecke","vollstreckst","vollstreckt","vollstrecken","vollstreckt","vollstrecken"],"verhängen":["verhänge","verhängst","verhängt","verhängen","verhängt","verhängen"],"ermächtigen":["ermächtige","ermächtigst","ermächtigt","ermächtigen","ermächtigt","ermächtigen"],"verpflichten":["verpflichte","verpflichtest","verpflichtet","verpflichten","verpflichtet","verpflichten"],"begnadigen":["begnadige","begnadigst","begnadigt","begnadigen","begnadigt","begnadigen"],"wirtschaften":["wirtschafte","wirtschaftest","wirtschaftet","wirtschaften","wirtschaftet","wirtschaften"],"florieren":["floriere","florierst","floriert","florieren","floriert","florieren"],"stagnieren":["stagniere","stagnierst","stagniert","stagnieren","stagniert","stagnieren"],"schrumpfen":["schrumpfe","schrumpfst","schrumpft","schrumpfen","schrumpft","schrumpfen"],"schwanken":["schwanke","schwankst","schwankt","schwanken","schwankt","schwanken"],"sanieren":["saniere","sanierst","saniert","sanieren","saniert","sanieren"],"kürzen":["kürze","kürzt","kürzt","kürzen","kürzt","kürzen"],"besteuern":["besteuere","besteuerst","besteuert","besteuern","besteuert","besteuern"],"verschulden":["verschulde","verschuldest","verschuldet","verschulden","verschuldet","verschulden"],"profitieren":["profitiere","profitierst","profitiert","profitieren","profitiert","profitieren"],"spekulieren":["spekuliere","spekulierst","spekuliert","spekulieren","spekuliert","spekulieren"],"ankurbeln":["kurble an","kurbelst an","kurbelt an","kurbeln an","kurbelt an","kurbeln an"],"bilden":["bilde","bildest","bildet","bilden","bildet","bilden"],"überliefern":["überliefere","überlieferst","überliefert","überliefern","überliefert","überliefern"],"prägen":["präge","prägst","prägt","prägen","prägt","prägen"],"bewahren":["bewahre","bewahrst","bewahrt","bewahren","bewahrt","bewahren"],"überdauern":["überdauere","überdauerst","überdauert","überdauern","überdauert","überdauern"],"wandeln":["wandle","wandelst","wandelt","wandeln","wandelt","wandeln"],"entfalten":["entfalte","entfaltest","entfaltet","entfalten","entfaltet","entfalten"],"verkümmern":["verkümmere","verkümmerst","verkümmert","verkümmern","verkümmert","verkümmern"],"widmen":["widme","widmest","widmet","widmen","widmet","widmen"],"ausüben":["übe aus","übst aus","übt aus","üben aus","übt aus","üben aus"],"verehren":["verehre","verehrst","verehrt","verehren","verehrt","verehren"],"würdigen":["würdige","würdigst","würdigt","würdigen","würdigt","würdigen"],"auskurieren":["kuriere aus","kurierst aus","kuriert aus","kurieren aus","kuriert aus","kurieren aus"],"verschlimmern":["verschlimmere","verschlimmerst","verschlimmert","verschlimmern","verschlimmert","verschlimmern"],"lindern":["lindere","linderst","lindert","lindern","lindert","lindern"],"betäuben":["betäube","betäubst","betäubt","betäuben","betäubt","betäuben"],"einrenken":["renke ein","renkst ein","renkt ein","renken ein","renkt ein","renken ein"],"verrenken":["verrenke","verrenkst","verrenkt","verrenken","verrenkt","verrenken"],"verstauchen":["verstauche","verstauchst","verstaucht","verstauchen","verstaucht","verstauchen"],"entzünden":["entzünde","entzündest","entzündet","entzünden","entzündet","entzünden"],"vernarben":["vernarbe","vernarbst","vernarbt","vernarben","vernarbt","vernarben"],"ausheilen":["heile aus","heilst aus","heilt aus","heilen aus","heilt aus","heilen aus"],"verabreichen":["verabreiche","verabreichst","verabreicht","verabreichen","verabreicht","verabreichen"],"pulsieren":["pulsiere","pulsierst","pulsiert","pulsieren","pulsiert","pulsieren"],"durchqueren":["durchquere","durchquerst","durchquert","durchqueren","durchquert","durchqueren"]});
// V89: 70 fixed A1/A2 six-person Präsens paradigms and separability regression checks.
Object.assign(verifiedPresent,{"kämmen":["kämme","kämmst","kämmt","kämmen","kämmt","kämmen"],"rasieren":["rasiere","rasierst","rasiert","rasieren","rasiert","rasieren"],"verabreden":["verabrede","verabredest","verabredet","verabreden","verabredet","verabreden"],"beeilen":["beeile","beeilst","beeilt","beeilen","beeilt","beeilen"],"langweilen":["langweile","langweilst","langweilt","langweilen","langweilt","langweilen"],"ärgern":["ärgere","ärgerst","ärgert","ärgern","ärgert","ärgern"],"entspannen":["entspanne","entspannst","entspannt","entspannen","entspannt","entspannen"],"entschuldigen":["entschuldige","entschuldigst","entschuldigt","entschuldigen","entschuldigt","entschuldigen"],"bedanken":["bedanke","bedankst","bedankt","bedanken","bedankt","bedanken"],"schütten":["schütte","schüttest","schüttet","schütten","schüttet","schütten"],"rühren":["rühre","rührst","rührt","rühren","rührt","rühren"],"würzen":["würze","würzt","würzt","würzen","würzt","würzen"],"probieren":["probiere","probierst","probiert","probieren","probiert","probieren"],"servieren":["serviere","servierst","serviert","servieren","serviert","servieren"],"decken":["decke","deckst","deckt","decken","deckt","decken"],"abtrocknen":["trockne ab","trocknest ab","trocknet ab","trocknen ab","trocknet ab","trocknen ab"],"bügeln":["bügle","bügelst","bügelt","bügeln","bügelt","bügeln"],"sorgen":["sorge","sorgst","sorgt","sorgen","sorgt","sorgen"],"fürchten":["fürchte","fürchtest","fürchtet","fürchten","fürchtet","fürchten"],"überraschen":["überrasche","überraschst","überrascht","überraschen","überrascht","überraschen"],"wundern":["wundere","wunderst","wundert","wundern","wundert","wundern"],"hassen":["hasse","hasst","hasst","hassen","hasst","hassen"],"vermissen":["vermisse","vermisst","vermisst","vermissen","vermisst","vermissen"],"schätzen":["schätze","schätzt","schätzt","schätzen","schätzt","schätzen"],"bedauern":["bedauere","bedauerst","bedauert","bedauern","bedauert","bedauern"],"bereuen":["bereue","bereust","bereut","bereuen","bereut","bereuen"],"zweifeln":["zweifle","zweifelst","zweifelt","zweifeln","zweifelt","zweifeln"],"vermuten":["vermute","vermutest","vermutet","vermuten","vermutet","vermuten"],"erwarten":["erwarte","erwartest","erwartet","erwarten","erwartet","erwarten"],"parken":["parke","parkst","parkt","parken","parkt","parken"],"tanken":["tanke","tankst","tankt","tanken","tankt","tanken"],"bremsen":["bremse","bremst","bremst","bremsen","bremst","bremsen"],"landen":["lande","landest","landet","landen","landet","landen"],"starten":["starte","startest","startet","starten","startet","starten"],"buchen":["buche","buchst","bucht","buchen","bucht","buchen"],"verpassen":["verpasse","verpasst","verpasst","verpassen","verpasst","verpassen"],"verreisen":["verreise","verreist","verreist","verreisen","verreist","verreisen"],"übernachten":["übernachte","übernachtest","übernachtet","übernachten","übernachtet","übernachten"],"einchecken":["checke ein","checkst ein","checkt ein","checken ein","checkt ein","checken ein"],"überqueren":["überquere","überquerst","überquert","überqueren","überquert","überqueren"],"folgen":["folge","folgst","folgt","folgen","folgt","folgen"],"begleiten":["begleite","begleitest","begleitet","begleiten","begleitet","begleiten"],"erreichen":["erreiche","erreichst","erreicht","erreichen","erreicht","erreichen"],"entdecken":["entdecke","entdeckst","entdeckt","entdecken","entdeckt","entdecken"],"erleben":["erlebe","erlebst","erlebt","erleben","erlebt","erleben"],"trennen":["trenne","trennst","trennt","trennen","trennt","trennen"],"teilen":["teile","teilst","teilt","teilen","teilt","teilen"],"tauschen":["tausche","tauschst","tauscht","tauschen","tauscht","tauschen"],"speichern":["speichere","speicherst","speichert","speichern","speichert","speichern"],"löschen":["lösche","löschst","löscht","löschen","löscht","löschen"],"reklamieren":["reklamiere","reklamierst","reklamiert","reklamieren","reklamiert","reklamieren"],"anprobieren":["probiere an","probierst an","probiert an","probieren an","probiert an","probieren an"],"reduzieren":["reduziere","reduzierst","reduziert","reduzieren","reduziert","reduzieren"],"ermäßigen":["ermäßige","ermäßigst","ermäßigt","ermäßigen","ermäßigt","ermäßigen"],"schulden":["schulde","schuldest","schuldet","schulden","schuldet","schulden"],"borgen":["borge","borgst","borgt","borgen","borgt","borgen"],"investieren":["investiere","investierst","investiert","investieren","investiert","investieren"],"einzahlen":["zahle ein","zahlst ein","zahlt ein","zahlen ein","zahlt ein","zahlen ein"],"zurückzahlen":["zahle zurück","zahlst zurück","zahlt zurück","zahlen zurück","zahlt zurück","zahlen zurück"],"abbuchen":["buche ab","buchst ab","bucht ab","buchen ab","bucht ab","buchen ab"],"pendeln":["pendle","pendelst","pendelt","pendeln","pendelt","pendeln"],"scannen":["scanne","scannst","scannt","scannen","scannt","scannen"],"kopieren":["kopiere","kopierst","kopiert","kopieren","kopiert","kopieren"],"einfügen":["füge ein","fügst ein","fügt ein","fügen ein","fügt ein","fügen ein"],"markieren":["markiere","markierst","markiert","markieren","markiert","markieren"],"sichern":["sichere","sicherst","sichert","sichern","sichert","sichern"],"verschlüsseln":["verschlüssle","verschlüsselst","verschlüsselt","verschlüsseln","verschlüsselt","verschlüsseln"],"programmieren":["programmiere","programmierst","programmiert","programmieren","programmiert","programmieren"],"hochladen":["lade hoch","lädst hoch","lädt hoch","laden hoch","ladet hoch","laden hoch"],"herunterladen":["lade herunter","lädst herunter","lädt herunter","laden herunter","ladet herunter","laden herunter"]});
// V90: 100 explicitly reviewed six-person Präsens paradigms across A1/A2/B1.
Object.assign(verifiedPresent,{"streiten":["streite","streitest","streitet","streiten","streitet","streiten"],"abwaschen":["wasche ab","wäschst ab","wäscht ab","waschen ab","wascht ab","waschen ab"],"losgehen":["gehe los","gehst los","geht los","gehen los","geht los","gehen los"],"weggehen":["gehe weg","gehst weg","geht weg","gehen weg","geht weg","gehen weg"],"weitergehen":["gehe weiter","gehst weiter","geht weiter","gehen weiter","geht weiter","gehen weiter"],"hereinkommen":["komme herein","kommst herein","kommt herein","kommen herein","kommt herein","kommen herein"],"hinausgehen":["gehe hinaus","gehst hinaus","geht hinaus","gehen hinaus","geht hinaus","gehen hinaus"],"vorbeikommen":["komme vorbei","kommst vorbei","kommt vorbei","kommen vorbei","kommt vorbei","kommen vorbei"],"zugeben":["gebe zu","gibst zu","gibt zu","geben zu","gebt zu","geben zu"],"nähen":["nähe","nähst","näht","nähen","näht","nähen"],"drehen":["drehe","drehst","dreht","drehen","dreht","drehen"],"schieben":["schiebe","schiebst","schiebt","schieben","schiebt","schieben"],"heben":["hebe","hebst","hebt","heben","hebt","heben"],"anbieten":["biete an","bietest an","bietet an","bieten an","bietet an","bieten an"],"bedienen":["bediene","bedienst","bedient","bedienen","bedient","bedienen"],"beraten":["berate","berätst","berät","beraten","beratet","beraten"],"liefern":["liefere","lieferst","liefert","liefern","liefert","liefern"],"drucken":["drucke","druckst","druckt","drucken","druckt","drucken"],"klicken":["klicke","klickst","klickt","klicken","klickt","klicken"],"tippen":["tippe","tippst","tippt","tippen","tippt","tippen"],"surfen":["surfe","surfst","surft","surfen","surft","surfen"],"chatten":["chatte","chattest","chattet","chatten","chattet","chatten"],"laden":["lade","lädst","lädt","laden","ladet","laden"],"installieren":["installiere","installierst","installiert","installieren","installiert","installieren"],"aktualisieren":["aktualisiere","aktualisierst","aktualisiert","aktualisieren","aktualisiert","aktualisieren"],"anmelden":["melde an","meldest an","meldet an","melden an","meldet an","melden an"],"abmelden":["melde ab","meldest ab","meldet ab","melden ab","meldet ab","melden ab"],"umziehen":["ziehe um","ziehst um","zieht um","ziehen um","zieht um","ziehen um"],"einziehen":["ziehe ein","ziehst ein","zieht ein","ziehen ein","zieht ein","ziehen ein"],"beantragen":["beantrage","beantragst","beantragt","beantragen","beantragt","beantragen"],"genehmigen":["genehmige","genehmigst","genehmigt","genehmigen","genehmigt","genehmigen"],"kontrollieren":["kontrolliere","kontrollierst","kontrolliert","kontrollieren","kontrolliert","kontrollieren"],"melden":["melde","meldest","meldet","melden","meldet","melden"],"kümmern":["kümmere","kümmerst","kümmert","kümmern","kümmert","kümmern"],"bemühen":["bemühe","bemühst","bemüht","bemühen","bemüht","bemühen"],"auskennen":["kenne aus","kennst aus","kennt aus","kennen aus","kennt aus","kennen aus"],"pflücken":["pflücke","pflückst","pflückt","pflücken","pflückt","pflücken"],"pflanzen":["pflanze","pflanzt","pflanzt","pflanzen","pflanzt","pflanzen"],"ernten":["ernte","erntest","erntet","ernten","erntet","ernten"],"füttern":["füttere","fütterst","füttert","füttern","füttert","füttern"],"ernähren":["ernähre","ernährst","ernährt","ernähren","ernährt","ernähren"],"beeindrucken":["beeindrucke","beeindruckst","beeindruckt","beeindrucken","beeindruckt","beeindrucken"],"einigen":["einige","einigst","einigt","einigen","einigt","einigen"],"anstrengen":["strenge an","strengst an","strengt an","strengen an","strengt an","strengen an"],"verbessern":["verbessere","verbesserst","verbessert","verbessern","verbessert","verbessern"],"absolvieren":["absolviere","absolvierst","absolviert","absolvieren","absolviert","absolvieren"],"schwänzen":["schwänze","schwänzt","schwänzt","schwänzen","schwänzt","schwänzen"],"lehren":["lehre","lehrst","lehrt","lehren","lehrt","lehren"],"ausbilden":["bilde aus","bildest aus","bildet aus","bilden aus","bildet aus","bilden aus"],"handeln":["handle","handelst","handelt","handeln","handelt","handeln"],"einloggen":["logge ein","loggst ein","loggt ein","loggen ein","loggt ein","loggen ein"],"ausloggen":["logge aus","loggst aus","loggt aus","loggen aus","loggt aus","loggen aus"],"einparken":["parke ein","parkst ein","parkt ein","parken ein","parkt ein","parken ein"],"anschnallen":["schnalle an","schnallst an","schnallt an","schnallen an","schnallt an","schnallen an"],"aufwärmen":["wärme auf","wärmst auf","wärmt auf","wärmen auf","wärmt auf","wärmen auf"],"beschleunigen":["beschleunige","beschleunigst","beschleunigt","beschleunigen","beschleunigt","beschleunigen"],"marinieren":["mariniere","marinierst","mariniert","marinieren","mariniert","marinieren"],"zerkleinern":["zerkleinere","zerkleinerst","zerkleinert","zerkleinern","zerkleinert","zerkleinern"],"leuchten":["leuchte","leuchtest","leuchtet","leuchten","leuchtet","leuchten"],"glänzen":["glänze","glänzt","glänzt","glänzen","glänzt","glänzen"],"schämen":["schäme","schämst","schämt","schämen","schämt","schämen"],"aufregen":["rege auf","regst auf","regt auf","regen auf","regt auf","regen auf"],"gewöhnen":["gewöhne","gewöhnst","gewöhnt","gewöhnen","gewöhnt","gewöhnen"],"anpassen":["passe an","passt an","passt an","passen an","passt an","passen an"],"joggen":["jogge","joggst","joggt","joggen","joggt","joggen"],"eignen":["eigne","eignest","eignet","eignen","eignet","eignen"],"befinden":["befinde","befindest","befindet","befinden","befindet","befinden"],"protestieren":["protestiere","protestierst","protestiert","protestieren","protestiert","protestieren"],"zögern":["zögere","zögerst","zögert","zögern","zögert","zögern"],"weigern":["weigere","weigerst","weigert","weigern","weigert","weigern"],"wetteifern":["wetteifere","wetteiferst","wetteifert","wetteifern","wetteifert","wetteifern"],"erobern":["erobere","eroberst","erobert","erobern","erobert","erobern"],"umrunden":["umrunde","umrundest","umrundet","umrunden","umrundet","umrunden"],"stranden":["strande","strandest","strandet","stranden","strandet","stranden"],"kentern":["kentere","kenterst","kentert","kentern","kentert","kentern"],"ankern":["ankere","ankerst","ankert","ankern","ankert","ankern"],"anlegen":["lege an","legst an","legt an","legen an","legt an","legen an"],"ablegen":["lege ab","legst ab","legt ab","legen ab","legt ab","legen ab"],"tauchen":["tauche","tauchst","taucht","tauchen","taucht","tauchen"],"bereisen":["bereise","bereist","bereist","bereisen","bereist","bereisen"],"verzichten":["verzichte","verzichtest","verzichtet","verzichten","verzichtet","verzichten"],"beanspruchen":["beanspruche","beanspruchst","beansprucht","beanspruchen","beansprucht","beanspruchen"],"begnügen":["begnüge","begnügst","begnügt","begnügen","begnügt","begnügen"],"aufopfern":["opfere auf","opferst auf","opfert auf","opfern auf","opfert auf","opfern auf"],"einschränken":["schränke ein","schränkst ein","schränkt ein","schränken ein","schränkt ein","schränken ein"],"entbehren":["entbehre","entbehrst","entbehrt","entbehren","entbehrt","entbehren"],"erschöpfen":["erschöpfe","erschöpfst","erschöpft","erschöpfen","erschöpft","erschöpfen"],"verschwenden":["verschwende","verschwendest","verschwendet","verschwenden","verschwendet","verschwenden"],"vergeuden":["vergeude","vergeudest","vergeudet","vergeuden","vergeudet","vergeuden"],"anhäufen":["häufe an","häufst an","häuft an","häufen an","häuft an","häufen an"],"horten":["horte","hortest","hortet","horten","hortet","horten"],"hamstern":["hamstere","hamsterst","hamstert","hamstern","hamstert","hamstern"],"verständigen":["verständige","verständigst","verständigt","verständigen","verständigt","verständigen"],"austauschen":["tausche aus","tauschst aus","tauscht aus","tauschen aus","tauscht aus","tauschen aus"],"einmischen":["mische ein","mischst ein","mischt ein","mischen ein","mischt ein","mischen ein"],"solidarisieren":["solidarisiere","solidarisierst","solidarisiert","solidarisieren","solidarisiert","solidarisieren"],"distanzieren":["distanziere","distanzierst","distanziert","distanzieren","distanziert","distanzieren"],"abgrenzen":["grenze ab","grenzt ab","grenzt ab","grenzen ab","grenzt ab","grenzen ab"],"einordnen":["ordne ein","ordnest ein","ordnet ein","ordnen ein","ordnet ein","ordnen ein"],"zuordnen":["ordne zu","ordnest zu","ordnet zu","ordnen zu","ordnet zu","ordnen zu"]});
// V92: 100 additional explicit six-person present-tense paradigms, sampled from existing curriculum.
Object.assign(verifiedPresent,{"fischen":["fische","fischst","fischt","fischen","fischt","fischen"],"jagen":["jage","jagst","jagt","jagen","jagt","jagen"],"klettern":["klettere","kletterst","klettert","klettern","klettert","klettern"],"rudern":["rudere","ruderst","rudert","rudern","rudert","rudern"],"segeln":["segle","segelst","segelt","segeln","segelt","segeln"],"angeln":["angle","angelst","angelt","angeln","angelt","angeln"],"zelten":["zelte","zeltest","zeltet","zelten","zeltet","zelten"],"grillen":["grille","grillst","grillt","grillen","grillt","grillen"],"baden":["bade","badest","badet","baden","badet","baden"],"sonnen":["sonne","sonnst","sonnt","sonnen","sonnt","sonnen"],"flüstern":["flüstere","flüsterst","flüstert","flüstern","flüstert","flüstern"],"murmeln":["murmle","murmelst","murmelt","murmeln","murmelt","murmeln"],"seufzen":["seufze","seufzt","seufzt","seufzen","seufzt","seufzen"],"stöhnen":["stöhne","stöhnst","stöhnt","stöhnen","stöhnt","stöhnen"],"schimpfen":["schimpfe","schimpfst","schimpft","schimpfen","schimpft","schimpfen"],"klagen":["klage","klagst","klagt","klagen","klagt","klagen"],"auslachen":["lache aus","lachst aus","lacht aus","lachen aus","lacht aus","lachen aus"],"beleidigen":["beleidige","beleidigst","beleidigt","beleidigen","beleidigt","beleidigen"],"trösten":["tröste","tröstest","tröstet","trösten","tröstet","trösten"],"beruhigen":["beruhige","beruhigst","beruhigt","beruhigen","beruhigt","beruhigen"],"kitzeln":["kitzle","kitzelst","kitzelt","kitzeln","kitzelt","kitzeln"],"bearbeiten":["bearbeite","bearbeitest","bearbeitet","bearbeiten","bearbeitet","bearbeiten"],"erledigen":["erledige","erledigst","erledigt","erledigen","erledigt","erledigen"],"ergänzen":["ergänze","ergänzt","ergänzt","ergänzen","ergänzt","ergänzen"],"ersetzen":["ersetze","ersetzt","ersetzt","ersetzen","ersetzt","ersetzen"],"verhindern":["verhindere","verhinderst","verhindert","verhindern","verhindert","verhindern"],"verschlechtern":["verschlechtere","verschlechterst","verschlechtert","verschlechtern","verschlechtert","verschlechtern"],"vergrößern":["vergrößere","vergrößerst","vergrößert","vergrößern","vergrößert","vergrößern"],"verkleinern":["verkleinere","verkleinerst","verkleinert","verkleinern","verkleinert","verkleinern"],"verlängern":["verlängere","verlängerst","verlängert","verlängern","verlängert","verlängern"],"überleben":["überlebe","überlebst","überlebt","überleben","überlebt","überleben"],"verunglücken":["verunglücke","verunglückst","verunglückt","verunglücken","verunglückt","verunglücken"],"anschließen":["schließe an","schließt an","schließt an","schließen an","schließt an","schließen an"],"einstecken":["stecke ein","steckst ein","steckt ein","stecken ein","steckt ein","stecken ein"],"übereinstimmen":["stimme überein","stimmst überein","stimmt überein","stimmen überein","stimmt überein","stimmen überein"],"blühen":["blühe","blühst","blüht","blühen","blüht","blühen"],"welken":["welke","welkst","welkt","welken","welkt","welken"],"verdunsten":["verdunste","verdunstest","verdunstet","verdunsten","verdunstet","verdunsten"],"trauen":["traue","traust","traut","trauen","traut","trauen"],"vernetzen":["vernetze","vernetzt","vernetzt","vernetzen","vernetzt","vernetzen"],"kreuzen":["kreuze","kreuzt","kreuzt","kreuzen","kreuzt","kreuzen"],"trampen":["trampe","trampst","trampt","trampen","trampt","trampen"],"streicheln":["streichle","streichelst","streichelt","streicheln","streichelt","streicheln"],"rösten":["röste","röstest","röstet","rösten","röstet","rösten"],"dünsten":["dünste","dünstest","dünstet","dünsten","dünstet","dünsten"],"abkühlen":["kühle ab","kühlst ab","kühlt ab","kühlen ab","kühlt ab","kühlen ab"],"auftauen":["taue auf","taust auf","taut auf","tauen auf","taut auf","tauen auf"],"hacken":["hacke","hackst","hackt","hacken","hackt","hacken"],"entkernen":["entkerne","entkernst","entkernt","entkernen","entkernt","entkernen"],"einschenken":["schenke ein","schenkst ein","schenkt ein","schenken ein","schenkt ein","schenken ein"],"radeln":["radle","radelst","radelt","radeln","radelt","radeln"],"turnen":["turne","turnst","turnt","turnen","turnt","turnen"],"kämpfen":["kämpfe","kämpfst","kämpft","kämpfen","kämpft","kämpfen"],"anfeuern":["feuere an","feuerst an","feuert an","feuern an","feuert an","feuern an"],"blinzeln":["blinzle","blinzelst","blinzelt","blinzeln","blinzelt","blinzeln"],"zittern":["zittere","zitterst","zittert","zittern","zittert","zittern"],"humpeln":["humple","humpelst","humpelt","humpeln","humpelt","humpeln"],"stolpern":["stolpere","stolperst","stolpert","stolpern","stolpert","stolpern"],"ausstellen":["stelle aus","stellst aus","stellt aus","stellen aus","stellt aus","stellen aus"],"beglaubigen":["beglaubige","beglaubigst","beglaubigt","beglaubigen","beglaubigt","beglaubigen"],"registrieren":["registriere","registrierst","registriert","registrieren","registriert","registrieren"],"vorladen":["lade vor","lädst vor","lädt vor","laden vor","ladet vor","laden vor"],"bescheinigen":["bescheinige","bescheinigst","bescheinigt","bescheinigen","bescheinigt","bescheinigen"],"filmen":["filme","filmst","filmt","filmen","filmt","filmen"],"einreichen":["reiche ein","reichst ein","reicht ein","reichen ein","reicht ein","reichen ein"],"strukturieren":["strukturiere","strukturierst","strukturiert","strukturieren","strukturiert","strukturieren"],"verdeutlichen":["verdeutliche","verdeutlichst","verdeutlicht","verdeutlichen","verdeutlicht","verdeutlichen"],"veranschaulichen":["veranschauliche","veranschaulichst","veranschaulicht","veranschaulichen","veranschaulicht","veranschaulichen"],"veranlassen":["veranlasse","veranlasst","veranlasst","veranlassen","veranlasst","veranlassen"],"anregen":["rege an","regst an","regt an","regen an","regt an","regen an"],"digitalisieren":["digitalisiere","digitalisierst","digitalisiert","digitalisieren","digitalisiert","digitalisieren"],"automatisieren":["automatisiere","automatisierst","automatisiert","automatisieren","automatisiert","automatisieren"],"implementieren":["implementiere","implementierst","implementiert","implementieren","implementiert","implementieren"],"aktivieren":["aktiviere","aktivierst","aktiviert","aktivieren","aktiviert","aktivieren"],"deaktivieren":["deaktiviere","deaktivierst","deaktiviert","deaktivieren","deaktiviert","deaktivieren"],"konfigurieren":["konfiguriere","konfigurierst","konfiguriert","konfigurieren","konfiguriert","konfigurieren"],"deinstallieren":["deinstalliere","deinstallierst","deinstalliert","deinstallieren","deinstalliert","deinstallieren"],"skalieren":["skaliere","skalierst","skaliert","skalieren","skaliert","skalieren"],"entschlüsseln":["entschlüssle","entschlüsselst","entschlüsselt","entschlüsseln","entschlüsselt","entschlüsseln"],"codieren":["codiere","codierst","codiert","codieren","codiert","codieren"],"archivieren":["archiviere","archivierst","archiviert","archivieren","archiviert","archivieren"],"überspielen":["überspiele","überspielst","überspielt","überspielen","überspielt","überspielen"],"aufrüsten":["rüste auf","rüstest auf","rüstet auf","rüsten auf","rüstet auf","rüsten auf"],"hochfahren":["fahre hoch","fährst hoch","fährt hoch","fahren hoch","fahrt hoch","fahren hoch"],"vortäuschen":["täusche vor","täuschst vor","täuscht vor","täuschen vor","täuscht vor","täuschen vor"],"heucheln":["heuchle","heuchelst","heuchelt","heucheln","heuchelt","heucheln"],"schmeicheln":["schmeichle","schmeichelst","schmeichelt","schmeicheln","schmeichelt","schmeicheln"],"fälschen":["fälsche","fälschst","fälscht","fälschen","fälscht","fälschen"],"schummeln":["schummle","schummelst","schummelt","schummeln","schummelt","schummeln"],"tricksen":["trickse","trickst","trickst","tricksen","trickst","tricksen"],"verleumden":["verleumde","verleumdest","verleumdet","verleumden","verleumdet","verleumden"],"denunzieren":["denunziere","denunzierst","denunziert","denunzieren","denunziert","denunzieren"],"vertuschen":["vertusche","vertuschst","vertuscht","vertuschen","vertuscht","vertuschen"],"verheimlichen":["verheimliche","verheimlichst","verheimlicht","verheimlichen","verheimlicht","verheimlichen"],"verschweigen":["verschweige","verschweigst","verschweigt","verschweigen","verschweigt","verschweigen"],"beschönigen":["beschönige","beschönigst","beschönigt","beschönigen","beschönigt","beschönigen"],"verstreichen":["verstreiche","verstreichst","verstreicht","verstreichen","verstreicht","verstreichen"],"verzögern":["verzögere","verzögerst","verzögert","verzögern","verzögert","verzögern"],"hinauszögern":["zögere hinaus","zögerst hinaus","zögert hinaus","zögern hinaus","zögert hinaus","zögern hinaus"],"terminieren":["terminiere","terminierst","terminiert","terminieren","terminiert","terminieren"]});
// V93: explicit Präsens paradigms for 100 existing A1–B1 curriculum entries.
Object.assign(verifiedPresent,{"verkürzen":["verkürze","verkürzt","verkürzt","verkürzen","verkürzt","verkürzen"],"steigern":["steigere","steigerst","steigert","steigern","steigert","steigern"],"senken":["senke","senkst","senkt","senken","senkt","senken"],"abwarten":["warte ab","wartest ab","wartet ab","warten ab","wartet ab","warten ab"],"ankreuzen":["kreuze an","kreuzt an","kreuzt an","kreuzen an","kreuzt an","kreuzen an"],"auswählen":["wähle aus","wählst aus","wählt aus","wählen aus","wählt aus","wählen aus"],"mitmachen":["mache mit","machst mit","macht mit","machen mit","macht mit","machen mit"],"mitspielen":["spiele mit","spielst mit","spielt mit","spielen mit","spielt mit","spielen mit"],"mitarbeiten":["arbeite mit","arbeitest mit","arbeitet mit","arbeiten mit","arbeitet mit","arbeiten mit"],"zusammenarbeiten":["arbeite zusammen","arbeitest zusammen","arbeitet zusammen","arbeiten zusammen","arbeitet zusammen","arbeiten zusammen"],"ausprobieren":["probiere aus","probierst aus","probiert aus","probieren aus","probiert aus","probieren aus"],"aufpassen":["passe auf","passt auf","passt auf","passen auf","passt auf","passen auf"],"durchführen":["führe durch","führst durch","führt durch","führen durch","führt durch","führen durch"],"weitermachen":["mache weiter","machst weiter","macht weiter","machen weiter","macht weiter","machen weiter"],"beenden":["beende","beendest","beendet","beenden","beendet","beenden"],"anwenden":["wende an","wendest an","wendet an","wenden an","wendet an","wenden an"],"wohlfühlen":["fühle wohl","fühlst wohl","fühlt wohl","fühlen wohl","fühlt wohl","fühlen wohl"],"verlieben":["verliebe","verliebst","verliebt","verlieben","verliebt","verlieben"],"versöhnen":["versöhne","versöhnst","versöhnt","versöhnen","versöhnt","versöhnen"],"verloben":["verlobe","verlobst","verlobt","verloben","verlobt","verloben"],"verspäten":["verspäte","verspätest","verspätet","verspäten","verspätet","verspäten"],"verirren":["verirre","verirrst","verirrt","verirren","verirrt","verirren"],"recyceln":["recycle","recycelst","recycelt","recyceln","recycelt","recyceln"],"blitzen":["blitze","blitzt","blitzt","blitzen","blitzt","blitzen"],"donnern":["donnere","donnerst","donnert","donnern","donnert","donnern"],"tauen":["taue","taust","taut","tauen","taut","tauen"],"lohnen":["lohne","lohnst","lohnt","lohnen","lohnt","lohnen"],"bewegen":["bewege","bewegst","bewegt","bewegen","bewegt","bewegen"],"abstürzen":["stürze ab","stürzt ab","stürzt ab","stürzen ab","stürzt ab","stürzen ab"],"garen":["gare","garst","gart","garen","gart","garen"],"abschmecken":["schmecke ab","schmeckst ab","schmeckt ab","schmecken ab","schmeckt ab","schmecken ab"],"dehnen":["dehne","dehnst","dehnt","dehnen","dehnt","dehnen"],"siegen":["siege","siegst","siegt","siegen","siegt","siegen"],"trauern":["trauere","trauerst","trauert","trauern","trauert","trauern"],"pflegen":["pflege","pflegst","pflegt","pflegen","pflegt","pflegen"],"adoptieren":["adoptiere","adoptierst","adoptiert","adoptieren","adoptiert","adoptieren"],"erben":["erbe","erbst","erbt","erben","erbt","erben"],"vererben":["vererbe","vererbst","vererbt","vererben","vererbt","vererben"],"beerdigen":["beerdige","beerdigst","beerdigt","beerdigen","beerdigt","beerdigen"],"flirten":["flirte","flirtest","flirtet","flirten","flirtet","flirten"],"sehnen":["sehne","sehnst","sehnt","sehnen","sehnt","sehnen"],"bewirken":["bewirke","bewirkst","bewirkt","bewirken","bewirkt","bewirken"],"auslösen":["löse aus","löst aus","löst aus","lösen aus","löst aus","lösen aus"],"verursachen":["verursache","verursachst","verursacht","verursachen","verursacht","verursachen"],"abonnieren":["abonniere","abonnierst","abonniert","abonnieren","abonniert","abonnieren"],"kommentieren":["kommentiere","kommentierst","kommentiert","kommentieren","kommentiert","kommentieren"],"rezensieren":["rezensiere","rezensierst","rezensiert","rezensieren","rezensiert","rezensieren"],"präsentieren":["präsentiere","präsentierst","präsentiert","präsentieren","präsentiert","präsentieren"],"inszenieren":["inszeniere","inszenierst","inszeniert","inszenieren","inszeniert","inszenieren"],"komponieren":["komponiere","komponierst","komponiert","komponieren","komponiert","komponieren"],"interpretieren":["interpretiere","interpretierst","interpretiert","interpretieren","interpretiert","interpretieren"],"analysieren":["analysiere","analysierst","analysiert","analysieren","analysiert","analysieren"],"hinterfragen":["hinterfrage","hinterfragst","hinterfragt","hinterfragen","hinterfragt","hinterfragen"],"erforschen":["erforsche","erforschst","erforscht","erforschen","erforscht","erforschen"],"ermitteln":["ermittle","ermittelst","ermittelt","ermitteln","ermittelt","ermitteln"],"reflektieren":["reflektiere","reflektierst","reflektiert","reflektieren","reflektiert","reflektieren"],"urteilen":["urteile","urteilst","urteilt","urteilen","urteilt","urteilen"],"tapezieren":["tapeziere","tapezierst","tapeziert","tapezieren","tapeziert","tapezieren"],"bohren":["bohre","bohrst","bohrt","bohren","bohrt","bohren"],"schrauben":["schraube","schraubst","schraubt","schrauben","schraubt","schrauben"],"entzweien":["entzweie","entzweist","entzweit","entzweien","entzweit","entzweien"],"verbünden":["verbünde","verbündest","verbündet","verbünden","verbündet","verbünden"],"profilieren":["profiliere","profilierst","profiliert","profilieren","profiliert","profilieren"],"aufdrängen":["dränge auf","drängst auf","drängt auf","drängen auf","drängt auf","drängen auf"],"verinnerlichen":["verinnerliche","verinnerlichst","verinnerlicht","verinnerlichen","verinnerlicht","verinnerlichen"],"verknüpfen":["verknüpfe","verknüpfst","verknüpft","verknüpfen","verknüpft","verknüpfen"],"herleiten":["leite her","leitest her","leitet her","leiten her","leitet her","leiten her"],"folgern":["folgere","folgerst","folgert","folgern","folgert","folgern"],"gliedern":["gliedere","gliederst","gliedert","gliedern","gliedert","gliedern"],"befristen":["befriste","befristest","befristet","befristen","befristet","befristen"],"stocken":["stocke","stockst","stockt","stocken","stockt","stocken"],"begeistern":["begeistere","begeisterst","begeistert","begeistern","begeistert","begeistern"],"vergöttern":["vergöttere","vergötterst","vergöttert","vergöttern","vergöttert","vergöttern"],"beneiden":["beneide","beneidest","beneidet","beneiden","beneidet","beneiden"],"grollen":["grolle","grollst","grollt","grollen","grollt","grollen"],"entrüsten":["entrüste","entrüstest","entrüstet","entrüsten","entrüstet","entrüsten"],"empören":["empöre","empörst","empört","empören","empört","empören"],"grämen":["gräme","grämst","grämt","grämen","grämt","grämen"],"sträuben":["sträube","sträubst","sträubt","sträuben","sträubt","sträuben"],"fügen":["füge","fügst","fügt","fügen","fügt","fügen"],"bevollmächtigen":["bevollmächtige","bevollmächtigst","bevollmächtigt","bevollmächtigen","bevollmächtigt","bevollmächtigen"],"beauftragen":["beauftrage","beauftragst","beauftragt","beauftragen","beauftragt","beauftragen"],"benachrichtigen":["benachrichtige","benachrichtigst","benachrichtigt","benachrichtigen","benachrichtigt","benachrichtigen"],"mahnen":["mahne","mahnst","mahnt","mahnen","mahnt","mahnen"],"rügen":["rüge","rügst","rügt","rügen","rügt","rügen"],"ermahnen":["ermahne","ermahnst","ermahnt","ermahnen","ermahnt","ermahnen"],"verwarnen":["verwarne","verwarnst","verwarnt","verwarnen","verwarnt","verwarnen"],"abmahnen":["mahne ab","mahnst ab","mahnt ab","mahnen ab","mahnt ab","mahnen ab"],"entlasten":["entlaste","entlastest","entlastet","entlasten","entlastet","entlasten"],"überfordern":["überfordere","überforderst","überfordert","überfordern","überfordert","überfordern"],"unterfordern":["unterfordere","unterforderst","unterfordert","unterfordern","unterfordert","unterfordern"],"auslasten":["laste aus","lastest aus","lastet aus","lasten aus","lastet aus","lasten aus"],"verdunkeln":["verdunkle","verdunkelst","verdunkelt","verdunkeln","verdunkelt","verdunkeln"],"erhellen":["erhelle","erhellst","erhellt","erhellen","erhellt","erhellen"],"erwärmen":["erwärme","erwärmst","erwärmt","erwärmen","erwärmt","erwärmen"],"erkalten":["erkalte","erkaltest","erkaltet","erkalten","erkaltet","erkalten"],"erstarren":["erstarre","erstarrst","erstarrt","erstarren","erstarrt","erstarren"],"verflüssigen":["verflüssige","verflüssigst","verflüssigt","verflüssigen","verflüssigt","verflüssigen"],"verdampfen":["verdampfe","verdampfst","verdampft","verdampfen","verdampft","verdampfen"],"kondensieren":["kondensiere","kondensierst","kondensiert","kondensieren","kondensiert","kondensieren"]});
const past={sein:['war','gewesen','sein'],haben:['hatte','gehabt','haben'],werden:['wurde','geworden','sein'],gehen:['ging','gegangen','sein'],kommen:['kam','gekommen','sein'],sehen:['sah','gesehen','haben'],lesen:['las','gelesen','haben'],sprechen:['sprach','gesprochen','haben'],essen:['aß','gegessen','haben'],nehmen:['nahm','genommen','haben'],geben:['gab','gegeben','haben'],fahren:['fuhr','gefahren','sein'],schlafen:['schlief','geschlafen','haben'],laufen:['lief','gelaufen','sein'],wissen:['wusste','gewusst','haben'],können:['konnte','gekonnt','haben'],müssen:['musste','gemusst','haben'],wollen:['wollte','gewollt','haben'],dürfen:['durfte','gedurft','haben'],sollen:['sollte','gesollt','haben'],mögen:['mochte','gemocht','haben'],machen:['machte','gemacht','haben'],lernen:['lernte','gelernt','haben'],arbeiten:['arbeitete','gearbeitet','haben'],spielen:['spielte','gespielt','haben'],kaufen:['kaufte','gekauft','haben'],trinken:['trank','getrunken','haben'],schreiben:['schrieb','geschrieben','haben'],finden:['fand','gefunden','haben'],bleiben:['blieb','geblieben','sein'],denken:['dachte','gedacht','haben'],bringen:['brachte','gebracht','haben'],kennen:['kannte','gekannt','haben'],nennen:['nannte','genannt','haben'],stehen:['stand','gestanden','haben'],sitzen:['saß','gesessen','haben'],liegen:['lag','gelegen','haben'],helfen:['half','geholfen','haben'],treffen:['traf','getroffen','haben'],vergessen:['vergaß','vergessen','haben'],halten:['hielt','gehalten','haben'],tragen:['trug','getragen','haben'],lassen:['ließ','gelassen','haben'],beginnen:['begann','begonnen','haben'],gewinnen:['gewann','gewonnen','haben'],verlieren:['verlor','verloren','haben'],entscheiden:['entschied','entschieden','haben'],verstehen:['verstand','verstanden','haben'],bekommen:['bekam','bekommen','haben'],anrufen:['rief an','angerufen','haben'],aufstehen:['stand auf','aufgestanden','sein'],einkaufen:['kaufte ein','eingekauft','haben'],anfangen:['fing an','angefangen','haben'],einladen:['lud ein','eingeladen','haben'],mitnehmen:['nahm mit','mitgenommen','haben'],aussehen:['sah aus','ausgesehen','haben'],aufwachen:['wachte auf','aufgewacht','sein'],mitbringen:['brachte mit','mitgebracht','haben'],ankommen:['kam an','angekommen','sein'],ausgehen:['ging aus','ausgegangen','sein'],zurückkommen:['kam zurück','zurückgekommen','sein']};
// V78: selected explicit Präteritum (ich), Partizip II, and auxiliary for A2/B1.
Object.assign(past, {
  "fragen": [
    "fragte",
    "gefragt",
    "haben"
  ],
  "antworten": [
    "antwortete",
    "geantwortet",
    "haben"
  ],
  "bezahlen": [
    "bezahlte",
    "bezahlt",
    "haben"
  ],
  "besuchen": [
    "besuchte",
    "besucht",
    "haben"
  ],
  "erzählen": [
    "erzählte",
    "erzählt",
    "haben"
  ],
  "verkaufen": [
    "verkaufte",
    "verkauft",
    "haben"
  ],
  "vorbereiten": [
    "bereitete vor",
    "vorbereitet",
    "haben"
  ],
  "aufräumen": [
    "räumte auf",
    "aufgeräumt",
    "haben"
  ],
  "zumachen": [
    "machte zu",
    "zugemacht",
    "haben"
  ],
  "abholen": [
    "holte ab",
    "abgeholt",
    "haben"
  ],
  "aufmachen": [
    "machte auf",
    "aufgemacht",
    "haben"
  ],
  "warten": [
    "wartete",
    "gewartet",
    "haben"
  ],
  "wohnen": [
    "wohnte",
    "gewohnt",
    "haben"
  ],
  "putzen": [
    "putzte",
    "geputzt",
    "haben"
  ],
  "kochen": [
    "kochte",
    "gekocht",
    "haben"
  ],
  "tanzen": [
    "tanzte",
    "getanzt",
    "haben"
  ],
  "suchen": [
    "suchte",
    "gesucht",
    "haben"
  ],
  "öffnen": [
    "öffnete",
    "geöffnet",
    "haben"
  ],
  "schließen": [
    "schloss",
    "geschlossen",
    "haben"
  ],
  "schneiden": [
    "schnitt",
    "geschnitten",
    "haben"
  ],
  "ziehen": [
    "zog",
    "gezogen",
    "haben"
  ],
  "holen": [
    "holte",
    "geholt",
    "haben"
  ],
  "weiterleiten": [
    "leitete weiter",
    "weitergeleitet",
    "haben"
  ],
  "vorschlagen": [
    "schlug vor",
    "vorgeschlagen",
    "haben"
  ],
  "teilnehmen": [
    "nahm teil",
    "teilgenommen",
    "haben"
  ],
  "gefallen": [
    "gefiel",
    "gefallen",
    "haben"
  ],
  "gehören": [
    "gehörte",
    "gehört",
    "haben"
  ],
  "planen": [
    "plante",
    "geplant",
    "haben"
  ],
  "bestellen": [
    "bestellte",
    "bestellt",
    "haben"
  ],
  "prüfen": [
    "prüfte",
    "geprüft",
    "haben"
  ],
  "fortsetzen": [
    "setzte fort",
    "fortgesetzt",
    "haben"
  ],
  "abholzen": [
    "holzte ab",
    "abgeholzt",
    "haben"
  ],
  "aufforsten": [
    "forstete auf",
    "aufgeforstet",
    "haben"
  ],
  "weiterbilden": [
    "bildete weiter",
    "weitergebildet",
    "haben"
  ],
  "umarmen": [
    "umarmte",
    "umarmt",
    "haben"
  ],
  "verbessern": [
    "verbesserte",
    "verbessert",
    "haben"
  ],
  "beschreiben": [
    "beschrieb",
    "beschrieben",
    "haben"
  ]
});
// Individually reviewed Präteritum ich / Partizip II / auxiliary for reflexive practice.
Object.assign(past,{
 'erinnern':['erinnerte','erinnert','haben'],
 'merken':['merkte','gemerkt','haben'],
 'einbilden':['bildete ein','eingebildet','haben'],
 'vornehmen':['nahm vor','vorgenommen','haben'],
 'vorstellen':['stellte vor','vorgestellt','haben'],
 'ausruhen':['ruhte aus','ausgeruht','haben']
});
let state={done:{},errors:{},scores:{}};try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s==='object')state={...state,...s,done:s.done&&typeof s.done==='object'&&!Array.isArray(s.done)?s.done:{},errors:s.errors&&typeof s.errors==='object'&&!Array.isArray(s.errors)?s.errors:{},scores:s.scores&&typeof s.scores==='object'&&!Array.isArray(s.scores)?s.scores:{}}}catch(e){}
let vocab={};try{vocab=JSON.parse(localStorage.getItem(PROGRESS))||{}}catch(e){}
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch(e){return false}}
const levelDone=m=>Array.from({length:30},(_,i)=>i+1).every(d=>state.done[`${m}-${d}`]===true);
const levelOpen=m=>m===0||(levelDone(m-1)&&window.LearningPath.levelOpen(M[m].level));
const dayOpen=(m,d)=>levelOpen(m)&&(d===1||state.done[`${m}-${d-1}`]===true);
let m=0,d=1,selected=0,quiz=null,quizMode="choice";
function speak(t){if(!('speechSynthesis'in window))return;const u=new SpeechSynthesisUtterance(t);u.lang='de-DE';u.rate=.84;speechSynthesis.cancel();speechSynthesis.speak(u)}
function baseWord(w){return w.replace(/^sich\s+/,'').trim()}
// Dative reflexive pronouns are required with these uses (e.g. ich merke mir ...).
// Other reflexive entries retain the accusative forms unless individually reviewed.
const reflexiveDative=new Set(['merken','einbilden','vornehmen']);
const reflexivePronoun=(verb,i)=> (reflexiveDative.has(verb)
 ? ['mir','dir','sich','uns','euch','sich']
 : ['mich','dich','sich','uns','euch','sich'])[i];
const reflexiveForm=(form,i,verb)=>{const parts=form.split(' ');parts.splice(1,0,reflexivePronoun(verb,i));return parts.join(' ')};
function simpleForm(w){if(irregular[w])return irregular[w];if(/\s/.test(w))return null;let root=w.endsWith('en')?w.slice(0,-2):w.endsWith('n')?w.slice(0,-1):null;if(!root)return null;
// Restrict generated tables to regular patterns; stem-vowel and prefix irregularities are explicitly marked for review.
const changed=/^(be|ge|er|ver|zer|ent|emp|miss)/.test(w);const suspect=/(?:fahren|tragen|schlafen|laufen|fallen|halten|waschen|fangen|lassen|raten|laden|graben|stoßen|treten|essen|lesen|sehen|sprechen|nehmen|geben|helfen|treffen|werfen|brechen|sterben|stehlen|empfehlen|vergessen|messen|treffen|gelten|werden|wissen|tun|ziehen|fliegen|schließen|schießen|gießen|genießen|verlieren|frieren|biegen|bieten|bitten|bleiben|schreiben|steigen|schweigen|singen|springen|trinken|schwimmen|finden|binden|gewinnen|beginnen|denken|bringen|kennen|nennen|rennen|brennen|senden|wenden|stehen|sitzen|liegen)/.test(w);
if(suspect||changed&&/(?:nehmen|geben|sehen|stehen|kommen|fahren|finden|halten|lassen|ziehen|treten|fallen|laufen|brechen|sprechen|schreiben|bringen|denken)/.test(w))return null;
let e=/(?:[td]|chn|ffn|gn|tm|dm)$/.test(root)?'e':'';let du=/[sxzß]$/.test(root)?'t':'st';if(w.endsWith('eln')){const stem=w.slice(0,-1);return [w.slice(0,-3)+'le',stem+'st',stem+'t',w,stem+'t',w]};if(w.endsWith('ern'))return [root+'e',root+'st',root+'t',w,root+'t',w];return [root+'e',root+e+du,root+e+'t',w,root+e+'t',w]}
function present(w){const reflex=/^sich\s+/.test(w),v=baseWord(w);if(verifiedPresent[v]){const f=verifiedPresent[v];return reflex?f.map((form,i)=>reflexiveForm(form,i,v)):f;}const prefix=v.match(/^(zurück|zusammen|weiter|fest|fort|her|hin|los|mit|nach|vor|weg|bei|ein|auf|aus|ab|an|zu)(.+)$/);let f=prefix?null:simpleForm(v);if(prefix){const stem=prefix[2];
// A prefix-like spelling alone does not prove separability (e.g. antworten, besuchen).
// Generate only when the base verb is independently attested in our irregular list.
const core=irregular[stem]||null;
if(core)f=core.map(x=>x+' '+prefix[1]);}if(!f)return null;return reflex?f.map((form,i)=>reflexiveForm(form,i,v)):f}
function pastInfo(w){return past[baseWord(w)]||null}
// A finite Präteritum verb comes immediately after ich; the reflexive pronoun
// follows that finite form, and a separable particle stays at the end.
function pastSentence(w,entry,tense){
 const reflexive=/^sich\s+/.test(w),verb=baseWord(w);
 const pronoun=reflexive?reflexivePronoun(verb,0):null;
 if(tense==='perfekt')return ['ich',entry[2]==='sein'?'bin':'habe',pronoun,entry[1]].filter(Boolean).join(' ');
 const [finite,...particles]=entry[0].trim().split(/\s+/);
 return ['ich',finite,pronoun,...particles].filter(Boolean).join(' ');
}
function pastDrillForm(tense,label){return `<form class="past-drill-form" data-tense="${tense}"><label>${label}<input name="sentence" lang="de" dir="ltr" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="140" required placeholder="ich ..." aria-label="اكتب جملة ${label} بالألمانية"></label><button type="submit">تحقق من إجابتي</button><p class="past-result" role="status" aria-live="polite"></p></form>`}
function normalizePastAnswer(text){return String(text??'').normalize('NFC').toLocaleLowerCase('de-DE').trim().replace(/[.!?؟،]+$/u,'').replace(/\s+/g,' ')}
function info(m,d){return M[m].verbs.slice((d-1)*PER,d*PER)}
function title(){return `<div class="hero-card"><span class="eyebrow">VERBKONJUGATION · A1—B1</span><h1>الصرف والتحويل</h1><p>15 فعلاً يومياً · 30 يوماً لكل مستوى · تعلّم، استمع، اختبر نفسك، وافتح اليوم التالي.</p><div class="mini-stats"><span>📚 1350 مدخلاً للتعلّم</span><span>📆 90 يوماً</span><span>✓ ${Object.keys(state.done).filter(k=>/^[012]-(?:[1-9]|[12]\d|30)$/.test(k)&&state.done[k]===true).length} يوماً مكتملة</span></div></div>`}
function levels(){return `<div class="levels">${M.map((x,i)=>`<button data-level="${i}" class="level-card ${m===i?'active':''} ${levelOpen(i)?'':'locked'}"><strong>${x.level}</strong><span>450 مدخلاً · 30 يوماً</span><small>${levelOpen(i)?levelDone(i)?'✓ مكتمل':'متاح':'🔒 أكمل المستوى السابق'}</small></button>`).join('')}</div>`}
function days(){return `<h2>أيام مستوى ${M[m].level}</h2><div class="days">${Array.from({length:30},(_,i)=>{const n=i+1,open=dayOpen(m,n),done=state.done[`${m}-${n}`]===true;return `<button data-day="${n}" class="day ${d===n?'active':''} ${done?'completed':''} ${open?'':'locked'}" aria-label="اليوم ${n}${open?'':' مغلق'}">${open?(done?'✓ ':''):'🔒 '}${n}</button>`}).join('')}</div>`}
function verbCard(w,i){return `<button data-verb="${i}" class="verb-item ${i===selected?'selected':''}"><span class="verb-number">${i+1}</span><span><strong dir="ltr">${esc(w[0])}</strong><small>${esc(w[1])}</small></span><span>›</span></button>`}
function table(heading,rows){return `<section class="tense"><h3>${heading}</h3><div class="table-scroll"><table><thead><tr><th>الضمير</th><th>التصريف</th><th>استمع</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td dir="ltr">${pron[i]}</td><td dir="ltr"><b>${esc(r)}</b></td><td><button data-speak="${esc(pron[i].split('/')[0]+' '+r)}" aria-label="استمع">🔊</button></td></tr>`).join('')}</tbody></table></div></section>`}
function detail(w){const verb=w[0],f=present(verb),p=pastInfo(verb),level=M[m].level;let h=`<div class="detail-head"><div><span class="eyebrow">${level} · فعل ${selected+1} من 15</span><h2 dir="ltr">${esc(verb)}</h2><p>${esc(w[1])}</p></div><button data-speak="${esc(verb)}" class="speak">🔊 استمع</button></div>`;
if(f){h+=`<p class="hint">${verifiedPresent[baseWord(verb)]||irregular[baseWord(verb)]?'✓ تصريف حاضر في الجداول المراجَعة':'⚪ تصريف مقترح وفق قاعدة عامة (غير مدقَّق لهذا الفعل)'}</p>`;h+=table('Präsens — المضارع',f);if(!verifiedPresent[baseWord(verb)]&&!irregular[baseWord(verb)])h+='<p class="hint">هذه الصيغ مقترحة آلياً وفق قواعد عامة وقد لا تصح مع جميع الأفعال، لذلك لا تدخل أسئلة التصريف المصححة آلياً قبل التحقق منها. راجع القاموس المرتبط أدناه.</p>'}else h+=`<div class="notice"><strong>تصريف يحتاج إلى مراجعة خاصة</strong><p>هذا الفعل قد يكون شاذاً أو منفصلاً أو انعكاسياً. لا نعرض تصريفاً آلياً غير مؤكّد. استمع إلى المصدر وراجعه في قاموس تصريف موثوق.</p><a href="https://www.verbformen.com/conjugation/?w=${encodeURIComponent(baseWord(verb))}" target="_blank" rel="noopener noreferrer">فتح جدول التصريف في Verbformen ↗</a></div>`;
// V91: vorstellen has two reflexive senses; show and grade a clearly identified sense.
if(verb==='sich vorstellen'&&verifiedPresent.vorstellen){
 const imagine=verifiedPresent.vorstellen.map((form,i)=>{
  const parts=form.split(' ');
  parts.splice(1,0,['mir','dir','sich','uns','euch','sich'][i]);
  return parts.join(' ');
 });
 h+=`<section class="tense"><h3>انتبه: لهذا الفعل معنيان مختلفان</h3><p><b>التعريف بالنفس — Akkusativ:</b> <span dir="ltr">Ich stelle mich vor.</span> (أعرّف بنفسي).</p><p><b>التخيّل — Dativ:</b> <span dir="ltr">Ich stelle mir eine Reise vor.</span> (أتخيّل رحلة).</p><p class="hint">في الاختبار سنحدد معنى التعريف بالنفس حتى لا يُعدّ معنى التخيّل خطأً.</p></section>`;
 h+=table('Präsens — التخيّل (Dativ)',imagine);
}
if(level!=='A1'){if(p){h+=`<section class="tense"><h3>Perfekt — الماضي المركب</h3><p dir="ltr"><strong>${esc(pastSentence(verb,p,'perfekt'))}</strong></p><p>الفعل المساعد: ${p[2]==='sein'?'sein':'haben'} · Partizip II: <b dir="ltr">${esc(p[1])}</b></p></section>`}else h+=`<p class="hint">للحصول على Perfekt الصحيح لهذا الفعل، افتح القاموس المرتبط أعلاه أو رابط التحقق أدناه.</p>`}
if(level==='B1'&&p){h+=`<section class="tense"><h3>Präteritum — الماضي البسيط</h3><p dir="ltr"><strong>${esc(pastSentence(verb,p,'praeteritum'))}</strong></p><p>هذه صيغة المتكلم (ich)، وليست جدولاً كاملاً لجميع الضمائر.</p></section>`}
if(/^sich\s+/.test(verb)&&reflexiveDative.has(baseWord(verb)))h+='<p class="hint">ملاحظة: هذا الاستعمال يأخذ الضمير الانعكاسي في حالة Dativ (mir / dir). وغالباً يحتاج إلى مفعول أو تتمة في الجملة.</p>';
if(level!=='A1'&&p){h+=`<section class="past-drill"><h3>✍️ تدرب على الماضي بنفسك</h3><p class="hint">اكتب الصيغة كاملة بدءاً من ich. التدريب للتثبيت فقط ولا يغيّر نقاطك أو أقفال المراحل.</p>${pastDrillForm('perfekt','Perfekt — الماضي المركب')}${level==='B1'?pastDrillForm('praeteritum','Präteritum — الماضي البسيط'):''}</section>`}
h+=`<div class="detail-footer"><a href="https://www.verbformen.com/conjugation/?w=${encodeURIComponent(baseWord(verb))}" target="_blank" rel="noopener noreferrer">📖 جميع الصيغ الموثقة</a><button data-speak="${esc(verb)}">🔊 النطق</button></div>`;return h}
function dayView(){const arr=info(m,d);return `<div class="day-heading"><div><h2>اليوم ${d} · ${M[m].level}</h2><p>اختر فعلاً لتظهر تفاصيله وتصريفاته المناسبة لمستواك.</p></div><span>${arr.length}/15 فعلاً</span></div><div class="learning-layout"><div class="verb-list">${arr.map(verbCard).join('')}</div><article class="verb-detail">${detail(arr[selected])}</article></div><div class="day-actions"><div class="quiz-mode-wrap" role="group" aria-label="طريقة الاختبار"><span>طريقة الاختبار:</span><button data-quiz-mode="choice" aria-pressed="${quizMode==='choice'}" class="${quizMode==='choice'?'chosen-mode':''}">اختيار الإجابة</button><button data-quiz-mode="typing" aria-pressed="${quizMode==='typing'}" class="${quizMode==='typing'?'chosen-mode':''}">⌨️ كتابة التصريف</button></div><button class="primary" id="beginQuiz">🧠 اختبار أفعال اليوم</button><span>الاختبار يجمع بين معاني الأفعال والتصريفات التي تتوفر لها جداول مراجَعة؛ النجاح بـ80% من الإجابات لفتح اليوم التالي.</span></div>`}
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function makeQuestion(w,i){
 const forms=present(w[0]);
 // Only ask conjugation when the present-tense table is explicitly supported.
 // Distinct wrong forms are taken from the same verified table; never invent forms.
 if(forms && (verifiedPresent[baseWord(w[0])] || irregular[baseWord(w[0])])){
  const indices=shuffle([0,1,2,3,4,5]);
  for(const person of indices){
   const correct=forms[person];
   const distractors=[...new Set(forms.filter(x=>x!==correct))];
   if(distractors.length>=2){
    const options=shuffle([correct,...shuffle(distractors).slice(0,3)]);
    return {w,i,kind:'form',person,correct,options,typed:quizMode==='typing',context:w[0]==='sich vorstellen'?'المقصود: أعرّف بنفسي (Akkusativ)، وليس أتخيّل (Dativ).':''};
   }
  }
 }
 const alternatives=[...new Set(M[m].verbs.filter(x=>x[0]!==w[0]&&x[1]!==w[1]).map(x=>x[1]))];
 return {w,i,kind:'meaning',correct:w[1],options:shuffle([w[1],...shuffle(alternatives).slice(0,3)]),typed:false};
}
function completeQuiz(){
 // A successful quiz must not unlock a day until the browser confirms storage.
 if(!quiz||quiz.saved||!quiz.finished&&(quiz.index!==quiz.items.length-1||quiz.answer===null))return;
 quiz.finished=true;
 const k=`${m}-${d}`,previousScore=state.scores[k],previousDone=state.done[k];
 const old=Number(previousScore),pass=quiz.score>=Math.ceil(quiz.items.length*.8);
 state.scores[k]=Math.max(Number.isFinite(old)?old:0,quiz.score);
 if(pass)state.done[k]=true;
 if(save()){
   quiz.saved=true;quiz.saveFailed=false;
   if(pass)window.UI?.play('win');
 }else{
   if(previousScore===undefined)delete state.scores[k];else state.scores[k]=previousScore;
   if(previousDone===undefined)delete state.done[k];else state.done[k]=previousDone;
   quiz.saveFailed=true;
   window.UI?.toast?.('تعذر حفظ نتيجة التصريف. أفرغ مساحة التخزين ثم أعد المحاولة.');
 }
}
function startQuiz(){if(!dayOpen(m,d)){lockNotice('اليوم مقفل');return}const a=info(m,d);quiz={items:shuffle(a.map((w,i)=>makeQuestion(w,i))),index:0,score:0,errors:[],answer:null,saved:false};render()}
function normalizeTyped(s){return String(s??'').normalize('NFC').toLocaleLowerCase('de-DE').trim().replace(/\s+/g,' ')}
function quizAnswerCorrect(item,answer){return item.typed?typeof answer==='string'&&normalizeTyped(answer)===normalizeTyped(item.correct):Number.isInteger(answer)&&item.options[answer]===item.correct}
function submitQuizAnswer(answer){if(!quiz||quiz.answer!==null||quiz.index<0||quiz.index>=quiz.items.length)return;
 const item=quiz.items[quiz.index],valid=item.typed?(typeof answer==='string'&&answer.trim().length>0):(Number.isInteger(answer)&&answer>=0&&answer<item.options.length);
 if(!valid)return;
 quiz.answer=answer;
 if(quizAnswerCorrect(item,answer)){quiz.score++;if(state.errors[item.w[0]])delete state.errors[item.w[0]];window.UI?.play('ok')}
 else{quiz.errors.push(item.w);state.errors[item.w[0]]=(state.errors[item.w[0]]||0)+1;window.UI?.play('bad')}
 if(quiz.index===quiz.items.length-1)completeQuiz();else save();render();
}
function quizView(){
 const q=quiz;
 if(q.index>=q.items.length){const required=Math.ceil(q.items.length*.8),pass=q.score>=required;
  return `<div class="quiz-panel"><span class="eyebrow">نتيجة الاختبار</span><h2>${pass?'🎉 أحسنت!':'🌱 واصل المراجعة'}</h2><div class="score">${q.score}/${q.items.length}</div><p>${q.saveFailed?'اكتمل الاختبار لكن تعذر حفظ النتيجة على جهازك. جرّب إخلاء مساحة التخزين ثم اضغط إعادة المحاولة.':pass?'اجتزت اختبار اليوم. تم حفظ نجاحك وفتح المرحلة التالية تلقائياً. اضغط العودة للمتابعة.':'تحتاج إلى '+required+' إجابة صحيحة على الأقل. راجع الأفعال وحاول مجدداً.'}</p>${q.errors.length?`<h3>أفعال للمراجعة</h3><div class="error-list">${q.errors.map(w=>`<span dir="ltr">${esc(w[0])} — ${esc(w[1])}</span>`).join('')}</div>`:''}${q.saveFailed?'<button id="retryQuizSave" class="primary">🔄 إعادة محاولة حفظ النتيجة</button>':''}<button id="endQuiz" class="primary">العودة إلى الأفعال</button></div>`;
 }
 const item=q.items[q.index],w=item.w,form=item.kind==='form',answered=q.answer!==null,correct=answered&&quizAnswerCorrect(item,q.answer);
 let content='';
 if(item.typed){
  content=answered?`<p>إجابتك: <strong dir="ltr">${esc(q.answer)}</strong></p>`:`<form id="typeForm" class="typed-form"><label for="typedAnswer">اكتب التصريف دون ضمير الفاعل (ich / du...)، وأضف الضمير الانعكاسي عند الحاجة.</label><input id="typedAnswer" name="typedAnswer" dir="ltr" lang="de" autocomplete="off" autocapitalize="off" spellcheck="false" required maxlength="90" placeholder="اكتب التصريف بالألمانية" aria-label="التصريف بالألمانية"><div class="german-chars" aria-label="حروف ألمانية خاصة">${['ä','ö','ü','ß'].map(c=>`<button type="button" data-insert-char="${c}" aria-label="أدخل الحرف ${c}">${c}</button>`).join('')}</div><button type="submit" class="primary">تحقق من إجابتي</button></form>`;
 }else{
  content=`<div class="quiz-options">${item.options.map((o,i)=>`<button data-answer="${i}" ${answered?'disabled':''} class="${answered?(o===item.correct?'right':q.answer===i?'wrong':''):''}" ${form?'dir="ltr"':''}>${esc(o)}</button>`).join('')}</div>`;
 }
 return `<div class="quiz-panel"><span class="eyebrow">اختبار اليوم ${d} · ${M[m].level}${item.typed?' · كتابة':''}</span><h2>${form?(item.typed?'اكتب التصريف الصحيح في المضارع':'اختر التصريف الصحيح في المضارع'):'ما معنى هذا الفعل؟'}</h2><div class="quiz-progress">السؤال ${q.index+1} من ${q.items.length} · النتيجة ${q.score}</div><div class="progress-track"><i style="width:${q.index/q.items.length*100}%"></i></div><h2 dir="ltr" class="quiz-word">${esc(w[0])}</h2>${item.context?`<p class="hint">${esc(item.context)}</p>`:''}${form?`<p dir="ltr" class="quiz-pronoun">${esc(pron[item.person])} ______</p>`:''}${content}${answered?`<div class="feedback ${correct?'good':'bad'}" role="status">${correct?'إجابة صحيحة!':'الإجابة الصحيحة: '+esc(item.correct)}${form?`<p dir="ltr">${esc(pron[item.person].split('/')[0]+' '+item.correct)}</p>`:''}</div><button id="nextQuestion" class="primary">${q.index===q.items.length-1?'عرض النتيجة':'السؤال التالي ←'}</button>`:''}${quizMode==='typing'&&!item.typed&&!answered?'<p class="hint">هذا الفعل ليس له جدول مضارع مدقَّق، لذلك يظهر سؤال المعنى بدلاً من كتابة تصريف تخميني.</p>':''}</div>`;
}
function render(){if(!levelOpen(m)){m=0;d=1;quiz=null}if(!dayOpen(m,d)){d=1;quiz=null}selected=Math.min(selected,14);$('root').innerHTML=title()+levels()+days()+(quiz?quizView():dayView())+'<p class="footnote">تُحفظ نتائج التصريف على الجهاز وتُزامَن مع الحساب السحابي عند توفر الاتصال.</p>'}
function lockNotice(t){if(window.UI){UI.play('lock');UI.toast(t)}else alert(t)}
$('root').addEventListener('click',e=>{const b=e.target.closest('button,a');if(!b)return;
if(b.dataset.level!==undefined){const i=Number(b.dataset.level);if(!Number.isInteger(i)||i<0||i>=M.length)return;if(!levelOpen(i)){lockNotice('🔒 أكمل أيام الصرف السابقة واجتز اختبارات المستوى السابق.');return}m=i;d=1;selected=0;quiz=null;render();return}
if(b.dataset.day!==undefined){const n=Number(b.dataset.day);if(!Number.isInteger(n)||n<1||n>30)return;if(!dayOpen(m,n)){lockNotice('🔒 أكمل اختبار اليوم السابق أولاً.');return}d=n;selected=0;quiz=null;render();return}
if(b.dataset.verb!==undefined){const i=Number(b.dataset.verb);if(!Number.isInteger(i)||i<0||i>=info(m,d).length)return;selected=i;render();if(window.innerWidth<750)document.querySelector('.verb-detail')?.scrollIntoView({behavior:'smooth',block:'start'});return}
if(b.dataset.speak!==undefined){speak(b.dataset.speak);return}
if(b.dataset.insertChar!==undefined){const field=$('typedAnswer');if(field&&['ä','ö','ü','ß'].includes(b.dataset.insertChar)){const a=field.selectionStart??field.value.length,z=field.selectionEnd??a;field.value=field.value.slice(0,a)+b.dataset.insertChar+field.value.slice(z);field.focus();field.setSelectionRange(a+1,a+1)}return}
if(b.dataset.quizMode!==undefined&&!quiz){if(['choice','typing'].includes(b.dataset.quizMode)){quizMode=b.dataset.quizMode;render()}return}
if(b.id==='beginQuiz'){startQuiz();return}
if(b.dataset.answer!==undefined&&quiz&&quiz.answer===null){const chosen=Number(b.dataset.answer);if(!/^\d+$/.test(b.dataset.answer))return;submitQuizAnswer(chosen);return}
if(b.id==='nextQuestion'&&quiz&&quiz.answer!==null){quiz.index=Math.min(quiz.items.length,quiz.index+1);quiz.answer=null;render();return}
if(b.id==='retryQuizSave'&&quiz&&quiz.saveFailed){completeQuiz();render();return}
if(b.id==='endQuiz'){if(quiz?.saveFailed&&!confirm('لم يتم حفظ نتيجة هذا الاختبار. هل تريد الخروج رغم ذلك؟'))return;quiz=null;render();return}
});
$('root').addEventListener('submit',e=>{
 if(e.target.classList.contains('past-drill-form')){
  e.preventDefault();
  if(quiz)return;
  const tense=e.target.dataset.tense;
  if(!['perfekt','praeteritum'].includes(tense)||(tense==='praeteritum'&&M[m].level!=='B1'))return;
  const word=info(m,d)[selected]?.[0],entry=word?pastInfo(word):null;
  if(!entry)return;
  const input=e.target.elements.namedItem('sentence'),result=e.target.querySelector('.past-result');
  if(!input||!result)return;
  const answer=pastSentence(word,entry,tense);
  const correct=normalizePastAnswer(input.value)===normalizePastAnswer(answer);
  result.textContent=correct?'✓ صحيح! أحسنت.':'راجع ترتيب الكلمات. الإجابة النموذجية: '+answer;
  result.className='past-result '+(correct?'good':'bad');
  return;
 }
 if(e.target.id!=='typeForm')return;
 e.preventDefault();if(!quiz||quiz.answer!==null)return;
 const input=e.target.querySelector('#typedAnswer');if(input)submitQuizAnswer(input.value)
});
render();
})();
