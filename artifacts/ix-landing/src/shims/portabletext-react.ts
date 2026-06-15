import React from "react";

export type PortableTextBlock = {
  _type: string;
  _key?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: Array<{
    _type: string;
    _key?: string;
    text?: string;
    marks?: string[];
  }>;
  markDefs?: Array<{ _type: string; _key: string; [key: string]: unknown }>;
  [key: string]: unknown;
};

type ComponentMap = Record<string, React.ComponentType<Record<string, unknown>>>;

interface Components {
  block?: ComponentMap;
  list?: ComponentMap;
  listItem?: ComponentMap;
  marks?: ComponentMap;
  types?: ComponentMap;
}

interface PortableTextProps {
  value: PortableTextBlock | PortableTextBlock[];
  components?: Components;
}

function renderSpan(
  child: { _type: string; _key?: string; text?: string; marks?: string[] },
  ci: number,
  markDefs: Record<string, Record<string, unknown>>,
  markComps: ComponentMap
): React.ReactNode {
  if (child._type !== "span") return null;
  const text = child.text ?? "";
  const marks = child.marks ?? [];
  let node: React.ReactNode = text;

  for (const mark of marks) {
    const markDef = markDefs[mark];
    const MarkComp = markComps[mark];
    if (MarkComp) {
      node = React.createElement(MarkComp as React.ComponentType<Record<string, unknown>>, { key: ci, value: markDef }, node);
    } else if (mark === "strong") {
      node = React.createElement("strong", { key: ci }, node);
    } else if (mark === "em") {
      node = React.createElement("em", { key: ci }, node);
    } else if (mark === "code") {
      node = React.createElement("code", { key: ci }, node);
    } else if (mark === "underline") {
      node = React.createElement("span", { key: ci, style: { textDecoration: "underline" } }, node);
    }
  }

  return React.createElement(React.Fragment, { key: ci }, node);
}

function renderTextBlock(
  block: PortableTextBlock,
  idx: number,
  blockComps: ComponentMap,
  markComps: ComponentMap
): React.ReactElement | null {
  const style = block.style ?? "normal";

  const markDefs: Record<string, Record<string, unknown>> = {};
  (block.markDefs ?? []).forEach((md) => {
    markDefs[md._key] = md as Record<string, unknown>;
  });

  const children = (block.children ?? []).map((child, ci) =>
    renderSpan(child, ci, markDefs, markComps)
  );

  const BlockComp = blockComps[style];
  if (BlockComp) {
    return React.createElement(BlockComp as React.ComponentType<Record<string, unknown>>, { key: idx }, ...children);
  }

  const tagMap: Record<string, string> = {
    normal: "p",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    blockquote: "blockquote",
  };
  const tag = tagMap[style] ?? "p";
  return React.createElement(tag, { key: idx }, ...children);
}

function groupListBlocks(
  blocks: PortableTextBlock[]
): Array<PortableTextBlock | { _type: "__list__"; listItem: string; level: number; items: PortableTextBlock[] }> {
  const result: Array<PortableTextBlock | { _type: "__list__"; listItem: string; level: number; items: PortableTextBlock[] }> = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    if (block.listItem) {
      const listItem = block.listItem;
      const level = block.level ?? 1;
      const items: PortableTextBlock[] = [];

      while (i < blocks.length && blocks[i].listItem === listItem && (blocks[i].level ?? 1) === level) {
        items.push(blocks[i]);
        i++;
      }

      result.push({ _type: "__list__", listItem, level, items });
    } else {
      result.push(block);
      i++;
    }
  }

  return result;
}

export function PortableText({ value, components = {} }: PortableTextProps): React.ReactElement | null {
  const blocks = Array.isArray(value) ? value : [value];
  if (!blocks || blocks.length === 0) return null;

  const blockComps = (components.block ?? {}) as ComponentMap;
  const listComps = (components.list ?? {}) as ComponentMap;
  const listItemComps = (components.listItem ?? {}) as ComponentMap;
  const markComps = (components.marks ?? {}) as ComponentMap;
  const typeComps = (components.types ?? {}) as ComponentMap;

  const grouped = groupListBlocks(blocks);

  const rendered = grouped.map((item, idx) => {
    if (item._type === "__list__") {
      const listGroup = item as { _type: "__list__"; listItem: string; level: number; items: PortableTextBlock[] };
      const listChildren = listGroup.items.map((listBlock, li) => {
        const markDefs: Record<string, Record<string, unknown>> = {};
        (listBlock.markDefs ?? []).forEach((md) => {
          markDefs[md._key] = md as Record<string, unknown>;
        });

        const spanChildren = (listBlock.children ?? []).map((child, ci) =>
          renderSpan(child, ci, markDefs, markComps)
        );

        const ListItemComp = listItemComps[listGroup.listItem];
        if (ListItemComp) {
          return React.createElement(ListItemComp as React.ComponentType<Record<string, unknown>>, { key: li }, ...spanChildren);
        }
        return React.createElement("li", { key: li }, ...spanChildren);
      });

      const ListComp = listComps[listGroup.listItem];
      if (ListComp) {
        return React.createElement(ListComp as React.ComponentType<Record<string, unknown>>, { key: idx }, ...listChildren);
      }

      const listTag = listGroup.listItem === "number" ? "ol" : "ul";
      return React.createElement(listTag, { key: idx }, ...listChildren);
    }

    const block = item as PortableTextBlock;

    if (block._type === "block") {
      return renderTextBlock(block, idx, blockComps, markComps);
    }

    const TypeComp = typeComps[block._type];
    if (TypeComp) {
      return React.createElement(TypeComp as React.ComponentType<Record<string, unknown>>, { key: idx, value: block });
    }

    return null;
  });

  return React.createElement(React.Fragment, null, ...rendered);
}
