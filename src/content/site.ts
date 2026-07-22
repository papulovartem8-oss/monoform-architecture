export type Project = {
  id: string;
  title: string;
  type: string;
  area: string;
  location: string;
  year: string;
  image: string;
  alt: string;
  layout: "full" | "portrait" | "offset" | "wide";
};

export const site = {
  brand: {
    name: "MONOFORM",
    descriptor: "Architecture & Interiors",
    statement: "Architecture shaped around life",
    location: "Москва / Санкт-Петербург",
    years: "2018—2026",
    logo: "MONOFORM",
  },
  colors: {
    background: "#F1F0EB",
    foreground: "#151515",
    muted: "#8A8983",
    dark: "#111111",
    accent: "#A84532",
  },
  navigation: [
    { label: "Проекты", href: "#projects" },
    { label: "Подход", href: "#approach" },
    { label: "Услуги", href: "#scope" },
    { label: "Контакты", href: "#contact" },
  ],
  hero: {
    eyebrow: "Architecture shaped around life",
    title: "Пространство как продолжение человека.",
    body: "Проектируем частные дома и интерьеры, в которых архитектура, интерьер и образ жизни существуют как единое целое.",
    image: "/projects/house-on-the-ridge/hero.webp",
    alt: "Временный демонстрационный кадр современного дома на скальном рельефе",
  },
  manifesto: {
    lines: [
      "Мы не начинаем проект с формы.",
      "Мы начинаем с вопроса:",
      "как человек будет чувствовать себя в этом пространстве?",
    ],
    body: "Исследуем привычки, ритм дня, характер участка и естественный свет. Затем собираем архитектуру, интерьер и детали в одну ясную систему — от первой линии до реализации.",
  },
  projects: [
    {
      id: "house-on-the-ridge", title: "House on the Ridge", type: "Частный дом", area: "420 м²",
      location: "Московская область", year: "2025", image: "/projects/house-on-the-ridge/hero.webp",
      alt: "Временный демонстрационный кадр дома на скальном рельефе", layout: "full",
    },
    {
      id: "silent-apartment", title: "Silent Apartment", type: "Интерьер квартиры", area: "168 м²",
      location: "Москва", year: "2024", image: "/projects/silent-apartment/hero.webp",
      alt: "Временный демонстрационный кадр спокойного интерьера из камня и дуба", layout: "portrait",
    },
    {
      id: "forest-residence", title: "Forest Residence", type: "Архитектура и интерьер", area: "610 м²",
      location: "Ленинградская область", year: "2025", image: "/projects/forest-residence/hero.webp",
      alt: "Временный демонстрационный кадр резиденции в сосновом лесу", layout: "offset",
    },
    {
      id: "material-gallery", title: "Material Gallery", type: "Общественный интерьер", area: "290 м²",
      location: "Санкт-Петербург", year: "2023", image: "/projects/material-gallery/hero.webp",
      alt: "Временный демонстрационный кадр галереи архитектурных материалов", layout: "wide",
    },
  ] satisfies Project[],
  caseStudy: {
    title: "Forest Residence",
    image: "/projects/forest-residence/hero.webp",
    interiorImage: "/projects/forest-residence/interior-v2.webp",
    stages: [
      { number: "01", title: "Задача", text: "Создать загородный дом для семьи, который не отделяется от леса, а становится его частью." },
      { number: "02", title: "Контекст", text: "Сохраняем взрослые сосны, направляем основные виды в глубину участка и прячем технические зоны от вечернего света." },
      { number: "03", title: "Планировочное решение", text: "Одна длинная ось соединяет общую зону, приватный блок и террасу. Каждый маршрут завершается видом на лес." },
      { number: "04", title: "До / после", text: "Разрозненные объёмы превращаются в спокойную горизонталь, которая собирает ландшафт в единый кадр." },
      { number: "05", title: "Материалы", text: "Камень продолжает рельеф, обожжённая лиственница растворяет фасад среди стволов, дуб делает интерьер теплее." },
      { number: "06", title: "Результат", text: "Дом не конкурирует с ландшафтом. Он создаёт рамку, через которую семья каждый день наблюдает его изменение." },
    ],
    rooms: [
      { name: "Гостиная", x: 28, y: 68, text: "Низкая мебель сохраняет панораму леса и объединяет общую зону." },
      { name: "Кухня", x: 73, y: 55, text: "Длинный дубовый остров работает как центр ежедневной жизни семьи." },
      { name: "Столовая", x: 49, y: 47, text: "Обеденная группа расположена на пересечении кухни, гостиной и вида." },
      { name: "Остекление", x: 24, y: 31, text: "Угловое стекло убирает границу между интерьером и сосновым лесом." },
    ],
    materials: [
      { name: "Натуральный камень", detail: "Связывает основание дома с гранитным рельефом участка.", image: "/projects/forest-residence/materials/stone.webp", alt: "Макроснимок образца натурального серого гранита" },
      { name: "Дуб", detail: "Добавляет тактильное тепло в ежедневных точках контакта.", image: "/projects/forest-residence/materials/oak.webp", alt: "Макроснимок образца натурального дубового шпона" },
      { name: "Металл", detail: "Даёт тонкие прочные узлы без визуальной тяжести.", image: "/projects/forest-residence/materials/metal.webp", alt: "Макроснимок образца чернёной брашированной стали" },
      { name: "Текстиль", detail: "Смягчает акустику и удерживает спокойную световую гамму.", image: "/projects/forest-residence/materials/textile.webp", alt: "Макроснимок образца плотного натурального льна" },
      { name: "Микроцемент", detail: "Создаёт непрерывные нейтральные поверхности в служебных зонах.", image: "/projects/forest-residence/materials/microcement.webp", alt: "Макроснимок образца тёпло-серого микроцемента" },
    ],
  },
  scope: [
    { number: "01", title: "Концепция", text: "Архитектурная идея, сценарии жизни и визуальное направление." },
    { number: "02", title: "Проектирование", text: "Планировки, рабочая документация и технические решения." },
    { number: "03", title: "Комплектация", text: "Материалы, мебель, свет и работа с поставщиками." },
    { number: "04", title: "Авторский надзор", text: "Контроль реализации и сохранение первоначального замысла." },
  ],
  process: [
    { number: "01", title: "Знакомство и бриф", timing: "1–2 недели", text: "Фиксируем задачу, ожидания, ограничения и критерии будущего пространства." },
    { number: "02", title: "Исследование и концепция", timing: "6–10 недель", text: "Изучаем контекст, собираем сценарии и формулируем архитектурную идею." },
    { number: "03", title: "Проектирование", timing: "4–8 месяцев", text: "Разрабатываем решения и документацию; срок зависит от масштаба объекта." },
    { number: "04", title: "Комплектация", timing: "Параллельно проекту", text: "Подбираем материалы, оборудование и поставщиков под бюджет и график." },
    { number: "05", title: "Реализация", timing: "По графику объекта", text: "Сопровождаем стройку и принимаем ключевые решения вместе с командой." },
    { number: "06", title: "Передача пространства", timing: "Финальный этап", text: "Проверяем результат, настраиваем детали и передаём готовое пространство." },
  ],
  about: {
    image: "/projects/material-gallery/hero.webp",
    alt: "Временный демонстрационный кадр рабочей галереи материалов",
    text: "MONOFORM — архитектурное бюро, которое соединяет архитектуру, интерьер и предметную среду в единую систему.",
    facts: ["Москва / Санкт-Петербург", "Архитектура и интерьеры", "Частные и общественные пространства", "Полный цикл проектирования"],
  },
  contact: {
    email: "hello@monoform.archi",
    phone: "+7 495 000-00-00",
    phoneHref: "+74950000000",
    telegram: "@monoform_archi",
    telegramUrl: "https://t.me/monoform_archi",
  },
} as const;
