import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateModSideForm from './update-mod-side-form';
import type { ModSideType } from '@/core/entities/mod-side';

interface Props {
  modId: string;
  side?: ModSideType;
}

const UpdateModSideCard = ({ modId, side }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mod side</CardTitle>
        <CardDescription>Where does this mod run?</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateModSideForm modId={modId} side={side} />
      </CardContent>
    </Card>
  )
}

export default UpdateModSideCard