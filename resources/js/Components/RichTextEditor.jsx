import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const MODULES = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
    ],
};

const FORMATS = ['bold', 'italic', 'underline', 'list', 'link'];

export default function RichTextEditor({ value, onChange, placeholder = 'Descripción del producto...' }) {
    return (
        <div className="quill-dark">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={MODULES}
                formats={FORMATS}
                placeholder={placeholder}
            />
        </div>
    );
}
