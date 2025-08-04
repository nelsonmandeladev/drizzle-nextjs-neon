'use client';

import { usePlateViewEditor } from 'platejs/react';
import { PlateView } from 'platejs/react';
import { BaseEditorKit } from '@/components/editor/editor-base-kit';
import {ValueOf} from "platejs";
import {PlateEditor as PPlate} from "@platejs/core/react";

export function InteractiveViewer({ value }: { value: ValueOf<PPlate>}) {
    const editor = usePlateViewEditor({
        plugins: BaseEditorKit,
        value,
    });

    return <PlateView editor={editor} />;
}
