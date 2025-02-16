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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardCopy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ListOrdering() {
  const { toast } = useToast();
  const [inputList, setInputList] = useState("");
  const [sortedList, setSortedList] = useState<string[]>([]);
  const [sortType, setSortType] = useState<"alphanumeric" | "length">(
    "alphanumeric"
  );
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const sortList = () => {
    const list = inputList.split("\n").filter((item) => item.trim() !== "");

    if (sortType === "alphanumeric") {
      list.sort((a, b) =>
        order === "asc" ? a.localeCompare(b) : b.localeCompare(a)
      );
    } else {
      list.sort((a, b) =>
        order === "asc" ? a.length - b.length : b.length - a.length
      );
    }

    setSortedList(list);
  };

  const copyToClipboard = () => {
    if (sortedList.length === 0) return;
    navigator.clipboard.writeText(sortedList.join("\n"));

    toast({
      title: "Copied to Clipboard",
      description: `${sortedList.length} items copied successfully!`,
    });
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>List Ordering</CardTitle>
        <CardDescription>
          Sort a list alphanumerically or by length
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">
            Enter List (one per line)
          </label>
          <Textarea
            className="h-32 resize-none"
            placeholder="Enter items here..."
            value={inputList}
            onChange={(e) => setInputList(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Sort By</label>
            <Select
              value={sortType}
              onValueChange={(value) =>
                setSortType(value as "alphanumeric" | "length")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sort Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphanumeric">Alphanumeric</SelectItem>
                <SelectItem value="length">String Length</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Order</label>
            <Select
              value={order}
              onValueChange={(value) => setOrder(value as "asc" | "desc")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={sortList} className="w-full flex items-center gap-2">
            <RefreshCw size={16} />
            Sort List
          </Button>
          <Button
            onClick={copyToClipboard}
            className="w-full flex items-center gap-2"
            disabled={sortedList.length === 0}
          >
            <ClipboardCopy size={16} />
            Copy to Clipboard
          </Button>
        </div>

        {sortedList.length > 0 && (
          <div>
            <label className="text-sm font-medium">Sorted List</label>
            <Textarea
              className="h-32 resize-none"
              readOnly
              value={sortedList.join("\n")}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
