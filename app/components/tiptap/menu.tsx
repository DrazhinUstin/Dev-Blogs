import { Editor } from '@tiptap/react';
import {
  FaParagraph,
  FaListUl,
  FaListOl,
  FaCode,
  FaQuoteLeft,
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaArrowRotateLeft,
  FaArrowRotateRight,
  FaXmark,
} from 'react-icons/fa6';
import styles from './styles.module.scss';

export default function Menu({ editor }: { editor: Editor }) {
  return (
    <div className={styles.menu}>
      <div>
        <button
          type='button'
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? styles.active : ''}
        >
          <FaParagraph />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}
        >
          H1
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}
        >
          H2
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? styles.active : ''}
        >
          H3
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? styles.active : ''}
        >
          H4
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? styles.active : ''}
        >
          <FaListUl />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? styles.active : ''}
        >
          <FaListOl />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? styles.active : ''}
        >
          <FaCode />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? styles.active : ''}
        >
          <FaQuoteLeft />
        </button>
        <button type='button' onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          hr
        </button>
        <button type='button' onClick={() => editor.chain().focus().setHardBreak().run()}>
          br
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().clearNodes().run()}
          className='clr-red'
        >
          <FaXmark />
        </button>
      </div>
      <div>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? styles.active : ''}
        >
          <FaBold />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? styles.active : ''}
        >
          <FaItalic />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? styles.active : ''}
        >
          <FaStrikethrough />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? styles.active : ''}
        >
          <FaCode />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className='clr-red'
        >
          <FaXmark />
        </button>
      </div>
      <div>
        <button
          type='button'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaArrowRotateLeft />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaArrowRotateRight />
        </button>
      </div>
    </div>
  );
}
