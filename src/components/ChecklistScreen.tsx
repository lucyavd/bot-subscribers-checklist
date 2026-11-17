import { useState } from 'react';
import { Bot, CheckCircle2, ChevronDown } from 'lucide-react';
import { checklistItems } from '../data/checklistData';

interface ChecklistScreenProps {
  initialSelected: number[];
  onSubmit: (selectedItems: number[]) => void;
}

const ChecklistScreen = ({ initialSelected, onSubmit }: ChecklistScreenProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>(initialSelected);

  const toggle = (index: number) => {
    setSelectedItems(current =>
      current.includes(index) ? current.filter(value => value !== index) : [...current, index]
    );
  };

  return (
    <main className="container mx-auto max-w-3xl px-4 py-6 md:py-12">
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <header className="bg-gradient-to-r from-violet-700 to-violet-900 p-6 text-violet-50 md:p-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-100">
            <Bot size={20} aria-hidden="true" />
            Для нутрициологов · 5 ситуаций
          </div>
          <h1 className="font-serif text-3xl font-bold leading-tight md:text-4xl">
            Куда пропадают подписчики после знакомства с твоим ботом?
          </h1>
          <p className="mt-4 max-w-xl text-lg text-violet-50">
            Подписчики запускают бота, забирают материалы, но потом исчезают? Отметь знакомые ситуации — и получи примеры, что можно улучшить.
          </p>
        </header>

        <div className="p-5 md:p-8">
          <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 p-4 text-slate-800">
            <p className="font-semibold">Узнала ситуацию в своём боте? Отметь галочкой.</p>
            <p className="mt-1 text-sm">
              Если не уверена, открой пример и три коротких вопроса под карточкой.
              Галочку ставь, если узнаёшь хотя бы один признак проблемы.
            </p>
          </div>

          <div className="space-y-4">
            {checklistItems.map((item, index) => (
              <article key={item.title}
                className={'overflow-hidden rounded-2xl border-2 transition-colors ' +
                  (selectedItems.includes(index)
                    ? 'border-violet-500 bg-violet-50/50'
                    : 'border-slate-200 bg-white')}>
                <label className="flex cursor-pointer items-start gap-3 px-4 py-5 md:px-5">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => toggle(index)}
                    aria-label={'Отметить проблему: ' + item.title}
                    className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-violet-700"
                  />
                  <span className="text-lg font-semibold leading-snug text-slate-900">{item.title}</span>
                </label>

                <details className="group border-t border-violet-100">
                  <summary className="flex list-none cursor-pointer items-center justify-between gap-3 bg-violet-100 px-4 py-3.5 text-violet-950 transition-colors hover:bg-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-violet-700 [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">
                      <span className="block font-bold group-open:hidden">Открыть пример и вопросы</span>
                      <span className="hidden font-bold group-open:block">Свернуть пример и вопросы</span>
                      <span className="block text-xs text-violet-900 group-open:hidden">Короткий пример и признаки проблемы</span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-700 text-white">
                      <ChevronDown size={21} aria-hidden="true" className="transition-transform group-open:rotate-180" />
                    </span>
                  </summary>

                  <div className="space-y-4 border-t border-violet-100 bg-slate-50 px-4 py-4 md:px-5">
                    <div className="flex items-start gap-3">
                      <img src={import.meta.env.BASE_URL + item.image.replace(/^\//, '')}
                        alt={'Иллюстрация к проблеме «' + item.title + '»'}
                        loading="lazy"
                        className="h-24 w-24 shrink-0 rounded-xl bg-white object-contain p-1 sm:h-28 sm:w-28"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="mb-1 font-semibold text-slate-900">Как бывает:</p>
                        <p className="text-sm leading-relaxed text-slate-700">{item.example}</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="mb-2 font-semibold text-slate-900">Проверь у себя:</p>
                      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                        {item.checkpoints.map(point => <li key={point}>{point}</li>)}
                      </ul>
                      <p className="mt-3 text-xs font-medium text-violet-900">
                        Если узнаёшь хотя бы один пункт, отметь проблему галочкой выше.
                      </p>
                    </div>
                  </div>
                </details>
              </article>
            ))}
          </div>

          <div className="sticky bottom-3 z-10 mt-7 flex flex-col items-center justify-between gap-3 rounded-xl border border-violet-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row">
            <p className="text-sm font-medium text-slate-700">Отмечено: {selectedItems.length} из {checklistItems.length}</p>
            <button type="button" onClick={() => onSubmit([...selectedItems].sort((a, b) => a - b))}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-6 py-3 font-semibold text-white hover:bg-violet-800 sm:w-auto">
              <CheckCircle2 size={20} aria-hidden="true" /> Получить рекомендации
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            Это самопроверка по пяти ситуациям, а не полноценный аудит. Контактные данные не нужны.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ChecklistScreen;
