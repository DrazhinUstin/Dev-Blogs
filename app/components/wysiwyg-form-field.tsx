'use client';

import { useState } from 'react';
import Editor from '@/app/components/tiptap';

export default function WYSIWYGFormField({
  initialValue,
  name,
  label,
}: {
  initialValue?: string;
  name: string;
  label?: string;
}) {
  const [value, setValue] = useState<string>(initialValue || '');
  return (
    <div>
      <Editor initialContent={value} handleUpdate={setValue} label={label} />
      <textarea name={name} value={value} readOnly hidden />
    </div>
  );
}
