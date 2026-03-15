import { useState } from "react"
import Icon from "@/components/ui/icon"

type ColData = { heading: string; color: string; items: string[] }
type SourceItem = { icon: string; label: string; color: string }
type SocialItem = { icon: string; text: string }

type Slide =
  | { id: number; type: "cover"; title: string; subtitle: string; tag: string }
  | { id: number; type: "agenda"; title: string; items: string[] }
  | { id: number; type: "two-col"; title: string; left: ColData; right: ColData }
  | { id: number; type: "detail"; title: string; icon: string; description: string; points: string[]; note?: string }
  | { id: number; type: "sources-intro"; title: string; subtitle: string; sources: SourceItem[] }
  | { id: number; type: "source-detail"; title: string; icon: string; accentColor: string; description: string; points: string[]; note?: string }
  | { id: number; type: "social-effect"; title: string; items: SocialItem[]; quote: string }
  | { id: number; type: "homework"; title: string; items: string[] }
  | { id: number; type: "reflection"; title: string; questions: string[]; closing: string }

const slides: Slide[] = [
  {
    id: 1,
    type: "cover",
    title: "Финансовая модель общественного пространства",
    subtitle: "Источники финансирования и структура затрат",
    tag: "Лекция",
  },
  {
    id: 2,
    type: "agenda",
    title: "На этой лекции",
    items: [
      "Структура финансовой модели общественного пространства",
      "Затратная часть: единоразовые и систематические затраты",
      "Доходная часть: источники и объёмы",
      "Источники финансирования проекта",
    ],
  },
  {
    id: 3,
    type: "two-col",
    title: "Структура финансовой модели",
    left: {
      heading: "Затратная часть",
      color: "red",
      items: [
        "Единоразовые затраты — здания, благоустройство, строения",
        "Систематические затраты — коммунальные услуги, зарплата, аренда",
      ],
    },
    right: {
      heading: "Доходная часть",
      color: "green",
      items: [
        "Оплата услуг жителями — прокат, продажа, сувениры",
        "Аренда помещений или земельного участка",
        "Доходы по событийной сетке",
      ],
    },
  },
  {
    id: 4,
    type: "detail",
    title: "Единоразовые затраты",
    icon: "Building2",
    description:
      "Затраты, связанные с реализацией проекта: здания, строения, благоустройство. Структурируются укрупнённо на основе аналоговых объектов.",
    points: [
      "Строительство и реконструкция зданий",
      "Благоустройство территории",
      "Инфраструктурные объекты",
      "Оборудование площадок",
    ],
    note: "Затраты формируются исходя из аналоговых объектов — не нужно разбивать каждый на все виды работ",
  },
  {
    id: 5,
    type: "detail",
    title: "Систематические затраты",
    icon: "RefreshCw",
    description:
      "Регулярные расходы на функционирование общественного пространства. Формируются для каждого объекта и пространства в целом, структурируются по-объектно.",
    points: [
      "Коммунальные услуги",
      "Заработная плата персонала",
      "Аренда",
      "Обслуживание и ремонт",
    ],
    note: "Необходимо рассматривать с позиции каждого выгодоприобретателя: администрации города и владельцев бизнеса",
  },
  {
    id: 6,
    type: "detail",
    title: "Доходная часть",
    icon: "TrendingUp",
    description:
      "Структура доходов определяется через проходимость: в будни, выходные, по событийной сетке.",
    points: [
      "Оплата услуг жителями (прокат, мороженое, сувениры)",
      "Аренда помещений или земельного участка",
      "Событийные мероприятия",
      "Модель окупаемости бизнеса (ROI на 1 год)",
    ],
    note: "Для объектов бизнеса рекомендуется просчитать модель окупаемости из финансовой модели на год и единовременных затрат",
  },
  {
    id: 7,
    type: "sources-intro",
    title: "Источники финансирования",
    subtitle:
      "Особенность общественных пространств — многокомпонентная структура финансирования. Один проект может совмещать несколько источников.",
    sources: [
      { icon: "Landmark", label: "Бюджетное", color: "blue" },
      { icon: "Briefcase", label: "Частный инвестор", color: "purple" },
      { icon: "Award", label: "Гранты", color: "yellow" },
      { icon: "Users", label: "Краудфандинг", color: "green" },
    ],
  },
  {
    id: 8,
    type: "source-detail",
    title: "1. Бюджетное финансирование",
    icon: "Landmark",
    accentColor: "blue",
    description:
      "Общественные пространства создаются на муниципальных или региональных территориях, поэтому привлекаются средства из местного, регионального или федерального бюджета.",
    points: [
      "Местный и региональный бюджет",
      "Федеральный бюджет — нацпроект «Жильё и комфортная городская среда»",
      "Конкурсная основа для федерального финансирования",
      "Средства, как правило, невозвратные или частично возвратные",
    ],
    note: "Затраты на эксплуатацию ложатся на муниципальный бюджет",
  },
  {
    id: 9,
    type: "source-detail",
    title: "2. Частный инвестор",
    icon: "Briefcase",
    accentColor: "purple",
    description:
      "Организация, готовая инвестировать собственные средства с ожиданием возврата инвестиций и прибыли. Реализуется через механизмы государственно-частного партнёрства.",
    points: [
      "10–30% и более от бюджета проекта",
      "В коммерческих проектах — до 100% без бюджетных средств",
      "Один проект может включать нескольких инвесторов",
      "Возможно: собственность на объекты или долгосрочная аренда на льготных условиях",
    ],
    note: "Важно чётко распределить функции, ответственность и ожидаемый результат каждого участника",
  },
  {
    id: 10,
    type: "source-detail",
    title: "3. Грантовое финансирование",
    icon: "Award",
    accentColor: "yellow",
    description:
      "Гранты выделяются через конкурсы под гражданские инициативы. Бывают государственными и коммерческими.",
    points: [
      "Фонд президентских грантов (государственный)",
      "«Город своими руками» от ОАО Газпром (коммерческий)",
      "Как правило, до 10 млн руб.",
      "Достаточны для небольших по бюджету проектов",
    ],
    note: "Гранты не покрывают все затраты на крупный проект, но дополняют другие источники",
  },
  {
    id: 11,
    type: "source-detail",
    title: "4. Краудфандинг",
    icon: "Users",
    accentColor: "green",
    description:
      "Привлечение средств, труда и времени от общественности. Создаёт не только финансовую, но и социальную ценность.",
    points: [
      "Пожертвования и донаты от жителей и бизнеса",
      "Вклад трудом: мастер-классы, волонтёрство",
      "Целевое направление: скейт-площадка, арт-объекты",
      "Бесплатная разработка проектов, ландшафтного дизайна",
    ],
    note: "При привлечении общественных денег необходим прозрачный отчёт — иначе риск обвинения в мошенничестве",
  },
  {
    id: 12,
    type: "social-effect",
    title: "Социальный эффект краудфандинга",
    items: [
      { icon: "Heart", text: "Вовлечённость населения в создание среды" },
      { icon: "Star", text: "Рост индекса удовлетворённости жителей" },
      { icon: "ShieldCheck", text: "Лояльность и забота об общей среде" },
      { icon: "Sprout", text: "Развитие креативных кластеров и малого бизнеса" },
      { icon: "TrendingUp", text: "Улучшение инвестиционного климата города" },
    ],
    quote:
      "Общественное пространство — это органический мир, в котором множество участников могут проявить себя и создать благоприятную физическую и инвестиционную среду.",
  },
  {
    id: 13,
    type: "homework",
    title: "Домашнее задание",
    items: [
      "Исправить ранее выполненную работу с учётом комментариев преподавателя",
      "Описать статьи затрат (единоразовые и постоянные) и доходов. Источники финансирования. Средний чек ЦА",
      "Описать сроки реализации проекта",
      "Описать риски, степень их влияния и мероприятия по снижению",
      "Оформить (дополнить существующую презентацию) по заданной структуре",
    ],
  },
  {
    id: 14,
    type: "reflection",
    title: "Итоговая рефлексия",
    questions: [
      "Что изменилось в вашем сознании относительно общественных пространств?",
      "Что кажется вам самым важным при развитии городской среды?",
      "Есть ли пожелания к преподавателю?",
      "Остались ли вопросы?",
    ],
    closing: "На этом курс лекций по теме общественных пространств окончен.",
  },
]

