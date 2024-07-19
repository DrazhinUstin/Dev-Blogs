import { Editor } from '@tiptap/react';

export default function Counter({
  editor,
  charactersLimit,
}: {
  editor: Editor;
  charactersLimit: number;
}) {
  const wordsCount = editor.storage.characterCount.words();
  const charactersCount = editor.storage.characterCount.characters();
  return (
    <div className='mt-2'>
      <p>
        {wordsCount} words,{' '}
        <span className={charactersCount === charactersLimit ? 'clr-red' : undefined}>
          {charactersCount}
        </span>
        /{charactersLimit} characters
      </p>
    </div>
  );
}
