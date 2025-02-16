
export enum NavigationButtons {
  start = 'start',
  previous = 'prev',
  next = 'next',
  end = 'end'
}

export const PAGINATION_ITEMS = [
  {
    icon: 'first_page',
    tooltip: 'First page',
    disabled: true,
    action: NavigationButtons.start,
  },
  {
    icon: 'chevron_left',
    tooltip: 'Previous',
    disabled: true,
    action: NavigationButtons.previous,
  },
  {
    icon: 'chevron_right',
    tooltip: 'Next',
    disabled: false,
    action: NavigationButtons.next,
  },
  {
    icon: 'last_page',
    tooltip: 'Last page',
    disabled: false,
    action: NavigationButtons.end,
  },
]

export const SORT_BY_TYPES = [
  {
    name: 'A to Z',
    value: 'original_title.asc'
  },
  {
    name: 'Z to A',
    value: 'original_title.desc'
  },
  {
    name: 'Most popular',
    value: 'popularity.desc'
  },
  {
    name: 'Least popular',
    value: 'popularity.asc'
  },
  {
    name: 'Higher ranking',
    value: 'vote_average.desc'
  },
  {
    name: 'Lower ranking',
    value: 'vote_average.asc'
  }
];

export const CHART_COLORS = [
  '#ff5733',
  '#33ff57',
  '#3357ff',
  '#ff33a1',
  '#ffd7dd',
  '#4b0082',
  '#00ffff',
  '#ff4500',
  '#32cd32',
  '#ff1493',
  '#8a2be2',
  '#ff6347',
  '#c71585',
  '#ffd700',
  '#008080',
  '#dc143c',
  '#1e90ff',
  '#adff2f',
  '#d2691e',
  '#20b2aa',
]