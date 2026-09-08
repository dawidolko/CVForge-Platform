import type { DaneCV, Ustawienia } from '../daneCV';
import { zakresDat } from '../daneCV';
import type { Tresc } from '../tresc';
import { linieOpisu, maTresc, pozycjeKontaktu } from './wspolne';

/*
 * Szablon Minimal — duzo swiatla, cienkie linie, zero blokow koloru.
 *
 * Akcent pojawia sie wylacznie w nazwisku i w cienkiej kresce pod naglowkiem
 * sekcji. Reszta to typografia: uklad ma byc cichy.
 */
export function SzablonMinimal({ dane, ustawienia, t }: { dane: DaneCV; ustawienia: Ustawienia; t: Tresc }) {
  const akcent = ustawienia.akcent;
  const s = t.kreator.sekcje;
  const kontakty = pozycjeKontaktu(dane);

  const Naglowek = ({ children }: { children: string }) => (
    <h2 className="mb-[3mm] flex items-center gap-[3mm] text-[9pt] font-semibold uppercase tracking-[0.22em] text-[#5a6472]">
      <span>{children}</span>
      <span aria-hidden="true" className="h-[0.25mm] flex-1" style={{ background: '#e4dcd1' }} />
    </h2>
  );

  return (
    <div className="px-[20mm] py-[18mm] font-body text-[10pt] leading-[1.6] text-[#141820]">
      <header className="mb-[9mm]">
        <h1 className="font-display text-[22pt] font-light leading-tight tracking-[0.02em]" style={{ color: akcent }}>
          {dane.kontakt.imieNazwisko}
        </h1>
        {dane.kontakt.stanowisko && (
          <p className="mt-[1.5mm] text-[11pt] font-normal tracking-wide text-[#5a6472]">{dane.kontakt.stanowisko}</p>
        )}
        {kontakty.length > 0 && (
          <ul className="mt-[4mm] flex flex-wrap gap-x-[4mm] gap-y-[1mm] text-[8.5pt] text-[#7c8695]">
            {kontakty.map((pozycja, i) => (
              <li key={pozycja.klucz} className="flex items-center gap-[4mm]">
                {i > 0 && <span aria-hidden="true" className="text-[#c8bcac]">·</span>}
                <span>{pozycja.wartosc}</span>
              </li>
            ))}
          </ul>
        )}
      </header>

      {dane.podsumowanie.trim() && (
        <section className="mb-[7mm]">
          <p className="text-[10.5pt] leading-[1.7] text-[#2b333f]">{dane.podsumowanie}</p>
        </section>
      )}

      {maTresc(dane.doswiadczenie, ['stanowisko', 'firma', 'opis']) && (
        <section className="mb-[7mm]">
          <Naglowek>{s.doswiadczenie}</Naglowek>
          <ol className="space-y-[5mm]">
            {dane.doswiadczenie.map((wpis) => (
              <li key={wpis.id} className="grid grid-cols-[26mm_1fr] gap-x-[5mm]">
                <span className="pt-[0.6mm] text-[8.5pt] leading-snug text-[#7c8695]">
                  {zakresDat(wpis.od, wpis.do, wpis.trwa, t.wspolne.teraz)}
                </span>
                <div>
                  <h3 className="text-[10.5pt] font-semibold">{wpis.stanowisko}</h3>
                  {wpis.firma && <p className="text-[9.5pt] text-[#5a6472]">{wpis.firma}</p>}
                  {linieOpisu(wpis.opis).length > 0 && (
                    <ul className="mt-[1.5mm] space-y-[1mm] text-[9.5pt]">
                      {linieOpisu(wpis.opis).map((linia, i) => (
                        <li key={i} className="flex gap-[2.5mm]">
                          <span aria-hidden="true" style={{ color: akcent }}>
                            —
                          </span>
                          <span>{linia}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {maTresc(dane.edukacja, ['kierunek', 'uczelnia']) && (
        <section className="mb-[7mm]">
          <Naglowek>{s.edukacja}</Naglowek>
          <ol className="space-y-[3.5mm]">
            {dane.edukacja.map((wpis) => (
              <li key={wpis.id} className="grid grid-cols-[26mm_1fr] gap-x-[5mm]">
                <span className="pt-[0.6mm] text-[8.5pt] leading-snug text-[#7c8695]">
                  {zakresDat(wpis.od, wpis.do, false, t.wspolne.teraz)}
                </span>
                <div>
                  <h3 className="text-[10pt] font-semibold">{wpis.kierunek}</h3>
                  {wpis.uczelnia && <p className="text-[9.5pt] text-[#5a6472]">{wpis.uczelnia}</p>}
                  {wpis.opis && <p className="mt-[0.8mm] text-[9pt] text-[#5a6472]">{wpis.opis}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {maTresc(dane.projekty, ['nazwa', 'opis']) && (
        <section className="mb-[7mm]">
          <Naglowek>{s.projekty}</Naglowek>
          <ol className="space-y-[3mm]">
            {dane.projekty.map((wpis) => (
              <li key={wpis.id} className="grid grid-cols-[26mm_1fr] gap-x-[5mm]">
                <span className="pt-[0.6mm] text-[8.5pt] leading-snug text-[#7c8695]">{wpis.link}</span>
                <div>
                  <h3 className="text-[10pt] font-semibold">{wpis.nazwa}</h3>
                  {wpis.opis && <p className="text-[9.5pt]">{wpis.opis}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="grid grid-cols-2 gap-x-[10mm]">
        {maTresc(dane.umiejetnosci, ['nazwa']) && (
          <section>
            <Naglowek>{s.umiejetnosci}</Naglowek>
            <p className="text-[9.5pt] leading-[1.8]">
              {dane.umiejetnosci
                .map((wpis) => wpis.nazwa)
                .filter(Boolean)
                .join(' · ')}
            </p>
          </section>
        )}

        {maTresc(dane.jezyki, ['nazwa']) && (
          <section>
            <Naglowek>{s.jezyki}</Naglowek>
            <ul className="space-y-[1mm] text-[9.5pt]">
              {dane.jezyki.map((wpis) => (
                <li key={wpis.id}>
                  {wpis.nazwa}
                  {wpis.poziom && <span className="text-[#7c8695]"> — {wpis.poziom}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {dane.klauzula.trim() && (
        <p className="mt-[6mm] text-[7.5pt] leading-snug text-[#a39683]">{dane.klauzula}</p>
      )}
    </div>
  );
}
