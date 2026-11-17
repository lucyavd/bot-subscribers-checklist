import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { resultContent } from '../data/resultContent';

interface Props {
  index: number;
  secondary?: boolean;
}

export default function ResultAdvice({ index, secondary = false }: Props) {
  const result = resultContent[index];
  if (!result) return null;

  return (
    <div className="space-y-4 text-slate-800">
      {secondary
        ? <h3 className="text-xl font-bold leading-tight text-slate-900">{result.name}</h3>
        : <h2 className="font-serif text-2xl font-bold leading-tight text-slate-900 md:text-3xl">{result.name}</h2>}

      <p className="leading-relaxed">{result.description}</p>
      <div className="space-y-4 rounded-2xl border border-violet-200 bg-white p-4 md:p-5">
        <h4 className="font-bold text-violet-950">С чего начать</h4>
        <p className="leading-relaxed">{result.intro}</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="min-w-0 rounded-xl border border-rose-200 bg-rose-50/70 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-rose-900">
              <XCircle size={18} aria-hidden="true" /> Было
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-800">«{result.before}»</p>
          </div>
          <div className="min-w-0 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-900">
              <CheckCircle2 size={18} aria-hidden="true" /> Стало
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-800">«{result.after}»</p>
            {result.button && (
              <>
                <div className="mt-3 text-xs font-semibold text-emerald-900">Пример текста кнопки:</div>
              <span className="mt-2 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">
                {result.button} <ArrowRight size={15} aria-hidden="true" />
              </span>
              </>
            )}
          </div>
        </div>
        <p className="font-medium leading-relaxed">{result.conclusion}</p>
        {result.note && <p className="border-t border-violet-100 pt-3 text-sm leading-relaxed text-slate-600">{result.note}</p>}
      </div>
    </div>
  );
}