const accentMap: Record<string, string> = {
  blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  green: "bg-green-500/10 border-green-500/30 text-green-400",
  red: "bg-red-500/10 border-red-500/30 text-red-400",
}

const iconColorMap: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  yellow: "text-yellow-400",
  green: "text-green-400",
  red: "text-red-400",
}

export default function Presentation() {
  const [current, setCurrent] = useState(0)
  const slide = slides[current]

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1))

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl min-h-[540px] flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-gray-900/80">
          <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">Финансовая модель</span>
          <span className="text-xs text-gray-600 font-mono">{current + 1} / {slides.length}</span>
        </div>

        {/* Slide content */}
        <div className="flex-1 flex flex-col justify-center px-10 py-8">
          {slide.type === "cover" && (
            <div className="flex flex-col items-center justify-center text-center h-full gap-6">
              <div className="inline-block bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono px-4 py-1.5 rounded-full tracking-widest uppercase mb-2">
                {slide.tag}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
                {slide.title}
              </h1>
              <p className="text-xl text-gray-400">{slide.subtitle}</p>
            </div>
          )}

          {slide.type === "agenda" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-white mb-2">{slide.title}</h2>
              <div className="flex flex-col gap-3">
                {slide.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-gray-800/50 rounded-xl px-5 py-4 border border-gray-700/50">
                    <span className="text-red-400 font-bold text-lg mt-0.5">{i + 1}.</span>
                    <span className="text-gray-200 text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.type === "two-col" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {([slide.left, slide.right] as ColData[]).map((col, idx) => {
                  const colorClass = accentMap[col.color] || accentMap.red
                  return (
                    <div key={idx} className={`rounded-xl border p-6 flex flex-col gap-3 ${colorClass}`}>
                      <p className="font-bold text-lg">{col.heading}</p>
                      <ul className="flex flex-col gap-2">
                        {col.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {slide.type === "detail" && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                  <Icon name={slide.icon} size={24} className="text-red-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">{slide.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slide.points.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-800/50 rounded-xl px-4 py-3 border border-gray-700/40">
                    <Icon name="CheckCircle2" size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200 text-sm">{p}</span>
                  </div>
                ))}
              </div>
              {slide.note && (
                <div className="flex items-start gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-5 py-3 mt-1">
                  <Icon name="Lightbulb" size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-200/80 text-sm">{slide.note}</p>
                </div>
              )}
            </div>
          )}

          {slide.type === "sources-intro" && (
            <div className="flex flex-col gap-6 items-center text-center">
              <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
              <p className="text-gray-400 text-base max-w-2xl">{slide.subtitle}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-2">
                {slide.sources.map((s, i) => {
                  const colorCls = accentMap[s.color]
                  const iconCls = iconColorMap[s.color]
                  return (
                    <div key={i} className={`rounded-xl border p-5 flex flex-col items-center gap-3 ${colorCls}`}>
                      <Icon name={s.icon} size={28} className={iconCls} />
                      <span className="text-sm font-semibold text-gray-200">{s.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {slide.type === "source-detail" && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className={`border p-3 rounded-xl ${accentMap[slide.accentColor]}`}>
                  <Icon name={slide.icon} size={24} className={iconColorMap[slide.accentColor]} />
                </div>
                <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">{slide.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slide.points.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-800/50 rounded-xl px-4 py-3 border border-gray-700/40">
                    <Icon name="CheckCircle2" size={16} className={`${iconColorMap[slide.accentColor]} mt-0.5 flex-shrink-0`} />
                    <span className="text-gray-200 text-sm">{p}</span>
                  </div>
                ))}
              </div>
              {slide.note && (
                <div className="flex items-start gap-3 bg-gray-800/60 border border-gray-700/40 rounded-xl px-5 py-3">
                  <Icon name="Info" size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">{slide.note}</p>
                </div>
              )}
            </div>
          )}

          {slide.type === "social-effect" && (
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slide.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-green-500/5 border border-green-500/20 rounded-xl px-4 py-3">
                    <Icon name={item.icon} size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 border-green-500/50 pl-5 py-2 text-gray-300 italic text-sm leading-relaxed bg-green-500/5 rounded-r-xl pr-4">
                "{slide.quote}"
              </blockquote>
            </div>
          )}

          {slide.type === "homework" && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                  <Icon name="BookOpen" size={24} className="text-red-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
              </div>
              <div className="flex flex-col gap-3">
                {slide.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-gray-800/50 rounded-xl px-5 py-4 border border-gray-700/50">
                    <span className="text-red-400 font-bold text-base mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <span className="text-gray-200 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.type === "reflection" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {slide.questions.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-800/40 border border-gray-700/40 rounded-xl px-5 py-4">
                    <Icon name="HelpCircle" size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-2 bg-red-500/5 border border-red-500/20 rounded-xl px-6 py-5">
                <p className="text-red-300 text-base font-medium">{slide.closing}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm transition-colors border border-gray-700"
        >
          <Icon name="ChevronLeft" size={16} />
          Назад
        </button>

        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${i === current ? "w-5 h-2 bg-red-500" : "w-2 h-2 bg-gray-600 hover:bg-gray-400"}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          Далее
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  )
}
