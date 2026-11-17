import { checklistItems } from './checklistData';

export interface Diagnosis {
  headline: string;
  insight: string;
  priority: number | null;
  remaining: number[];
}

/** Ориентир для самопроверки, а не доказанный диагноз или аналитика конверсий. */
export function getDiagnosis(raw: number[]): Diagnosis {
  const selected = [...new Set(raw)].filter(i => Number.isInteger(i) && i >= 0 && i < checklistItems.length).sort((a, b) => a - b);

  if (selected.length === 0) {
    return {
      headline: 'По этим пяти ситуациям явных проблем не отмечено',
      insight: 'Это хороший повод посмотреть и на другие участки сценария. Без проверки реальных действий людей нельзя сказать наверняка, почему подписчики перестают отвечать, покупать или подписываться.',
      priority: null,
      remaining: []
    };
  }

  // Порядок отражает путь человека: от первого подарка и приветствия до дальнейших действий.
  const priority = selected[0];
  const headline = selected.length === 1
    ? 'Возможно, здесь люди теряют интерес'
    : selected.length === checklistItems.length
      ? 'Подписчик может теряться сразу в нескольких местах'
      : 'Ты узнала несколько ситуаций — начни с одной';

  const insight = selected.length === 1
    ? 'Ниже — возможная причина и конкретный пример, что можно изменить. Это гипотеза по твоему ответу, а не готовый диагноз бота.'
    : 'Не обязательно переделывать весь бот. Начни с первой отмеченной ситуации по пути подписчика, проверь, что происходит, и только потом переходи к остальным рекомендациям.';

  return { headline, insight, priority, remaining: selected.filter(i => i !== priority) };
}