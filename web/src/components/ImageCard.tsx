"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

type ImageCardProps = {
  url: string;
};

export const ImageCard = ({ url }: ImageCardProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-fit w-fit items-center justify-center rounded-md text-sm">
        <AspectRatio ratio={3 / 2}>
          <Image
            alt="image"
            width={220}
            height={275}
            src={url}
            className="hover:scale-95 transition transform duration-300 ease-in-out cursor-pointer"
          />
        </AspectRatio>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
