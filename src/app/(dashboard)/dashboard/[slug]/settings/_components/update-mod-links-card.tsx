import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateModLinksForm from './update-mod-links-form';

interface Props {
  modId: string;
  modLinksId?: string | null;
  issues?: string | null;
  source?: string | null;
  wiki?: string | null;
  discord?: string | null;
}

const UpdateExternalResourcesCard = ({ modId, modLinksId, issues, source, wiki, discord }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update links</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateModLinksForm modId={modId} modLinksId={modLinksId} issues={issues} source={source} wiki={wiki} discord={discord} />
      </CardContent>
    </Card>
  );
}

export default UpdateExternalResourcesCard;