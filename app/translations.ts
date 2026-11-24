export type Language = "en" | "ee";

// Markup rendered by components/Rich.tsx: *word* → serif voice, ==phrase== → Highlighter (max one per screen).
export const translations = {
  en: {
    // Header
    "nav.login": "Log in",
    "nav.pricing": "Pricing",
    "nav.toggleMenu": "Toggle menu",

    // Hero
    "hero.title": "Every application, *scored* before you open it",
    "hero.description": "Your open positions sync from across the web on their own, and every application is scored as it arrives, with strengths and risks spelled out. ==No setup, no manual uploads.== The hiring decision stays yours.",
    "hero.joinButton": "Start for free",
    "hero.plansButton": "See pricing",

    // Product preview (sample candidates)
    "mock.previewLabel": "Sample InternKit candidate ranking for a frontend developer listing",
    "mock.listing": "Junior frontend developer · 14 applications",
    "mock.new": "New",
    "mock.scoreLabel": "Suitability score",
    "mock.c1.meta": "4 yrs · Tallinn",
    "mock.c2.meta": "2 yrs · Tartu",

    // Recommendations and risks (same words as the product)
    "rec.strongYes": "Strong yes",
    "rec.yes": "Yes",
    "rec.maybe": "Maybe",
    "rec.no": "No",
    "risk.shortTenure": "Short tenure",


    // Position sync
    "sync.title": "Your open positions are already here",
    "sync.description": "InternKit finds the positions you've posted across the web and keeps them in sync. Nothing to upload, nothing to copy over by hand.",
    "sync.point1": "Every open position, wherever it's posted",
    "sync.point2": "Kept up to date without you lifting a finger",
    "sync.point3": "Applications land under the right position, scored",
    "sync.previewLabel": "Sample list of open positions synced into InternKit",
    "sync.listTitle": "Open positions",
    "sync.lastSync": "Synced just now",
    "sync.p1": "Junior frontend developer",
    "sync.p2": "Backend engineer (Node.js)",
    "sync.p3": "QA intern",
    "sync.sourceCareers": "Careers page",
    "sync.sourceBoard": "Job board",
    "sync.applications": "Applied",
    "sync.plans": "Included in the Growth and Expansion plans.",

    // How it works
    "platform.title": "From inbox to shortlist",
    "platform.description": "Built for tech companies with 10–50 people and no in-house recruiter. No setup: your positions are already there, InternKit does the first read.",
    "platform.stepLabel": "Step",
    "platform.step1.title": "Positions sync",
    "platform.step1.body": "Your open positions are pulled in automatically from across the web. No uploads, no retyping.",
    "platform.step2.title": "Applications get scored",
    "platform.step2.body": "Forward application emails or upload CVs. Each one is scored from 0 to 100, with strengths, risks and a short summary.",
    "platform.step3.title": "Decide faster",
    "platform.step3.body": "Candidates are ranked per listing. Shortlist the best ones and spend your time on interviews.",

    // Scorecard section
    "insights.title": "What every scorecard shows",
    "insights.description": "Five weighted criteria, minus a penalty for risks like short tenures or long gaps. The number is always there, and so is the reasoning.",
    "insights.sample": "Sample scorecard",
    "insights.summary": "Frontend developer with 4 years of React and TypeScript at two product companies. Strong match for the role; one job under 12 months.",
    "insights.strengths": "Strengths",
    "insights.strength1": "4 years of production React",
    "insights.strength2": "Led a design system migration",
    "insights.strength3": "Fluent in Estonian and English",
    "insights.risks": "Risks",
    "score.roleMatch": "Role match",
    "score.experience": "Experience",
    "score.companies": "Company background",
    "score.skills": "Skills",
    "score.languages": "Languages",

    // Features
    "features.forward.title": "Your own forwarding address",
    "features.forward.body": "Forward or BCC application emails. PDF and ZIP attachments are read for you.",
    "features.upload.title": "Bulk upload",
    "features.upload.body": "Drop in up to 20 PDF or PNG CVs at once when applications arrive elsewhere.",
    "features.listings.title": "Draft new listings with AI",
    "features.listings.body": "Hiring for a role that isn't posted yet? Let AI write the first draft of the listing.",
    "features.embed.title": "Apply link and careers-page embed",
    "features.embed.body": "Collect applications through a public link or a widget on your own site.",

    // Testimonials Section (not rendered yet)
    "testimonials.title": "What our users are saying",
    "testimonials.seeMore": "See more",
    "testimonials.quote": "Started using Internkit a year ago and it was the best thing I did. It helped me grow professionally and great tips.",

    // Footer
    "footer.cta.title": "Your next hire is\nalready in your inbox",
    "footer.cta.button": "Start for free",
    "footer.product": "Product",
    "footer.features": "How it works",
    "footer.pricing": "Pricing",
    "footer.resources": "Resources",
    "footer.blog": "Blog",
    "footer.support": "Support",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.followUs": "Follow us",
    "footer.copyright": "© {year} InternKit. All rights reserved.",

    // Pricing Page
    "pricing.title": "Pay for the CVs you *analyze*",
    "pricing.subtitle": "Plans are monthly and scale with how many applications you get. Change or cancel any time.",
    "pricing.starter": "Starter",
    "pricing.growth": "Growth",
    "pricing.expansion": "Expansion",
    "pricing.recommended": "Recommended",
    "pricing.price": "€{price}",
    "pricing.perMonthVat": "/ month + VAT",
    "pricing.cvsPerMonth": "{count} CV analyses per month",
    "pricing.feature.sync": "Automatic position sync",
    "pricing.feature.scorecards": "Scorecards with strengths and risks",
    "pricing.feature.intake": "Forwarding address and bulk upload",
    "pricing.feature.ranking": "Ranked candidates per listing",
    "pricing.choose": "Choose {plan}",
    "pricing.free": "Every account starts on Free, with 5 CV analyses a month.",
    "pricing.held": "Over your limit? New applications wait for you, unanalyzed, until you upgrade or your month resets.",

    // Settings menu
    "settings.label": "Settings",
    "settings.language": "Language",
  },
  ee: {
    // Header
    "nav.login": "Logi sisse",
    "nav.pricing": "Hinnakiri",
    "nav.toggleMenu": "Ava menüü",

    // Hero
    "hero.title": "Iga kandideerimine *hinnatud* enne, kui selle avad",
    "hero.description": "Sinu avatud ametikohad sünkroonitakse veebist automaatselt ja iga kandideerimine hinnatakse kohe saabudes, koos tugevuste ja riskidega. ==Ei mingit seadistamist ega käsitsi üleslaadimist.== Värbamisotsus jääb sinu teha.",
    "hero.joinButton": "Alusta tasuta",
    "hero.plansButton": "Vaata hindu",

    // Product preview (sample candidates)
    "mock.previewLabel": "InternKiti näidis kandidaatide pingereast frontend-arendaja kuulutusele",
    "mock.listing": "Nooremfrontend-arendaja · 14 kandideerimist",
    "mock.new": "Uus",
    "mock.scoreLabel": "Sobivusskoor",
    "mock.c1.meta": "4 a · Tallinn",
    "mock.c2.meta": "2 a · Tartu",

    // Recommendations and risks (same words as the product)
    "rec.strongYes": "Väga sobib",
    "rec.yes": "Sobib",
    "rec.maybe": "Võib-olla",
    "rec.no": "Ei sobi",
    "risk.shortTenure": "Lühike tööstaaž",


    // Position sync
    "sync.title": "Sinu avatud ametikohad on juba siin",
    "sync.description": "InternKit leiab üles sinu veebis avaldatud ametikohad ja hoiab need ajakohasena. Midagi pole vaja üles laadida ega käsitsi üle kopeerida.",
    "sync.point1": "Iga avatud ametikoht, ükskõik kus see avaldatud on",
    "sync.point2": "Alati ajakohane, ilma et peaksid sõrmegi liigutama",
    "sync.point3": "Kandideerimised jõuavad õige ametikoha alla, juba hinnatuna",
    "sync.previewLabel": "Näidis InternKiti sünkroonitud avatud ametikohtadest",
    "sync.listTitle": "Avatud ametikohad",
    "sync.lastSync": "Sünkroonitud just praegu",
    "sync.p1": "Nooremfrontend-arendaja",
    "sync.p2": "Backend-insener (Node.js)",
    "sync.p3": "QA praktikant",
    "sync.sourceCareers": "Karjäärileht",
    "sync.sourceBoard": "Tööportaal",
    "sync.applications": "Kandideerinud",
    "sync.plans": "Sisaldub Growth- ja Expansion-paketis.",

    // How it works
    "platform.title": "Postkastist lühinimekirja",
    "platform.description": "Loodud 10–50 töötajaga tehnoloogiaettevõtetele, kellel pole oma värbajat. Seadistada pole midagi: ametikohad on juba olemas, esimese lugemise teeb InternKit.",
    "platform.stepLabel": "Samm",
    "platform.step1.title": "Ametikohad sünkroonitakse",
    "platform.step1.body": "Sinu avatud ametikohad tuuakse veebist automaatselt sisse. Ei mingit üleslaadimist ega ümbertrükkimist.",
    "platform.step2.title": "Kandideerimised hinnatakse",
    "platform.step2.body": "Edasta kandideerimiskirjad või laadi CV-d üles. Iga CV saab skoori 0–100, tugevused, riskid ja lühikese kokkuvõtte.",
    "platform.step3.title": "Otsusta kiiremini",
    "platform.step3.body": "Kandidaadid on iga kuulutuse all pingereas. Vali parimad lühinimekirja ja pühendu intervjuudele.",

    // Scorecard section
    "insights.title": "Mida näitab iga hindamiskaart",
    "insights.description": "Viis kaalutud kriteeriumi, millest arvatakse maha riskid, nagu lühikesed töösuhted või pikad pausid. Number on alati näha, nagu ka põhjendus.",
    "insights.sample": "Näidis hindamiskaart",
    "insights.summary": "Frontend-arendaja, kellel on 4 aastat Reacti ja TypeScripti kogemust kahes tooteettevõttes. Rolliga sobib hästi; üks töösuhe alla 12 kuu.",
    "insights.strengths": "Tugevused",
    "insights.strength1": "4 aastat Reacti tootmises",
    "insights.strength2": "Juhtis disainisüsteemi üleviimist",
    "insights.strength3": "Valdab eesti ja inglise keelt",
    "insights.risks": "Riskid",
    "score.roleMatch": "Rolli sobivus",
    "score.experience": "Kogemus",
    "score.companies": "Ettevõtete taust",
    "score.skills": "Oskused",
    "score.languages": "Keeled",

    // Features
    "features.forward.title": "Oma edastusaadress",
    "features.forward.body": "Edasta kandideerimiskirjad või lisa aadress BCC-sse. PDF- ja ZIP-manused loetakse sinu eest läbi.",
    "features.upload.title": "Hulgi üleslaadimine",
    "features.upload.body": "Laadi korraga üles kuni 20 PDF- või PNG-vormingus CV-d, kui kandideerimised tulevad mujalt.",
    "features.listings.title": "Koosta uusi kuulutusi AI abiga",
    "features.listings.body": "Värbad rolli, mida pole veel avaldatud? Lase AI-l kirjutada kuulutuse esimene mustand.",
    "features.embed.title": "Kandideerimislink ja karjäärilehe vidin",
    "features.embed.body": "Kogu kandideerimisi avaliku lingi või oma veebilehele lisatud vidina kaudu.",

    // Testimonials Section (not rendered yet)
    "testimonials.title": "Mida meie kasutajad ütlevad",
    "testimonials.seeMore": "Vaata rohkem",
    "testimonials.quote": "Alustasin Internkiti kasutamist aasta tagasi ja see oli parim asi, mida tegin. See aitas mul professionaalselt kasvada ja andis suurepäraseid nõuandeid.",

    // Footer
    "footer.cta.title": "Su järgmine töötaja\non juba postkastis",
    "footer.cta.button": "Alusta tasuta",
    "footer.product": "Toode",
    "footer.features": "Kuidas see töötab",
    "footer.pricing": "Hinnakiri",
    "footer.resources": "Ressursid",
    "footer.blog": "Blogi",
    "footer.support": "Tugi",
    "footer.legal": "Juriidiline",
    "footer.privacy": "Privaatsus",
    "footer.terms": "Tingimused",
    "footer.followUs": "Jälgi meid",
    "footer.copyright": "© {year} InternKit. Kõik õigused kaitstud.",

    // Pricing Page
    "pricing.title": "Maksa ainult *analüüsitud* CV-de eest",
    "pricing.subtitle": "Paketid on kuupõhised ja kasvavad koos kandideerimiste arvuga. Paketti saab igal ajal muuta või tühistada.",
    "pricing.starter": "Starter",
    "pricing.growth": "Growth",
    "pricing.expansion": "Expansion",
    "pricing.recommended": "Soovitatud",
    "pricing.price": "{price} €",
    "pricing.perMonthVat": "/ kuu + käibemaks",
    "pricing.cvsPerMonth": "{count} CV-analüüsi kuus",
    "pricing.feature.sync": "Ametikohtade automaatne sünkroonimine",
    "pricing.feature.scorecards": "Hindamiskaardid tugevuste ja riskidega",
    "pricing.feature.intake": "Edastusaadress ja hulgi üleslaadimine",
    "pricing.feature.ranking": "Kandidaatide pingerida iga kuulutuse kohta",
    "pricing.choose": "Vali {plan}",
    "pricing.free": "Iga konto alustab tasuta paketiga, mis sisaldab 5 CV-analüüsi kuus.",
    "pricing.held": "Limiit täis? Uued kandideerimised ootavad analüüsimata, kuni uuendad paketti või algab uus kuu.",

    // Settings menu
    "settings.label": "Seaded",
    "settings.language": "Keel",
  },
} as const;
