import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateModSideForm from './update-mod-environment-form';
import type { EnvironmentType } from '@/core/entities/environment';

interface Props {
  modId: string;
  environment?: EnvironmentType;
}

const UpdateModSideCard = ({ modId, environment }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mod environment</CardTitle>
        <CardDescription>Where does this mod run?</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateModSideForm modId={modId} environment={environment} />
      </CardContent>
    </Card>
  )
}

export default UpdateModSideCard