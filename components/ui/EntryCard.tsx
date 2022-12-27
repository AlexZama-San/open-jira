import { Card, CardContent, CardActionArea, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { getFormatDistanceToNow } from '../../utils/dateFunctions';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({entry}) => {

    const {startDragging, stopDragging} = useContext(UIContext)
    const router = useRouter();

    const onDragStart = (event: DragEvent) => {
        console.log(event);
        event.dataTransfer.setData('text', entry._id)
        startDragging();
    }

    const onDragEnd = (event: DragEvent) => {
        stopDragging();
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`)
    }

  return (
    <Card sx={{marginBottom: 1}} draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onClick={onClick}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace: 'pre-line'}}>
                    {entry.description}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant='body2'>
                    {getFormatDistanceToNow(entry.createdAt)}
                </Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
