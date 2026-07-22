"use client";

import Image from "next/image";
import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";
import { site, type Project } from "../../src/content/site";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className={`project project--${project.layout}`} data-cursor="open">
      <a className="project__link" href="#case-study" aria-label={`Открыть проект ${project.title}`}>
        <div className="project__image image-wrap">
          <Image src={project.image} alt={project.alt} fill unoptimized priority={priority} sizes="(max-width: 768px) 100vw, 88vw" />
          <span className="project__index">0{site.projects.indexOf(project) + 1}</span>
        </div>
        <div className="project__meta">
          <h3>{project.title}</h3>
          <p>{project.type}</p>
          <p>{project.area}</p>
          <p>{project.location}</p>
          <p>{project.year}</p>
          <Arrow diagonal />
        </div>
      </a>
    </article>
  );
}

export function MonoformHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCase, setActiveCase] = useState(0);
  const [activeRoom, setActiveRoom] = useState(0);
  const [compare, setCompare] = useState(52);
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [activeScope, setActiveScope] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(100, Math.round(((now - start) / 1050) * 100));
      setPercent(Math.max(1, progress));
      if (progress < 100) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setLoaded(true), 180);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!loaded || !rootRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    let clean = () => {};

    void (async () => {
      const [{ default: gsap }, scrollModule, { default: Lenis }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger"), import("lenis"),
      ]);
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      let animationFrame = 0;
      const lenis = reduceMotion ? null : new Lenis({ duration: 1.05, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrame = requestAnimationFrame(raf);
      };
      if (lenis) animationFrame = requestAnimationFrame(raf);

      const context = gsap.context(() => {
        if (!reduceMotion) {
          gsap.from(".hero__line > span", { yPercent: 110, duration: 1.1, stagger: 0.1, ease: "power3.out" });
          gsap.from(".hero__meta, .hero__body, .hero__actions", { opacity: 0, y: 18, duration: 0.8, stagger: 0.08, delay: 0.25 });
          gsap.to("[data-hero-image]", {
            scale: 1.08, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
          });
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.from(element, {
              y: 44, opacity: 0, duration: 0.95, ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 84%", once: true },
            });
          });
        }

        document.querySelectorAll<HTMLElement>("[data-case-step]").forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 52%",
            end: "bottom 48%",
            onEnter: () => setActiveCase(index),
            onEnterBack: () => setActiveCase(index),
          });
        });
        document.querySelectorAll<HTMLElement>("[data-scope-step]").forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 58%",
            end: "bottom 42%",
            onEnter: () => setActiveScope(index),
            onEnterBack: () => setActiveScope(index),
          });
        });
      }, rootRef);

      const cursor = cursorRef.current;
      const onMove = (event: MouseEvent) => {
        if (!cursor || coarsePointer) return;
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        const target = event.target as HTMLElement;
        cursor.classList.toggle("cursor--open", Boolean(target.closest("[data-cursor='open']")));
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      clean = () => {
        window.removeEventListener("mousemove", onMove);
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        lenis?.destroy();
        cancelAnimationFrame(animationFrame);
      };
    })();
    return () => clean();
  }, [loaded]);

  const moveMagnetic = (event: PointerEvent<HTMLButtonElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
    event.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
  };

  const resetMagnetic = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.transform = "translate(0, 0)";
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Integration point: replace with a POST request to your API, CRM or Telegram bot.
    setSent(true);
  };

  return (
    <div
      ref={rootRef}
      className={`site-shell ${loaded ? "is-loaded" : "is-loading"}`}
      style={{
        "--bg": site.colors.background,
        "--ink": site.colors.foreground,
        "--muted": site.colors.muted,
        "--dark": site.colors.dark,
        "--accent": site.colors.accent,
      } as React.CSSProperties}
    >
      <div className="preloader" aria-hidden={loaded}>
        <div className="preloader__plane preloader__plane--top" />
        <div className="preloader__plane preloader__plane--bottom" />
        <div className="preloader__content">
          <strong>{site.brand.name}</strong>
          <span>{site.brand.descriptor}</span>
          <span className="preloader__count">{String(percent).padStart(2, "0")}—100</span>
        </div>
      </div>

      <header className="header">
        <a className="wordmark" href="#top" aria-label="MONOFORM — на главную">{site.brand.logo}</a>
        <nav className="header__nav" aria-label="Основная навигация">
          {site.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header__cta" href="#contact">Обсудить проект <Arrow /></a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>{menuOpen ? "Закрыть" : "Меню"}</span>
          <i aria-hidden="true" />
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Мобильная навигация">
          {site.navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Обсудить проект <Arrow /></a>
      </div>

      <main id="content">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero__media" data-hero-image>
            <Image src={site.hero.image} alt={site.hero.alt} fill unoptimized priority sizes="100vw" />
          </div>
          <div className="hero__veil" />
          <div className="hero__content">
            <div className="hero__meta">
              <span>{site.brand.descriptor}</span>
              <span>{site.brand.location}</span>
            </div>
            <p className="hero__eyebrow">{site.hero.eyebrow}</p>
            <h1 id="hero-title">
              {site.hero.title.split(" ").reduce<string[][]>((lines, word, index) => {
                const line = index < 2 ? 0 : index < 4 ? 1 : 2;
                (lines[line] ||= []).push(word);
                return lines;
              }, []).map((line, index) => (
                <span className="hero__line" key={index}><span>{line.join(" ")}</span></span>
              ))}
            </h1>
            <p className="hero__body">{site.hero.body}</p>
            <div className="hero__actions">
              <a className="text-link text-link--light" href="#projects">Смотреть проекты <Arrow /></a>
              <span>{site.brand.years}</span>
            </div>
          </div>
          <span className="hero__scroll">Scroll to explore</span>
        </section>

        <section id="approach" className="manifesto section-pad">
          <div className="section-label" data-reveal><span>01</span><p>Подход</p></div>
          <div className="manifesto__grid">
            <blockquote data-reveal>
              {site.manifesto.lines.map((line, index) => (
                <span key={line} className={index === 2 ? "serif" : ""}>{line}</span>
              ))}
            </blockquote>
            <div className="manifesto__aside" data-reveal>
              <p>{site.manifesto.body}</p>
              <span>От сценария жизни<br />к точному пространству</span>
            </div>
          </div>
        </section>

        <section id="projects" className="projects section-pad" aria-labelledby="projects-title">
          <div className="section-label" data-reveal><span>02</span><p>Избранные проекты</p></div>
          <div className="projects__heading" data-reveal>
            <h2 id="projects-title">Четыре пространства.<br /><span className="serif">Четыре контекста.</span></h2>
            <p>Не коллекция изображений, а решения, собранные вокруг участка, человека и материала.</p>
          </div>
          <div className="projects__list">
            {site.projects.map((project, index) => <ProjectCard key={project.id} project={project} priority={index === 0} />)}
          </div>
          <div className="mid-cta" data-reveal>
            <p>Есть участок или пространство,<br />которое хочется переосмыслить?</p>
            <a className="round-link" href="#contact">Начать разговор <Arrow diagonal /></a>
          </div>
        </section>

        <section id="case-study" className="case-study" aria-labelledby="case-title">
          <div className="case-study__intro section-pad">
            <div className="section-label section-label--light"><span>03</span><p>История проекта</p></div>
            <p className="case-study__kicker">От исходной задачи<br />до прожитого пространства</p>
            <h2 id="case-title">Forest<br /><span className="serif">Residence</span></h2>
          </div>
          <div className="case-story">
            <div className="case-visual" aria-live="polite">
              {activeCase === 2 ? (
                <div className="interior-plan" aria-label="Интерьер общей зоны Forest Residence с интерактивными пояснениями">
                  <Image src={site.caseStudy.interiorImage} alt="Временный фотореалистичный интерьер Forest Residence" fill unoptimized sizes="(max-width: 768px) 100vw, 66vw" />
                  <div className="interior-plan__veil" />
                  <span className="interior-plan__eyebrow">Интерьер общей зоны · Forest Residence</span>
                  {site.caseStudy.rooms.map((room, index) => (
                    <button
                      key={room.name}
                      type="button"
                      className={`hotspot ${activeRoom === index ? "is-active" : ""}`}
                      style={{ left: `${room.x}%`, top: `${room.y}%` }}
                      onMouseEnter={() => setActiveRoom(index)}
                      onFocus={() => setActiveRoom(index)}
                      onClick={() => setActiveRoom(index)}
                      aria-label={`${room.name}: ${room.text}`}
                    ><span>{index + 1}</span></button>
                  ))}
                  <div className="room-note"><span>0{activeRoom + 1}</span><strong>{site.caseStudy.rooms[activeRoom].name}</strong><p>{site.caseStudy.rooms[activeRoom].text}</p></div>
                </div>
              ) : activeCase === 3 ? (
                <div className="comparison">
                  <Image src="/projects/house-on-the-ridge/hero.webp" alt="Условное исходное состояние объёма" fill unoptimized sizes="66vw" />
                  <div className="comparison__after" style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}>
                    <Image src={site.caseStudy.image} alt="Итоговое архитектурное решение Forest Residence" fill unoptimized sizes="66vw" />
                  </div>
                  <span className="comparison__label comparison__label--before">До</span>
                  <span className="comparison__label comparison__label--after">После</span>
                  <div className="comparison__line" style={{ left: `${compare}%` }} />
                  <input aria-label="Сравнить исходное и итоговое решение" type="range" min="8" max="92" value={compare} onChange={(event) => setCompare(Number(event.target.value))} />
                </div>
              ) : activeCase === 4 ? (
                <div className="materials">
                  <div className="materials__sample">
                    <Image
                      key={site.caseStudy.materials[activeMaterial].image}
                      src={site.caseStudy.materials[activeMaterial].image}
                      alt={site.caseStudy.materials[activeMaterial].alt}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 58vw"
                    />
                    <div className="materials__sample-meta"><span>Material study</span><span>0{activeMaterial + 1}</span></div>
                  </div>
                  <div className="materials__copy">
                    <span>0{activeMaterial + 1} / 05</span>
                    <h3>{site.caseStudy.materials[activeMaterial].name}</h3>
                    <p>{site.caseStudy.materials[activeMaterial].detail}</p>
                  </div>
                  <div className="materials__palette">
                    {site.caseStudy.materials.map((material, index) => (
                      <button
                        key={material.name}
                        type="button"
                        className={index === activeMaterial ? "is-active" : ""}
                        style={{ backgroundImage: `url(${material.image})` }}
                        onMouseEnter={() => setActiveMaterial(index)}
                        onFocus={() => setActiveMaterial(index)}
                        onClick={() => setActiveMaterial(index)}
                        aria-label={`Показать материал: ${material.name}`}
                        aria-pressed={index === activeMaterial}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`case-image case-image--${activeCase}`}>
                  <Image src={site.caseStudy.image} alt="Временный демонстрационный кадр Forest Residence" fill unoptimized sizes="(max-width: 768px) 100vw, 66vw" />
                  {activeCase === 1 && <div className="context-lines"><span>Свет 08:20</span><span>Вид на лес</span><span>Сохранённые сосны</span></div>}
                </div>
              )}
              <div className="case-progress"><span style={{ width: `${((activeCase + 1) / site.caseStudy.stages.length) * 100}%` }} /></div>
            </div>
            <div className="case-steps">
              {site.caseStudy.stages.map((stage, index) => (
                <article key={stage.number} data-case-step className={activeCase === index ? "is-active" : ""}>
                  <span>{stage.number} / 06</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="case-result">
            <div className="image-wrap"><Image src={site.caseStudy.image} alt="Временный итоговый кадр Forest Residence" fill unoptimized sizes="100vw" /></div>
            <blockquote className="serif">«{site.caseStudy.stages[5].text}»</blockquote>
            <a href="#contact" className="text-link text-link--light">Обсудить похожий проект <Arrow /></a>
          </div>
        </section>

        <section id="scope" className="scope section-pad" aria-labelledby="scope-title">
          <div className="section-label"><span>04</span><p>Объём работы</p></div>
          <div className="scope__statement" data-reveal>
            <h2 id="scope-title">Архитектура — не только изображение будущего пространства.</h2>
            <p className="serif">Это управляемый процесс от идеи до реализации.</p>
          </div>
          <div className="scope__grid">
            <div className="scope__steps">
              {site.scope.map((item, index) => (
                <article key={item.number} data-scope-step className={activeScope === index ? "is-active" : ""}>
                  <span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="scope__visual image-wrap">
              <Image key={site.projects[activeScope].image} src={site.projects[activeScope].image} alt={site.projects[activeScope].alt} fill unoptimized sizes="45vw" />
              <span>{site.scope[activeScope].number} — {site.scope[activeScope].title}</span>
            </div>
          </div>
        </section>

        <section className="process section-pad" aria-labelledby="process-title">
          <div className="section-label"><span>05</span><p>Как проходит работа</p></div>
          <div className="process__heading" data-reveal>
            <h2 id="process-title">Ясный путь.<br />Взвешенные решения.</h2>
            <p>Срок каждого этапа уточняем после знакомства с объектом. Строительный график зависит от масштаба, подрядчиков и комплектации.</p>
          </div>
          <div className="process__list">
            {site.process.map((item, index) => (
              <details key={item.number} open={index === 0}>
                <summary><span>{item.number}</span><strong>{item.title}</strong><small>{item.timing}</small><i aria-hidden="true">+</i></summary>
                <p>{item.text}</p>
              </details>
            ))}
          </div>
          <div className="process__cta" data-reveal><p>На первой встрече определим,<br />какой формат работы подходит объекту.</p><a href="#contact" className="text-link">Подготовиться к встрече <Arrow /></a></div>
        </section>

        <section className="about" aria-labelledby="about-title">
          <div className="about__image image-wrap"><Image src={site.about.image} alt={site.about.alt} fill unoptimized sizes="100vw" /></div>
          <div className="about__content section-pad">
            <div className="section-label"><span>06</span><p>О бюро</p></div>
            <h2 id="about-title" data-reveal>{site.about.text}</h2>
            <div className="about__facts">
              {site.about.facts.map((fact, index) => <p key={fact}><span>0{index + 1}</span>{fact}</p>)}
            </div>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="contact__top">
            <div className="section-label section-label--light"><span>07</span><p>Начать проект</p></div>
            <div className="contact__title">
              <h2 id="contact-title">Расскажите о пространстве,<br /><span className="serif">которое хотите создать.</span></h2>
              <p>На первой встрече обсудим объект, задачу, сроки и подходящий формат работы.</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={submitForm} aria-live="polite">
            {sent ? (
              <div className="form-success" tabIndex={-1}>
                <span>Спасибо</span>
                <h3>Сообщение подготовлено.</h3>
                <p>Демо-форма работает локально. Подключите API, CRM или Telegram-бота в обработчике <code>submitForm</code>.</p>
                <button type="button" onClick={() => setSent(false)}>Отправить ещё одно</button>
              </div>
            ) : (
              <>
                <label><span>Ваше имя</span><input name="name" type="text" autoComplete="name" required placeholder="Как к вам обращаться" /></label>
                <label><span>Телефон или Telegram</span><input name="contact" type="text" autoComplete="tel" required placeholder="+7 или @username" /></label>
                <label><span>Тип объекта</span><select name="type" required defaultValue=""><option value="" disabled>Выберите тип</option><option>Частный дом</option><option>Интерьер</option><option>Общественное пространство</option><option>Другое</option></select></label>
                <label className="contact-form__comment"><span>Расскажите о задаче</span><textarea name="message" rows={3} placeholder="Площадь, локация, стадия проекта и ваши ожидания" /></label>
                <button className="submit-button" type="submit" onPointerMove={moveMagnetic} onPointerLeave={resetMagnetic}><span>Обсудить проект</span><Arrow diagonal /></button>
                <p className="contact-form__note">Нажимая кнопку, вы соглашаетесь на обработку данных для ответа на запрос.</p>
              </>
            )}
          </form>
          <footer className="footer">
            <a className="wordmark" href="#top">{site.brand.name}</a>
            <div><a href={site.contact.telegramUrl} target="_blank" rel="noreferrer">Telegram <Arrow diagonal /></a><a href={`mailto:${site.contact.email}`}>Email <Arrow diagonal /></a><a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a></div>
            <div><p>{site.brand.location}</p><p>{site.brand.descriptor}</p></div>
            <p>© {new Date().getFullYear()} MONOFORM<br />Images: temporary demo material</p>
          </footer>
        </section>
      </main>

      <div ref={cursorRef} className="cursor" aria-hidden="true"><span>Открыть<br />проект</span></div>
    </div>
  );
}
