import { FieldType } from ".";
export { FieldType };

import { ICustomCellProps, IBasicCellProps } from "./withCustomCell";
import { FormatterProps, EditorProps } from "react-data-grid";
import { Control } from "react-hook-form";

export interface IFieldConfig {
  type: FieldType;
  name: string;
  dataType: string;
  initialValue: any;
  icon?: React.ReactNode;
  description?: string;
  setupGuideLink?: string;
  TableCell: React.ComponentType<FormatterProps>;
  TableEditor: React.ComponentType<EditorProps>;
  SideDrawerField: React.ComponentType<ISideDrawerFieldProps>;
  // settings
  csvExport?: (value: any) => string;
  csvImportParser?: (value: string) => any;
}

export interface ICustomCellProps extends FormatterProps<any> {
  value: any;
  onSubmit: (value: any) => void;
  docRef: firebase.firestore.DocumentReference;
}

export interface IBasicCellProps {
  value: any;
  type: FieldType;
  name: string;
}

export interface ISideDrawerFieldProps {
  column: FormatterProps<any>["column"];
  control: Control;
  docRef: firebase.firestore.DocumentReference;
}