'use client';

import { useEditor, EditorContent, Content } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Menu from './menu';
import Counter from './counter';

export default function Editor({
  initialContent,
  handleUpdate,
  charactersLimit: limit = 1000,
}: {
  initialContent?: Content;
  handleUpdate: (content: string) => void;
  charactersLimit?: number;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      CharacterCount.configure({
        limit,
      }),
    ],
    content: initialContent,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      handleUpdate(html);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
      <Counter editor={editor} charactersLimit={limit} />
    </div>
  );
}
