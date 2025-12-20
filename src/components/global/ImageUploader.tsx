import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { Image, Trash2Icon, UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
  isLoading: boolean;
}

const ImageUploader = ({ file, setFile, isLoading }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      // Simple validation check (e.g., image type)
      if (!selectedFile.type.startsWith("image/")) {
        console.error("Please select an image file.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleRemove = useCallback(() => {
    setFile(null);
  }, [setFile]);
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-neutral-300 mb-1">
        Agency Logo
      </label>
      <div
        className={cn(
          "rounded-lg border border-dashed transition-colors p-4",
          file
            ? "border-blue-500/50"
            : "border-neutral-700 hover:border-neutral-500"
        )}
      >
        {file && previewUrl ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={previewUrl}
                alt="Logo Preview"
                className="h-12 w-12 object-contain rounded-lg border border-neutral-700 bg-neutral-900 p-1"
              />
              <div className="flex flex-col">
                <span className="text-sm text-white truncate max-w-[150px]">
                  {file.name}
                </span>
                <span className="text-xs text-neutral-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={Trash2Icon}
              onClick={handleRemove}
              disabled={isLoading}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image className="h-6 w-6 text-neutral-500" />
            <span className="text-xs text-neutral-400">
              Drag & drop or click to upload
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload-input"
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={UploadIcon}
              onClick={() =>
                document.getElementById("logo-upload-input")?.click()
              }
              disabled={isLoading}
            >
              Select File
            </Button>
            <p className="text-xs text-neutral-600">JPG, PNG, GIF (Max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
