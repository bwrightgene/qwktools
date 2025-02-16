"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const SUPPORTED_FORMATS = ["png", "jpeg", "webp", "bmp", "gif", "tiff", "avif"];

export default function ImageConverter() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState("jpeg");
  const [quality, setQuality] = useState(80);

  const [originalWidth, setOriginalWidth] = useState<string>("");
  const [originalHeight, setOriginalHeight] = useState<string>("");
  const [modifiedWidth, setModifiedWidth] = useState<string>("");
  const [modifiedHeight, setModifiedHeight] = useState<string>("");

  const width = parseFloat(originalWidth) || 1;
  const height = parseFloat(originalHeight) || 1;
  const aspectRatio = width / height;

  const updateModifiedWidth = (newWidth: string) => {
    const widthValue = parseFloat(newWidth) || 0;
    setModifiedWidth(newWidth);
    if (height > 0) {
      setModifiedHeight((widthValue / aspectRatio).toFixed(4));
    }
  };

  const updateModifiedHeight = (newHeight: string) => {
    const heightValue = parseFloat(newHeight) || 0;
    setModifiedHeight(newHeight);
    if (width > 0) {
      setModifiedWidth((heightValue * aspectRatio).toFixed(4));
    }
  };

  const applyPreset = (percentage: number) => {
    if (width > 0 && height > 0) {
      setModifiedWidth((width * (percentage / 100)).toFixed(4));
      setModifiedHeight((height * (percentage / 100)).toFixed(4));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));

    const img = new Image();
    img.src = URL.createObjectURL(uploadedFile);
    img.onload = () => {
      setOriginalWidth(img.width.toString());
      setOriginalHeight(img.height.toString());
      setModifiedWidth(img.width.toString());
      setModifiedHeight(img.height.toString());
    };
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleConvert = async () => {
    if (!file || !preview) {
      toast({
        title: "Error",
        description: "No image uploaded.",
        variant: "destructive",
      });
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const newWidth = parseInt(modifiedWidth) || img.width;
      const newHeight = parseInt(modifiedHeight) || img.height;

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const convertedFile = new File([blob], `converted.${outputFormat}`, {
            type: `image/${outputFormat}`,
          });
          const downloadUrl = URL.createObjectURL(convertedFile);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = convertedFile.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(downloadUrl);

          toast({
            title: "Success",
            description: "Image converted successfully!",
          });
        },
        `image/${outputFormat}`,
        quality / 100
      );
    };
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Image Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-6 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto mx-auto"
            />
          ) : (
            <p>Drag & drop an image here, or click to select one.</p>
          )}
        </div>

        {file && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Output Format</label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_FORMATS.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {file && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Quality ({quality}%)</label>
            <Slider
              value={[quality]}
              onValueChange={(val) => setQuality(val[0])}
              min={10}
              max={100}
              step={5}
            />
          </div>
        )}

        {file && (
          <div className="space-y-2">
            <h3 className="text-md font-semibold">Rescale Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Width</label>
                <Input
                  type="text"
                  value={modifiedWidth}
                  onChange={(e) => updateModifiedWidth(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Height</label>
                <Input
                  type="text"
                  value={modifiedHeight}
                  onChange={(e) => updateModifiedHeight(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {file && (
          <div className="grid grid-cols-3 gap-2">
            {[175, 150, 125, 75, 50, 25].map((preset) => (
              <Button
                key={preset}
                className="w-full"
                onClick={() => applyPreset(preset)}
              >
                {preset}%
              </Button>
            ))}
          </div>
        )}

        {/* Convert Button */}
        {file && (
          <Button onClick={handleConvert} className="w-full">
            Convert & Download
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
