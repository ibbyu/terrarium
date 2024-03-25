"use client"
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import UploadModImageForm from './upload-mod-image-form';

interface Props {
  modId: string;
}

const UploadModImageModal = ({ modId }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload mod image</DialogTitle>
        </DialogHeader>
        <UploadModImageForm modId={modId} />
      </DialogContent>
    </Dialog>
  );
}

export default UploadModImageModal;