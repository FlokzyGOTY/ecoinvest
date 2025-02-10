import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Häufig gestellte Fragen (FAQ)</CardTitle>
          <CardDescription>
            Hier finden Sie Antworten auf häufig gestellte Fragen zu unserem Nachhaltigkeits-Investitionsrechner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Wie wird der CO₂-Reduktionswert berechnet?</AccordionTrigger>
              <AccordionContent>
                Der CO₂-Reduktionswert wird basierend auf dem Investitionstyp, dem Investitionsbetrag und der Dauer der
                Investition berechnet. Wir verwenden spezifische CO₂-Reduktionsfaktoren für jeden Investitionstyp (z.B.
                erneuerbare Energien, Infrastruktur, IT-Systeme). Die Formel lautet: CO₂-Reduktion = Faktor *
                (Investitionsbetrag / 1000) * Dauer in Jahren.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Wie wird der ROI (Return on Investment) berechnet?</AccordionTrigger>
              <AccordionContent>
                Der ROI wird unter Berücksichtigung des Investitionstyps und der Investitionsdauer berechnet. Jeder
                Investitionstyp hat einen spezifischen jährlichen Renditefaktor. Die Formel lautet: ROI = ((1 +
                Jahresfaktor)^Dauer - 1) * 100%. Dies gibt den prozentualen Gewinn über die gesamte Investitionsdauer
                an.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Was bedeutet der Nachhaltigkeits-Score?</AccordionTrigger>
              <AccordionContent>
                Der Nachhaltigkeits-Score ist eine Kennzahl zwischen 0 und 100, die die Gesamtnachhaltigkeit einer
                Investition bewertet. Er berücksichtigt die CO₂-Reduktion (50% Gewichtung), den ROI (30% Gewichtung) und
                den Investitionstyp (20% Gewichtung). Ein höherer Score bedeutet eine nachhaltigere Investition.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Welche Investitionstypen werden unterstützt?</AccordionTrigger>
              <AccordionContent>
                Aktuell unterstützen wir drei Hauptkategorien von Investitionen: 1. Erneuerbare Energien (z.B. Solar-
                und Windkraftanlagen) 2. Infrastruktur (z.B. energieeffiziente Gebäude, Verkehrssysteme) 3. IT-Systeme
                (z.B. energieeffiziente Rechenzentren, Smart-Home-Technologien) Jeder Typ hat unterschiedliche
                Auswirkungen auf CO₂-Reduktion, ROI und Nachhaltigkeits-Score.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Wie genau sind die Berechnungen?</AccordionTrigger>
              <AccordionContent>
                Unsere Berechnungen basieren auf Durchschnittswerten und Schätzungen aus aktuellen Forschungsdaten. Sie
                bieten eine gute Orientierung, können aber von den tatsächlichen Werten abweichen, da viele Faktoren die
                realen Ergebnisse beeinflussen können. Für präzisere Einschätzungen empfehlen wir, zusätzlich einen
                Experten zu konsultieren.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Kann ich meine Daten exportieren?</AccordionTrigger>
              <AccordionContent>
                Ja, Sie können Ihre Investitionsdaten und Berechnungsergebnisse exportieren. Auf der Übersichtsseite
                finden Sie Optionen zum Herunterladen Ihrer Daten als CSV-Datei oder zum Generieren eines PDF-Berichts
                mit detaillierten Informationen zu Ihren Investitionen und deren Auswirkungen.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

