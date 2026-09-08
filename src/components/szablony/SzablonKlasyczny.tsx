import type { DaneCV, Ustawienia } from '../daneCV';
import { zakresDat } from '../daneCV';
import type { Tresc } from '../tresc';
import { linieOpisu, maTresc, pozycjeKontaktu } from './wspolne';

/*
 * Szablon Klasyczny — jedna kolumna, wyrazne naglowki.
 *
 * Uklad celowo prosty: prawdziwy tekst zamiast grafiki i standardowe naglowki
 * sekcji, zeby dokument dal sie sparsowac systemom ATS.
 */
export function SzablonKlasyczny({ dane, ustawienia, t }: { dane: DaneCV; ustawienia: Ustawienia; t: Tresc }) {
  const akcent = ustawienia.akcent;
  const s = t.kreator.sekcje;
  const kontakty = pozycjeKontaktu(dane);

  const Naglowek = ({ children }: { children: string }) => (
    <h2
      className="mb-[3mm] border-b pb-[1.5mm] text-[10.5pt] font-bold uppercase tracking-[0.14em]"
      style={{ color: akcent, borderColor: akcent }}
    >
      {children}
    </h2>
  );

  return (
    <div className="px-[16mm] py-[15mm] font-body text-[10pt] leading-[1.5] text-[#141820]">
      <header className="mb-[7mm]">
        <h1 className="font-display text-[24pt] font-extrabold leading-tight tracking-tight" style={{ color: akcent }}>
          {dane.kontakt.imieNazwisko}
        </h1>
        {dane.kontakt.stanowisko && (
          <p className="mt-[1mm] text-[12pt] font-medium text-[#2b333f]">{dane.kontakt.stanowisko}</p>
        )}
        {kontakty.length > 0 && (
          <ul className="mt-[3mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[9pt] text-[#5a6472]">
            {kontakty.map((pozycja) => (
              <li key={pozycja.klucz}>{pozycja.wartosc}</li>
            ))}
          </ul>
        )}
      </header>

      {dane.podsumowanie.trim() && (
        <section className="mb-[6mm]">
          <Naglowek>{s.podsumowanie}</Naglowek>
          <p className="text-justify">{dane.podsumowanie}</p>
        </section>
      )}

      {maTresc(dane.doswiadczenie, ['stanowisko', 'firma', 'opis']) && (
        <section className="mb-[6mm]">
          <Naglowek>{s.doswiadczenie}</Naglowek>
          <ol className="space-y-[4mm]">
            {dane.doswiadczenie.map((wpis) => (
              <li key={wpis.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-[4mm]">
                  <h3 className="text-[11pt] font-bold text-[#141820]">{wpis.stanowisko}</h3>
                  <span className="text-[9pt] font-medium text-[#5a6472]">
                    {zakresDat(wpis.od, wpis.do, wpis.trwa, t.wspolne.teraz)}
                  </span>
                </div>
                {wpis.firma && <p className="text-[10pt] font-medium" style={{ color: akcent }}>{wpis.firma}</p>}
                {linieOpisu(wpis.opis).length > 0 && (
                  <ul className="mt-[1.5mm] list-disc space-y-[0.8mm] pl-[5mm] marker:text-[#7c8695]">
                    {linieOpisu(wpis.opis).map((linia, i) => (
                      <li key={i}>{linia}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {maTresc(dane.edukacja, ['kierunek', 'uczelnia']) && (
        <section className="mb-[6mm]">
          <Naglowek>{s.edukacja}</Naglowek>
          <ol className="space-y-[3mm]">
            {dane.edukacja.map((wpis) => (
              <li key={wpis.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-[4mm]">
                  <h3 className="text-[10.5pt] font-bold text-[#141820]">{wpis.kierunek}</h3>
                  <span className="text-[9pt] font-medium text-[#5a6472]">
                    {zakresDat(wpis.od, wpis.do, false, t.wspolne.teraz)}
                  </span>
                </div>
                {wpis.uczelnia && <p className="text-[10pt]" style={{ color: akcent }}>{wpis.uczelnia}</p>}
                {wpis.opis && <p className="mt-[1mm] text-[9.5pt] text-[#2b333f]">{wpis.opis}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {maTresc(dane.projekty, ['nazwa', 'opis']) && (
        <section className="mb-[6mm]">
          <Naglowek>{s.projekty}</Naglowek>
          <ol className="space-y-[2.5mm]">
            {dane.projekty.map((wpis) => (
              <li key={wpis.id}>
                <h3 className="text-[10.5pt] font-bold text-[#141820]">
                  {wpis.nazwa}
                  {wpis.link && <span className="ml-[2mm] text-[9pt] font-normal text-[#5a6472]">{wpis.link}</span>}
                </h3>
                {wpis.opis && <p className="text-[9.5pt]">{wpis.opis}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="grid grid-cols-2 gap-x-[8mm]">
        {maTresc(dane.umiejetnosci, ['nazwa']) && (
          <section className="mb-[5mm]">
            <Naglowek>{s.umiejetnosci}</Naglowek>
            <ul className="space-y-[1.2mm]">
              {dane.umiejetnosci.map((wpis) => (
                <li key={wpis.id} className="flex items-center justify-between gap-[3mm]">
                  <span>{wpis.nazwa}</span>
                  {ustawienia.pokazPoziomy && wpis.nazwa && (
                    <span className="flex shrink-0 gap-[0.8mm]" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((krok) => (
                        <span
                          key={krok}
                          className="h-[1.4mm] w-[3.5mm] rounded-full"
                          style={{ background: krok <= wpis.poziom ? akcent : '#dfe3ea' }}
                        />
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {maTresc(dane.jezyki, ['nazwa']) && (
          <section className="mb-[5mm]">
            <Naglowek>{s.jezyki}</Naglowek>
            <ul className="space-y-[1.2mm]">
              {dane.jezyki.map((wpis) => (
                <li key={wpis.id} className="flex items-baseline justify-between gap-[3mm]">
                  <span>{wpis.nazwa}</span>
                  <span className="text-[9pt] font-medium text-[#5a6472]">{wpis.poziom}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {dane.klauzula.trim() && (
        <p className="mt-[4mm] border-t border-[#e4dcd1] pt-[2.5mm] text-[7.5pt] leading-snug text-[#7c8695]">
          {dane.klauzula}
        </p>
      )}
    </div>
  );
}
