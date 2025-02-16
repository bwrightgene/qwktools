"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AspectRatioCalculator() {
  const [originalWidth, setOriginalWidth] = useState<string>("1920");
  const [originalHeight, setOriginalHeight] = useState<string>("1080");
  const [modifiedWidth, setModifiedWidth] = useState<string>("1920");
  const [modifiedHeight, setModifiedHeight] = useState<string>("1080");

  const width = parseFloat(originalWidth) || 0;
  const height = parseFloat(originalHeight) || 0;
  const aspectRatio = width && height ? width / height : 1;

  const getFormattedAspectRatio = () => {
    if (!width || !height) return "N/A";

    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(width, height);
    return `${Math.round(width / divisor)}:${Math.round(height / divisor)}`;
  };

  const updateOriginalValues = (newWidth: string, newHeight: string) => {
    setOriginalWidth(newWidth);
    setOriginalHeight(newHeight);
    setModifiedWidth(newWidth);
    setModifiedHeight(newHeight);
  };

  const updateModifiedWidth = (newWidth: string) => {
    const widthValue = parseFloat(newWidth) || 0;
    if (widthValue > 0 && height > 0) {
      setModifiedWidth(newWidth);
      setModifiedHeight((widthValue / aspectRatio).toFixed(4));
    } else {
      setModifiedWidth(newWidth);
    }
  };

  const updateModifiedHeight = (newHeight: string) => {
    const heightValue = parseFloat(newHeight) || 0;
    if (heightValue > 0 && width > 0) {
      setModifiedHeight(newHeight);
      setModifiedWidth((heightValue * aspectRatio).toFixed(4));
    } else {
      setModifiedHeight(newHeight);
    }
  };

  const applyPreset = (percentage: number) => {
    if (width > 0 && height > 0) {
      setModifiedWidth((width * (percentage / 100)).toFixed(4));
      setModifiedHeight((height * (percentage / 100)).toFixed(4));
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Aspect Ratio Calculator</CardTitle>
        <CardDescription>Maintain aspect ratio while resizing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-md font-semibold">Original Dimensions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Width</label>
              <Input
                type="text"
                value={originalWidth}
                placeholder="Enter width"
                onChange={(e) =>
                  updateOriginalValues(e.target.value, originalHeight)
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Height</label>
              <Input
                type="text"
                value={originalHeight}
                placeholder="Enter height"
                onChange={(e) =>
                  updateOriginalValues(originalWidth, e.target.value)
                }
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Aspect Ratio: <strong>{getFormattedAspectRatio()}</strong>
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-md font-semibold">Modified Dimensions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Width</label>
              <Input
                type="text"
                value={modifiedWidth}
                placeholder="Auto"
                onChange={(e) => updateModifiedWidth(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Height</label>
              <Input
                type="text"
                value={modifiedHeight}
                placeholder="Auto"
                onChange={(e) => updateModifiedHeight(e.target.value)}
              />
            </div>
          </div>
        </div>

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
      </CardContent>
    </Card>
  );
}
