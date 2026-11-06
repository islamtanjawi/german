(()=>{'use strict';
const sets={
A1:[{de:'Ich heiße Anna und wohne in Berlin.',ar:'اسمي آنا وأسكن في برلين.',q:'أين تسكن آنا؟',opts:['في برلين','في ميونخ','في هامبورغ'],a:0,scenario:'أنت تتعرف على شخص جديد. قدم اسمك وبلدك.',sample:'Hallo! Ich heiße Sara. Ich komme aus Marokko.',write:'اكتب ثلاث جمل عن اسمك وبلدك واللغة التي تتعلمها.'},{de:'Ich kaufe Brot und Milch im Supermarkt.',ar:'أشتري الخبز والحليب من السوبرماركت.',q:'ماذا يشتري المتحدث؟',opts:['الخبز والحليب','الماء والقهوة','الفاكهة فقط'],a:0,scenario:'أنت في متجر. اطلب خبزاً وحليباً بأدب.',sample:'Guten Tag! Ich möchte Brot und Milch, bitte.',write:'اكتب قائمة مشترياتك في جملتين ألمانيتين.'},{de:'Der Zug fährt um acht Uhr ab.',ar:'يغادر القطار في الساعة الثامنة.',q:'متى يغادر القطار؟',opts:['الساعة الثامنة','الساعة السابعة','الساعة التاسعة'],a:0,scenario:'اسأل موظف المحطة عن وقت مغادرة القطار.',sample:'Entschuldigung, wann fährt der Zug ab?',write:'اكتب سؤالاً عن وقت انطلاق القطار.'}],
A2:[{de:'Gestern habe ich meine Freundin besucht und wir haben zusammen gekocht.',ar:'زرت صديقتي أمس وطبخنا معاً.',q:'ماذا فعلا معاً؟',opts:['طبخا','درسا','سافرا'],a:0,scenario:'أخبر صديقك ماذا فعلت في عطلة نهاية الأسبوع.',sample:'Am Wochenende habe ich meine Familie besucht.',write:'اكتب أربع جمل عن عطلتك الماضية باستخدام Perfekt.'},{de:'Ich kann heute nicht kommen, weil ich einen Termin beim Arzt habe.',ar:'لا أستطيع الحضور اليوم لأن لدي موعداً عند الطبيب.',q:'لماذا لا يستطيع الحضور؟',opts:['لديه موعد طبي','لديه امتحان','لديه عمل'],a:0,scenario:'اعتذر عن موعد واقترح وقتاً جديداً.',sample:'Es tut mir leid, ich kann heute nicht. Können wir uns morgen treffen?',write:'اكتب رسالة اعتذار قصيرة واقترح موعداً بديلاً.'},{de:'Wenn das Wetter schön ist, fahren wir am Sonntag mit dem Fahrrad.',ar:'إذا كان الطقس جميلاً، سنذهب بالدراجة يوم الأحد.',q:'ما شرط الخروج بالدراجة؟',opts:['الطقس الجميل','انتهاء العمل','شراء دراجة'],a:0,scenario:'اقترح نشاطاً على صديقك مع ذكر شرط.',sample:'Wenn es nicht regnet, können wir spazieren gehen.',write:'اكتب ثلاث جمل تستخدم فيها wenn.'}],
B1:[{de:'Obwohl die Wohnung teuer ist, liegt sie sehr günstig in der Nähe des Bahnhofs.',ar:'رغم أن الشقة غالية، فهي تقع في مكان مناسب جداً قرب المحطة.',q:'ما الميزة المذكورة للشقة؟',opts:['قربها من المحطة','سعرها المنخفض','مساحتها الكبيرة'],a:0,scenario:'ناقش مزايا وعيوب السكن في وسط المدينة.',sample:'Meiner Meinung nach ist die Lage wichtig, obwohl die Miete hoch ist.',write:'اكتب فقرة قصيرة عن مزايا وعيوب السكن في المدينة.'},{de:'Viele Menschen arbeiten im Homeoffice, weil sie dadurch Zeit beim Pendeln sparen.',ar:'يعمل كثيرون من المنزل لأنهم يوفرون وقت التنقل.',q:'ما الفائدة المذكورة للعمل من المنزل؟',opts:['توفير وقت التنقل','راتب أعلى','إجازات أكثر'],a:0,scenario:'اعرض رأيك في العمل من المنزل مع سبب.',sample:'Ich finde Homeoffice praktisch, weil man Zeit spart. Andererseits fehlt der Kontakt zu Kollegen.',write:'اكتب رأيك في العمل من المنزل مع سببين.'},{de:'Die Stadt plant neue Fahrradwege, damit mehr Menschen umweltfreundlich unterwegs sind.',ar:'تخطط المدينة لمسارات دراجات جديدة لكي يتنقل عدد أكبر من الناس بطريقة صديقة للبيئة.',q:'لماذا تخطط المدينة لمسارات جديدة؟',opts:['لتشجيع التنقل الصديق للبيئة','لتوسيع الطرق للسيارات','لزيادة مواقف السيارات'],a:0,scenario:'قدم اقتراحاً لتحسين النقل في مدينتك.',sample:'Die Stadt sollte mehr Fahrradwege bauen, damit weniger Autos unterwegs sind.',write:'اكتب رسالة اقتراح قصيرة إلى البلدية.'}]};

// Add two original practical situations to each level. Existing indices 0-2 remain unchanged.
sets.A1.push(
 {de:'Der Bus Nummer sieben kommt in fünf Minuten. Eine Fahrkarte kostet zwei Euro.',ar:'الحافلة رقم سبعة تصل بعد خمس دقائق. التذكرة بثمن يوروين.',q:'Wann kommt der Bus?',opts:['In fünf Minuten','In zehn Minuten','Morgen'],a:0,scenario:'اشتر تذكرة حافلة واسأل عن موعد الوصول.',sample:'Guten Tag! Eine Fahrkarte, bitte. Wann kommt der Bus?',write:'اكتب رسالة لصديق: ستصل بعد عشر دقائق، اعتذر واسأله أين ينتظرك.',writeSample:'Hallo! Entschuldigung, ich komme heute zehn Minuten später. Bitte warte vor dem Café. Wo bist du gerade? Bis gleich!'},
 {de:'Am Freitag habe ich um 15 Uhr einen Termin beim Zahnarzt.',ar:'لدي موعد عند طبيب الأسنان يوم الجمعة في الثالثة بعد الظهر.',q:'Wann ist der Termin?',opts:['Freitag um 15 Uhr','Donnerstag um 15 Uhr','Freitag um 13 Uhr'],a:0,scenario:'اتصل بعيادة واطلب موعداً يوم الجمعة.',sample:'Guten Tag! Ich brauche einen Termin. Haben Sie am Freitag Zeit?',write:'اكتب دعوة قصيرة لصديق لتناول الغداء، مع ذكر اليوم والوقت والمكان.',writeSample:'Hallo! Hast du am Samstag Zeit? Ich möchte mit dir zu Mittag essen. Wir treffen uns um 13 Uhr vor dem Restaurant. Liebe Grüße!'}
);
sets.A2.push(
 {de:'Wegen einer Reparatur bleibt die Stadtbibliothek bis Mittwoch geschlossen. Ab Donnerstag ist sie wieder geöffnet.',ar:'بسبب إصلاحات، تبقى المكتبة مغلقة حتى الأربعاء وتفتح مجدداً الخميس.',q:'Ab wann ist die Bibliothek geöffnet?',opts:['Ab Donnerstag','Ab Dienstag','Erst ab Samstag'],a:0,scenario:'اشرح لصديق أن خطة زيارة المكتبة تغيرت واقترح بديلاً.',sample:'Die Bibliothek ist geschlossen. Deshalb schlage ich vor, dass wir uns im Café treffen.',write:'اكتب رسالة رسمية قصيرة إلى متجر: اشتريت جهازاً لكنه لا يعمل، واطلب حلاً.',writeSample:'Sehr geehrte Damen und Herren, letzte Woche habe ich bei Ihnen ein Gerät gekauft. Leider funktioniert es nicht. Ich habe den Kassenbon noch. Können Sie das Gerät bitte reparieren oder umtauschen? Ich freue mich auf Ihre Antwort. Mit freundlichen Grüßen'},
 {de:'Der nächste Erste-Hilfe-Kurs beginnt am 8. Juni. Die Anmeldung muss spätestens eine Woche vorher erfolgen.',ar:'تبدأ دورة الإسعافات الأولية يوم 8 يونيو، ويجب التسجيل قبلها بأسبوع على أبعد تقدير.',q:'Was muss man vor Kursbeginn tun?',opts:['Sich spätestens eine Woche vorher anmelden','Am ersten Kurstag bezahlen','Erst nach dem Kurs anmelden'],a:0,scenario:'اتصل واسأل عن موعد الدورة وثمنها وطريقة التسجيل.',sample:'Ich interessiere mich für Ihren Kurs. Wann beginnt er und wie kann ich mich anmelden?',write:'اكتب بريداً تسأل فيه عن دورة ألمانية: الموعد والثمن وطريقة التسجيل.',writeSample:'Sehr geehrte Damen und Herren, ich interessiere mich für Ihren Deutschkurs. Könnten Sie mir bitte mitteilen, wann der nächste Kurs beginnt und wie viel er kostet? Außerdem möchte ich wissen, wie ich mich anmelden kann. Vielen Dank im Voraus. Mit freundlichen Grüßen'}
);
sets.B1.push(
 {de:'Einige Lernende bevorzugen Onlinekurse, weil sie flexibel sind. Andere schätzen Präsenzunterricht, da sie dort Fragen direkt stellen können.',ar:'بعض المتعلمين يفضلون الدروس عبر الإنترنت لمرونتها، وآخرون يفضلون الحضور لأنهم يستطيعون طرح الأسئلة مباشرة.',q:'Warum mögen manche Menschen Präsenzunterricht?',opts:['Sie können direkt Fragen stellen','Der Unterricht ist immer kostenlos','Es gibt keine Hausaufgaben'],a:0,scenario:'ناقش التعلم عن بُعد مع ذكر ميزة وعيب ورأيك.',sample:'Onlinekurse sind flexibel. Andererseits lerne ich im Präsenzunterricht besser, weil ich direkt nachfragen kann.',write:'اكتب فقرة عن التعليم الإلكتروني: مقدمة، ميزتان، عيب، ورأيك الشخصي.',writeSample:'Onlineunterricht spielt heute eine wichtige Rolle. Ein Vorteil ist, dass man von zu Hause aus lernen kann und keine Zeit für den Weg verliert. Außerdem lassen sich viele Materialien jederzeit wiederholen. Allerdings fehlt manchmal der direkte Austausch mit anderen. Meiner Meinung nach ist eine Mischung aus Online- und Präsenzunterricht besonders sinnvoll.'},
 {de:'Die Stadt will mehr Bäume pflanzen und neue Grünflächen schaffen. Die Finanzierung ist noch nicht vollständig gesichert.',ar:'تريد المدينة غرس أشجار أكثر وإنشاء مساحات خضراء، لكن التمويل لم يُؤمّن بالكامل.',q:'Was ist noch unklar?',opts:['Die vollständige Finanzierung','Ob die Stadt Bäume braucht','Wo die Stadt liegt'],a:0,scenario:'قدّم اقتراحات لحماية البيئة مع التعليل وناقش الأولويات.',sample:'Ich würde zuerst mehr Bäume pflanzen. Das verbessert die Luft, obwohl die Pflege Geld kostet.',write:'اكتب رسالة إلى المجلس المحلي تقترح فيها فكرتين لتحسين البيئة وتوضح فوائدهما.',writeSample:'Sehr geehrte Damen und Herren, ich möchte zwei Vorschläge für unsere Stadt machen. Erstens könnten wir mehr Bäume an viel befahrenen Straßen pflanzen, damit die Luft besser wird. Zweitens sollten zusätzliche Fahrradwege entstehen, weil viele Menschen gern ohne Auto fahren würden. Mir ist bewusst, dass solche Maßnahmen Geld kosten. Trotzdem halte ich sie langfristig für sinnvoll. Mit freundlichen Grüßen'}
);
// V49: further original situations, appended after all legacy indices.
sets.A1.push(
 {"de": "Die Apotheke ist neben der Bank. Sie ist heute bis achtzehn Uhr geöffnet.", "ar": "الصيدلية بجوار البنك، وهي مفتوحة اليوم حتى الساعة السادسة مساءً.", "q": "Wo ist die Apotheke?", "opts": ["Neben der Bank", "Neben der Schule", "Im Bahnhof"], "a": 0, "note": "Neben der Bank تعني بجانب البنك؛ ركّز على كلمة neben.", "scenario": "اسأل أحد المارة بأدب عن مكان أقرب صيدلية.", "sample": "Entschuldigung, wo ist die nächste Apotheke? Ist sie weit von hier?", "write": "اكتب رسالة قصيرة تسأل فيها صديقاً عن عنوان صيدلية ووقت إغلاقها.", "writeSample": "Hallo! Wo ist die Apotheke in deiner Straße? Ich brauche heute etwas aus der Apotheke. Weißt du, wann sie schließt? Vielen Dank!"},
 {"de": "Heute beginnt der Deutschkurs um neun Uhr. Morgen beginnt er um halb zehn.", "ar": "تبدأ دورة الألمانية اليوم في التاسعة، وغداً في التاسعة والنصف.", "q": "Wann beginnt der Kurs morgen?", "opts": ["Um halb zehn", "Um neun Uhr", "Um zehn Uhr"], "a": 0, "note": "halb zehn تعني 9:30، وليس 10:30.", "scenario": "اتصل بالمدرسة واستفسر عن توقيت حصة اللغة الألمانية غداً.", "sample": "Guten Tag! Wann beginnt der Deutschkurs morgen? Um neun oder um halb zehn?", "write": "اكتب رسالة إلى زميل تخبره فيها بموعد دورة الألمانية غداً.", "writeSample": "Hallo! Morgen beginnt unser Deutschkurs um halb zehn. Bitte komm pünktlich zur Schule. Wir treffen uns vor dem Eingang. Bis morgen!"},
 {"de": "Am Samstag ist ein Flohmarkt im Stadtpark. Er beginnt um zehn Uhr und endet um sechzehn Uhr.", "ar": "يوجد سوق للأشياء المستعملة في الحديقة يوم السبت، من العاشرة إلى الرابعة.", "q": "An welchem Tag ist der Flohmarkt?", "opts": ["Am Samstag", "Am Sonntag", "Am Freitag"], "a": 0, "note": "Am Samstag تعني يوم السبت. ركّز على كلمة اليوم.", "scenario": "ادعُ صديقاً إلى سوق السبت وحدد وقتاً ومكاناً للقاء.", "sample": "Hast du am Samstag Zeit? Wir können um elf Uhr zum Flohmarkt im Park gehen.", "write": "اكتب دعوة قصيرة لصديق لزيارة السوق مع ذكر اليوم والوقت.", "writeSample": "Hallo! Möchtest du am Samstag mit mir auf den Flohmarkt gehen? Wir treffen uns um elf Uhr am Eingang zum Park. Ich freue mich!"}
);
sets.A2.push(
 {"de": "Mein Kollege ist seit Montag krank. Er kommt voraussichtlich am Donnerstag wieder ins Büro.", "ar": "زميلي مريض منذ الاثنين، ويُتوقع أن يعود إلى المكتب يوم الخميس.", "q": "Wann kommt der Kollege wahrscheinlich zurück?", "opts": ["Am Donnerstag", "Am Dienstag", "Am Montag"], "a": 0, "note": "voraussichtlich تعني على الأرجح، وليس موعداً مؤكداً.", "scenario": "أبلغ زميلاً بأن أحد أعضاء الفريق مريض واقترح تقسيم العمل.", "sample": "Unser Kollege ist krank. Ich übernehme heute seine Termine. Kannst du die E-Mails beantworten?", "write": "اكتب رسالة إلى فريق العمل تشرح فيها غياب زميل وتوزيع مهمتين.", "writeSample": "Hallo zusammen, unser Kollege ist leider seit Montag krank. Er kommt wahrscheinlich am Donnerstag zurück. Bis dahin übernehme ich die Termine. Könnt ihr bitte die eingehenden E-Mails beantworten? Vielen Dank für eure Hilfe!"},
 {"de": "Ich habe letzte Woche einen Rucksack bestellt. Leider fehlt die Rechnung. Könnten Sie mir diese bitte per E-Mail schicken?", "ar": "طلبت حقيبة ظهر الأسبوع الماضي، لكن الفاتورة غير موجودة، وأطلب إرسالها بالبريد.", "q": "Was fehlt der Person?", "opts": ["Die Rechnung", "Der Rucksack", "Die Adresse"], "a": 0, "note": "fehlen تعني ينقص أو غير موجود؛ Rechnung هي الفاتورة.", "scenario": "اتصل بخدمة العملاء لطلب فاتورة شراء لم تصلك.", "sample": "Guten Tag! Ich habe einen Rucksack bei Ihnen gekauft. Leider habe ich keine Rechnung erhalten.", "write": "اكتب رسالة رسمية قصيرة تطلب فيها فاتورة منتج اشتريته.", "writeSample": "Sehr geehrte Damen und Herren, ich habe letzte Woche einen Rucksack in Ihrem Online-Shop bestellt. Leider war keine Rechnung dabei. Könnten Sie mir die Rechnung bitte per E-Mail zusenden? Vielen Dank im Voraus. Mit freundlichen Grüßen"},
 {"de": "Wegen des starken Winds fällt die Wanderung am Sonntag aus. Stattdessen treffen wir uns um elf Uhr im Museum.", "ar": "بسبب الرياح القوية أُلغيت رحلة المشي يوم الأحد، وسيجتمع المشاركون في المتحف في الحادية عشرة بدلاً منها.", "q": "Was machen die Teilnehmenden stattdessen?", "opts": ["Sie treffen sich im Museum", "Sie machen die Wanderung", "Sie bleiben alle zu Hause"], "a": 0, "note": "stattdessen تعني بدلاً من ذلك؛ انتبه إلى تغيّر الخطة.", "scenario": "اشرح لصديق إلغاء نزهة بسبب الطقس واقترح نشاطاً بديلاً.", "sample": "Unsere Wanderung fällt wegen des Winds aus. Wie wäre es mit einem Besuch im Museum?", "write": "اكتب رسالة قصيرة لمجموعة أصدقاء تشرح تغيير خطة يوم الأحد.", "writeSample": "Hallo zusammen, leider können wir am Sonntag wegen des starken Winds nicht wandern. Deshalb schlage ich vor, dass wir uns um elf Uhr am Museum treffen. Dort können wir die neue Ausstellung besuchen. Passt euch das?"}
);
sets.B1.push(
 {"de": "Seit drei Wochen werden die Wohnungen im Haus renoviert. Die Arbeiten beginnen oft schon um sieben Uhr, obwohl die Hausordnung Ruhe bis acht Uhr vorsieht.", "ar": "تجري أعمال تجديد منذ ثلاثة أسابيع، وتبدأ أحياناً في السابعة رغم أن النظام يفرض الهدوء حتى الثامنة.", "q": "Was kritisiert die Person?", "opts": ["Den frühen Lärm durch Bauarbeiten", "Die hohen Heizkosten", "Fehlende Parkplätze"], "a": 0, "note": "obwohl تربط بين واقعين متعارضين: بدء الأعمال في السابعة ووجوب الهدوء حتى الثامنة.", "scenario": "تحدث مع إدارة المبنى بشأن الضوضاء واطلب الالتزام بساعات الهدوء.", "sample": "Ich verstehe, dass renoviert werden muss. Trotzdem sollten die Arbeiten nicht vor acht Uhr beginnen.", "write": "اكتب رسالة شكوى مهذبة لإدارة المبنى، مع وصف المشكلة وحل مقترح.", "writeSample": "Sehr geehrte Hausverwaltung, seit drei Wochen finden in unserem Haus Renovierungsarbeiten statt. Leider beginnen die Arbeiten häufig bereits um sieben Uhr morgens, obwohl laut Hausordnung bis acht Uhr Ruhe sein sollte. Ich bitte Sie deshalb, die vereinbarten Ruhezeiten einzuhalten. Vielen Dank für Ihr Verständnis. Mit freundlichen Grüßen"},
 {"de": "Die Verkehrsbetriebe bieten jetzt ein digitales Monatsticket an. Wer es kauft, kann es auf dem Smartphone zeigen. Eine gedruckte Fahrkarte ist weiterhin möglich.", "ar": "توفر شركة النقل اشتراكاً شهرياً رقمياً على الهاتف، مع استمرار إمكانية استعمال التذكرة الورقية.", "q": "Welche Aussage ist richtig?", "opts": ["Man kann weiterhin ein Papierticket benutzen", "Nur digitale Tickets sind gültig", "Das Monatsticket gilt nur einen Tag"], "a": 0, "note": "weiterhin möglich تعني ما زال ممكناً؛ التحول الرقمي لا يلغي الخيار الورقي.", "scenario": "ناقش إيجابيات وسلبيات التذاكر الرقمية بالنسبة لكبار السن.", "sample": "Digitale Tickets sind praktisch. Trotzdem brauchen einige Menschen weiterhin die Möglichkeit, Tickets auf Papier zu kaufen.", "write": "اكتب رأيك في التذاكر الرقمية مع حجتين وخاتمة قصيرة.", "writeSample": "Meiner Meinung nach sind digitale Fahrkarten eine gute Lösung, weil man sie nicht so leicht verliert und jederzeit auf dem Handy zeigen kann. Allerdings besitzen nicht alle Menschen ein Smartphone. Deshalb sollte es auch in Zukunft eine Möglichkeit geben, Tickets auf Papier zu kaufen. So bleibt der öffentliche Verkehr für alle zugänglich."},
 {"de": "Ein Verein sucht Freiwillige, die älteren Menschen beim Einkaufen helfen. Die Einsätze finden zweimal pro Woche statt. Interessierte können sich online anmelden.", "ar": "تبحث جمعية عن متطوعين لمساعدة كبار السن في التسوق مرتين أسبوعياً، ويمكن التسجيل عبر الإنترنت.", "q": "Was sollen die Freiwilligen machen?", "opts": ["Ältere Menschen beim Einkaufen unterstützen", "Computerkurse für Kinder leiten", "Im Verein Sport treiben"], "a": 0, "note": "beim Einkaufen helfen يعني المساعدة أثناء التسوق.", "scenario": "قدّم فكرة تطوعية لجيرانك وأجب عن أسئلتهم حول الوقت والفوائد.", "sample": "Wir könnten zweimal pro Woche älteren Nachbarn beim Einkaufen helfen. So unterstützen wir Menschen, die nicht mobil sind.", "write": "اكتب إعلاناً لجمع متطوعين يوضح الهدف والوقت وطريقة التسجيل.", "writeSample": "Liebe Nachbarinnen und Nachbarn, wir möchten älteren Menschen in unserem Viertel helfen. Dafür suchen wir Freiwillige, die zweimal pro Woche beim Einkaufen unterstützen können. Die Einsätze dauern jeweils ungefähr eine Stunde. Wer mitmachen möchte, kann sich über das Online-Formular unseres Vereins anmelden. Gemeinsam können wir den Alltag vieler Menschen erleichtern!"}
);
// Specific writing examples separate from the speaking models; the earlier saved tasks are unchanged.
const writingModels={
 A1:[
 'Hallo! Ich heiße Lena. Ich komme aus Deutschland und wohne in einer kleinen Stadt. Ich lerne jetzt Deutsch und spreche auch Englisch.',
 'Heute kaufe ich Brot, Milch und Äpfel im Supermarkt. Ich brauche auch Wasser und Reis für das Abendessen.',
 'Entschuldigung, wann fährt der nächste Zug nach Köln ab? Ich möchte um acht Uhr fahren. Wo kann ich eine Fahrkarte kaufen?'
 ],
 A2:[
 'Am Wochenende habe ich meine Familie besucht. Wir haben zusammen gekocht und danach einen Film gesehen. Am Sonntag bin ich im Park spazieren gegangen. Das Wetter war schön und ich habe mich gut erholt.',
 'Liebe Freundin, es tut mir leid, aber ich kann morgen nicht zum Treffen kommen, weil ich einen wichtigen Termin habe. Können wir uns stattdessen am Donnerstag um 17 Uhr treffen? Ich hoffe, das passt dir. Viele Grüße!',
 'Wenn es am Wochenende nicht regnet, können wir eine Fahrradtour machen. Wenn du möchtest, bringe ich etwas zu essen mit. Falls es schlechtes Wetter gibt, treffen wir uns zu Hause und spielen zusammen.'
 ],
 B1:[
 'Das Wohnen in der Innenstadt hat mehrere Vorteile. Man erreicht viele Geschäfte und den öffentlichen Verkehr schnell, sodass man nicht unbedingt ein Auto braucht. Allerdings sind die Mieten oft hoch und es kann laut sein. Für mich ist eine gute Verkehrsanbindung besonders wichtig. Deshalb würde ich eine kleinere Wohnung in zentraler Lage bevorzugen.',
 'Ich finde das Arbeiten im Homeoffice grundsätzlich praktisch, weil man Zeit auf dem Arbeitsweg spart. Außerdem kann man den Tag oft flexibler organisieren. Auf der anderen Seite fehlt manchmal der persönliche Kontakt zu den Kolleginnen und Kollegen. Meiner Meinung nach sollte man deshalb sowohl von zu Hause als auch im Büro arbeiten können.',
 'Sehr geehrte Damen und Herren, ich möchte vorschlagen, dass in unserer Stadt zusätzliche Fahrradwege gebaut werden. Viele Menschen würden dann häufiger das Fahrrad benutzen. Dadurch könnten Verkehr und Lärm reduziert werden. Wichtig wäre außerdem, sichere Abstellplätze an Bahnhöfen einzurichten. Ich würde mich freuen, wenn Sie diese Ideen prüfen. Mit freundlichen Grüßen'
 ]
};
for(const level of ['A1','A2','B1'])writingModels[level].forEach((text,i)=>{sets[level][i].writeSample=text});

const KEY='deutsch-skills-v1',PATH_KEY='deutsch-skills-path-v1',MISTAKES_KEY='deutsch-skills-mistakes-v1',PATH=window.LearningPath;
const levels=['A1','A2','B1'],modes=['listen','speak','write'],CORE_TASKS=5;
const $=s=>document.querySelector(s);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=k=>{try{const value=JSON.parse(localStorage.getItem(k)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch{return {}}};
let done=read(PATH_KEY),saved=read(KEY),mistakes=read(MISTAKES_KEY),level='A1',mode='listen',idx=0,showText=false,answered=null,transcript='';
let writeChecks={content:false,review:false},speakChecks={task:false,pronunciation:false};
const wordCount=text=>(String(text||'').trim().match(/\S+/g)||[]).length;
const wordsNeeded=l=>({A1:12,A2:25,B1:45}[l]);
const taskKey=(l,m,i)=>`${l}-${m}-${i}`;
const completed=(l,m,i)=>done[taskKey(l,m,i)]===true;
const countDone=(l,m)=>sets[l].reduce((sum,_,i)=>sum+(completed(l,m,i)?1:0),0);
// The original materials often placed the correct choice first. Randomize once per task
// and keep the order stable while the learner reveals text or retries the question.
const listeningChoices=new Map();
function choicesFor(l,i){
 const key=l+'-'+i;
 if(!listeningChoices.has(key)){
  const t=sets[l][i],choices=t.opts.map((text,n)=>({text,correct:n===t.a}));
  for(let k=choices.length-1;k>0;k--){const r=Math.floor(Math.random()*(k+1));[choices[k],choices[r]]=[choices[r],choices[k]]}
  listeningChoices.set(key,choices);
 }
 return listeningChoices.get(key);
}
function save(k,value){try{localStorage.setItem(k,JSON.stringify(value));return true}catch{window.UI?.toast('تعذر حفظ البيانات: مساحة المتصفح ممتلئة. أنشئ نسخة احتياطية.');return false}}
function modeOpen(l,m){const n=modes.indexOf(m);return !!PATH?.levelOpen(l)&&(n===0||sets[l].slice(0,CORE_TASKS).every((_,i)=>completed(l,modes[n-1],i)))}
function taskOpen(l,m,i){return !!sets[l]?.[i]&&modeOpen(l,m)&&(i===0||completed(l,m,i-1))}
function recordListening(l,i,correct){
 const k=`${l}-listen-${i}`,old=mistakes[k];
 const prev=old&&typeof old==='object'&&!Array.isArray(old)?old:{};
 const update={...mistakes,[k]:{wrong:Math.min(999,Math.max(0,Number(prev.wrong)||0)+(correct?0:1)),pending:!correct,lastAttempt:new Date().toISOString()}};
 if(save(MISTAKES_KEY,update))mistakes=update;
}
function pendingListening(l){return Object.entries(mistakes).filter(([k,x])=>{
 const match=k.match(/^(A1|A2|B1)-listen-(\d+)$/);
 if(!match||match[1]!==l||!x||x.pending!==true)return false;
 const index=Number(match[2]);return Number.isInteger(index)&&taskOpen(l,'listen',index);
 }).map(([key,x])=>({index:Number(key.split('-').at(-1)),wrong:Number(x.wrong)||1})).sort((a,b)=>a.index-b.index)}
function renderListeningReview(){
 const box=$('#listeningReview');if(!box)return;
 const pending=pendingListening(level);
 box.innerHTML=`<h2>🧠 مراجعة أخطاء الاستماع · ${level}</h2><p>${pending.length?`لديك ${pending.length} تدريب يحتاج إلى مراجعة. اجتز الإجابة الصحيحة لإزالته من هذه القائمة.`:'لا توجد أخطاء استماع معلّقة في هذا المستوى.'}</p>${pending.length?`<div class="review-items">${pending.map(({index,wrong})=>`<button data-review-listen="${index}">🔁 التدريب ${index+1} · ${wrong} محاولة خاطئة</button>`).join('')}</div>`:''}`;
}
function markComplete(l,m,i){const key=taskKey(l,m,i);const update={...done,[key]:true};if(!save(PATH_KEY,update))return false;done=update;return true}
function say(text){if(!('speechSynthesis' in window)){window.UI?.toast('النطق الآلي غير متاح في هذا المتصفح.');return}const u=new SpeechSynthesisUtterance(text);u.lang='de-DE';u.rate=.86;speechSynthesis.cancel();speechSynthesis.speak(u)}
let activeRecognition=null;
let voiceRecorder=null,voiceStream=null,voiceChunks=[],voiceUrl=null;
let voiceMimeType="";
let voicePermissionPending=false;
let voiceRequestVersion=0;
let meterContext=null,meterAnalyser=null,meterFrame=0,meterData=null;
function stopVoiceMeter(){
 if(meterFrame){cancelAnimationFrame(meterFrame);meterFrame=0}
 meterAnalyser=null;meterData=null;
 if(meterContext){const old=meterContext;meterContext=null;old.close().catch(()=>{})}
 const area=$('#voiceMeter');if(area){area.value=0;area.hidden=true}
 const label=$('#voiceMeterLabel');if(label)label.hidden=true
}
function startVoiceMeter(stream){
 stopVoiceMeter();
 const AC=window.AudioContext||window.webkitAudioContext;
 const bar=$('#voiceMeter');
 if(!AC||!bar)return;
 try{
  const ctx=new AC();meterContext=ctx;
  const source=ctx.createMediaStreamSource(stream);
  const analyser=ctx.createAnalyser();analyser.fftSize=512;
  source.connect(analyser);meterAnalyser=analyser;
  meterData=new Uint8Array(analyser.fftSize);
  bar.hidden=false;const label=$('#voiceMeterLabel');if(label)label.hidden=false;
  const draw=()=>{
   if(meterContext!==ctx||voiceRecorder?.state!=='recording')return;
   analyser.getByteTimeDomainData(meterData);
   let sum=0;for(const x of meterData){const v=(x-128)/128;sum+=v*v}
   const rms=Math.sqrt(sum/meterData.length);
   bar.value=Math.min(100,Math.round(rms*360));
   meterFrame=requestAnimationFrame(draw);
  };
  meterFrame=requestAnimationFrame(draw);
 }catch{stopVoiceMeter()}
}
function voiceStatus(message){const el=$('#voiceStatus');if(el)el.textContent=message}
function releaseVoiceStream(){if(voiceStream){voiceStream.getTracks().forEach(track=>track.stop());voiceStream=null}}
function clearVoice(){
 voiceRequestVersion++;
 if(voiceRecorder&&voiceRecorder.state!=='inactive'){voiceRecorder.onstop=null;try{voiceRecorder.stop()}catch{}}
 stopVoiceMeter();voiceRecorder=null;releaseVoiceStream();voiceChunks=[];voiceMimeType="";
 if(voiceUrl){URL.revokeObjectURL(voiceUrl);voiceUrl=null}
}
async function toggleVoiceRecording(){
 if(voiceRecorder&&voiceRecorder.state==='recording'){voiceStatus('جارٍ تجهيز التسجيل…');stopVoiceMeter();voiceRecorder.stop();return}
 if(voicePermissionPending)return;
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){voiceStatus('التسجيل الصوتي غير مدعوم في هذا المتصفح.');return}
 if(!window.isSecureContext){voiceStatus('يحتاج التسجيل إلى HTTPS أو localhost.');return}
 const targetLevel=level,targetIdx=idx,requestVersion=++voiceRequestVersion;
 const btn=$('#recordVoice');voicePermissionPending=true;if(btn)btn.disabled=true;
 voiceStatus('جارٍ طلب إذن الميكروفون…');
 try{
  const stream=await navigator.mediaDevices.getUserMedia({audio:true});
  if(requestVersion!==voiceRequestVersion||mode!=='speak'||level!==targetLevel||idx!==targetIdx||document.hidden){stream.getTracks().forEach(t=>t.stop());return}
  clearVoice();voiceStream=stream;voiceChunks=[];
  const recorder=new MediaRecorder(stream);voiceRecorder=recorder;
  recorder.ondataavailable=e=>{if(e.data?.size)voiceChunks.push(e.data)};
  recorder.onerror=()=>{stopVoiceMeter();voiceStatus('حدث خطأ أثناء التسجيل.');releaseVoiceStream()};
  recorder.onstop=()=>{
   stopVoiceMeter();releaseVoiceStream();if(voiceRecorder!==recorder)return;
   const blob=new Blob(voiceChunks,{type:recorder.mimeType||'audio/webm'});
   voiceMimeType=blob.type;
   if(blob.size&&mode==='speak'&&level===targetLevel&&idx===targetIdx){
    if(voiceUrl)URL.revokeObjectURL(voiceUrl);voiceUrl=URL.createObjectURL(blob);
    const player=$('#voicePlayback');if(player){player.src=voiceUrl;player.hidden=false}
    const download=$('#downloadVoice');if(download)download.hidden=false;
    voiceStatus('✓ التسجيل جاهز. يمكنك تشغيل صوتك أو حفظه على جهازك.');
   }else voiceStatus('لم يتم حفظ تسجيل صوتي. حاول مرة أخرى.');
   voiceChunks=[];voiceRecorder=null;const button=$('#recordVoice');if(button){button.disabled=false;button.textContent='🎙️ تسجيل جديد'};
  };
  recorder.start();startVoiceMeter(stream);voiceStatus('● جارٍ تسجيل صوتك… راقب مؤشر الصوت ثم اضغط إيقاف التسجيل عند الانتهاء.');
  if(btn){btn.disabled=false;btn.textContent='⏹️ إيقاف التسجيل'}
 }catch(err){stopVoiceMeter();releaseVoiceStream();voiceStatus(err?.name==='NotAllowedError'?'تم رفض إذن الميكروفون. فعّله من إعدادات المتصفح.':'تعذر بدء التسجيل الصوتي.')}
 finally{voicePermissionPending=false;if(btn?.isConnected)btn.disabled=false}
}

function reset(){clearVoice();if(activeRecognition){const previous=activeRecognition;activeRecognition=null;previous.onresult=null;previous.onerror=null;try{previous.abort()}catch{}}if('speechSynthesis' in window)window.speechSynthesis.cancel();showText=false;answered=null;transcript='';writeChecks={content:false,review:false};speakChecks={task:false,pronunciation:false};render()}
function goToWorkshop(){requestAnimationFrame(()=>{const target=$('#workshop');if(!target)return;const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});target.focus({preventScroll:true})})}
function warn(text){const el=$('#practiceMessage');if(el)el.textContent=text;window.UI?.toast(text)}
function render(){
 if(!PATH?.levelOpen(level)){level='A1';mode='listen';idx=0}
 if(!modeOpen(level,mode)){mode='listen';idx=0}
 if(!taskOpen(level,mode,idx))idx=0;
 const tasks=[['listen','🎧 الاستماع والفهم'],['speak','🗣️ المحادثة والنطق'],['write','✍️ الكتابة']];
 $('#skillGrid').innerHTML=tasks.map(([m,label])=>{const open=modeOpen(level,m);return `<article class="skill-card ${m===mode?'active':''} ${open?'':'skill-locked'}"><h2>${open?'':'🔒 '}${label}</h2><p>${m==='listen'?'استمع بالنطق الآلي وأجب عن أسئلة الفهم.':m==='speak'?'تدرّب بصوتك ثم راجع عناصر الإجابة بنفسك.':'اكتب واحفظ مسودتك، ثم راجعها قبل إكمال التدريب.'}</p><p class="small">أنجزت ${countDone(level,m)} من ${sets[level].length} · 5 أساسية + 3 إضافية</p><button data-mode="${m}" ${open?'':'disabled'}>${open?'افتح المهارة':'أكمل المهارة السابقة'}</button></article>`}).join('');
 renderListeningReview();
 const t=sets[level][idx],k=`${level}-${idx}`;
 let h=`<div class="progress-row"><strong>${{listen:'الاستماع',speak:'المحادثة والنطق',write:'الكتابة'}[mode]} · ${level}</strong><span>التدريب ${idx+1} من ${sets[level].length} ${completed(level,mode,idx)?'· ✓ مكتمل':''} ${idx>=CORE_TASKS?'· تدريب تعزيز إضافي':''}</span></div><div class="actions">${levels.map(l=>`<button data-level="${l}" ${l===level?'class="primary"':''} ${PATH?.levelOpen(l)?'':'disabled'}>${PATH?.levelOpen(l)?'':'🔒 '}${l}</button>`).join('')}</div>`;
 if(mode==='listen'){
  const options=choicesFor(level,idx),correctIndex=options.findIndex(o=>o.correct);
  h+=`<h2>استمع جيداً إلى الجملة</h2><p class="small">هذا نطق آلي من المتصفح وليس تسجيلاً رسمياً. حاول الإجابة دون قراءة النص.</p><div class="actions"><button data-listen>🔊 تشغيل النطق الألماني</button><button data-toggle>${showText?'إخفاء النص':'إظهار النص والترجمة'}</button></div>${showText?`<div class="scenario"><div dir="ltr">${esc(t.de)}</div><p>${esc(t.ar)}</p></div>`:''}<h3>${esc(t.q)}</h3><div class="quiz-options">${options.map((o,i)=>`<button data-option="${i}" ${answered!==null?'disabled':''} class="${answered!==null?(i===correctIndex?'right':i===answered?'wrong':''):''}">${esc(o.text)}</button>`).join('')}</div>`;
  if(answered!==null)h+=`<div class="feedback ${answered===correctIndex?'good':'bad'}" role="status"><strong>${answered===correctIndex?'✓ إجابة صحيحة!':'✗ الإجابة غير صحيحة، جرّب مجدداً.'}</strong><p>الإجابة الصحيحة: <strong dir="auto">${esc(options[correctIndex].text)}</strong></p><p>${esc(t.note||t.ar)}</p><details><summary>راجع الجملة الألمانية والترجمة</summary><p dir="ltr">${esc(t.de)}</p><p>${esc(t.ar)}</p></details></div>${answered!==correctIndex?'<button id="retryListen">🔁 إعادة المحاولة</button>':''}`;
 }else if(mode==='speak'){
  h+=`<h2>موقف محادثة</h2><div class="scenario">${esc(t.scenario)}</div><p>تحدث بصوت واضح ثم استمع إلى نموذج للتعبير. قارن بنفسك؛ الموقع لا يقيّم النطق آلياً.</p><div class="actions"><button data-listen>🔊 الاستماع إلى النموذج</button><button data-mic>🎙️ التعرف على الكلام (اختياري)</button><button data-toggle>${showText?'إخفاء النموذج':'إظهار النموذج'}</button></div>${showText?`<div class="scenario" dir="ltr">${esc(t.sample)}</div>`:''}<section class="voice-panel" aria-label="مساحة تسجيل الصوت"><h3>🎙️ تسجيل صوتك</h3><p class="small">سجّل إجابتك واستمع إليها هنا. التسجيل مؤقت على جهازك ولا يُرفع إلى الخادم، وسيُحذف عند تغيير التدريب أو مغادرة الصفحة.</p><div class="actions"><button type="button" id="recordVoice">🎙️ ابدأ التسجيل</button><button type="button" id="deleteVoice">🗑️ حذف التسجيل</button><button type="button" id="downloadVoice" hidden>⬇️ حفظ صوتي</button></div><p id="voiceStatus" role="status" aria-live="polite">اضغط ابدأ التسجيل ثم تحدث بالألمانية.</p><label class="small" id="voiceMeterLabel" for="voiceMeter" hidden>مؤشر قوة صوت الميكروفون (ليس تقييماً للنطق)</label><meter id="voiceMeter" min="0" max="100" value="0" hidden aria-label="مستوى صوت الميكروفون"></meter><audio id="voicePlayback" controls hidden aria-label="استمع إلى تسجيل صوتك"></audio></section>${transcript?`<p>النص الذي تعرف عليه الجهاز: <span dir="ltr">${esc(transcript)}</span></p>`:''}<fieldset class="self-check"><legend>تقييم ذاتي قبل المتابعة</legend><label><input type="checkbox" data-speak-check="task" ${speakChecks.task?'checked':''}> تحدثت عن عناصر الموقف المطلوبة</label><label><input type="checkbox" data-speak-check="pronunciation" ${speakChecks.pronunciation?'checked':''}> استمعت إلى النموذج وأعدت المحاولة عند الحاجة</label></fieldset><button id="markSpeak" class="primary">${completed(level,'speak',idx)?'✓ مكتمل — يمكنك الانتقال':'تأكيد إنجاز المحادثة'}</button>`;
 }else{
  const draft=typeof saved[k]==='string'?saved[k]:'';const count=wordCount(draft),target=wordsNeeded(level);
  h+=`<h2>تدريب الكتابة</h2><div class="scenario">${esc(t.write)}</div><p class="small">الحد الأدنى لهذه الممارسة: ${target} كلمة (ليس معيار Goethe الرسمي).</p><label for="draft">إجابتك بالألمانية</label><textarea id="draft" dir="ltr" maxlength="3000" placeholder="Schreibe hier auf Deutsch...">${esc(draft)}</textarea><div class="progress-row"><span id="wordCount" aria-live="polite">${count} / ${target} كلمة</span><span id="draftState">تُحفظ المسودة أثناء الكتابة على جهازك</span></div><fieldset class="self-check"><legend>تأكد من عملك بنفسك</legend><label><input type="checkbox" data-write-check="content" ${writeChecks.content?'checked':''}> تناولت جميع عناصر المهمة</label><label><input type="checkbox" data-write-check="review" ${writeChecks.review?'checked':''}> راجعت ترتيب الجملة والإملاء وعلامات الترقيم</label></fieldset><div class="actions"><button id="saveDraft" class="primary">${completed(level,'write',idx)?'✓ حفظ النص المحدّث':'حفظ وإنهاء التدريب'}</button><button data-toggle>${showText?'إخفاء المثال':'عرض مثال للمساعدة'}</button></div>${showText?`<div class="scenario" dir="ltr">${esc(t.writeSample)}</div>`:''}<p class="small">لا يُصحح الموقع الكتابة آلياً. اطلب من مدرس مراجعتها عندما تستطيع.</p>`;
 }
 h+=`<p id="practiceMessage" class="small" role="status" aria-live="polite"></p><div class="actions"><button id="prev" ${idx===0?'disabled':''}>السابق</button><button id="next" ${idx===sets[level].length-1||!taskOpen(level,mode,idx+1)?'disabled':''}>${idx===sets[level].length-1?'آخر تدريب':taskOpen(level,mode,idx+1)?'التالي ←':'🔒 أكمل التدريب الحالي أولاً'}</button></div>`;
 $('#workshop').innerHTML=h;
 // The speech-recognition result / model toggle rerenders this section. Keep the
 // learner's existing recording visible until they explicitly clear it or switch tasks.
 if(mode==='speak'){
  const player=$('#voicePlayback'),download=$('#downloadVoice'),record=$('#recordVoice');
  if(voiceUrl&&player){player.src=voiceUrl;player.hidden=false;if(download)download.hidden=false;voiceStatus('✓ تسجيلك جاهز. يمكنك الاستماع إليه أو حفظه.');}
  if(voiceRecorder?.state==='recording'){
   if(record)record.textContent='⏹️ إيقاف التسجيل';
   voiceStatus('● جارٍ تسجيل صوتك… راقب مؤشر الصوت ثم اضغط إيقاف التسجيل عند الانتهاء.');
   if(voiceStream)startVoiceMeter(voiceStream);
  }
 }
}
function updateDraft(text){
 const key=`${level}-${idx}`,draft=String(text).slice(0,3000);
 const next={...saved,[key]:draft};const ok=save(KEY,next);
 if(ok)saved=next;
 const label=$('#draftState');if(label)label.textContent=ok?'✓ حُفظت المسودة محلياً':'تعذر حفظ المسودة — لا تغادر الصفحة قبل إنشاء مساحة تخزين';
 const counter=$('#wordCount');if(counter)counter.textContent=`${wordCount(draft)} / ${wordsNeeded(level)} كلمة`;
 return ok;
}
function stopRecognition(){if(!activeRecognition)return;const r=activeRecognition;activeRecognition=null;r.onresult=null;r.onerror=null;r.onend=null;try{r.abort()}catch{}}
function speakRecognition(){
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!R){warn('ميزة التعرف على الكلام غير متاحة في هذا المتصفح.');return}
 if(!window.isSecureContext){warn('الميكروفون يحتاج اتصال HTTPS آمناً.');return}
 if(activeRecognition){warn('الميكروفون يعمل بالفعل؛ انتظر النتيجة.');return}
 try{
  const r=new R();activeRecognition=r;r.lang='de-DE';r.interimResults=false;r.maxAlternatives=1;
  r.onresult=e=>{if(activeRecognition!==r)return;const result=e.results?.[0]?.[0]?.transcript;if(typeof result==='string'&&result.trim()){transcript=result.trim();render()}else warn('لم يُلتقط كلام واضح. حاول مرة أخرى.')};
  r.onerror=e=>{if(activeRecognition!==r)return;const messages={'not-allowed':'تم رفض إذن الميكروفون. فعّله من إعدادات المتصفح.','audio-capture':'لم يتم العثور على ميكروفون يعمل.','no-speech':'لم يُسمع كلام واضح. حاول مرة أخرى.',network:'تعذر الاتصال بخدمة التعرف على الكلام.'};warn(messages[e.error]||'تعذر التعرف على الكلام. حاول مرة أخرى.')};
  r.onend=()=>{if(activeRecognition===r)activeRecognition=null};r.start();
 }catch{stopRecognition();warn('تعذر تشغيل الميكروفون.')}
}
function stopAudioOnLeave(){
 clearVoice();stopRecognition();
 if('speechSynthesis' in window){try{window.speechSynthesis.cancel()}catch{}}
}
window.addEventListener('pagehide',stopAudioOnLeave);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudioOnLeave()});
$('#workshop').addEventListener('input',e=>{if(e.target.id==='draft'&&mode==='write')updateDraft(e.target.value)});
$('#workshop').addEventListener('change',e=>{if(e.target.dataset.writeCheck){writeChecks[e.target.dataset.writeCheck]=e.target.checked}else if(e.target.dataset.speakCheck){speakChecks[e.target.dataset.speakCheck]=e.target.checked}});
$('#listeningReview').addEventListener('click',e=>{
 const b=e.target.closest('[data-review-listen]');if(!b)return;
 const i=Number(b.dataset.reviewListen);
 if(!Number.isInteger(i)||!taskOpen(level,'listen',i))return;
 mode='listen';idx=i;reset();goToWorkshop();
});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.mode){if(!modeOpen(level,b.dataset.mode))return;mode=b.dataset.mode;idx=0;reset();goToWorkshop();return}
 if(b.dataset.level){if(!PATH?.levelOpen(b.dataset.level))return;level=b.dataset.level;mode='listen';idx=0;reset();goToWorkshop();return}
 if(b.dataset.listen!==undefined){say(mode==='speak'?sets[level][idx].sample:sets[level][idx].de);return}
 if(b.dataset.toggle!==undefined){showText=!showText;render();return}
 if(b.dataset.option!==undefined&&answered===null&&mode==='listen'){
  const choice=Number(b.dataset.option),options=choicesFor(level,idx);if(!Number.isInteger(choice)||choice<0||choice>=options.length)return;answered=choice;
  if(options[choice].correct){if(markComplete(level,'listen',idx)){recordListening(level,idx,true);window.UI?.play('ok')}}else{recordListening(level,idx,false);window.UI?.play('bad')}render();return
 }
 if(b.id==='retryListen'&&mode==='listen'){answered=null;showText=false;render();return}
 if(b.id==='markSpeak'&&mode==='speak'){
  if(completed(level,'speak',idx)){warn('التدريب مكتمل بالفعل. يمكنك الانتقال.');return}
  if(!speakChecks.task||!speakChecks.pronunciation){warn('أكد أنك تدربت على الموقف وقارنت كلامك بالنموذج أولاً.');return}
  if(markComplete(level,'speak',idx)){window.UI?.toast('✓ سُجّل الإنجاز بالتقييم الذاتي');render()}return
 }
 if(b.id==='saveDraft'&&mode==='write'){
  const draft=$('#draft').value.trim();if(!updateDraft(draft)){warn('لم تُحفظ الإجابة؛ لن يُفتح التدريب التالي حتى ينجح الحفظ.');return}
  if(completed(level,'write',idx)){warn('حُفظ التعديل. التدريب مكتمل بالفعل.');return}
  const min=wordsNeeded(level),count=wordCount(draft);
  if(count<min){warn(`كتبت ${count} كلمة. أكمل إلى ${min} كلمة على الأقل قبل فتح التالي.`);return}
  if(!writeChecks.content||!writeChecks.review){warn('أكمل قائمتي المراجعة الذاتية قبل إنهاء التدريب.');return}
  if(markComplete(level,'write',idx)){window.UI?.toast('✓ حُفظت الإجابة وفُتح التدريب التالي');render()}return
 }
 if(b.id==='next'&&idx<sets[level].length-1&&taskOpen(level,mode,idx+1)){idx++;reset();goToWorkshop();return}
 if(b.id==='prev'&&idx>0){idx--;reset();goToWorkshop();return}
 if(b.id==='recordVoice'){toggleVoiceRecording();return}
 if(b.id==='downloadVoice'&&voiceUrl){const a=document.createElement('a');a.href=voiceUrl;a.download=`deutsch-${level.toLowerCase()}-sprechen-${idx+1}.${voiceMimeType.includes('mp4')?'m4a':'webm'}`;document.body.appendChild(a);a.click();a.remove();return}
 if(b.id==='deleteVoice'){clearVoice();const player=$('#voicePlayback');if(player){player.removeAttribute('src');player.load();player.hidden=true}const download=$('#downloadVoice');if(download)download.hidden=true;voiceStatus('تم حذف التسجيل من هذه الجلسة.');const button=$('#recordVoice');if(button)button.textContent='🎙️ ابدأ التسجيل';return}
 if(b.dataset.mic!==undefined){speakRecognition();return}
});
render();
})();
