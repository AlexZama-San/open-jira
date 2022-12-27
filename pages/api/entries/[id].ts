import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { disconnect, connect } from '../../../database/db';
import EntryModel from '../../../models/Entry';
import { IEntry } from '../../../models/Entry';

type Data = 
| {message: string}
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query

    if ( !mongoose.isValidObjectId(id) ) {
        return res.status(400).json({ message: 'Invalid id' })
    }

    switch ( req.method ) {
        case 'PUT':
            return updateEntry( req, res )
        case 'DELETE':
            return deleteEntry( req, res )
        case 'GET':
            return getEntryByID( req, res )

        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    try {
        await connect()
        const entry = await EntryModel.findById(id)
        if( !entry ) {
            await disconnect()
            return res.status(404).json({ message: 'Entry not found' })
        }

        const { description = entry.description, status = entry.status } = req.body
        try {
            const updatedEntry = await EntryModel.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
            await disconnect()
            res.status(200).json( updatedEntry! )
        } catch (error: any) {
            await disconnect()
            res.status(400).json({ message: error.errors.status.message })    
        }
        
    } catch (error) {
        await disconnect()
        res.status(500).json({ message: 'Internal server error' })
    }
    
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
        const { id } = req.query
    
        try {
            await connect()
            const entry = await EntryModel.findById(id)
            if( !entry ) {
                await disconnect()
                return res.status(404).json({ message: 'Entry not found' })
            }
            const dEntry = await EntryModel.findByIdAndDelete(id)
            await disconnect()
            res.status(200).json( dEntry! )
        } catch (error) {
            await disconnect()
            res.status(500).json({ message: 'Internal server error' })
        }
}

const getEntryByID = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    try {
        await connect()
        const entry = await EntryModel.findById(id)
        if( !entry ) {
            await disconnect()
            return res.status(404).json({ message: 'Entry not found' })
        }
        await disconnect()
        res.status(200).json( entry )
    } catch (error) {
        await disconnect()
        res.status(500).json({ message: 'Internal server error' })
    }
}
