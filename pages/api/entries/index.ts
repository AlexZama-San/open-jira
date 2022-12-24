
import type { NextApiRequest, NextApiResponse } from 'next'
import { getEnabledCategories } from 'trace_events'
import { connect, disconnect } from '../../../database/db';
import EntryModel from '../../../models/Entry';
import { IEntry } from '../../../models/Entry';

type Data = 
   | {message: string}
   | IEntry[]
   | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getEntries( res )
        case 'POST':
            return createEntry( req, res )

        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}

const getEntries = async ( res: NextApiResponse<Data> ) => {

    await connect()
    const entries = await EntryModel.find().sort({ createdAt: 'ascending' })

    await disconnect()

    res.status(200).json(entries)
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { description = ''} = req.body

    if ( !description ) {
        return res.status(400).json({ message: 'Description is required' })
    }

    const newEntry = new EntryModel({
        description,
        createdAt: Date.now()
    })

    try {
        
        await connect()
        const entry = await newEntry.save()
        await disconnect()

        res.status(201).json(newEntry)

    } catch (error) {
        await disconnect()
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

