"use client";
import { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link, 
  Image, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Heading1, 
  Heading2, 
  Heading3,
  Undo,
  Redo,
  Type
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing your article...", className = "" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastValueRef = useRef<string>(value);
  const focusedRef = useRef(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  useEffect(() => {
    if (editorRef.current && value !== lastValueRef.current && !focusedRef.current) {
      editorRef.current.innerHTML = value;
      lastValueRef.current = value;
    }
  }, [value]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateValue();
  };

  const updateValue = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastValueRef.current = html;
      onChange(html);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      execCommand('insertLineBreak');
    }
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const link = document.createElement('a');
        link.href = linkUrl;
        link.textContent = linkText;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        range.deleteContents();
        range.insertNode(link);
        updateValue();
      }
    }
    setIsLinkModalOpen(false);
    setLinkUrl('');
    setLinkText('');
  };

  const insertCodeBlock = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const codeBlock = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = selection.toString() || 'Your code here';
      codeBlock.appendChild(code);
      range.deleteContents();
      range.insertNode(codeBlock);
      updateValue();
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const ToolbarButton = ({ 
    icon: Icon, 
    onClick, 
    title, 
    active = false 
  }: { 
    icon: any; 
    onClick: () => void; 
    title: string; 
    active?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-brand-neutral-700 transition-colors ${
        active ? 'bg-brand-primary text-white' : 'text-brand-neutral-300 hover:text-brand-neutral-100'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const handleFocus = () => { focusedRef.current = true; };
  const handleBlur = () => { focusedRef.current = false; updateValue(); };

  return (
    <div className={`bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-brand-neutral-700 bg-brand-neutral-800/50">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-brand-neutral-600 pr-2">
          <ToolbarButton icon={Bold} onClick={() => execCommand('bold')} title="Bold (Ctrl+B)" />
          <ToolbarButton icon={Italic} onClick={() => execCommand('italic')} title="Italic (Ctrl+I)" />
          <ToolbarButton icon={Underline} onClick={() => execCommand('underline')} title="Underline (Ctrl+U)" />
          <ToolbarButton icon={Strikethrough} onClick={() => execCommand('strikeThrough')} title="Strikethrough" />
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-brand-neutral-600 pr-2">
          <ToolbarButton icon={Heading1} onClick={() => execCommand('formatBlock', '<h1>')} title="Heading 1" />
          <ToolbarButton icon={Heading2} onClick={() => execCommand('formatBlock', '<h2>')} title="Heading 2" />
          <ToolbarButton icon={Heading3} onClick={() => execCommand('formatBlock', '<h3>')} title="Heading 3" />
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-brand-neutral-600 pr-2">
          <ToolbarButton icon={List} onClick={() => execCommand('insertUnorderedList')} title="Bullet List" />
          <ToolbarButton icon={ListOrdered} onClick={() => execCommand('insertOrderedList')} title="Numbered List" />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-brand-neutral-600 pr-2">
          <ToolbarButton icon={AlignLeft} onClick={() => execCommand('justifyLeft')} title="Align Left" />
          <ToolbarButton icon={AlignCenter} onClick={() => execCommand('justifyCenter')} title="Align Center" />
          <ToolbarButton icon={AlignRight} onClick={() => execCommand('justifyRight')} title="Align Right" />
        </div>

        {/* Special Elements */}
        <div className="flex items-center gap-1 border-r border-brand-neutral-600 pr-2">
          <ToolbarButton icon={Quote} onClick={() => execCommand('formatBlock', '<blockquote>')} title="Quote Block" />
          <ToolbarButton icon={Code} onClick={insertCodeBlock} title="Code Block" />
        </div>

        {/* Links and Media */}
        <div className="flex items-center gap-1 border-r border-brand-neutral-600 pr-2">
          <ToolbarButton icon={Link} onClick={() => setIsLinkModalOpen(true)} title="Insert Link" />
          <ToolbarButton icon={Image} onClick={insertImage} title="Insert Image" />
        </div>

        {/* History */}
        <div className="flex items-center gap-1">
          <ToolbarButton icon={Undo} onClick={() => execCommand('undo')} title="Undo (Ctrl+Z)" />
          <ToolbarButton icon={Redo} onClick={() => execCommand('redo')} title="Redo (Ctrl+Y)" />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateValue}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="min-h-[400px] p-6 text-brand-neutral-100 placeholder-brand-neutral-400 focus:outline-none"
        style={{ 
          minHeight: '400px',
          lineHeight: '1.6'
        }}
        data-placeholder={placeholder}
      />

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-brand-neutral-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-brand-neutral-100 mb-4">Insert Link</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Link text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="w-full p-3 bg-brand-neutral-700 border border-brand-neutral-600 rounded-lg text-brand-neutral-100 placeholder-brand-neutral-400"
              />
              <input
                type="url"
                placeholder="URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full p-3 bg-brand-neutral-700 border border-brand-neutral-600 rounded-lg text-brand-neutral-100 placeholder-brand-neutral-400"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setIsLinkModalOpen(false);
                  setLinkUrl('');
                  setLinkText('');
                }}
                className="flex-1 px-4 py-2 bg-brand-neutral-700 text-brand-neutral-300 rounded-lg hover:bg-brand-neutral-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="flex-1 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Character Count */}
      <div className="p-3 border-t border-brand-neutral-700 bg-brand-neutral-800/30 text-sm text-brand-neutral-400">
        {value.replace(/<[^>]*>/g, '').length} characters
      </div>
    </div>
  );
} 