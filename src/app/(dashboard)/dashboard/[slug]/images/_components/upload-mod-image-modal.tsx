"use client"
import React, { useState } from 'react';
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
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload mod image</DialogTitle>
        </DialogHeader>
        <UploadModImageForm modId={modId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default UploadModImageModal;