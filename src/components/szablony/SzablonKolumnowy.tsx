import type { DaneCV, Ustawienia } from '../daneCV';
import { zakresDat } from '../daneCV';
import type { Tresc } from '../tresc';
import { linieOpisu, maTresc, pozycjeKontaktu } from './wspolne';

/*
 * Szablon Kolumnowy — waski pasek boczny i szeroka kolumna tresci.
 *
 * Pasek trzyma kontakt, umiejetnosci i jezyki, wiec doswiadczenie dostaje
 * pelna szerokosc. Miesci wiecej niz uklad jednokolumnowy, ale gorzej znosi
 * automatyczne parsowanie — o czym uprzedzamy w opisie szablonu.
 */
export function SzablonKolumnowy({ dane, ustawienia, t }: { dane: DaneCV; ustawienia: Ustawienia; t: Tresc }) {
  const akcent = ustawienia.akcent;
  const s = t.kreator.sekcje;
  const kontakty = pozycjeKontaktu(dane);

  const NaglowekPaska = ({ children }: { children: string }) => (
    <h2 className="mb-[2.5mm] text-[9pt] font-bold uppercase tracking-[0.16em] text-white/70">{children}</h2>
  );

  const NaglowekTresci = ({ children }: { children: string }) => (
    <h2 className="mb-[3mm] text-[10.5pt] font-bold uppercase tracking-[0.14em]" style={{ color: akcent }}>
      {children}
    </h2>
  );

  return (
    <div className="flex min-h-[297mm] font-body text-[10pt] leading-[1.5] text-[#141820]">
      {/* Pasek boczny */}
      <aside className="w-[62mm] shrink-0 px-[9mm] py-[14mm] text-white" style={{ background: akcent }}>
        <h1 className="font-display text-[18pt] font-extrabold leading-[1.15] tracking-tight">
          {dane.kontakt.imieNazwisko}
        </h1>
        {dane.kontakt.stanowisko && (
          <p className="mt-[1.5mm] text-[10pt] font-medium text-white/85">{dane.kontakt.stanowisko}</p>
        )}

        {kontakty.length > 0 && (
          <section className="mt-[8mm]">
            <NaglowekPaska>{s.kontakt}</NaglowekPaska>
            <ul className="space-y-[1.6mm] text-[8.5pt] leading-snug text-white/90">
              {kontakty.map((pozycja) => (
                <li key={pozycja.klucz} className="break-words">
                  {pozycja.wartosc}
                </li>
              ))}
            </ul>
          </section>
        )}

        {maTresc(dane.umiejetnosci, ['nazwa']) && (
          <section className="mt-[7mm]">
            <NaglowekPaska>{s.umiejetnosci}</NaglowekPaska>
            <ul className="space-y-[2mm] text-[9pt]">
              {dane.umiejetnosci.map((wpis) => (
                <li key={wpis.id}>
                  <span className="text-white/90">{wpis.nazwa}</span>
                  {ustawienia.pokazPoziomy && wpis.nazwa && (
                    <span className="mt-[1mm] flex gap-[0.8mm]" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((krok) => (
                        <span
                          key={krok}
                          className="h-[1.2mm] flex-1 rounded-full"
                          style={{ background: krok <= wpis.poziom ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.28)' }}
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
          <section className="mt-[7mm]">
            <NaglowekPaska>{s.jezyki}</NaglowekPaska>
            <ul className="space-y-[1.4mm] text-[9pt] text-white/90">
              {dane.jezyki.map((wpis) => (
                <li key={wpis.id} className="flex items-baseline justify-between gap-[2mm]">
                  <span>{wpis.nazwa}</span>
                  <span className="text-[8.5pt] text-white/70">{wpis.poziom}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* Kolumna tresci */}
      <div className="flex-1 px-[12mm] py-[14mm]">
        {dane.podsumowanie.trim() && (
          <section className="mb-[6mm]">
            <NaglowekTresci>{s.podsumowanie}</NaglowekTresci>
            <p className="text-justify text-[9.5pt]">{dane.podsumowanie}</p>
          </section>
        )}

        {maTresc(dane.doswiadczenie, ['stanowisko', 'firma', 'opis']) && (
          <section className="mb-[6mm]">
            <NaglowekTresci>{s.doswiadczenie}</NaglowekTresci>
            <ol className="space-y-[4mm]">
              {dane.doswiadczenie.map((wpis) => (
                <li key={wpis.id} className="border-l-[0.6mm] pl-[4mm]" style={{ borderColor: '#e4dcd1' }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-[3mm]">
                    <h3 className="text-[10.5pt] font-bold">{wpis.stanowisko}</h3>
                    <span className="text-[8.5pt] font-medium text-[#5a6472]">
                      {zakresDat(wpis.od, wpis.do, wpis.trwa, t.wspolne.teraz)}
                    </span>
                  </div>
                  {wpis.firma && <p className="text-[9.5pt] font-medium" style={{ color: akcent }}>{wpis.firma}</p>}
                  {linieOpisu(wpis.opis).length > 0 && (
                    <ul className="mt-[1.5mm] list-disc space-y-[0.8mm] pl-[4mm] text-[9.5pt] marker:text-[#7c8695]">
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
            <NaglowekTresci>{s.edukacja}</NaglowekTresci>
            <ol className="space-y-[3mm]">
              {dane.edukacja.map((wpis) => (
                <li key={wpis.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-[3mm]">
                    <h3 className="text-[10pt] font-bold">{wpis.kierunek}</h3>
                    <span className="text-[8.5pt] font-medium text-[#5a6472]">
                      {zakresDat(wpis.od, wpis.do, false, t.wspolne.teraz)}
                    </span>
                  </div>
                  {wpis.uczelnia && <p className="text-[9.5pt]" style={{ color: akcent }}>{wpis.uczelnia}</p>}
                  {wpis.opis && <p className="mt-[0.8mm] text-[9pt] text-[#2b333f]">{wpis.opis}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {maTresc(dane.projekty, ['nazwa', 'opis']) && (
          <section className="mb-[5mm]">
            <NaglowekTresci>{s.projekty}</NaglowekTresci>
            <ol className="space-y-[2.5mm]">
              {dane.projekty.map((wpis) => (
                <li key={wpis.id}>
                  <h3 className="text-[10pt] font-bold">
                    {wpis.nazwa}
                    {wpis.link && <span className="ml-[2mm] text-[8.5pt] font-normal text-[#5a6472]">{wpis.link}</span>}
                  </h3>
                  {wpis.opis && <p className="text-[9pt]">{wpis.opis}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {dane.klauzula.trim() && (
          <p className="mt-[4mm] border-t border-[#e4dcd1] pt-[2.5mm] text-[7.5pt] leading-snug text-[#7c8695]">
            {dane.klauzula}
          </p>
        )}
      </div>
    </div>
  );
}
