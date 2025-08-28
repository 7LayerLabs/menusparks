'use client'

import { useRef } from 'react'

interface FileUploadProps {
  label: string
  accept: string
  files: File[]
  onFileChange: (files: File[]) => void
  multiple?: boolean
}

export default function FileUpload({ 
  label, 
  accept, 
  files, 
  onFileChange, 
  multiple = false 
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      onFileChange(multiple ? [...files, ...newFiles] : newFiles)
    }
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onFileChange(newFiles)
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
      >
        {files.length > 0 ? 'Add More Files' : label}
      </button>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}