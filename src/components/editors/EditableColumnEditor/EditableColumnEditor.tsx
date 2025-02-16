import { DataFrame } from '@grafana/data';
import { InlineField, Select } from '@grafana/ui';
import React from 'react';

import { TEST_IDS } from '@/constants';
import { ColumnEditorConfig, ColumnEditorType, EditorProps } from '@/types';
import { getColumnEditorConfig } from '@/utils';

import { editableColumnEditorsRegistry } from './EditableColumnEditorsRegistry';

/**
 * Properties
 */
interface Props extends EditorProps<ColumnEditorConfig> {
  /**
   * Data
   *
   * @type {DataFrame[]}
   */
  data: DataFrame[];
}

/**
 * Column Editor Options
 */
const columnEditorOptions = [
  { value: ColumnEditorType.DATETIME, label: 'Date Time' },
  { value: ColumnEditorType.BOOLEAN, label: 'Switch' },
  { value: ColumnEditorType.NUMBER, label: 'Number' },
  { value: ColumnEditorType.SELECT, label: 'Select' },
  { value: ColumnEditorType.STRING, label: 'String' },
  { value: ColumnEditorType.TEXTAREA, label: 'Text Area' },
  { value: ColumnEditorType.FILE, label: 'File Upload' },
];

/**
 * Editable Column Editor
 */


export const EditableColumnEditor: React.FC<Props> = ({ value, onChange, data }) => {
  const EditorConfig = editableColumnEditorsRegistry.get(value.type)?.editor;

  return (
    <>
      <InlineField label="Editor Type" grow={true}>
        <Select
          value={value.type}
          onChange={(event) => {
            onChange(getColumnEditorConfig(event.value!));
          }}
          options={columnEditorOptions}
          {...TEST_IDS.editableColumnEditor.fieldType.apply()}
        />
      </InlineField>
      { /** @ts-expect-error It complained about the union type being too complex*/}
      {EditorConfig && <EditorConfig value={value as never} onChange={onChange} data={data} />}
    </>
  );
};
