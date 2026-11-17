import { ArrowLeft, ArrowUpRight, Bot, ChevronDown, ListChecks, Sparkles } from 'lucide-react';
import { checklistItems } from '../data/checklistData';
import { getDiagnosis } from '../data/diagnosis';
import ResultAdvice from './ResultAdvice';

interface ResultsScreenProps {
  selectedItems: number[];
  onRestart: () => void;
}

const channels = [
  { label: 'Подписаться в Telegram', href: 'https://t.me/avdeeva_blog', className: 'bg-slate-900 hover:bg-slate-800' },
  { label: 'Подписаться ВКонтакте', href: 'https://vk.ru/avdeeva__blog', className: 'bg-blue-700 hover:bg-blue-800' },
];

export default function ResultsScreen({ selectedItems, onRestart }: ResultsScreenProps) {
  const diagnosis = getDiagnosis(selectedItems);
  const count = [...new Set(selectedItems)].length;
  const main = diagnosis.priority;

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
        <header className="bg-gradient-to-br from-violet-800 via-violet-700 to-indigo-800 p-6 text-white md:p-9">
          <button type="button" onClick={onRestart}
            className="mb-5 inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-violet-100 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
            <ArrowLeft size={18} aria-hidden="true" /> Изменить ответы
          </button>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-100">
            <Sparkles size={19} aria-hidden="true" /> Твой результат
          </div>
          <h1 className="font-serif text-3xl font-bold leading-tight md:text-4xl">
            {count === 0 ? 'Знакомые проблемы не отмечены' : 'Ты отметила ' + count + ' из 5 ситуаций'}
          </h1>
          <p className="mt-3 max-w-xl leading-relaxed text-violet-100">
            {count === 0
              ? 'Посмотри, на что ещё обратить внимание, и забери идеи для своего бота.'
              : 'Ниже — возможные причины и примеры исправлений. Начни с одной ситуации, не меняй всё сразу.'}
          </p>
        </header>

        <div className="space-y-6 p-5 md:p-8">
          <section className="rounded-2xl border border-violet-200 bg-violet-50 p-5 md:p-7">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-800">
              <ListChecks size={18} aria-hidden="true" /> Самопроверка
            </p>
            <h2 className="mb-3 text-xl font-bold leading-snug text-slate-900">{diagnosis.headline}</h2>
            <p className="leading-relaxed text-slate-700">{diagnosis.insight}</p>
            {main !== null && (
              <div className="mt-5 border-t border-violet-200 pt-5">
                <p className="mb-3 text-sm font-semibold text-violet-900">Ситуация, с которой стоит начать:</p>
                <p className="mb-5 font-semibold text-slate-900">{checklistItems[main].title}</p>
                <ResultAdvice index={main} />
              </div>
            )}
          </section>

          <section className="relative overflow-hidden rounded-2xl border border-violet-200 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-4 inline-flex rounded-xl bg-violet-100 p-2 text-violet-800">
              <Bot size={24} aria-hidden="true" />
            </div>
            <h2 className="font-serif text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
              Кстати, ты сейчас не просто прочитала чек-лист
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700">
              {count > 0
                ? 'Ты отметила знакомые ситуации и получила рекомендации именно по своему боту.'
                : 'Ты проверила пять ситуаций, которые могут возникать в боте нутрициолога.'}
            </p>
            <p className="mt-3 leading-relaxed text-slate-700">
              А ведь подобный интерактив можно использовать и для своих подписчиков.
              Не обязательно ограничиваться бесплатным PDF или обычной рассылкой.
            </p>
            <div className="my-5 h-px bg-violet-100" />
            <p className="font-bold text-slate-900">Привет, меня зовут Люда.</p>
            <p className="mt-3 leading-relaxed text-slate-700">
              Я разрабатываю чат-ботов, тесты, игры и мини-приложения для экспертов.
            </p>
            <p className="mt-3 leading-relaxed text-slate-700">
              В Telegram и ВКонтакте показываю примеры своих проектов и идеи, которые можно адаптировать под разные задачи.
            </p>
            <p className="mt-4 font-semibold text-slate-900">
              Если интересно посмотреть, что ещё можно придумать для своей аудитории, заглядывай.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {channels.map(channel => (
                <a key={channel.href} href={channel.href} target="_blank" rel="noopener noreferrer"
                  className={'flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-center font-semibold text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 ' + channel.className}>
                  {channel.label} <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          {diagnosis.remaining.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="group-open:hidden">Другие отмеченные ситуации ({diagnosis.remaining.length})</span>
                    <span className="hidden group-open:inline">Свернуть дополнительные рекомендации</span>
                  </span>
                  <ChevronDown size={21} aria-hidden="true" className="shrink-0 text-violet-700 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Их тоже можно проверить, но не обязательно исправлять всё одновременно.
                </p>
                <div className="mt-4 space-y-5">
                  {diagnosis.remaining.map(index => (
                    <article key={index} className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
                      <p className="mb-3 text-sm font-semibold text-slate-600">{checklistItems[index].title}</p>
                      <ResultAdvice index={index} secondary />
                    </article>
                  ))}
                </div>
              </details>
            </section>
          )}
          <p className="text-xs leading-relaxed text-slate-500">
            Это самопроверка по твоим ответам, а не технический аудит бота и не гарантия роста подписок или продаж.
            Контактные данные не запрашиваются, результаты никуда не отправляются.
          </p>
        </div>
      </div>
    </main>
  );
}