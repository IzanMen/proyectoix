export type TextFieldType = "text" | "tel" | "email" | "url" | "textarea";

export interface TextFieldDef {
  id: string;
  type: TextFieldType;
  label: string;
  placeholder?: string;
  help?: string;
  optional?: boolean;
}

export interface OptionsFieldDef {
  id: string;
  type: "options";
  label: string;
  options: string[];
  help?: string;
  optional?: boolean;
}

export interface CheckboxFieldDef {
  id: string;
  type: "checkbox";
  label: string;
  help?: string;
  optional?: boolean;
}

export interface FilesFieldDef {
  id: string;
  type: "files";
  label: string;
  help?: string;
  accept?: string;
  optional?: boolean;
}

export type FlatFieldDef =
  | TextFieldDef
  | OptionsFieldDef
  | CheckboxFieldDef
  | FilesFieldDef;

export interface RevealFieldDef {
  id: string;
  type: "reveal";
  label: string;
  help?: string;
  fields: FlatFieldDef[];
}

export interface RepeatableFieldDef {
  id: string;
  type: "repeatable";
  label: string;
  itemLabel: string;
  help?: string;
  startWith?: number;
  addLabel?: string;
  fields: (TextFieldDef | OptionsFieldDef)[];
  optional?: boolean;
}

export type FieldDef = FlatFieldDef | RevealFieldDef | RepeatableFieldDef;

export interface SectionDef {
  id: string;
  title: string;
  intro?: string;
  optionalSection?: boolean;
  fields: FieldDef[];
}
