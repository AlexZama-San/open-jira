import { Card, CardContent, CardActionArea, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({entry}) => {

    const {startDragging, stopDragging} = useContext(UIContext)

    const onDragStart = (event: DragEvent) => {
        console.log(event);
        event.dataTransfer.setData('text', entry._id)
        startDragging();
    }

    const onDragEnd = (event: DragEvent) => {
        stopDragging();
    }

  return (
    <Card sx={{marginBottom: 1}} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace: 'pre-line'}}>
                    {entry.description}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant='body2'>
                    hace 5 minutos
                </Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
