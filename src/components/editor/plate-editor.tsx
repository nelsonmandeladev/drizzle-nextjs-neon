'use client';

import * as React from 'react';

import {Plate, PlateEditor as PPlate, usePlateEditor} from 'platejs/react';

import { EditorKit } from '@/components/editor/editor-kit';
import { SettingsDialog } from '@/components/editor/settings-dialog';
import {Editor, EditorContainer} from '@/components/ui/editor';
import {cn} from "@/lib/utils";
import {ValueOf} from "platejs";

interface PlateEditorProps {
  readonly: boolean;
  value?: ValueOf<PPlate>;
  onChange: (value: ValueOf<PPlate>) => void;
}
export function PlateEditor({ readonly, onChange, value }: PlateEditorProps) {
  const editor = usePlateEditor({
    plugins: EditorKit,
    readOnly: readonly,
    value
  });
  return (
    <Plate editor={editor} onChange={(editorValue) => onChange(editorValue.value)}>
      <EditorContainer className={cn(!readonly && "h-[900px] max-h-[900px]")}>
        <Editor variant="fullWidth" placeholder={"Enter you post content here..."} />
      </EditorContainer>
      <SettingsDialog />
    </Plate>
  );
}
