type CreateElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  classList?: string[],
  id?: string,
) => HTMLElementTagNameMap[K];

const createElement: CreateElement = (tag, classList, id) => {
  const el = document.createElement(tag);

  if (classList) {
    el.classList.add(...classList);
  }

  if (id) el.id = id;

  return el;
};

export { createElement };
